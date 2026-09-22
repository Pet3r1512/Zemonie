import { SERVER_URL } from "@/constant/auth";

export type UpdateBudgetCredentials = {
  id: string;
  categoryId: number;
  budgetName?: string;
  amount: number;
  isRecurring: boolean;
};

export default async function updateBudget({
  credentials,
}: {
  credentials: UpdateBudgetCredentials;
}) {
  const response = await fetch(`${SERVER_URL}/api/trpc/budget.updateBudget`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentials),
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error?.message ?? "Unknown Error");
  }

  return {
    updatedBudget: res.result.data,
  };
}
