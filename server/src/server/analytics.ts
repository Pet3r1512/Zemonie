import prisma from "@/lib/prisma";
import { authenticatedProcedure, router } from "./tRPC";
import z from "zod";
import CalculateHighestIncome from "../lib/analytics/CalculateHighestIncome";

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

      const formattedIncome = allIncomeAmount
        .filter(
          (income): income is typeof income & { category: { name: string } } =>
            income.category !== null,
        )
        .map((income) => ({
          amount: income.amount.toNumber(),
          category: income.category,
        }));

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

    const currentMonthIncome = await prisma.transaction.aggregate({
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
      _sum: {
        amount: true,
      },
    });

    const lastMonthIncome = await prisma.transaction.aggregate({
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
      _sum: {
        amount: true,
      },
    });

    const lastIncome = Number(lastMonthIncome._sum.amount);
    const currentIncome = Number(currentMonthIncome._sum.amount);

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

      const totalExpensesAmount = await prisma.transaction.aggregate({
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
        _sum: {
          amount: true,
        },
      });

      return { totalExpensesAmount: totalExpensesAmount._sum.amount };
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

      const highestExpenseCategory = await prisma.transaction.groupBy({
        by: ["categoryId"],
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
        _sum: {
          amount: true,
        },
        orderBy: {
          _sum: {
            amount: "desc",
          },
        },
        take: 1,
      });

      if (!highestExpenseCategory.length) {
        return {};
      }

      const highestCategoryName = await prisma.category.findUnique({
        where: {
          id: Number(highestExpenseCategory[0].categoryId),
        },
        select: {
          name: true,
        },
      });

      return {
        highestExpenseCategoryAmount: highestExpenseCategory[0]._sum.amount,
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

      const expensesSummary = await prisma.transaction.groupBy({
        by: ["categoryId"],
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
        _sum: {
          amount: true,
        },
      });

      return { expenseCategorySummary: expensesSummary };
    }),
  getLast7DaysExpense: authenticatedProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId
    const now = new Date();

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Find all expenses in last 7 days
    const last7DaysTransactions = await prisma.transaction.findMany({
      where: {
        userId,
        category: {
          type: "EXPENSE"
        },
        createdAt: {
          gt: sevenDaysAgo,
          lt: now
        }
      },
      select: {
        amount: true,
        createdAt: true
      }
    })

    const spendingByLast7Days: Record<string, number> = {}

    // Init an empty Record with 7 days and 0 amount for each day
    for (let i = 0; i < 7; i++) {
      const date = new Date(sevenDaysAgo)
      date.setDate(sevenDaysAgo.getDate() + i)

      const day = date.toISOString().split("T")[0]

      spendingByLast7Days[day] = 0
    }

    // Update with that day's total amount
    for (const transaction of last7DaysTransactions) {
      const day = transaction.createdAt.toISOString().split("T")[0]

      spendingByLast7Days[day] += Number(transaction.amount)
    }

    // format result
    const result = Object.entries(spendingByLast7Days).map(([date, amount]) => ({
      date, amount
    }))

    return result
  })
});
