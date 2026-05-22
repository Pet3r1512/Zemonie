import getTotalIncomeByMonth from "@/api/users/analytics/income/getTotalIncomeByMonth";
import { useQuery } from "@tanstack/react-query";

export default function useFetchCurrentMonthIncome({ userId, month, year }: { userId: string, month?: number, year?: number }) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["totalIncome", userId],
        queryFn: () =>
            getTotalIncomeByMonth({
                userId: userId!,
                month: month,
                year: year
            }),
        enabled: !!userId,
        refetchOnWindowFocus: false,
        staleTime: 5 * 60 * 1000, // 5 mins
        gcTime: 30 * 60 * 1000, // 30 mins
    })

    return { data, isLoading, isError }
}