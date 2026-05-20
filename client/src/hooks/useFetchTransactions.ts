import getTransactions from "@/api/users/transactions/getTransactions";
import { TransactionsResponse } from "@/components/Dashboard/Transactions/TransactionsTable";
import { useInfiniteQuery } from "@tanstack/react-query";
import useFetchUser from "./useFetchUser";
import { TransactionInfo } from "@/components/Dashboard/Transactions/TransactionsTable/ListByDate";

export default function useFetchTransactions({
  option,
}: {
  option?: "all" | "onlyIncome" | "onlyExpense";
}) {
  const userId = useFetchUser();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery<TransactionsResponse>({
    queryKey: ["transactions", userId],
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    initialPageParam: 1,

    queryFn: async ({ pageParam = 1 }) => {
      const response = await getTransactions({
        userId,
        page: pageParam as number,
      });

      return {
        transactions: response.transactions,
        hasMore: response.transactions.length > 0,
      };
    },

    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.transactions.hasMore) return undefined;

      return allPages.length + 1;
    },

    enabled: !!userId,
  });

  const filteredData = data
    ? {
        ...data,
        pages: data.pages.map((page) => ({
          ...page,
          transactions: page.transactions.transactions.filter(
            (transaction: TransactionInfo) => {
              if (option === "onlyIncome") {
                return (
                  transaction.categoryId &&
                  transaction.categoryId >= 1 &&
                  transaction.categoryId <= 7
                );
              }

              if (option === "onlyExpense") {
                return (
                  transaction.categoryId &&
                  transaction.categoryId >= 8 &&
                  transaction.categoryId <= 21
                );
              }

              return true;
            },
          ),
        })),
      }
    : undefined;

  return {
    data: filteredData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  };
}
