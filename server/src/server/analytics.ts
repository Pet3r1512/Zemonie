import prisma from "@/lib/prisma";
import { publicProcedure, router } from "./tRPC";
import z from "zod";
import CalculateHighestIncome from "../lib/analytics/CalculateHighestIncome"

export const analyticsRouter = router({
    highestIncomeOfMonth: publicProcedure.input(
        z.object({
            userId: z.string(),
            month: z.number().min(1).max(12).default(
                new Date().getMonth() + 1
            ),

            year: z.number().default(
                new Date().getFullYear()
            ),
        })
    ).query(async ({ input }) => {
        const { userId, month, year } = input

        const startOfMonth = new Date(year, month - 1, 1);

        const endOfMonth = new Date(
            year,
            month,
            0,
            23,
            59,
            59
        );

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
                    income.category !== null
            )
            .map((income) => ({
                amount: income.amount.toNumber(),
                category: income.category,
            }));

        return { highestIncome: CalculateHighestIncome(formattedIncome) }
    }),
    incomeGrowth: publicProcedure.input(z.object({
        userId: z.string()
    })).query(async ({ input }) => {
        const { userId } = input
        const today = new Date();

        // Current month
        const startOfCurrentMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        const startOfNextMonth = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            1
        );

        // Last month
        const startOfLastMonth = new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            1
        );

        const currentMonthIncome = await prisma.transaction.aggregate({
            where: {
                userId: userId,
                categoryId: {
                    lt: 8
                },
                createdAt: {
                    gte: startOfCurrentMonth,
                    lt: startOfNextMonth
                }
            },
            _sum: {
                amount: true
            }
        })

        const lastMonthIncome = await prisma.transaction.aggregate({
            where: {
                userId,
                categoryId: {
                    lt: 8
                },
                createdAt: {
                    gte: startOfLastMonth,
                    lt: startOfCurrentMonth
                }
            },
            _sum: {
                amount: true
            }
        })

        const lastIncome = Number(lastMonthIncome._sum.amount)
        const currentIncome = Number(currentMonthIncome._sum.amount)

        let growthRate = 0;

        if (lastIncome > 0) {
            growthRate =
                ((currentIncome - lastIncome) / lastIncome) * 100;
        }

        growthRate = Number(growthRate.toFixed(2));

        return { growthRate }
    }),
    totalExpensesOfMonth: publicProcedure.input(z.object({
        userId: z.string(),
        month: z.number().min(1).max(12).default(
            new Date().getMonth() + 1
        ),

        year: z.number().default(
            new Date().getFullYear()
        ),
    })).query(async ({ input }) => {
        const { userId, month, year } = input

        const startOfMonth = new Date(year, month - 1, 1);

        const endOfMonth = new Date(
            year,
            month,
            0,
            23,
            59,
            59
        );

        const totalExpensesAmount = await prisma.transaction.aggregate({
            where: {
                userId,
                category: {
                    type: "EXPENSE"
                },
                createdAt: {
                    gte: startOfMonth,
                    lte: endOfMonth,
                }
            },
            _sum: {
                amount: true
            }
        })

        return { totalExpensesAmount: totalExpensesAmount._sum.amount }
    }),
    highestExpenseCategory: publicProcedure.input(z.object({
        userId: z.string(),
        month: z.number().min(1).max(12).default(
            new Date().getMonth() + 1
        ),

        year: z.number().default(
            new Date().getFullYear()
        ),
    })).query(async ({ input }) => {
        const { userId, month, year } = input

        const startOfMonth = new Date(year, month - 1, 1);

        const endOfMonth = new Date(
            year,
            month,
            0,
            23,
            59,
            59
        );

        const highestExpenseCategory = await prisma.transaction.groupBy({
            by: ["categoryId"],
            where: {
                userId,
                category: {
                    type: "EXPENSE"
                },
                createdAt: {
                    gte: startOfMonth,
                    lte: endOfMonth
                }
            },
            _sum: {
                amount: true
            },
            orderBy: {
                _sum: {
                    amount: "desc"
                }
            },
            take: 1
        })

        const highestCategoryName = await prisma.category.findUnique({
            where: {
                id: Number(highestExpenseCategory[0].categoryId)
            },
            select: {
                name: true
            }
        })

        return { highestExpenseCategoryAmount: highestExpenseCategory[0]._sum.amount, categoryName: highestCategoryName?.name }
    })
})