import { Toaster } from "@/components/ui/sonner";
import SignUpForm from "./SignUpForm";

export default function SignUp() {
  return (
    <article className="w-full flex flex-col justify-center items-center py-8">
      <SignUpForm />
      <Toaster richColors />
    </article>
  );
}
