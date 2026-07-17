import getTotalExpensesByMonth from "@/api/users/analytics/expenses/getTotalExpensesByMonth";
import { useQuery } from "@tanstack/react-query";

export default function useFetchCurrentMonthExpenses({
  month,
  year,
}: {
  month?: number;
  year?: number;
}) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["totalExpenses"],
    queryFn: () =>
      getTotalExpensesByMonth({
        month: month,
        year: year,
      }),
    refetchOnWindowFocus: false,
    staleTime: 3 * 60 * 1000,
    gcTime: 30 * 60 * 1000, // 30 mins
  });

  return { data, isLoading, isError };
}
