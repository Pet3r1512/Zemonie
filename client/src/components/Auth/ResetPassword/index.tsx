import { Toaster } from "@/components/ui/sonner";
import ResetPasswordForm from "./ResetPasswordForm";
import ResetLinkError from "./ResetLinkError";

export default function ResetPassword({ token, error }: { token: string; error?: string }) {
  return (
    <article className="w-full flex flex-col justify-center items-center py-8">
      {error ? <ResetLinkError /> : <ResetPasswordForm token={token} />}
      <Toaster richColors />
    </article>
  );
}
