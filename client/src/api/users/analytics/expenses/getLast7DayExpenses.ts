import { SERVER_URL } from "@/constant/auth";
import { getUserTimeZone } from "@/helpers/userTimezone";

export default async function getLast7DaysExpenses() {
  const response = await fetch(
    `${SERVER_URL}/api/trpc/analytics.getLast7DaysExpense?input=${encodeURIComponent(JSON.stringify({ timeZone: getUserTimeZone() }))}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    },
  );

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error.message ?? "Unknown Error");
  }

  return res.result.data;
}
