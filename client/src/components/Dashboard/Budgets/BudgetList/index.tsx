import BudgetItem from "./BudgetItem";
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
  return (
    <section className="bg-white dark:bg-dark-card rounded-2xl p-5 flex flex-col gap-y-5 flex-1">
      <p className="text-lg lg:text-xl font-bold shrink-0">Budget By Category</p>
      <BudgetItem />
    </section>
  );
}
