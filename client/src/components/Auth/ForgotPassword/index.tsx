import { Toaster } from "@/components/ui/sonner";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPassword() {
  return (
    <article className="w-full flex flex-col justify-center items-center py-8">
      <ForgotPasswordForm />
      <Toaster richColors />
    </article>
  );
}
