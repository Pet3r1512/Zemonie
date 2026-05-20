import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./prisma";

const isProduction = process.env.NODE_ENV === "production";

export const auth = betterAuth({
    baseURL: "https://api.clariofinance.site",

    basePath: "/api/auth",

    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    emailAndPassword: {
        enabled: true,
    },

    trustedOrigins: isProduction
        ? [
            "https://www.clariofinance.site",
            "https://clariofinance.site",
        ]
        : [
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
                domain: ".clariofinance.site",
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