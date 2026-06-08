import { Hono } from "hono";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./server/_index";
import type { ScheduledEvent, ExecutionContext } from "@cloudflare/workers-types";
import prisma, { setPrismaConnectionString } from "./lib/prisma";
import { auth } from "./lib/auth";
import { createContext } from "./server/context";

const app = new Hono<{
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
  };
}>();

app.use(
  "*",
  cors({
    origin: [
      "https://www.zemonie.site",
      "https://zemonie.site",
      "https://staging.www.zemonie.site",
      "https://staging.zemonie.site",
      "http://localhost:5173"
    ],
    credentials: true,
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization", "Cookie"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

async function authMiddleware(c: any, next: any) {
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
}


app.get("/", (c) => {
  return c.json({
    message: "Hono server is running",
    docs: new URL("/api/auth/reference", c.req.url).href,
  });
});

app.use(
  "/api/trpc/*",
  trpcServer({
    endpoint: "/api/trpc",
    router: appRouter,
    createContext,
  }),
);

app.on(["POST", "GET"], "/api/auth/**", async (c) => {
  const response = await auth.handler(c.req.raw);
  return c.newResponse(response.body, response);
});

app.use("/session", authMiddleware);
app.use("/api/users/me", authMiddleware);

app.get("/session", async (c) => {
  const user = c.get("user");
  const session = c.get("session");

  if (!user || !session) {
    return c.json({ message: "Invalid or expired session" }, 401);
  }

  return c.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    expiresAt: session.expiresAt,
  });
});

app.get("/api/users/me", async (c) => {
  const user = c.get("user");

  if (!user) {
    return c.json({ message: "Unauthorized" }, 401);
  }

  let preferences = await prisma.user_Preferences.findUnique({
    where: { userId: user.id },
  });

  if (!preferences) {
    preferences = await prisma.user_Preferences.create({
      data: {
        userId: user.id,
        isSetupDone: false,
      },
    });
  }

  return c.json({ isSetupDone: preferences.isSetupDone });
});

app.get("/api/ping", async (c) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return c.json({ ok: true, db: "warm" });
  } catch {
    return c.json({ ok: true, db: "cold" }, 500);
  }
});

export default {
  async fetch(request: Request, env: Record<string, string | undefined>, ctx: ExecutionContext) {
    if (env.DEV_DATABASE_URL) {
      setPrismaConnectionString(env.DEV_DATABASE_URL);
    } else if (env.DATABASE_URL) {
      setPrismaConnectionString(env.DATABASE_URL);
    }
    return app.fetch(request, env, ctx);
  },
  async scheduled(event: ScheduledEvent, env: Record<string, string | undefined>, ctx: ExecutionContext) {
    const baseUrl = env.BASE_URL || "https://api.zemonie.site";
    ctx.waitUntil(
      fetch(`${baseUrl}/api/ping`)
    );
  },
};