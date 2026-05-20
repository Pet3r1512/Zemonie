import { SERVER_URL } from "@/constant/auth";

export enum Currency {
  AUD = "AUD",
  USD = "USD",
  VND = "VND",
}

export default async function createBalance(credentials: {
  userId: string;
  currency: Currency;
}) {
  const response = await fetch(
    `${SERVER_URL}/api/trpc/balances.createDefaultBalance`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(credentials),
    },
  );

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res.error.message || "Unknown Error");
  }

  return {
    success: true,
    message: "User's Default Balance Is Created",
  };
}
