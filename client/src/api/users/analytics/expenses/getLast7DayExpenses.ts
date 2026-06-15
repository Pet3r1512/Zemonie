import { SERVER_URL } from "@/constant/auth";

export default async function getLast7DaysExpenses() {
  const response = await fetch(`${SERVER_URL}/api/trpc/analytics.getLast7DaysExpense`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error.message ?? "Unknown Error");
  }

  return res.result;
}
