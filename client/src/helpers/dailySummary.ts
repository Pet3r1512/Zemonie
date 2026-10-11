import { TransactionInfo } from "@/components/Dashboard/Transactions/TransactionsTable/ListByDate";
import { CategoryType } from "@/components/ui/aceternity/ExpandableCard";

type CategoryLookup = Record<number, CategoryType>;

export default function dailySummary(
  data: [string, TransactionInfo[]][],
  categoryLookup: CategoryLookup = {},
): [string, TransactionInfo[], number][] {
  return data.map(([date, transactions]) => {
    const dailyNet = transactions.reduce((acc, curr) => {
      const categoryType = categoryLookup[curr.categoryId ?? 0];
      if (categoryType === CategoryType.INCOME) {
        return acc + curr.amount;
      } else {
        return acc - curr.amount;
      }
    }, 0);

    return [date, transactions, dailyNet];
  });
}
