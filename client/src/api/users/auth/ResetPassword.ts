import { authClient } from "@/lib/auth-client";

export default async function ResetPassword({
  newPassword,
  token,
}: {
  newPassword: string;
  token: string;
}) {
  const { data, error } = await authClient.resetPassword({
    newPassword,
    token,
  });

  if (error) {
    throw new Error(error.message || "Reset password failed");
  }

  return data;
}
