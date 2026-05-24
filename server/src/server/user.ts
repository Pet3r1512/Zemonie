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

        await prisma.balance.create({
            data: {
                userId: userId,
                amount: 0,
                currency: currency as SupportedCurrency
            }
        })

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                image: avatarId,
                isSetupDone: true
            }
        })

        return { success: true, user: user }
    })
})