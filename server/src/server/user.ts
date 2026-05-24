import z from "zod";
import { publicProcedure, router } from "./tRPC";
import { SupportedCurrency } from "@prisma/client";
import prisma from "@/lib/prisma";

export const userRouter = router({
    setup: publicProcedure.input(z.object({
        userId: z.string(),
        avatarId: z.string(),
        currency: SupportedCurrency
    })).mutation(async ({ input }) => {
        const { userId, avatarId, currency } = input

        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                image: avatarId,

            }
        })

        await prisma.balance.update({
            where: {
                userId: userId
            },
            data: {
                currency: currency as SupportedCurrency
            }
        })

        return { success: true }
    })
})