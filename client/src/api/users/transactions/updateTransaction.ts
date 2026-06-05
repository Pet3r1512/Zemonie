import { TransactionInfo } from "@/components/Dashboard/Transactions/TransactionsTable/ListByDate";
import { SERVER_URL } from "@/constant/auth";

export default async function updateTransaction({ credentials }: { credentials: TransactionInfo }) {
    const response = await fetch(`${SERVER_URL}/api/trpc/transactions.updateTransaction`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })

    const res = await response.json()

    if (!response.ok) {
        throw new Error(res.error?.message ?? "Unknown Error");
    }

    return {
        result: res.data.result
    }
}