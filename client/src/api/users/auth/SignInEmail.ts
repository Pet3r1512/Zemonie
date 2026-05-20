import { authClient } from "@/lib/auth-client";
import { SignInFormType } from "@/lib/types/signinform";

export default async function SignInEmail(credentials: SignInFormType) {
  const { data, error } = await authClient.signIn.email({
    email: credentials.email,
    password: credentials.password,
  });

  if (error) {
    throw new Error(error.message || "Sign in failed");
  }

  return data;
}
