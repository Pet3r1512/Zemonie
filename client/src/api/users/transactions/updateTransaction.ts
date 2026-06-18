import { TransactionInfo, } from "@/components/Dashboard/Transactions/TransactionsTable/ListByDate";
import { SERVER_URL, } from "@/constant/auth";

export default async function updateTransaction(
  { credentials, }: { credentials: TransactionInfo; },
) {
  const body = {
    transactionId: credentials.id,
    categoryId: credentials.categoryId,
    amount: credentials.amount,
    currency: credentials.currency,
    description: credentials.description,
    createdAt: credentials.date,
  };

  const response = await fetch(`${SERVER_URL}/api/trpc/transactions.updateTransaction`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body,),
  },);

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error?.message ?? "Unknown Error",);
  }

  return {
    result: res.result,
  };
}
