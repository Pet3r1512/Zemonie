import { SERVER_URL } from "@/constant/auth";
import { getUserTimeZone } from "@/helpers/userTimezone";

export default async function getBudgets() {
  const response = await fetch(
    `${SERVER_URL}/api/trpc/budget.getBudgets?input=${encodeURIComponent(JSON.stringify({ timeZone: getUserTimeZone() }))}`,
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
    throw new Error(res.error?.message ?? "Unknwon Error");
  }

  return { budgets: res.result.data };
}
