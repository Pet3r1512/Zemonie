import { betterAuth } from "better-auth/minimal";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";
import { scryptSync, randomBytes, timingSafeEqual } from "node:crypto";

const isProduction = process.env.NODE_ENV !== "development";

export const auth = betterAuth({
  baseURL: "https://api.zemonie.site",
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
        const key = scryptSync(password.normalize("NFKC"), salt, 64, { N: 16384, r: 16, p: 1, maxmem: 128 * 16384 * 16 * 2 });
        return `${salt}:${key.toString("hex")}`;
      },
      verify: async ({ hash, password }: { hash: string; password: string }) => {
        const [salt, key] = hash.split(":");
        if (!salt || !key) return false;
        const derived = scryptSync(password.normalize("NFKC"), salt, 64, { N: 16384, r: 16, p: 1, maxmem: 128 * 16384 * 16 * 2 });
        return timingSafeEqual(Buffer.from(key, "hex"), derived);
      },
    },
  },

  trustedOrigins: [
    "https://www.zemonie.site",
    "https://zemonie.site",
    "http://localhost:5173",
  ],

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
        domain: ".zemonie.site",
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