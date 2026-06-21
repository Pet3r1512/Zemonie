import z from "zod";
import { authenticatedProcedure, router } from "./tRPC";
import prisma from "@/lib/prisma";

export const budgetRouter = router({
  createBudget: authenticatedProcedure
    .input(
      z.object({
        categoryId: z.number().optional(),
        budgetName: z.string().optional(),
        amount: z.number(),
        isRecurring: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const { categoryId, budgetName, amount, isRecurring } = input;

      const now = new Date();
      const startDate = new Date(now.getFullYear(), now.getMonth(), 1, 0, 0, 0, 0);

      const endDate = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0, // last day of current month
        23,
        59,
        59,
        999,
      );

      const newBudget = await prisma.budget.create({
        data: {
          userId,
          categoryId,
          name: budgetName,
          amount,
          isRecurring,
          startDate,
          endDate,
        },
      });

      return { budget: newBudget };
    }),
});
