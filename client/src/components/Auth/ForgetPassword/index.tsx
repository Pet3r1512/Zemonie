import { Toaster } from "@/components/ui/sonner";
import ForgetPasswordForm from "./ForgetPasswordForm";

export default function ForgetPassword() {
  return (
    <article className="w-full flex flex-col justify-center items-center py-8">
      <ForgetPasswordForm />
      <Toaster richColors />
    </article>
  );
}
