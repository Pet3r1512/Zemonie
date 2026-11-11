import { SERVER_URL } from "@/constant/auth";
import { getUserTimeZone } from "@/helpers/userTimezone";

export default async function getSpendingByCategory(credentials?: {
  month?: number;
  year?: number;
}) {
  const response = await fetch(
    `${SERVER_URL}/api/trpc/analytics.getExpenseCategorySummary?input=${encodeURIComponent(
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
    spendingByCategory: res.result.data,
  };
}
