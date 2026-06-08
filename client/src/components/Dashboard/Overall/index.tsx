import { MoveDown, MoveUp, Wallet } from "lucide-react";
import Data from "./Data";
import { useQuery } from "@tanstack/react-query";
import getCurrentBalance from "@/api/users/balances/getCurrentBalance";
import { ReactNode } from "react";
import getLatestTransactions from "@/api/users/dashboard/getLatestTransactions";
import useUserPreferences from "@/hooks/users/useUserPreferences";

export type OverallDataType = {
  name: string;
  subtitle: string;
  icon: ReactNode;
  isLoading: boolean;
  isError: boolean;
  amount: number;
  currency?: string;
};

export default function Overall() {
  const currency = useUserPreferences().data?.preferences?.currency ?? "AUD";
  const balanceQuery = useQuery({
    queryKey: ["balance"],
    queryFn: () => getCurrentBalance(),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const latestTransactionsQuery = useQuery({
    queryKey: ["latestTransactions"],
    queryFn: () => getLatestTransactions(),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const currentBalance = balanceQuery.data?.balance.balance ?? 0;

  const data: OverallDataType[] = [
    {
      name: "Total Balance",
      subtitle: "Current Balance",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-blue-100">
          <Wallet className="text-blue-500" />
        </div>
      ),
      isLoading: balanceQuery.isLoading,
      isError: balanceQuery.isError,
      amount: currentBalance,
      currency,
    },
    {
      name: "Latest Income",
      subtitle: latestTransactionsQuery.data?.result.latestIncome?.description ?? "",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-green-100">
          <MoveDown className="text-green-500" />
        </div>
      ),
      isLoading: latestTransactionsQuery.isLoading,
      isError: latestTransactionsQuery.isError,
      amount: latestTransactionsQuery.data?.result.latestIncome?.amount ?? 0,
      currency,
    },
    {
      name: "Latest Expense",
      subtitle: latestTransactionsQuery.data?.result.latestExpense?.description ?? "",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-red-100">
          <MoveUp className="text-red-500" />
        </div>
      ),
      isLoading: latestTransactionsQuery.isLoading,
      isError: latestTransactionsQuery.isError,
      amount: latestTransactionsQuery.data?.result.latestExpense?.amount ?? 0,
      currency,
    },
  ];

  return (
    <section className="flex flex-col lg:flex-row items-center gap-y-5 lg:gap-x-5 max-w-7xl">
      {data.map((item) => (
        <Data key={item.name} data={item} />
      ))}
    </section>
  );
}
