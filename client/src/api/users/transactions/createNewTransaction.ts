import { Transaction } from "@/components/Dashboard/Overall/Forms/IncomeForm";
import { SERVER_URL } from "@/constant/auth";

export default async function createNewTransaction(input: Transaction) {
  const response = await fetch(
    `${SERVER_URL}/api/trpc/transactions.addTransaction`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    },
  );

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error?.message ?? "Unknown Error");
  }

  return {
    success: true,
  };
}
