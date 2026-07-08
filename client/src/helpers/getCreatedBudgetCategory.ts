import { BudgetResponseType } from "@/components/Dashboard/Budgets/BudgetList/types";

export default function getCreatedBudgetCategory({ budgets }: { budgets: BudgetResponseType[] }) {
  let createdCategoryBudget: number[] = [];

  for (let i = 0; i < budgets.length; i++) {
    createdCategoryBudget.push(budgets[i].categoryId);
  }

  return createdCategoryBudget;
}
