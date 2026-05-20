import { SERVER_URL } from "@/constant/auth";

export default async function getHighestIncomeOfMonth(input?: {
  userId: string;
  month?: number;
  year?: number;
}) {
  const encodedInput = encodeURIComponent(JSON.stringify(input ?? {}));

  const response = await fetch(
    `${SERVER_URL}/api/trpc/analytics.highestIncomeOfMonth?input=${encodedInput}`,
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
    highestIncomeOfMonth: res.result.data,
  };
}
