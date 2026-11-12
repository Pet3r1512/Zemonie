import { getAuthErrorMessage } from "@/lib/auth-errors";
import { authClient } from "@/lib/auth-client";
import { SignUpFormType } from "@/lib/types/signupform";

export default async function SignUpEmail(credentials: SignUpFormType & { captchaToken: string }) {
  const { name, email, password, captchaToken } = credentials;

  const { data, error } = await authClient.signUp.email(
    {
      name: name,
      email: email,
      password: password,
    },
    {
      headers: { "x-captcha-response": captchaToken },
    },
  );

  if (error?.status === 429) {
    throw new Error(getAuthErrorMessage(error, "Too many attempts"));
  }
  if (error) {
    throw error;
  }

  return data;
}
