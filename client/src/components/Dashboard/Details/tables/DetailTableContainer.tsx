import { Skeleton, } from "@/components/ui/skeleton";
import useFetchTransactions, { TransactionQueryOptions, } from "@/hooks/useFetchTransactions";
import { useCallback, useRef, } from "react";
import { TransactionInfo, } from "../../Transactions/TransactionsTable/ListByDate";
import { DetailsTable, } from "./DetailTable";

const TableTileDictionary: Record<string, string> = {
  all: "",
  onlyIncome: "Income Sources",
  onlyExpense: "All Expenses",
};

export default function DetailTableContainer({ option, }: { option: TransactionQueryOptions; },) {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage, } = useFetchTransactions(
    {
      option: option,
    },
  );
  const observer = useRef<IntersectionObserver | null>(null,);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null,) => {
      if (isLoading || isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries,) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },);

      if (node) observer.current.observe(node,);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage,],
  );

  const allTransactions: TransactionInfo[] = data?.pages.flatMap((page,) => page.transactions)
    ?? [];

  return (
    <section className="bg-white dark:bg-dark-bg rounded-2xl p-5 flex flex-col gap-y-5 flex-1">
      <p className="text-lg lg:text-xl font-bold shrink-0">{TableTileDictionary[option]}</p>
      {isLoading
        ? (
          <div className="space-y-3 flex-1">
            <Skeleton className="h-10 w-full bg-gray-200 dark:bg-dark-card" />
            <Skeleton className="h-10 w-full bg-gray-200 dark:bg-dark-card" />
            <Skeleton className="h-10 w-full bg-gray-200 dark:bg-dark-card" />
          </div>
        )
        : allTransactions.length === 0
        ? <p className="text-gray-400 dark:text-gray-300 italic flex-1">No transactions found.</p>
        : (
          <div className="flex-1 min-h-0">
            <DetailsTable lastElementRef={lastElementRef} transactions={allTransactions} />
          </div>
        )}
    </section>
  );
}
