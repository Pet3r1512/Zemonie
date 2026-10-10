import { TransactionInfo } from "@/components/Dashboard/Transactions/TransactionsTable/ListByDate";

export default function dailySummary(
  data: [string, TransactionInfo[]][],
): [string, TransactionInfo[], number][] {
  return data.map(([date, transactions]) => {
    const dailyNet = transactions.reduce((acc, curr) => {
      if (curr.categoryId! <= 7) {
        return acc + curr.amount;
      } else {
        return acc - curr.amount;
      }
    }, 0);

    return [date, transactions, dailyNet];
  });
}
