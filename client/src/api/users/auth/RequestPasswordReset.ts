import { authClient } from "@/lib/auth-client";
import { ForgotPasswordFormType } from "@/lib/types/forgotpasswordform";

export default async function RequestPasswordReset({
  email,
  captchaToken,
}: ForgotPasswordFormType & { captchaToken: string }) {
  const { data, error } = await authClient.requestPasswordReset(
    {
      email,
      redirectTo: "/auth/forgot-password",
    },
    {
      headers: { "x-captcha-response": captchaToken },
    },
  );

  if (error) {
    throw new Error(error.message || "Failed to send reset link");
  }

  return data;
}
