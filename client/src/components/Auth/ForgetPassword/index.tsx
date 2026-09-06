import { Toaster } from "@/components/ui/sonner";
import ForgetPasswordForm from "./ForgetPasswordForm";
import ResetLinkError from "./ResetLinkError";

export default function ForgetPassword({ token, error }: { token: string; error?: string }) {
  return (
    <article className="w-full flex flex-col justify-center items-center py-8">
      {error ? <ResetLinkError /> : <ForgetPasswordForm token={token} />}
      <Toaster richColors />
    </article>
  );
}
