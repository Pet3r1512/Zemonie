import { useQuery } from "@tanstack/react-query";
import BudgetItem from "./BudgetItem";
import getBudgets from "@/api/dashboard/budget/getBudgets";
import { Skeleton } from "@/components/ui/skeleton";

enum BudgetDuration {
  WEEK_1,
  WEEK_2,
  MONTH_1,
  MONTH_3,
  MONTH_6,
  MONTH_12,
}

export type BudgetResponseType = {
  id: string;
  amount: number;
  spentAmount: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  duration: BudgetDuration;
  startDate: string;
  endDate: string;
  isRecurring: boolean;
  isRollOver: boolean;
  name: string;
  parentBudgetId: string;
};

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
      <section className="bg-white dark:bg-dark-card rounded-2xl p-5 flex flex-col gap-y-5 flex-1">
        <Skeleton className="h-[220.5px] md:h-[196.5px] w-full" />
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-dark-card rounded-2xl p-5 flex flex-col gap-y-5 flex-1">
      <p className="text-lg lg:text-xl font-bold shrink-0">Budget By Category</p>
      {data?.budgets.budgets.length !== 0 ? (
        data?.budgets.budgets.map((budget: BudgetResponseType) => {
          return <BudgetItem key={budget.id} budget={budget} />;
        })
      ) : (
        <p>You have no budget.</p>
      )}
    </section>
  );
}
