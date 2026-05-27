import { SERVER_URL } from "@/constant/auth";

export default async function getIncomeGrowth() {
  const response = await fetch(
    `${SERVER_URL}/api/trpc/analytics.incomeGrowth`,
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
