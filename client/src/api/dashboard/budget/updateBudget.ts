import { SERVER_URL } from "@/constant/auth";

export default async function updateBudget({
  credentails,
}: {
  credentails: {
    id: string;
    categoryId: string;
    budgetName: string;
    amount: number;
    isRecurring: boolean;
  };
}) {
  const response = await fetch(`${SERVER_URL}/api/trpc/budget.updateBudget`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(credentails),
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error?.message ?? "Unknown Error");
  }

  return {
    newBudget: res.result.data,
  };
}
