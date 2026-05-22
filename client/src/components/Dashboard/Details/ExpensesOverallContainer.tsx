import { ChartPie, MoveUp, Percent } from "lucide-react";
import { OverallDataType } from "../Overall";
import Data from "../Overall/Data";
import { useQuery } from "@tanstack/react-query";
import getTotalExpensesByMonth from "@/api/users/analytics/expenses/getTotalExpensesByMonth";
import useFetchUser from "@/hooks/useFetchUser";
import getHighestExpenseCategory from "@/api/users/analytics/expenses/getHighestExpenseCategory";
import useFetchCurrentMonthIncome from "@/hooks/useFetchCurrentMonthIncome";

export default function ExpensesOverallContainer() {
  const userId = useFetchUser();
  const totalIncome = useFetchCurrentMonthIncome({ userId: userId! });

  const totalExpenseQuery = useQuery({
    queryKey: ["totalExpenses"],
    queryFn: () => getTotalExpensesByMonth({ userId: userId! }),
    enabled: !!userId,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const highestExpenseQuery = useQuery({
    queryKey: ["highestExpense"],
    queryFn: () => getHighestExpenseCategory({ userId: userId! }),
    enabled: !!userId,
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
        totalExpenseQuery.data?.totalCurrentMonthExpenses.totalExpensesAmount,
    },
    {
      name: "Highest Category",
      subtitle: highestExpenseQuery.data?.categoryName,
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-purple-100">
          <ChartPie className="text-purple-600" />
        </div>
      ),
      isLoading: highestExpenseQuery.isLoading,
      isError: highestExpenseQuery.isError,
      amount: highestExpenseQuery.data?.highestExpenseCategoryAmount,
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
      amount:
        ((totalIncome.data?.totalCurrentMonthIncome.totalIncome -
          totalExpenseQuery.data?.totalCurrentMonthExpenses
            .totalExpensesAmount) /
          totalIncome.data?.totalCurrentMonthIncome.totalIncome) *
        100,
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
