import prisma from "@/lib/prisma";

function getCalendarMonthRange(date: Date) {
  const startDate = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
  const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
  return { startDate, endDate };
}

function getFirstOfNextMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1, 0, 0, 0, 0);
}

export async function processRecurringBudgets() {
  const now = new Date();

  const dueJobs = await prisma.pendingBudget.findMany({
    where: { status: "PENDING", scheduledAt: { lte: now } },
    include: { budget: true },
  });

  for (const job of dueJobs) {
    await prisma.pendingBudget.update({
      where: { id: job.id },
      data: { status: "PROCESSING" },
    });

    try {
      const { startDate, endDate } = getCalendarMonthRange(job.scheduledAt);

      const newBudget = await prisma.budget.create({
        data: {
          userId: job.budget.userId,
          categoryId: job.budget.categoryId,
          name: job.budget.name,
          amount: job.budget.amount,
          currency: job.budget.currency,
          duration: job.budget.duration,
          isRecurring: true,
          startDate,
          endDate,
          parentBudgetId: job.budget.parentBudgetId ?? job.budget.id,
        },
      });

      await prisma.pendingBudget.create({
        data: {
          userId: job.userId,
          budgetId: newBudget.id,
          scheduledAt: getFirstOfNextMonth(job.scheduledAt),
        },
      });

      await prisma.pendingBudget.update({
        where: { id: job.id },
        data: { status: "COMPLETED", processedAt: now },
      });
    } catch (err) {
      await prisma.pendingBudget.update({
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
