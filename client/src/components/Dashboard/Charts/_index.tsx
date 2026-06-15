import { useQuery } from "@tanstack/react-query";
import getSpendingByCategory from "@/api/dashboard/charts/SpendingByCategory";
import { SpendingByCategory } from "./SpendingByCategory";
import { CurrentMonthIncomeExpenseChart } from "./CurrentMonthIncomeExpenseChart";
import useFetchCurrentMonthIncome from "@/hooks/data/useFetchCurrentMonthIncome";
import useFetchCurrentMonthExpenses from "@/hooks/data/useFetchCurrentMonthExpense";
import Last7DaysSpendings from "./Last7DaysSpendings";
import getLast7DaysExpenses from "@/api/users/analytics/expenses/getLast7DayExpenses";

const now = new Date();
const currentMonth = now.getMonth() + 1;
const currentMonthShorten = now.toLocaleString("default", { month: "short" });
const currentYear = now.getFullYear();

export default function Charts() {
  const totalIncomeQuery = useFetchCurrentMonthIncome({
    month: currentMonth,
    year: currentYear,
  });

  const totalExpensesQuery = useFetchCurrentMonthExpenses({
    month: currentMonth,
    year: currentYear,
  });

  const spendingByCategoryQuery = useQuery({
    queryKey: ["spendingByCategory", currentMonth, currentYear],
    queryFn: () => getSpendingByCategory({ month: currentMonth, year: currentYear }),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const spendingByLast7Days = useQuery({
    queryKey: ["last7DaysExpenses"],
    queryFn: () => getLast7DaysExpenses(),
    refetchOnWindowFocus: false,
    staleTime: 5 * 10 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <CurrentMonthIncomeExpenseChart
        chartData={[
          {
            month: currentMonthShorten + " " + currentYear,
            income: totalIncomeQuery.data?.totalCurrentMonthIncome.totalIncome,
            expenses: totalExpensesQuery.data?.totalCurrentMonthExpenses.totalExpensesAmount,
          },
        ]}
      />
      <SpendingByCategory data={spendingByCategoryQuery.data?.spendingByCategory} />
      <Last7DaysSpendings chartData={spendingByLast7Days.data.data} />
    </section>
  );
}
