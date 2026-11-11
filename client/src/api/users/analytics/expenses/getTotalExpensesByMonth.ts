import { SERVER_URL } from "@/constant/auth";
import { getUserTimeZone } from "@/helpers/userTimezone";

export default async function getTotalExpensesByMonth(credentials?: {
  month?: number;
  year?: number;
}) {
  const response = await fetch(
    `${SERVER_URL}/api/trpc/analytics.totalExpensesOfMonth?input=${encodeURIComponent(
      JSON.stringify({ ...credentials, timeZone: getUserTimeZone() }),
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
    totalCurrentMonthExpenses: res.result.data,
  };
}
