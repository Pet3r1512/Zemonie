import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";
import { auth } from "@/lib/auth";

const t = initTRPC.context<Context>().create();

const isAuthenticated = t.middleware(async ({ ctx, next }) => {
  const session = await auth.api.getSession({ headers: ctx.req.headers });
  if (!session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      userId: session.user.id,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const authenticatedProcedure = t.procedure.use(isAuthenticated);
