import prisma from "@/lib/prisma";
import { authenticatedProcedure, router } from "./tRPC";
import z from "zod";
import { SupportedCurrency } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { readAmount, writeAmount } from "@/lib/crypto";
import getNextRecurrenceDate from "@/helpers/getNextRecurrenceDate";

export const transactionsRouter = router({
  getTransactions: authenticatedProcedure
    .input(
      z.object({
        page: z.number().int().positive(),
        type: z.enum(["INCOME", "EXPENSE"]).optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { page, type } = input;
      const userId = ctx.userId;

      const PAGE_SIZE = 10;

      const where: Record<string, unknown> = { userId };
      if (type) {
        where.category = { type };
      }

      const transactions = await prisma.transaction.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
        include: {
          category: true,
        },
      });

      const totalCount = await prisma.transaction.count({ where });

      return {
        transactions: await Promise.all(
          transactions.map(async (tx) => ({
            id: tx.id,
            userId: tx.userId,
            categoryId: tx.categoryId,
            amount: await readAmount(tx.amount),
            currency: tx.currency,
            description: tx.description,
            parentTransactionId: tx.parentTransactionId,
            date: tx.createdAt.toISOString(),
          })),
        ),
        hasMore: page * PAGE_SIZE < totalCount,
      };
    }),
  addTransaction: authenticatedProcedure
    .input(
      z.object({
        categoryId: z.number().optional(),
        amount: z.number(),
        currency: z.enum(SupportedCurrency).optional(),
        description: z.string().max(100).optional(),
        isRecurring: z.boolean().optional(),
        createdAt: z.string().max(32).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const { categoryId, amount, currency, description, isRecurring, createdAt } = input;

      // get category
      const category = await prisma.category.findUnique({
        where: {
          id: categoryId,
        },
        select: {
          type: true,
        },
      });

      // add new transaction
      const newTransaction = await prisma.transaction.create({
        data: {
          userId: userId,
          categoryId: categoryId,
          amount: await writeAmount(amount),
          currency: currency,
          description: description,
          isRecurring: isRecurring,
          createdAt: createdAt || new Date().toISOString(),
        },
      });

      // recurred transactions handler
      if (isRecurring) {
        const scheduledAt = getNextRecurrenceDate(new Date(), 1);
        await prisma.pendingTransaction.create({
          data: {
            userId,
            transactionId: newTransaction.id,
            scheduledAt,
          },
        });
      }

      // calculate transaction delta
      const delta = category?.type === "INCOME" ? amount : -amount;

      // update balance (read current, compute new, write back)
      const currentBalance = await prisma.balance.findUnique({ where: { userId } });
      const currentAmount = currentBalance ? await readAmount(currentBalance.amount) : 0;
      const newBalanceAmount = currentAmount + delta;

      const newBalance = await prisma.balance.upsert({
        where: {
          userId,
        },
        update: {
          amount: await writeAmount(newBalanceAmount),
        },
        create: {
          userId,
          amount: await writeAmount(delta),
          currency: currency || "AUD",
        },
      });

      return { newTransaction, newBalance: await readAmount(newBalance.amount) };
    }),
  getTotalIncomeByMonth: authenticatedProcedure
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
        },
      });

      let totalIncome = 0;
      for (const tx of transactions) {
        totalIncome += await readAmount(tx.amount);
      }

      return {
        totalIncome,
      };
    }),
  getLatestIncomeAndExpenses: authenticatedProcedure.query(async ({ ctx }) => {
    const userId = ctx.userId;

    const latestIncome = await prisma.transaction.findMany({
      where: {
        userId,
        category: {
          type: "INCOME",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    });

    const latestExpense = await prisma.transaction.findMany({
      where: {
        userId,
        category: {
          type: "EXPENSE",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 1,
    });

    const latestIncomeTx = latestIncome[0];
    const latestExpenseTx = latestExpense[0];

    return {
      latestIncome: latestIncomeTx
        ? { ...latestIncomeTx, amount: await readAmount(latestIncomeTx.amount) }
        : undefined,
      latestExpense: latestExpenseTx
        ? { ...latestExpenseTx, amount: await readAmount(latestExpenseTx.amount) }
        : undefined,
    };
  }),
  updateTransaction: authenticatedProcedure
    .input(
      z.object({
        transactionId: z.string(),
        categoryId: z.number().optional(),
        amount: z.number(),
        currency: z.enum(SupportedCurrency).optional(),
        description: z.string().max(100).optional(),
        createdAt: z.string().max(32).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.userId;
      const { transactionId, categoryId, amount, currency, description, createdAt } = input;

      const original = await prisma.transaction.findUnique({
        where: { id: transactionId, userId },
        include: { category: { select: { type: true } } },
      });
      if (!original) throw new TRPCError({ code: "NOT_FOUND" });

      // compute old delta
      const oldType = original.category?.type;
      const oldAmount = await readAmount(original.amount);
      const oldDelta = oldType === "INCOME" ? oldAmount : -oldAmount;
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
          amount: await writeAmount(amount),
          currency,
          description,
          ...(createdAt ? { createdAt: new Date(createdAt) } : {}),
        },
      });

      // adjust balance by the difference
      const currentBalance = await prisma.balance.findUnique({ where: { userId } });
      const currentAmount = currentBalance ? await readAmount(currentBalance.amount) : 0;
      const newBalanceAmount = currentAmount + (newDelta - oldDelta);

      await prisma.balance.update({
        where: { userId },
        data: { amount: await writeAmount(newBalanceAmount) },
      });

      return { updatedTransaction };
    }),
});
