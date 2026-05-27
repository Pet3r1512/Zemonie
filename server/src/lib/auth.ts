import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
  baseURL: "https://api.zemonie.site",
  secret: process.env.BETTER_AUTH_SECRET,
  basePath: "/api/auth",

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
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