import RequestPasswordReset from "@/api/users/auth/RequestPasswordReset";
import Logo from "@/components/Layout/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ForgotPasswordFormType } from "@/lib/types/forgotpasswordform";
import { cn } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";
import { useMutation } from "@tanstack/react-query";
import { LoaderCircle, MailCheck } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import FormErrorMessage from "../FormErrorMessage";

export default function ForgotPasswordForm({ className }: { className?: string }) {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormType>();

  const mutation = useMutation({
    mutationKey: ["request-password-reset"],
    mutationFn: RequestPasswordReset,
    onError: (error) => {
      toast.error(error?.message || "Failed to send reset link");
    },
    onSuccess: () => {
      setSubmitted(true);
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormType> = (data) => {
    mutation.mutate(data);
  };

  return (
    <div
      className={cn("flex flex-col gap-6 w-full md:max-w-106.25 lg:max-w-lg", className)}
      data-testid="forgot-password-form-container"
    >
      <Card className="dark:bg-black/50 shadow-2xl">
        <CardHeader className="text-center flex flex-col items-center gap-y-3">
          <Logo />
          <CardTitle className="text-xl lg:text-2xl text-primary-dark">
            {submitted ? "Check your inbox" : "Forgot your password?"}
          </CardTitle>
          {submitted && (
            <CardDescription className="max-w-md">
              If an account exists for that email, a password reset link is on its way. The link
              expires in 1 hour.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="flex flex-col items-center gap-4">
              <MailCheck className="size-10 text-primary" />
              <Button asChild variant="link" className="text-primary underline underline-offset-4">
                <a href="/auth/signin">Back to Sign In</a>
              </Button>
            </div>
          ) : (
            <form role="form" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    role="email-input"
                    placeholder="m@example.com"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && errors.email.message && (
                    <FormErrorMessage message={errors.email.message} />
                  )}
                </div>
                <Button
                  role="submit-btn"
                  disabled={mutation.isPending}
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark dark:bg-primary dark:hover:bg-primary-dark transition-all duration-150 ease-linear dark:text-white"
                >
                  {mutation.isPending ? (
                    <LoaderCircle data-testid="spinner" className="animate-spin" />
                  ) : (
                    <p>Send Reset Link</p>
                  )}
                </Button>
                <div role="signin-nav" className="text-center text-sm">
                  Remembered your password?{" "}
                  <a href="/auth/signin" className="underline underline-offset-4 font-semibold">
                    Sign In
                  </a>
                </div>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
