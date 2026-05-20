import { SERVER_URL } from "@/constant/auth";

export default async function getTransactions(input?: {
  userId?: string;
  page: number;
}) {
  const encodedInput = encodeURIComponent(JSON.stringify(input ?? {}));

  const response = await fetch(
    `${SERVER_URL}/api/trpc/transactions.getTransactions?input=${encodedInput}&page=${input?.page}`,
    {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    },
  );

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error?.message ?? "Unknown error");
  }

  return {
    success: true,
    transactions: res.result.data,
  };
}
