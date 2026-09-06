import Logo from "@/components/Layout/Logo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ResetPasswordFormType } from "@/lib/types/resetpassword";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import FormErrorMessage from "../FormErrorMessage";

export default function ForgetPasswordForm({ className }: { className?: string }) {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormType>();

  const passwordRef = useRef({});
  passwordRef.current = watch("password", "");

  return (
    <div
      data-testid="reset-password-form-container"
      className={cn("flex flex-col gap-6 w-full md:max-w-106.25 lg:max-w-lg", className)}
    >
      <Card className="dark:bg-black/50 shadow-2xl">
        <CardHeader className="text-center flex flex-col items-center gap-y-3">
          <Logo />
          <div className="flex flex-col items-center gap-2">
            <CardTitle className="text-xl lg:text-2xl text-primary-dark">Reset Password</CardTitle>
            <CardDescription>
              Enter a new password for your account. Make sure it&apos;s different from your
              previous one.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form role="form" onSubmit={handleSubmit(() => {})}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      role="new-password"
                      id="password"
                      autoComplete="new-password"
                      type={hidePassword ? "password" : "text"}
                      required
                      placeholder="Enter your new password"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters long",
                        },
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                          message: "Minimum 8 characters, at least one letter and one number",
                        },
                      })}
                    />
                    <button
                      tabIndex={-1}
                      data-testid="password-toggle"
                      className="absolute top-1/2 right-2.5 -translate-y-1/2"
                      aria-label={hidePassword ? "Show password" : "Hide password"}
                      type="button"
                      onClick={() => {
                        setHidePassword((prev) => !prev);
                      }}
                    >
                      {hidePassword ? <Eye /> : <EyeOff />}
                    </button>
                  </div>
                  {errors.password && errors.password.message && (
                    <FormErrorMessage message={errors.password.message} />
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      role="confirm-new-password"
                      id="confirmPassword"
                      autoComplete="new-password"
                      type={hideConfirmPassword ? "password" : "text"}
                      required
                      placeholder="Confirm your new password"
                      {...register("confirmPassword", {
                        required: "Confirm password is required",
                        validate: (value) =>
                          value === passwordRef.current || "The passwords do not match",
                      })}
                    />
                    <button
                      tabIndex={-1}
                      data-testid="confirm-password-toggle"
                      className="absolute top-1/2 right-2.5 -translate-y-1/2"
                      aria-label={hideConfirmPassword ? "Show password" : "Hide password"}
                      type="button"
                      onClick={() => {
                        setHideConfirmPassword((prev) => !prev);
                      }}
                    >
                      {hideConfirmPassword ? <Eye /> : <EyeOff />}
                    </button>
                  </div>
                  {errors.confirmPassword && errors.confirmPassword.message && (
                    <FormErrorMessage message={errors.confirmPassword.message} />
                  )}
                </div>
                <Button
                  role="submit-btn"
                  disabled={isSubmitting}
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark dark:bg-primary dark:hover:bg-primary-dark transition-all duration-150 ease-linear dark:text-white"
                >
                  {isSubmitting ? (
                    <LoaderCircle data-testid="spinner" className="animate-spin" />
                  ) : (
                    <p>Reset Password</p>
                  )}
                </Button>
              </div>
              <div role="signin-nav" className="text-center text-sm">
                Remembered your password?{" "}
                <a href="/auth/signin" className="underline underline-offset-4 font-semibold">
                  Sign In
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
