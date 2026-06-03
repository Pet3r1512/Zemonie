import useFetchTransactions, {
  TransactionQueryOptions,
} from "@/hooks/useFetchTransactions";
import { IncomeTable } from "./DetailTable";
import { TransactionInfo } from "../../Transactions/TransactionsTable/ListByDate";
import { useCallback, useRef } from "react";

const TableTileDictionary: Record<string, string> = {
  all: "",
  onlyIncome: "Income Sources",
  onlyExpense: "All Expenses",
};

export default function DetailTableContainer({
  option,
}: {
  option: TransactionQueryOptions;
}) {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useFetchTransactions({ option: option });
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

  const allTransactions: TransactionInfo[] =
    data?.pages.flatMap((page) => page.transactions) ?? [];

  return (
    <section className="bg-white rounded-2xl p-5 flex flex-col gap-y-5 flex-1 min-h-0">
      <p className="text-lg lg:text-xl font-bold shrink-0">
        {TableTileDictionary[option]}
      </p>
      <IncomeTable
        lastElementRef={lastElementRef}
        transactions={allTransactions}
      />
    </section>
  );
}
