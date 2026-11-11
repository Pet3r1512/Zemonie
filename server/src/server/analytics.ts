import prisma from "@/lib/prisma";
import { authenticatedProcedure, router } from "./tRPC";
import z from "zod";
import CalculateHighestIncome from "../lib/analytics/CalculateHighestIncome";
import { readAmount } from "@/lib/crypto";
import {
  DEFAULT_TIME_ZONE,
  getDayKey,
  getMonthRange,
  getYearMonth,
  isValidTimeZone,
  shiftDayKey,
  startOfDayInTimeZone,
} from "@/helpers/serverTimeZone";

const timeZoneInput = z.string().refine(isValidTimeZone).default(DEFAULT_TIME_ZONE);

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
        timeZone: timeZoneInput,
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const { month, year, timeZone } = input;

      const { start: startOfMonth, end: startOfNextMonth } = getMonthRange(year, month, timeZone);

      const allIncomeAmount = await prisma.transaction.findMany({
        where: {
          userId,
          categoryId: {
            lt: 8,
          },
          createdAt: {
            gte: startOfMonth,
            lt: startOfNextMonth,
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
  incomeGrowth: authenticatedProcedure
    .input(z.object({ timeZone: timeZoneInput }).optional())
    .query(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const timeZone = input?.timeZone ?? DEFAULT_TIME_ZONE;

      const current = getYearMonth(new Date(), timeZone);
      const previousYear = current.month === 1 ? current.year - 1 : current.year;
      const previousMonth = current.month === 1 ? 12 : current.month - 1;

      const { start: startOfCurrentMonth, end: startOfNextMonth } = getMonthRange(
        current.year,
        current.month,
        timeZone,
      );
      const { start: startOfLastMonth, end: startOfCurrentMonthEnd } = getMonthRange(
        previousYear,
        previousMonth,
        timeZone,
      );

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
            lt: startOfCurrentMonthEnd,
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
        timeZone: timeZoneInput,
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const { month, year, timeZone } = input;

      const { start: startOfMonth, end: startOfNextMonth } = getMonthRange(year, month, timeZone);

      const transactions = await prisma.transaction.findMany({
        where: {
          userId,
          category: {
            type: "EXPENSE",
          },
          createdAt: {
            gte: startOfMonth,
            lt: startOfNextMonth,
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
        timeZone: timeZoneInput,
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const { month, year, timeZone } = input;

      const { start: startOfMonth, end: startOfNextMonth } = getMonthRange(year, month, timeZone);

      const expenseTransactions = await prisma.transaction.findMany({
        where: {
          userId,
          category: {
            type: "EXPENSE",
          },
          createdAt: {
            gte: startOfMonth,
            lt: startOfNextMonth,
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
        timeZone: timeZoneInput,
      }),
    )
    .query(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const { month, year, timeZone } = input;

      const { start: startOfMonth, end: startOfNextMonth } = getMonthRange(year, month, timeZone);

      const expenseTransactions = await prisma.transaction.findMany({
        where: {
          userId,
          createdAt: {
            gte: startOfMonth,
            lt: startOfNextMonth,
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
  getLast7DaysExpense: authenticatedProcedure
    .input(z.object({ timeZone: timeZoneInput }).optional())
    .query(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const timeZone = input?.timeZone ?? DEFAULT_TIME_ZONE;
      const now = new Date();

      const today = getDayKey(now, timeZone);
      const dayKeys = Array.from({ length: 7 }, (_, i) => shiftDayKey(today, i - 6));

      const [firstYear, firstMonth, firstDay] = dayKeys[0].split("-").map(Number);
      const windowStart = startOfDayInTimeZone(firstYear, firstMonth - 1, firstDay, timeZone);

      // Find all expenses in last 7 days (user's local calendar days)
      const last7DaysTransactions = await prisma.transaction.findMany({
        where: {
          userId,
          category: {
            type: "EXPENSE",
          },
          createdAt: {
            gte: windowStart,
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
      for (const day of dayKeys) {
        spendingByLast7Days[day] = 0;
      }

      // Update with that day's total amount
      for (const transaction of last7DaysTransactions) {
        const day = getDayKey(transaction.createdAt, timeZone);

        if (day in spendingByLast7Days) {
          spendingByLast7Days[day] += await readAmount(transaction.amount);
        }
      }

      // format result
      const result = Object.entries(spendingByLast7Days).map(([date, amount]) => ({
        date,
        amount,
      }));

      return result;
    }),
});
