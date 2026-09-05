import { SERVER_URL } from "@/constant/auth";

export default async function sendWelcomeEmail() {
  const response = await fetch(`${SERVER_URL}/api/trpc/emails.welcomeEmail`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const res = await response.json();

  if (!response.ok) {
    throw new Error(res.error?.message ?? "Unknown Error");
  }

  return {
    result: res.result.data,
  };
}
