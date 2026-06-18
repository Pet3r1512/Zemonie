import getCurrentBalance from "@/api/users/balances/getCurrentBalance";
import getLatestTransactions from "@/api/users/dashboard/getLatestTransactions";
import useFetchCurrentMonthExpenses from "@/hooks/data/useFetchCurrentMonthExpense";
import useFetchCurrentMonthIncome from "@/hooks/data/useFetchCurrentMonthIncome";
import useUserPreferences from "@/hooks/users/useUserPreferences";
import { useQuery, } from "@tanstack/react-query";
import { MoveDown, MoveUp, TrendingUp, Wallet, } from "lucide-react";
import { ReactNode, } from "react";
import Data from "./Data";

export type OverallDataType = {
  name: string;
  subtitle: string;
  icon: ReactNode;
  isLoading: boolean;
  isError: boolean;
  amount: number;
  currency?: string;
};

const now = new Date();
const currentMonth = now.getMonth() + 1; // 1-indexed
const currentYear = now.getFullYear();

export default function Overall() {
  const currency = useUserPreferences().data?.preferences?.currency ?? "AUD";
  const totalIncome = useFetchCurrentMonthIncome({
    month: currentMonth,
    year: currentYear,
  },);
  const totalExpense = useFetchCurrentMonthExpenses({
    month: currentMonth,
    year: currentYear,
  },);
  const balanceQuery = useQuery({
    queryKey: ["balance",],
    queryFn: () => getCurrentBalance(),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  },);

  const latestTransactionsQuery = useQuery({
    queryKey: ["latestTransactions",],
    queryFn: () => getLatestTransactions(),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  },);

  const currentBalance = balanceQuery.data?.balance.balance ?? 0;

  const data: OverallDataType[] = [
    {
      name: "Total Balance",
      subtitle: "Current Balance",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-blue-100 dark:bg-blue-900/30">
          <Wallet className="text-blue-500" />
        </div>
      ),
      isLoading: balanceQuery.isLoading,
      isError: balanceQuery.isError,
      amount: currentBalance,
      currency,
    },
    {
      name: "Net Savings",
      subtitle: "Current Month",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-yellow-100 dark:bg-yellow-900/30">
          <TrendingUp className="text-yellow-500" />
        </div>
      ),
      isLoading: totalIncome.isLoading || totalExpense.isLoading,
      isError: totalIncome.isError || totalExpense.isError,
      amount: totalIncome.data?.totalCurrentMonthIncome.totalIncome
        - totalExpense.data?.totalCurrentMonthExpenses.totalExpensesAmount,
      currency,
    },
    {
      name: "Latest Income",
      subtitle: latestTransactionsQuery.data?.result.latestIncome?.description ?? "",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-green-100 dark:bg-green-900/30">
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
        <div className="flex items-center justify-center rounded-full p-2.5 bg-red-100 dark:bg-red-900/30">
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
      {data.map((item,) => <Data key={item.name} data={item} />)}
    </section>
  );
}
