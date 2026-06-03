import { useQuery } from "@tanstack/react-query";
import getSpendingByCategory from "@/api/dashboard/charts/SpendingByCategory";
import { SpendingByCategory } from "./SpendingByCategory";

const now = new Date();
const currentMonth = now.getMonth() + 1;
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
    <section>
      <SpendingByCategory
        data={spendingByCategoryQuery.data?.spendingByCategory}
      />
    </section>
  );
}
