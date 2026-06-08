import { SERVER_URL } from "@/constant/auth";

export default async function getCurrentBalance() {
  const response = await fetch(`${SERVER_URL}/api/trpc/balances.getCurrentBalance`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error.message || "Unkown Error");
  }

  return {
    sucess: true,
    balance: res.result.data,
  };
}
