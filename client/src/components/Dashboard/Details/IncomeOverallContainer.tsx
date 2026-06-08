import { ChartNoAxesCombined, Crown, MoveDown } from "lucide-react";
import { OverallDataType } from "../Overall";
import Data from "../Overall/Data";
import { useQuery } from "@tanstack/react-query";
import getHighestIncomeOfMonth from "@/api/users/analytics/income/getHighestIncomeOfMonth";
import getIncomeGrowth from "@/api/users/analytics/income/getIncomeGrowth";
import useFetchCurrentMonthIncome from "@/hooks/data/useFetchCurrentMonthIncome";
import useUserPreferences from "@/hooks/users/useUserPreferences";

const now = new Date();
const currentMonth = now.getMonth() + 1; // 1-indexed
const currentYear = now.getFullYear();

export default function IncomeOverallContainer() {
  const currency = useUserPreferences().data?.preferences?.currency ?? "AUD";
  const totalIncomeQuery = useFetchCurrentMonthIncome({
    month: currentMonth,
    year: currentYear,
  });

  const highestIncomeOfMonth = useQuery({
    queryKey: ["highestIncomeOfMonth"],
    queryFn: () =>
      getHighestIncomeOfMonth({
        month: currentMonth,
        year: currentYear,
      }),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 mins
    gcTime: 30 * 60 * 1000, // 30 mins
  });

  const incomeGrowthRate = useQuery({
    queryKey: ["incomeRate"],
    queryFn: () => getIncomeGrowth(),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const highestTransaction = highestIncomeOfMonth.data?.highestIncomeOfMonth?.highestIncome;

  const placeholderData: OverallDataType[] = [
    {
      name: "Total Income",
      subtitle: "This Month",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-green-100">
          <MoveDown className="text-green-500" />
        </div>
      ),
      isLoading: totalIncomeQuery.isLoading,
      isError: totalIncomeQuery.isError,
      amount: totalIncomeQuery.data?.totalCurrentMonthIncome?.totalIncome ?? 0,
      currency,
    },
    {
      name: "Highest Income Source",
      subtitle: highestIncomeOfMonth.isLoading ? "" : (highestTransaction?.category ?? "N/A"),
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-yellow-100">
          <Crown className="text-yellow-600" />
        </div>
      ),
      isLoading: highestIncomeOfMonth.isLoading,
      isError: highestIncomeOfMonth.isError,
      amount: highestTransaction?.amount ?? 0,
      currency,
    },
    {
      name: "Income Growth",
      subtitle: "vs Last Month",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-purple-100">
          <ChartNoAxesCombined className="text-purple-600" />
        </div>
      ),
      isLoading: false,
      isError: false,
      amount: incomeGrowthRate.data?.incomeGrowthRate.growthRate,
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
