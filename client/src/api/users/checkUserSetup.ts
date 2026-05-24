import { SERVER_URL } from "@/constant/auth";

export default async function checkUserSetup(): Promise<{ isSetupDone: boolean }> {
    const res = await fetch(`${SERVER_URL}/api/users/me`, {
        credentials: "include",
    });
    return res.json();
};
