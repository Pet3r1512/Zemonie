import { SERVER_URL } from "@/constant/auth";

export default async function accountSetup(credentials: {
    avatarId: string;
    currency: string;
}) {
    const response = await fetch(`${SERVER_URL}/api/trpc/user.setup`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
    })

    const res = await response.json()

    if (!response.ok) {
        throw new Error(res.error?.message ?? "Unknown Error")
    }

    return {
        isSetupDone: true
    }
}