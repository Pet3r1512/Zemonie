import { SERVER_URL } from "@/constant/auth";

export default async function getUserPreferences() {
    const response = await fetch(`${SERVER_URL}/api/trpc/user.userPreferences`, {
        method: "GET",
        credentials: "include"
    })

    const res = await response.json()

    if (!response.ok) {
        throw new Error(res.error.message || "Unknown Error")
    }

    return {
        preferences: res.result.data.result
    }
}