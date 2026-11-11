import { SERVER_URL } from "@/constant/auth";
import { getUserTimeZone } from "@/helpers/userTimezone";

export default async function getHighestExpenseCategory(credentails?: {
  month?: number;
  year?: number;
}) {
  const response = await fetch(
    `${SERVER_URL}/api/trpc/analytics.highestExpenseCategory?input=${encodeURIComponent(
      JSON.stringify({ ...credentails, timeZone: getUserTimeZone() }),
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
    highestExpenseCategoryAmount: res.result.data.highestExpenseCategoryAmount,
    categoryName: res.result.data.categoryName,
  };
}
