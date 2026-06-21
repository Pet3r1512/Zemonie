import BudgetItem from "./BudgetItem";

export default function BudgetListContainer() {
  return (
    <section className="bg-white dark:bg-dark-card rounded-2xl p-5 flex flex-col gap-y-5 flex-1">
      <p className="text-lg lg:text-xl font-bold shrink-0">Budget By Category</p>
      <BudgetItem />
    </section>
  );
}
