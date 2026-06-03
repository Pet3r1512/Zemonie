import { useQuery } from "@tanstack/react-query";
import getSpendingByCategory from "@/api/dashboard/charts/SpendingByCategory";
import { SpendingByCategory } from "./SpendingByCategory";
import { CurrentMonthIncomeExpenseChart } from "./CurrentMonthIncomeExpenseChart";

const now = new Date();
const currentMonth = now.getMonth() + 1;
const currentMonthShorten = now.toLocaleString("default", { month: "short" });
const currentYear = now.getFullYear();

export default function Charts() {
  const spendingByCategoryQuery = useQuery({
    queryKey: ["spendingByCategory", currentMonth, currentYear],
    queryFn: () =>
      getSpendingByCategory({ month: currentMonth, year: currentYear }),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <CurrentMonthIncomeExpenseChart
        chartData={[
          {
            month: currentMonthShorten + " " + currentYear,
            income: 1500,
            expenses: 150,
          },
        ]}
      />
      <SpendingByCategory
        data={spendingByCategoryQuery.data?.spendingByCategory}
      />
    </section>
  );
}
