import z from "zod";
import { publicProcedure, router } from "./tRPC";
import { SupportedCurrency } from "@prisma/client";
import prisma from "@/lib/prisma";

export const userRouter = router({
    setup: publicProcedure.input(z.object({
        userId: z.string(),
        avatarId: z.string(),
        currency: z.enum(SupportedCurrency)
    })).mutation(async ({ input }) => {
        const { userId, avatarId, currency } = input

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
    })
})