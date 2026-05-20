import prisma from "@/lib/prisma";
import { publicProcedure, router } from "./tRPC";
import z from "zod";
import { SupportedCurrency } from "@prisma/client";

export const transactionsRouter = router({
    createDefaultCategories: publicProcedure.mutation(async ({ }) => {
        const USER_ID = "Wm1zO1KHImNFRWpPxbJ3kQ2UoU7pA0Bg"

        const salaryCategory = await prisma.category.findFirst({
            where: { name: "Salary", userId: null },
        });

        const foodCategory = await prisma.category.findFirst({
            where: { name: "Food & Drinks", userId: null },
        });

        await prisma.transaction.create({
            data: {
                userId: USER_ID,
                amount: 1750.00,
                description: "Salary for first half of October",
                categoryId: salaryCategory?.id,
            }
        })

        await prisma.transaction.create({
            data: {
                userId: USER_ID,
                amount: 10.5,
                description: "Top Tea",
                categoryId: foodCategory?.id ?? undefined,
            }
        })
    }),
    getTransactions: publicProcedure.input(z.object({
        userId: z.string(),
        page: z.number()
    })).query(async ({ input }) => {
        const { userId, page } = input

        const PAGE_SIZE = 10

        const transactions = await prisma.transaction.findMany({
            where: {
                userId
            },
            orderBy: { createdAt: "desc" },
            take: PAGE_SIZE,
            skip: (page - 1) * PAGE_SIZE,
            include: {
                category: true
            }
        })

        const totalCount = await prisma.transaction.count({
            where: { userId }
        })

        return {
            transactions: transactions.map(tx => ({
                id: tx.id,
                userId: tx.userId,
                categoryId: tx.categoryId,
                amount: Number(tx.amount),
                currency: tx.currency,
                description: tx.description,
                date: tx.createdAt.toISOString(),
            })),
            hasMore: page * PAGE_SIZE < totalCount
        }
    }),
    addTransaction: publicProcedure.input(z.object({
        userId: z.string(),
        categoryId: z.number().optional(),
        amount: z.number(),
        currency: z.enum(SupportedCurrency).optional(),
        description: z.string(),
        createdAt: z.string().optional()
    })).mutation(async ({ input }) => {
        const { userId, categoryId, amount, currency, description, createdAt } = input

        // get category
        const category = await prisma.category.findUnique({
            where: {
                id: categoryId,
            },
            select: {
                type: true
            }
        })

        // add new transaction
        const newTransaction = await prisma.transaction.create({
            data: {
                userId: userId,
                categoryId: categoryId,
                amount: amount,
                currency: currency,
                description: description,
                createdAt: createdAt || new Date().toISOString()
            }
        })

        // calculate transaction delta
        const delta = category?.type === "INCOME" ? amount : - amount

        // update balance
        const newBalance = await prisma.balance.upsert({
            where: {
                userId
            },
            update: {
                amount: {
                    increment: delta
                }
            },
            create: {
                userId,
                amount: delta,
                currency: currency || "AUD"
            }
        })

        return { newTransaction, newBalance: newBalance.amount }
    }),
    getTotalIncomeByMonth: publicProcedure
        .input(
            z.object({
                userId: z.string(),

                month: z.number().min(1).max(12).default(
                    new Date().getMonth() + 1
                ),

                year: z.number().default(
                    new Date().getFullYear()
                ),
            })
        )
        .query(async ({ input }) => {
            const { userId, month, year } = input;

            const startOfMonth = new Date(year, month - 1, 1);

            const endOfMonth = new Date(
                year,
                month,
                0,
                23,
                59,
                59
            );

            const totalIncome = await prisma.transaction.aggregate({
                _sum: {
                    amount: true,
                },
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
            });

            return {
                totalIncome: totalIncome._sum.amount ?? 0,
            };
        })
})