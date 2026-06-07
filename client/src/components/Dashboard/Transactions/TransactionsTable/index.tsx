import ListByDate, { TransactionInfo } from "./ListByDate";
import { useCallback, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import useFetchTransactions from "@/hooks/useFetchTransactions";
import updateTransaction from "@/api/users/transactions/updateTransaction";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export interface TransactionsTableProps {
  userId: string | undefined;
}

export interface TransactionsResponse {
  transactions: {
    transactions: TransactionInfo[];
    hasMore: boolean;
  };
}

export default function TransactionsTable({ userId }: TransactionsTableProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (credentials: TransactionInfo) =>
      updateTransaction({ credentials }),
    onSuccess: () => {
      toast.success("Transaction updated");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["balance"] });
      queryClient.invalidateQueries({ queryKey: ["totalIncome"] });
      queryClient.invalidateQueries({ queryKey: ["totalExpenses"] });
      queryClient.invalidateQueries({ queryKey: ["spendingByCategory"] });
      queryClient.invalidateQueries({ queryKey: ["latestTransactions"] });
    },
    onError: (error) => {
      toast.error(error?.message ?? "Failed to update transaction");
    },
  });
  const observer = useRef<IntersectionObserver | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useFetchTransactions({ option: "all" });

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

  if (!userId) return null;
  if (isLoading)
    return (
      <div className="space-y-5">
        <Skeleton className="text-gray-300 bg-gray-300 p-1.5 rounded-lg">
          Loading
        </Skeleton>
        <Skeleton className="rounded-2xl px-2.5 py-3 text-gray-300 bg-gray-300 flex items-center gap-x-5 h-20">
          Loading
        </Skeleton>
      </div>
    );
  if (isError)
    return (
      <div>
        {(error as Error).message || "Failed to load transactions. Try again?"}
      </div>
    );

  if (allTransactions.length === 0) {
    return (
      <p className="lg:text-lg italic text-gray-400">
        You do not have any transactions.
      </p>
    );
  }

  const handleSave = (updatedTransaction: TransactionInfo) => {
    mutation.mutate(updatedTransaction);
  };

  return (
    <ListByDate
      lastElementRef={lastElementRef}
      transactions={allTransactions}
      onSave={handleSave}
    />
  );
}
