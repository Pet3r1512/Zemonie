import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import SendVerificationEmail from "@/api/users/auth/SendVerificationEmail";
import { toast } from "sonner";
import { Mail } from "lucide-react";

interface EmailVerifyDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  onSent: () => void;
}

export default function EmailVerifyDialog({
  open,
  onOpenChange,
  email,
  onSent,
}: EmailVerifyDialogProps) {
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    setSending(true);
    try {
      await SendVerificationEmail(email);
      toast.success("Verification email sent! Check your inbox.");
      onSent();
      onOpenChange(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to send verification email");
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md dark:bg-black bg-white border-0 shadow-2xl">
        <DialogHeader>
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Mail className="size-6 text-primary" />
          </div>
          <DialogTitle className="text-center">Verify your email</DialogTitle>
          <DialogDescription className="text-center">
            We'll send a verification link to{" "}
            <span className="font-bold text-primary">{email}</span>. Check your inbox and click the
            link to verify.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-row gap-2 sm:justify-center">
          <Button variant="destructive" onClick={() => onOpenChange(false)} disabled={sending}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={sending}>
            {sending ? "Sending..." : "Send verification email"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
