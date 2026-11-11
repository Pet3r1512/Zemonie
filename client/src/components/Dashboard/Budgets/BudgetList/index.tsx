import { useQuery } from "@tanstack/react-query";
import getBudgets from "@/api/dashboard/budget/getBudgets";
import { Skeleton } from "@/components/ui/skeleton";
import { BudgetDetails } from "./BudgetDetails";
import BudgetItem from "./BudgetItem";
import { BudgetResponseType } from "./types";

export default function BudgetListContainer() {
  const { data, isLoading } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <section
        aria-label="BudgetListContainer"
        className="rounded-[14px] border border-gray-200 bg-white p-5 flex flex-col gap-y-5 flex-1 shadow-sm dark:border-white/[0.07] dark:bg-[#08080a]/85 dark:backdrop-blur-xl"
      >
        <Skeleton className="h-[220.5px] md:h-[196.5px] w-full" />
      </section>
    );
  }

  return (
    <section
      aria-label="BudgetListContainer"
      className="rounded-[14px] border border-gray-200 bg-white p-5 flex flex-col gap-y-5 flex-1 shadow-sm dark:border-white/[0.07] dark:bg-[#08080a]/85 dark:backdrop-blur-xl"
    >
      <p className="font-display font-bold text-lg lg:text-xl text-gray-900 shrink-0 dark:text-white">
        Budget By Category
      </p>
      {data?.budgets.budgets.length !== 0 ? (
        data?.budgets.budgets.map((budget: BudgetResponseType) => {
          return (
            <BudgetDetails key={budget.id} budget={budget}>
              <BudgetItem budget={budget} />
            </BudgetDetails>
          );
        })
      ) : (
        <p className="text-gray-500 dark:text-[#8b8988]">You have no budget.</p>
      )}
    </section>
  );
}
