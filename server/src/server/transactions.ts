import prisma from "@/lib/prisma";
import { authenticatedProcedure, publicProcedure, router } from "./tRPC";
import z from "zod";
import { SupportedCurrency } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const transactionsRouter = router({
    getTransactions: authenticatedProcedure.input(z.object({
        page: z.number().int().positive()
    })).query(async ({ ctx, input }) => {
        const { page } = input
        const userId = ctx.userId

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
    addTransaction: authenticatedProcedure.input(z.object({
        categoryId: z.number().optional(),
        amount: z.number(),
        currency: z.enum(SupportedCurrency).optional(),
        description: z.string().max(100).optional(),
        createdAt: z.string().max(32).optional()
    })).mutation(async ({ ctx, input }) => {
        const userId = ctx.userId
        const { categoryId, amount, currency, description, createdAt } = input

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
    getTotalIncomeByMonth: authenticatedProcedure.input(
        z.object({
            month: z.number().min(1).max(12).default(
                new Date().getMonth() + 1
            ),

            year: z.number().default(
                new Date().getFullYear()
            ),
        })
    ).query(async ({ ctx, input }) => {
        const userId = ctx.userId
        const { month, year } = input;

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
    }),
    getLatestIncomeAndExpenses: authenticatedProcedure.query(async ({ ctx }) => {
        const userId = ctx.userId

        const latestIncome = await prisma.transaction.findMany({
            where: {
                userId,
                category: {
                    type: "INCOME"
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 1
        })

        const latestExpense = await prisma.transaction.findMany({
            where: {
                userId,
                category: {
                    type: "EXPENSE"
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 1
        })


        return { latestIncome: latestIncome[0], latestExpense: latestExpense[0] }
    }),
    updateTransaction: authenticatedProcedure.input(z.object({
        transactionId: z.string(),
        categoryId: z.number().optional(),
        amount: z.number(),
        currency: z.enum(SupportedCurrency).optional(),
        description: z.string().max(100).optional(),
        createdAt: z.string().max(32).optional()
    })).mutation(async ({ ctx, input }) => {
        const userId = ctx.userId
        const { transactionId, categoryId, amount, currency, description, createdAt } = input

        const original = await prisma.transaction.findUnique({
            where: { id: transactionId, userId },
            include: { category: { select: { type: true } } },
        });
        if (!original) throw new TRPCError({ code: "NOT_FOUND" });

        // compute old delta
        const oldType = original.category?.type;
        const oldDelta = oldType === "INCOME"
            ? Number(original.amount)
            : -Number(original.amount);
        // compute new delta
        let newDelta = 0;
        if (categoryId) {
            const category = await prisma.category.findUnique({
                where: { id: categoryId },
                select: { type: true },
            });
            newDelta = category?.type === "INCOME" ? amount : -amount;
        } else if (original.categoryId) {
            // keep original category's type if categoryId not changed
            newDelta = oldType === "INCOME" ? amount : -amount;
        }

        // update transaction
        const updatedTransaction = await prisma.transaction.update({
            where: { id: transactionId },
            data: {
                categoryId,
                amount,
                currency,
                description,
                ...(createdAt ? { createdAt: new Date(createdAt) } : {}),
            },
        });
        // adjust balance by the difference
        await prisma.balance.update({
            where: { userId },
            data: { amount: { increment: newDelta - oldDelta } },
        });

        return { updatedTransaction }
    })
})