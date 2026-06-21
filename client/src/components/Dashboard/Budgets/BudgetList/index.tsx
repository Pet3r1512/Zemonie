import { useQuery } from "@tanstack/react-query";
import BudgetItem from "./BudgetItem";
import getBudgets from "@/api/dashboard/budget/getBudgets";
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
  amount: string;
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
  const getBudgetsQuery = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
  });

  return (
    <section className="bg-white dark:bg-dark-card rounded-2xl p-5 flex flex-col gap-y-5 flex-1">
      <p className="text-lg lg:text-xl font-bold shrink-0">Budget By Category</p>
      <BudgetItem />
    </section>
  );
}
