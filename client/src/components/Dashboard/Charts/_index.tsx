import { useQuery } from "@tanstack/react-query";
import getSpendingByCategory from "@/api/dashboard/charts/SpendingByCategory";
import { SpendingByCategory } from "./SpendingByCategory";

export default function Charts() {
  const spendingByCategoryQuery = useQuery({
    queryKey: ["spendingByCategory"],
    queryFn: () => getSpendingByCategory({}),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  console.log(spendingByCategoryQuery.data?.spendingByCategory);

  return (
    <section>
      <SpendingByCategory
        data={spendingByCategoryQuery.data?.spendingByCategory}
      />
    </section>
  );
}
