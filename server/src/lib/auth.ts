import { betterAuth } from "better-auth/minimal";
import { APIError, createAuthMiddleware, isAPIError } from "better-auth/api";
import { captcha } from "better-auth/plugins";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";
import { sendTransacEmail } from "./brevo";
import {
  applySignInOutcome,
  getLockoutStatus,
  LoginLimitStore,
  SignInOutcome,
} from "./login-lockout";

const isProduction = process.env.NODE_ENV !== "development";

const betterAuthUrl =
  process.env.BETTER_AUTH_URL ||
  (isProduction ? "https://api.zemonie.site" : "http://localhost:8787");
const cookieDomain = process.env.COOKIE_DOMAIN || ".zemonie.site";

let loginLimitStore: LoginLimitStore | undefined;

export function setLoginLimitStore(store: LoginLimitStore | undefined) {
  loginLimitStore = store;
}

const SIGN_IN_PATH = "/sign-in/email";

function emailFromBody(body: unknown): string | null {
  const email = (body as { email?: unknown } | undefined)?.email;
  return typeof email === "string" && email.trim() ? email : null;
}

export const auth = betterAuth({
  baseURL: betterAuthUrl,
  secret: process.env.BETTER_AUTH_SECRET,
  basePath: "/api/auth",

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== SIGN_IN_PATH || !loginLimitStore) return;
      const email = emailFromBody(ctx.body);
      if (!email) return;

      const status = await getLockoutStatus(loginLimitStore, email, Date.now());
      if (!status.locked) return;

      throw new APIError(
        "TOO_MANY_REQUESTS",
        {
          message: "Too many failed sign-in attempts. Please try again later.",
          code: "LOGIN_TEMPORARILY_LOCKED",
        },
        { "X-Retry-After": String(status.retryAfterSeconds) },
      );
    }),
    after: createAuthMiddleware(async (ctx) => {
      if (ctx.path !== SIGN_IN_PATH || !loginLimitStore) return;
      const email = emailFromBody(ctx.body);
      if (!email) return;

      const returned = ctx.context.returned;
      const outcome: SignInOutcome = isAPIError(returned)
        ? returned.body?.code === "INVALID_EMAIL_OR_PASSWORD"
          ? "invalid_credentials"
          : "other_failure"
        : "success";
      await applySignInOutcome(loginLimitStore, email, outcome, Date.now());
    }),
  },

  plugins: [
    captcha({
      provider: "cloudflare-turnstile",
      secretKey: process.env.TURNSTILE_SECRET ?? "",
    }),
  ],

  emailAndPassword: {
    enabled: true,
    password: {
      hash: async (password: string) => {
        const salt = randomBytes(16).toString("hex");
        const key = scryptSync(password.normalize("NFKC"), salt, 64, {
          N: 16384,
          r: 16,
          p: 1,
          maxmem: 128 * 16384 * 16 * 2,
        });
        return `${salt}:${key.toString("hex")}`;
      },
      verify: async ({ hash, password }: { hash: string; password: string }) => {
        const [salt, key] = hash.split(":");
        if (!salt || !key) return false;
        const derived = scryptSync(password.normalize("NFKC"), salt, 64, {
          N: 16384,
          r: 16,
          p: 1,
          maxmem: 128 * 16384 * 16 * 2,
        });
        return timingSafeEqual(Buffer.from(key, "hex"), derived);
      },
    },

    sendResetPassword: async ({ user, url }) => {
      try {
        await sendTransacEmail({
          sender: {
            name: "Zemonie Team",
            email: "customer.service@zemonie.site",
          },
          subject: "Reset your password",
          to: [
            {
              email: user.email,
            },
          ],
          templateId: 2,
          params: {
            url: url,
          },
        });
      } catch (error) {
        console.error("Failed to send reset password email:", error);
      }
    },
  },

  emailVerification: {
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      try {
        await sendTransacEmail({
          sender: {
            name: "Zemonie Team",
            email: "customer.service@zemonie.site",
          },
          subject: "Verify your email address",
          to: [
            {
              email: user.email,
            },
          ],
          templateId: 3,
          params: {
            name: user.name,
            verification_url: url,
          },
        });
      } catch (error) {
        console.error("Failed to send verification email:", error);
      }
    },
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          try {
            await sendTransacEmail({
              sender: {
                name: "Zemonie Team",
                email: "customer.service@zemonie.site",
              },
              to: [
                {
                  email: user.email,
                  name: user.name,
                },
              ],
              templateId: 1,
              params: {
                name: user.name,
              },
            });
          } catch (error) {
            console.error("Failed to send welcome email:", error);
          }
        },
      },
    },
  },

  trustedOrigins: isProduction
    ? process.env.TRUSTED_ORIGINS?.split(",") || [
        "https://www.zemonie.site",
        "https://zemonie.site",
      ]
    : (request) => {
        if (!request) return ["http://localhost:5173"];
        const origin = request.headers.get("origin");
        return origin ? [origin] : ["http://localhost:5173"];
      },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
    },
  },

  advanced: {
    ...(isProduction && {
      crossSubDomainCookies: {
        enabled: true,
        domain: cookieDomain,
      },
    }),
    defaultCookieAttributes: {
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      httpOnly: true,
      path: "/",
    },
  },
});

export default auth;
