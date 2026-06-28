import { PrismaClient } from "@prisma/client";
import { createCipheriv, randomBytes } from "node:crypto";

const ALG = "aes-256-gcm";
const KEY = Buffer.from(process.env.ENCRYPTION_KEY!, "base64");

function encryptAmount(value: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALG, KEY, iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("base64")}:${Buffer.concat([encrypted, tag]).toString("base64")}`;
}

const prisma = new PrismaClient();

async function backfillTransactions() {
  const BATCH = 100;
  let cursor: string | undefined;
  let total = 0;

  while (true) {
    const rows = await prisma.transaction.findMany({
      take: BATCH,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      where: { amount: { not: { contains: ":" } } },
      select: { id: true, amount: true },
    });

    if (rows.length === 0) break;

    for (const row of rows) {
      await prisma.transaction.update({
        where: { id: row.id },
        data: { amount: encryptAmount(row.amount) },
      });
    }

    total += rows.length;
    cursor = rows[rows.length - 1].id;
    console.log(`Transactions: encrypted ${total} rows, last id: ${cursor}`);
  }

  return total;
}

async function backfillBalances() {
  const BATCH = 100;
  let cursor: string | undefined;
  let total = 0;

  while (true) {
    const rows = await prisma.balance.findMany({
      take: BATCH,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      where: { amount: { not: { contains: ":" } } },
      select: { id: true, amount: true },
    });

    if (rows.length === 0) break;

    for (const row of rows) {
      await prisma.balance.update({
        where: { id: row.id },
        data: { amount: encryptAmount(row.amount) },
      });
    }

    total += rows.length;
    cursor = rows[rows.length - 1].id;
    console.log(`Balances: encrypted ${total} rows, last id: ${cursor}`);
  }

  return total;
}

async function backfillBudgets() {
  const BATCH = 100;
  let cursor: string | undefined;
  let total = 0;

  while (true) {
    const rows = await prisma.budget.findMany({
      take: BATCH,
      ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
      where: { amount: { not: { contains: ":" } } },
      select: { id: true, amount: true },
    });

    if (rows.length === 0) break;

    for (const row of rows) {
      await prisma.budget.update({
        where: { id: row.id },
        data: { amount: encryptAmount(row.amount) },
      });
    }

    total += rows.length;
    cursor = rows[rows.length - 1].id;
    console.log(`Budgets: encrypted ${total} rows, last id: ${cursor}`);
  }

  return total;
}

async function main() {
  console.log("Starting backfill encryption...");

  const txCount = await backfillTransactions();
  const balanceCount = await backfillBalances();
  const budgetCount = await backfillBudgets();

  console.log(
    `\nDone! Encrypted ${txCount} transactions, ${balanceCount} balances, ${budgetCount} budgets.`,
  );
}

main()
  .catch((e) => {
    console.error("Backfill failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
