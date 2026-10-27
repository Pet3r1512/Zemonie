// THIS ADAPTS THE CLOUDFLARE WORKER ENTRYPOINT TO A NORMAL NODE HTTP SERVER

import { serve } from "@hono/node-server";
import worker from "./index";

const port = Number(process.env.PORT) || 9999;

// Create a minimal stand-in for Cloudflare's ExecutionContext
const executionContext = {
  waitUntil: (promise: Promise<unknown>) => {
    void promise.catch((error) => console.error("waitUntil error:", error));
  },
  passThroughOnException: () => {},
} as Parameters<typeof worker.fetch>[2];

// Create Node HTTP server
const server = serve({
  fetch: (request) => worker.fetch(request, process.env, executionContext),
  hostname: "0.0.0.0",
  port,
});

const shutdown = () => {
  server.close(() => process.exit(0));
};

// Handle Docker stop signals and Ctrl C
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
