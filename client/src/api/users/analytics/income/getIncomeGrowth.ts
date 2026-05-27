import { SERVER_URL } from "@/constant/auth";

export default async function getIncomeGrowth() {
  const encodedInput = encodeURIComponent(JSON.stringify(input ?? {}));

  const response = await fetch(
    `${SERVER_URL}/api/trpc/analytics.incomeGrowth?input=${encodedInput}`,
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
    incomeGrowthRate: res.result.data,
  };
}
