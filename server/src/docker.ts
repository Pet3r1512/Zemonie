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

const shutdown = (signal: string) => {
  console.log(`Received ${signal}, shutting down...`);
  const timeout = setTimeout(() => {
    console.error("Shutdown timed out, forcing exit");
    process.exit(1);
  }, 10000);

  if (typeof (server as any).closeAllConnections === "function") {
    (server as any).closeAllConnections();
  }

  server.close(() => {
    clearTimeout(timeout);
    process.exit(0);
  });
};

// Handle Docker stop signals and Ctrl C
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
