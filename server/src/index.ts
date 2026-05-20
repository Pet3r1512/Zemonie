import { Hono } from "hono";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./server/_index";
import auth from "./lib/auth";
import "dotenv/config";
import { env } from "./env";
import type { ScheduledEvent, ExecutionContext } from "@cloudflare/workers-types";
import prisma from "./lib/prisma";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use(
  "*",
  cors({
    origin: (origin) => {
      const allowed = [
        "https://www.clariofinance.site",
        "https://clariofinance.site",
        "http://localhost:5173",
        "http://192.168.50.89:5173",
      ];
      return allowed.includes(origin) ? origin : null;
    },
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length", "Set-Cookie"],
    maxAge: 600,
  }),
);

app.use("*", async (c, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) {
    c.set("user", null);
    c.set("session", null);
    await next();
    return;
  }
  c.set("user", session.user);
  c.set("session", session.session);
  await next();
});


app.get("/", (c) => {
  return c.json({
    message: "Hono server is running",
    env: env?.NODE_ENV,
    docs: new URL("/api/auth/reference", c.req.url).href,
  });
});

app.use(
  "/api/trpc/*",
  trpcServer({
    endpoint: "/api/trpc",
    router: appRouter,
  }),
);


app.on(["POST", "GET"], "/api/auth/**", async (c) => {
  const response = await auth.handler(c.req.raw);

  return c.newResponse(response.body, response);
});

app.get("/session", async (c) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  });

  if (!session) {
    return c.json({ message: "Invalid or expired session" }, 401);
  }

  return c.json({
    user: session.user,
    session: session.session,
  });
});

app.get("/api/ping", async (c) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return c.json({ ok: true, db: "warm" });
  } catch (e) {
    return c.json({ ok: true, db: "cold" }, 500);
  }
});

export default {
  fetch: app.fetch,
  async scheduled(event: ScheduledEvent, env: unknown, ctx: ExecutionContext) {
    ctx.waitUntil(
      fetch("https://api.clariofinance.site/api/ping")
    );
  },
};