import prisma from "@/lib/prisma";
import { authenticatedProcedure, router } from "./tRPC";
import z from "zod";
import CalculateHighestIncome from "../lib/analytics/CalculateHighestIncome";
import { readAmount } from "@/lib/crypto";

export const analyticsRouter = router({
  highestIncomeOfMonth: authenticatedProcedure
    .input(
      z.object({
        month: z
          .number()
          .min(1)
          .max(12)
          .default(new Date().getMonth() + 1),

        year: z.number().default(new Date().getFullYear()),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const { month, year } = input;

      const startOfMonth = new Date(year, month - 1, 1);

      const endOfMonth = new Date(year, month, 0, 23, 59, 59);

      const allIncomeAmount = await prisma.transaction.findMany({
        where: {
          userId,
          categoryId: {
            lt: 8,
          },
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
        select: {
          amount: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      });

      const formattedIncome = await Promise.all(
        allIncomeAmount
          .filter(
            (income): income is typeof income & { category: { name: string } } =>
              income.category !== null,
          )
          .map(async (income) => ({
            amount: await readAmount(income.amount),
            category: income.category,
          })),
      );

      return { highestIncome: CalculateHighestIncome(formattedIncome) };
    }),
  incomeGrowth: authenticatedProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;
    const today = new Date();

    // Current month
    const startOfCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const startOfNextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

    // Last month
    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

    const currentMonthTransactions = await prisma.transaction.findMany({
      where: {
        userId: userId,
        categoryId: {
          lt: 8,
        },
        createdAt: {
          gte: startOfCurrentMonth,
          lt: startOfNextMonth,
        },
      },
      select: { amount: true },
    });

    const lastMonthTransactions = await prisma.transaction.findMany({
      where: {
        userId,
        categoryId: {
          lt: 8,
        },
        createdAt: {
          gte: startOfLastMonth,
          lt: startOfCurrentMonth,
        },
      },
      select: { amount: true },
    });

    let lastIncome = 0;
    for (const tx of lastMonthTransactions) {
      lastIncome += await readAmount(tx.amount);
    }

    let currentIncome = 0;
    for (const tx of currentMonthTransactions) {
      currentIncome += await readAmount(tx.amount);
    }

    let growthRate = 0;

    if (lastIncome > 0) {
      growthRate = ((currentIncome - lastIncome) / lastIncome) * 100;
    }

    growthRate = Number(growthRate.toFixed(2));

    return { growthRate };
  }),
  totalExpensesOfMonth: authenticatedProcedure
    .input(
      z.object({
        month: z
          .number()
          .min(1)
          .max(12)
          .default(new Date().getMonth() + 1),

        year: z.number().default(new Date().getFullYear()),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const { month, year } = input;

      const startOfMonth = new Date(year, month - 1, 1);

      const endOfMonth = new Date(year, month, 0, 23, 59, 59);

      const transactions = await prisma.transaction.findMany({
        where: {
          userId,
          category: {
            type: "EXPENSE",
          },
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
        select: { amount: true },
      });

      let totalExpensesAmount = 0;
      for (const tx of transactions) {
        totalExpensesAmount += await readAmount(tx.amount);
      }

      return { totalExpensesAmount };
    }),
  highestExpenseCategory: authenticatedProcedure
    .input(
      z.object({
        month: z
          .number()
          .min(1)
          .max(12)
          .default(new Date().getMonth() + 1),

        year: z.number().default(new Date().getFullYear()),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const { month, year } = input;

      const startOfMonth = new Date(year, month - 1, 1);

      const endOfMonth = new Date(year, month, 0, 23, 59, 59);

      const expenseTransactions = await prisma.transaction.findMany({
        where: {
          userId,
          category: {
            type: "EXPENSE",
          },
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
        select: {
          amount: true,
          categoryId: true,
        },
      });

      if (!expenseTransactions.length) {
        return {};
      }

      // Group by categoryId and sum decrypted amounts
      const categoryTotals = new Map<number, number>();
      for (const tx of expenseTransactions) {
        const catId = tx.categoryId!;
        const current = categoryTotals.get(catId) ?? 0;
        categoryTotals.set(catId, current + (await readAmount(tx.amount)));
      }

      // Find the category with the highest total
      let highestCatId: number | null = null;
      let highestTotal = 0;
      for (const [catId, total] of categoryTotals) {
        if (total > highestTotal) {
          highestTotal = total;
          highestCatId = catId;
        }
      }

      if (highestCatId === null) {
        return {};
      }

      const highestCategoryName = await prisma.category.findUnique({
        where: {
          id: highestCatId,
        },
        select: {
          name: true,
        },
      });

      return {
        highestExpenseCategoryAmount: highestTotal,
        categoryName: highestCategoryName?.name,
      };
    }),
  getExpenseCategorySummary: authenticatedProcedure
    .input(
      z.object({
        month: z
          .number()
          .min(1)
          .max(12)
          .default(new Date().getMonth() + 1),
        year: z.number().default(new Date().getFullYear()),
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const { month, year } = input;

      const startOfMonth = new Date(year, month - 1, 1);

      const endOfMonth = new Date(year, month, 0, 23, 59, 59);

      const expenseTransactions = await prisma.transaction.findMany({
        where: {
          userId,
          createdAt: {
            gte: startOfMonth,
            lt: endOfMonth,
          },
          category: {
            type: "EXPENSE",
          },
        },
        select: {
          amount: true,
          categoryId: true,
        },
      });

      // Group by categoryId and sum decrypted amounts
      const categoryTotals = new Map<number, number>();
      for (const tx of expenseTransactions) {
        const catId = tx.categoryId!;
        const current = categoryTotals.get(catId) ?? 0;
        categoryTotals.set(catId, current + (await readAmount(tx.amount)));
      }

      const expensesSummary = Array.from(categoryTotals.entries()).map(([categoryId, total]) => ({
        categoryId,
        _sum: { amount: total },
      }));

      return { expenseCategorySummary: expensesSummary };
    }),
  getLast7DaysExpense: authenticatedProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;
    const now = new Date();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Find all expenses in last 7 days
    const last7DaysTransactions = await prisma.transaction.findMany({
      where: {
        userId,
        category: {
          type: "EXPENSE",
        },
        createdAt: {
          gt: sevenDaysAgo,
          lte: now,
        },
      },
      select: {
        amount: true,
        createdAt: true,
      },
    });

    const spendingByLast7Days: Record<string, number> = {};

    // Init an empty Record with 7 days and 0 amount for each day
    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo);
      date.setDate(sevenDaysAgo.getDate() + i);

      const day = date.toISOString().split("T")[0];

      spendingByLast7Days[day] = 0;
    }

    // Update with that day's total amount
    for (const transaction of last7DaysTransactions) {
      const day = transaction.createdAt.toISOString().split("T")[0];

      spendingByLast7Days[day] += await readAmount(transaction.amount);
    }

    // format result
    const result = Object.entries(spendingByLast7Days).map(([date, amount]) => ({
      date,
      amount,
    }));

    return result;
  }),
});
