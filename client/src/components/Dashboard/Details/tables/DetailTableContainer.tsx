import { Skeleton } from "@/components/ui/skeleton";
import useFetchTransactions, { TransactionQueryOptions } from "@/hooks/useFetchTransactions";
import { useCallback, useRef } from "react";
import { TransactionInfo } from "../../Transactions/TransactionsTable/ListByDate";
import { DetailsTable } from "./DetailTable";

const TableTileDictionary: Record<string, string> = {
  all: "",
  onlyIncome: "Income Sources",
  onlyExpense: "All Expenses",
};

export default function DetailTableContainer({ option }: { option: TransactionQueryOptions }) {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useFetchTransactions({
    option: option,
  });
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isLoading || isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, isFetchingNextPage, hasNextPage, fetchNextPage],
  );

  const allTransactions: TransactionInfo[] = data?.pages.flatMap((page) => page.transactions) ?? [];

  return (
    <section className="group relative overflow-hidden rounded-[14px] p-6 flex flex-col gap-y-5 flex-1 min-h-0 shadow-sm border border-gray-200 bg-white dark:border-white/[0.07] dark:bg-[#08080a]/85 dark:backdrop-blur-xl">
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#ff7900_18%,#ffc48a_50%,#ff7900_82%,transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_14px_2px_rgba(255,121,0,0.5)]" />
      <p className="font-display font-bold tracking-[-0.03em] text-xl lg:text-2xl text-gray-900 shrink-0 dark:text-white">
        {TableTileDictionary[option]}
      </p>
      {isLoading ? (
        <div className="space-y-3 flex-1">
          <Skeleton className="h-10 w-full bg-gray-200 dark:bg-white/[0.06]" />
          <Skeleton className="h-10 w-full bg-gray-200 dark:bg-white/[0.06]" />
          <Skeleton className="h-10 w-full bg-gray-200 dark:bg-white/[0.06]" />
        </div>
      ) : allTransactions.length === 0 ? (
        <p className="text-gray-500 italic flex-1 dark:text-[#8b8988]">No transactions found.</p>
      ) : (
        <div className="flex-1 min-h-50 max-h-[75dvh] md:max-h-none overflow-auto no-scrollbar">
          <DetailsTable
            lastElementRef={lastElementRef}
            transactions={allTransactions}
            isLoadingMore={isFetchingNextPage}
          />
        </div>
      )}
    </section>
  );
}
