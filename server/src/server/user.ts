import z from "zod";
import { authenticatedProcedure, router } from "./tRPC";
import { SupportedCurrency } from "@prisma/client";
import prisma from "@/lib/prisma";

export const userRouter = router({
    setup: authenticatedProcedure.input(z.object({
        avatarId: z.string().min(1).max(64),
        currency: z.enum(SupportedCurrency)
    })).mutation(async ({ ctx, input }) => {
        const userId = ctx.userId
        const { avatarId, currency } = input

        await prisma.balance.upsert({
            where: {
                userId
            },
            update: {
                currency: currency as SupportedCurrency
            },
            create: {
                userId,
                amount: 0,
                currency: "AUD"
            }
        })

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                image: avatarId
            }
        })

        const preferences = await prisma.user_Preferences.upsert({
            where: {
                userId
            },
            update: {
                currency: currency as SupportedCurrency,
                avatar: avatarId,
                theme: "light",
                isSetupDone: true
            },
            create: {
                userId,
                currency: currency as SupportedCurrency,
                avatar: avatarId,
                theme: "light",
                isSetupDone: true
            }
        })

        return { success: true, preferences }
    }),
    userPreferences: authenticatedProcedure.query(async ({ ctx }) => {
        const userId = ctx.userId

        const preferences = await prisma.user_Preferences.findFirst({
            where: {
                userId
            }
        })

        return {
            result: preferences
        }
    })
})