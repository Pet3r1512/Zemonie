import { authClient } from "@/lib/auth-client";
import { ForgotPasswordFormType } from "@/lib/types/forgotpasswordform";

export default async function RequestPasswordReset({ email }: ForgotPasswordFormType) {
  const { data, error } = await authClient.requestPasswordReset({
    email,
    redirectTo: "/auth/forget-password",
  });

  if (error) {
    throw new Error(error.message || "Failed to send reset link");
  }

  return data;
}
