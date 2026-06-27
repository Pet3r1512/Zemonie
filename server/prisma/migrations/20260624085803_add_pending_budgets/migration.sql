-- CreateEnum
CREATE TYPE "PendingJobStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "Budget" ADD COLUMN     "currency" "SupportedCurrency" NOT NULL DEFAULT 'AUD';

-- CreateTable
CREATE TABLE "PendingBudget" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "budgetId" TEXT NOT NULL,
    "status" "PendingJobStatus" NOT NULL DEFAULT 'PENDING',
    "scheduledAt" TIMESTAMP(3) NOT NULL,
    "processedAt" TIMESTAMP(3),
    "failedAt" TIMESTAMP(3),
    "failReason" TEXT,

    CONSTRAINT "PendingBudget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PendingBudget_status_scheduledAt_idx" ON "PendingBudget"("status", "scheduledAt");

-- CreateIndex
CREATE INDEX "PendingBudget_userId_idx" ON "PendingBudget"("userId");

-- AddForeignKey
ALTER TABLE "PendingBudget" ADD CONSTRAINT "PendingBudget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingBudget" ADD CONSTRAINT "PendingBudget_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE CASCADE ON UPDATE CASCADE;
