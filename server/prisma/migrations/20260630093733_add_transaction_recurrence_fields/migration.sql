-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "parentTransactionId" TEXT,
ADD COLUMN     "recurringDay" INTEGER;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_parentTransactionId_fkey" FOREIGN KEY ("parentTransactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
