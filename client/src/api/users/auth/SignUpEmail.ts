import { authClient } from "@/lib/auth-client";
import { SignUpFormType } from "@/lib/types/signupform";

export default async function SignUpEmail(credentials: SignUpFormType) {
  const { name, email, password } = credentials;

  const { data, error } = await authClient.signUp.email({
    name: name,
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message || "Sign in failed");
  }

  return data;
}
