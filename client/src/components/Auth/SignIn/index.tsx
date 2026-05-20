import { Toaster } from "@/components/ui/sonner";
import SignInForm from "./SignInForm";

export default function SignIn() {
  return (
    <article className="w-full flex flex-col justify-center items-center py-8">
      <SignInForm />
      <Toaster richColors />
    </article>
  );
}
