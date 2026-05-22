import { SERVER_URL } from "@/constant/auth";

export default async function getTotalIncomeByMonth(credentials: {
  userId: string;
  month?: number;
  year?: number;
}) {
  const response = await fetch(
    `${SERVER_URL}/api/trpc/transactions.getTotalIncomeByMonth?input=${encodeURIComponent(
      JSON.stringify(credentials),
    )}`,
    {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error?.message ?? "Unknown Error");
  }

  return {
    success: true,
    totalCurrentMonthIncome: res.result.data,
  };
}
