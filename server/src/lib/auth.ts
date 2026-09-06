import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";
import brevo from "./brevo";

const isProduction = process.env.NODE_ENV !== "development";

const betterAuthUrl =
  process.env.BETTER_AUTH_URL ||
  (isProduction ? "https://api.zemonie.site" : "http://localhost:8787");
const cookieDomain = process.env.COOKIE_DOMAIN || ".zemonie.site";

export const auth = betterAuth({
  baseURL: betterAuthUrl,
  secret: process.env.BETTER_AUTH_SECRET,
  basePath: "/api/auth",

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

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
        await brevo.transactionalEmails.sendTransacEmail({
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
    sendVerificationEmail: async ({ user, url }) => {
      try {
        await brevo.transactionalEmails.sendTransacEmail({
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
          textContent: `Click the link to verify your email: ${url}`,
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
            await brevo.transactionalEmails.sendTransacEmail({
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
