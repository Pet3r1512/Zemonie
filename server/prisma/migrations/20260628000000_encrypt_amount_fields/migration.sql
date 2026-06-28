-- ── Transaction ──────────────────────────────────────────────
ALTER TABLE "Transaction" ADD COLUMN "amount_new" TEXT;
UPDATE "Transaction" SET "amount_new" = "amount"::TEXT;
ALTER TABLE "Transaction" ALTER COLUMN "amount_new" SET NOT NULL;
ALTER TABLE "Transaction" DROP COLUMN "amount";
ALTER TABLE "Transaction" RENAME COLUMN "amount_new" TO "amount";

-- ── Balance ───────────────────────────────────────────────────
ALTER TABLE "Balance" ADD COLUMN "amount_new" TEXT;
UPDATE "Balance" SET "amount_new" = "amount"::TEXT;
ALTER TABLE "Balance" ALTER COLUMN "amount_new" SET NOT NULL;
ALTER TABLE "Balance" DROP COLUMN "amount";
ALTER TABLE "Balance" RENAME COLUMN "amount_new" TO "amount";

-- ── Budget ────────────────────────────────────────────────────
ALTER TABLE "Budget" ADD COLUMN "amount_new" TEXT;
UPDATE "Budget" SET "amount_new" = "amount"::TEXT;
ALTER TABLE "Budget" ALTER COLUMN "amount_new" SET NOT NULL;
ALTER TABLE "Budget" DROP COLUMN "amount";
ALTER TABLE "Budget" RENAME COLUMN "amount_new" TO "amount";
