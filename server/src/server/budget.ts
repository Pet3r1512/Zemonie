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
  getBudgets: authenticatedProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const budgets = await prisma.budget.findMany({
      where: { userId },
    });

    const categoryTotals = await prisma.transaction.groupBy({
      by: ["categoryId"],
      where: {
        userId,
        createdAt: { gte: startOfMonth, lte: endOfMonth },
      },
      _sum: { amount: true },
    });

    const totalMap = new Map(categoryTotals.map((t) => [t.categoryId, Number(t._sum.amount ?? 0)]));

    const result = budgets.map((budget) => ({
      ...budget,
      amount: Number(budget.amount),
      spentAmount: totalMap.get(budget.categoryId) ?? 0,
    }));

    return { budgets: result };
  }),
});
