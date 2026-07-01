import z from "zod";
import { authenticatedProcedure, router } from "./tRPC";
import prisma from "@/lib/prisma";
import { readAmount, writeAmount } from "@/lib/crypto";

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
        0,
        12,
        0,
        0,
        0,
      );

      const newBudget = await prisma.budget.create({
        data: {
          userId,
          categoryId,
          name: budgetName,
          amount: await writeAmount(amount),
          isRecurring,
          startDate,
          endDate,
        },
      });

      if (isRecurring) {
        const scheduledAt = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0, 0);
        await prisma.pendingBudget.create({
          data: {
            userId,
            budgetId: newBudget.id,
            scheduledAt,
          },
        });
      }

      return { budget: newBudget };
    }),
  getBudgets: authenticatedProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

    const budgets = await prisma.budget.findMany({
      where: {
        userId,
        endDate: { gte: startOfMonth },
      },
    });

    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        createdAt: { gte: startOfMonth, lte: endOfMonth },
      },
      select: {
        categoryId: true,
        amount: true,
      },
    });

    // Group by categoryId and sum decrypted amounts
    const totalMap = new Map<number, number>();
    for (const tx of transactions) {
      if (tx.categoryId == null) continue;
      const current = totalMap.get(tx.categoryId) ?? 0;
      totalMap.set(tx.categoryId, current + (await readAmount(tx.amount)));
    }

    const result = await Promise.all(
      budgets.map(async (budget) => ({
        ...budget,
        amount: await readAmount(budget.amount),
        spentAmount: budget.categoryId != null ? (totalMap.get(budget.categoryId) ?? 0) : 0,
      })),
    );

    return { budgets: result };
  }),
});
