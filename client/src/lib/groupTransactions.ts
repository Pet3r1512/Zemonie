import { TransactionInfo, } from "@/components/Dashboard/Transactions/TransactionsTable/ListByDate";

export default function groupTransactions(transactions: TransactionInfo[],) {
  const sortedTransactions = [...transactions,].toSorted(
    (a, b,) => new Date(b.date,).getTime() - new Date(a.date,).getTime(),
  );

  return sortedTransactions.reduce(
    (acc, tx,) => {
      const d = new Date(tx.date,);
      const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1,).padStart(2, "0",)}-${
        String(d.getDate(),).padStart(2, "0",)
      }`;

      acc[dateKey] ??= [];
      acc[dateKey].push(tx,);

      return acc;
    },
    {} as Record<string, TransactionInfo[]>,
  );
}
