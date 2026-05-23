import { SERVER_URL } from "@/constant/auth";

export default async function getLatestTransactions({ userId }: { userId: string }) {
    const response = await fetch(`${SERVER_URL}/api/trpc/transactions.getLatestIncomeAndExpenses?input=${encodeURIComponent(JSON.stringify({ userId }))}`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        }
    })

    const res = await response.json()

    if (!response.ok) {
        throw new Error(res.error?.message ?? "Unknown Error")
    }

    return {
        lastestIncome: res.result.data.lastestIncome,
        lastestExpense: res.result.data.latestExpense
    }
}