import getNextRecurrenceDate from "@/helpers/getNextRecurrenceDate";
import prisma from "@/lib/prisma";

export async function processRecurringTransactions() {
  const now = new Date();
  const dueJobs = await prisma.pendingTransaction.findMany({
    where: { status: "PENDING", scheduledAt: { lte: now } },
    include: { transaction: true },
  });

  for (const job of dueJobs) {
    await prisma.pendingTransaction.update({
      where: { id: job.id },
      data: { status: "PROCESSING" },
    });

    try {
      const anchorDay = job.transaction.recurringDay ?? job.transaction.createdAt.getDate();

      // Rebuild a baseDate using the anchor day, but this job's scheduledAt month/year,
      // so getNextRecurrenceDate doesn't inherit a previously-clamped day.
      const baseDate = new Date(
        job.scheduledAt.getFullYear(),
        job.scheduledAt.getMonth(),
        anchorDay,
      );

      const newTransaction = await prisma.transaction.create({
        data: {
          userId: job.transaction.userId,
          categoryId: job.transaction.categoryId,
          amount: job.transaction.amount,
          currency: job.transaction.currency,
          description: job.transaction.description,
          isRecurring: true,
          recurringDay: anchorDay,
          parentTransactionId: job.transaction.parentTransactionId ?? job.transaction.id,
        },
      });

      await prisma.pendingTransaction.create({
        data: {
          userId: job.userId,
          transactionId: newTransaction.id,
          scheduledAt: getNextRecurrenceDate(baseDate, 1),
        },
      });

      await prisma.pendingTransaction.update({
        where: { id: job.id },
        data: { status: "COMPLETED", processedAt: now },
      });
    } catch (err) {
      await prisma.pendingTransaction.update({
        where: { id: job.id },
        data: {
          status: "FAILED",
          failedAt: now,
          failReason: err instanceof Error ? err.message : "Unknown error",
        },
      });
    }
  }

  return { processed: dueJobs.length };
}
