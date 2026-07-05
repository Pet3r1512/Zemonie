import getTransactions from "@/api/users/transactions/getTransactions";
import { TransactionInfo } from "@/components/Dashboard/Transactions/TransactionsTable/ListByDate";
import { useInfiniteQuery } from "@tanstack/react-query";

export type TransactionQueryOptions = "all" | "onlyIncome" | "onlyExpense";

export default function useFetchTransactions({ option }: { option?: TransactionQueryOptions }) {
  const type =
    option === "onlyIncome" ? "INCOME" : option === "onlyExpense" ? "EXPENSE" : undefined;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useInfiniteQuery<{ transactions: TransactionInfo[]; hasMore: boolean }>({
      queryKey: ["transactions", type ?? "all"],
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      refetchOnWindowFocus: false,
      initialPageParam: 1,

      queryFn: async ({ pageParam = 1 }) => {
        const response = await getTransactions({
          page: pageParam as number,
          ...(type ? { type } : {}),
        });

        return {
          transactions: response.transactions.transactions,
          hasMore: response.transactions.hasMore,
        };
      },

      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.hasMore) return undefined;
        return allPages.length + 1;
      },
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  };
}
