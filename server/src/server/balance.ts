import prisma from "@/lib/prisma";
import { authenticatedProcedure, router } from "./tRPC";
import z from "zod";

export const balancesRouter = router({
  createDefaultBalance: authenticatedProcedure
    .input(
      z.object({
        currency: z.enum(["AUD", "USD", "VND"]).default("AUD"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const { currency } = input;

      const defaultBalance = await prisma.balance.create({
        data: {
          userId: userId,
          currency: currency,
        },
      });

      if (!defaultBalance) {
        return {
          status: 400,
          error: "Error when creating default balance",
        };
      }

      return {
        status: 200,
        message: "Default balance is created",
      };
    }),
  getCurrentBalance: authenticatedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.userId;

    const currentBalance = await prisma.balance.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!currentBalance) {
      return {
        status: 400,
        error: "Cannot find balance",
      };
    }

    return {
      status: 200,
      message: "Balance found",
      balance: Number(currentBalance.amount),
      currentcy: currentBalance.currency,
    };
  }),
});
