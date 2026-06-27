import { SERVER_URL } from "@/constant/auth";

export default async function getHighestExpenseCategory(credentails?: {
  month?: number;
  year?: number;
}) {
  const response = await fetch(
    `${SERVER_URL}/api/trpc/analytics.highestExpenseCategory?input=${encodeURIComponent(
      JSON.stringify(credentails),
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
