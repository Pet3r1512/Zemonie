import { TransactionInfo } from "@/components/Dashboard/Transactions/TransactionsTable/ListByDate";

export default function groupTransactions(transactions: TransactionInfo[]) {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return sortedTransactions.reduce(
    (acc, tx) => {
      const dateKey = new Date(tx.date).toISOString().split("T")[0];

      acc[dateKey] ??= [];
      acc[dateKey].push(tx);

      return acc;
    },
    {} as Record<string, TransactionInfo[]>,
  );
}
