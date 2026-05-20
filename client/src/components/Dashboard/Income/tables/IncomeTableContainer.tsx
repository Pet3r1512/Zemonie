import useFetchTransactions from "@/hooks/useFetchTransactions";
import { IncomeTable } from "./IncomeTable";
import { TransactionInfo } from "../../Transactions/TransactionsTable/ListByDate";
import { useCallback, useRef } from "react";

export default function IncomeTableContainer() {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useFetchTransactions({ option: "onlyIncome" });
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
    <section className="bg-white rounded-2xl shadow-2xl p-5 h-[60dvh] overflow-auto flex flex-col gap-y-5">
      <p className="text-lg lg:text-xl font-bold">Income Sources</p>
      <IncomeTable
        lastElementRef={lastElementRef}
        transactions={allTransactions}
      />
    </section>
  );
}
