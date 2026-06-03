import { ChartPie, MoveUp, Percent } from "lucide-react";
import { OverallDataType } from "../Overall";
import Data from "../Overall/Data";
import { useQuery } from "@tanstack/react-query";
import getTotalExpensesByMonth from "@/api/users/analytics/expenses/getTotalExpensesByMonth";
import getHighestExpenseCategory from "@/api/users/analytics/expenses/getHighestExpenseCategory";
import useFetchCurrentMonthIncome from "@/hooks/data/useFetchCurrentMonthIncome";
import calculateSaveRate from "./calculateSaveRate";

const now = new Date();
const currentMonth = now.getMonth() + 1; // 1-indexed
const currentYear = now.getFullYear();

export default function ExpensesOverallContainer() {
  const totalIncome = useFetchCurrentMonthIncome({
    month: currentMonth,
    year: currentYear,
  });

  const totalExpenseQuery = useQuery({
    queryKey: ["totalIncomeQuery"],
    queryFn: () =>
      getTotalExpensesByMonth({
        month: currentMonth,
        year: currentYear,
      }),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const highestExpenseQuery = useQuery({
    queryKey: ["highestExpense"],
    queryFn: () =>
      getHighestExpenseCategory({
        month: currentMonth,
        year: currentYear,
      }),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const placeholderData: OverallDataType[] = [
    {
      name: "Total Expenses",
      subtitle: "This Month",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-red-100">
          <MoveUp className="text-red-500" />
        </div>
      ),
      isLoading: totalExpenseQuery.isLoading,
      isError: totalExpenseQuery.isError,
      amount:
        totalExpenseQuery.data?.totalCurrentMonthExpenses.totalExpensesAmount ??
        0,
    },
    {
      name: "Highest Category",
      subtitle: highestExpenseQuery.data?.categoryName ?? "",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-purple-100">
          <ChartPie className="text-purple-600" />
        </div>
      ),
      isLoading: highestExpenseQuery.isLoading,
      isError: highestExpenseQuery.isError,
      amount: highestExpenseQuery.data?.highestExpenseCategoryAmount ?? 0,
    },
    {
      name: "Save Rate",
      subtitle: "Expense Ratio",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-yellow-100">
          <Percent className="text-yellow-600" />
        </div>
      ),
      isLoading: false,
      isError: false,
      amount: calculateSaveRate(
        totalIncome.data?.totalCurrentMonthIncome.totalIncome ?? 0,
        totalExpenseQuery.data?.totalCurrentMonthExpenses.totalExpensesAmount ??
          0,
      ),
    },
  ];
  return (
    <section className="flex flex-col md:flex-row items-stretch gap-y-5 md:gap-x-5 max-w-7xl">
      {placeholderData.map((data) => {
        return <Data key={data.name} data={data} />;
      })}
    </section>
  );
}
