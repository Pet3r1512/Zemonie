import { BudgetFormData } from "@/components/Dashboard/Budgets/BudgetForm";
import { SERVER_URL } from "@/constant/auth";

export default async function createBudget({ credentials }: { credentials: BudgetFormData }) {
  const response = await fetch(`${SERVER_URL}/api/trpc/budget.createBudget`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error?.mesage ?? "Unknown Error");
  }

  return {
    budget: res.result.data,
  };
}
