import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { SignUpFormType } from "@/lib/types/signupform";
import FormErrorMessage from "../FormErrorMessage";
import { useMutation } from "@tanstack/react-query";
import SignUpEmail from "@/api/users/auth/SignUpEmail";
import { toast } from "sonner";
import SignInViaGoogleBtn from "../SignInViaGoogleBtn";
import { Link, useRouter } from "@tanstack/react-router";
import Logo from "@/components/Layout/Logo";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field";

export default function SignUpForm({ className }: { className?: string }) {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState<boolean>(true);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormType>();

  const mutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: SignUpEmail,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
        return toast.error(
          "This Email Is Existed. Please Sign In or Use Another Email",
        );
      }
      return toast.error(
        error.message || "Something went wrong. Please try again.",
      );
    },
    onSuccess: (res) => {
      toast.success(res.user.name + ", Everything is done!");
      return setTimeout(() => {
        router.navigate({ to: "/dashboard" });
      }, 1250);
    },
  });

  const passwordRef = useRef({});
  passwordRef.current = watch("password", "");

  const onSubmit: SubmitHandler<SignUpFormType> = (credential) => {
    mutation.mutate(credential);
  };

  return (
    <div
      data-testid="signup-form-container"
      className={cn(
        "flex flex-col gap-6 w-full md:max-w-106.25 lg:max-w-lg",
        className,
      )}
    >
      <Card className="dark:bg-black/50 shadow-2xl">
        <CardHeader className="text-center flex flex-col items-center gap-y-3">
          <Logo />
          <CardTitle className="text-xl lg:text-2xl text-primary-dark">
            Create An Account
          </CardTitle>
          <CardDescription>
            Sign up to get started with <strong>Zemonie</strong>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInViaGoogleBtn />
          <form role="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-6">
              <p className="bg-card text-center text-muted-foreground relative z-10 px-2 mt-8">
                Or continue with
              </p>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    role="email-input"
                    id="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="example@email.com"
                  />
                  {errors.email && errors.email.message && (
                    <FormErrorMessage message={errors.email.message} />
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    role="name-input"
                    id="name"
                    type="text"
                    placeholder="Zemonie"
                    {...register("name", {
                      required: "Your name is required",
                      minLength: {
                        value: 2,
                        message: "Name is too short",
                      },
                      pattern: {
                        value: /^[A-Za-z]+(?: [A-Za-z]+)*$/,
                        message: "Please enter a valid name using letters only",
                      },
                    })}
                  />
                  {errors.name && errors.name.message && (
                    <FormErrorMessage message={errors.name.message} />
                  )}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      role="password"
                      id="password"
                      autoComplete="off"
                      type={hidePassword ? "password" : "text"}
                      required
                      {...register("password", {
                        minLength: {
                          value: 8,
                          message:
                            "Password must be at least 8 characters long",
                        },
                        pattern: {
                          value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                          message:
                            "Minimum 8 characters, at least one letter and one number",
                        },
                      })}
                    />
                    <button
                      tabIndex={-1}
                      data-testid="password-toggle"
                      className="absolute top-1/2 right-2.5 -translate-y-1/2"
                      aria-label={
                        hidePassword ? "Show password" : "Hide password"
                      }
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
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      role="confirmPassword"
                      id="confirmPassword"
                      autoComplete="off"
                      type={hideConfirmPassword ? "password" : "text"}
                      required
                      {...register("confirmPassword", {
                        validate: (value) =>
                          value === passwordRef.current ||
                          "The passwords do not match",
                      })}
                    />

                    <button
                      tabIndex={-1}
                      data-testid="confirm-password-toggle"
                      className="absolute top-1/2 right-2.5 -translate-y-1/2"
                      aria-label={
                        hidePassword ? "Show password" : "Hide password"
                      }
                      type="button"
                      onClick={() => {
                        setHideConfirmPassword((prev) => !prev);
                      }}
                    >
                      {hideConfirmPassword ? <Eye /> : <EyeOff />}
                    </button>
                  </div>
                  {errors.confirmPassword && errors.confirmPassword.message && (
                    <FormErrorMessage
                      message={errors.confirmPassword.message}
                    />
                  )}
                </div>
                <Field
                  orientation="horizontal"
                  className="rounded-lg border border-oklch(0.922 0 0) p-3 transition-colors has-data-[state=checked]:border-primary has-data-[state=checked]:bg-primary/5 dark:border-oklch(1 0 0 / 10%) dark:has-data-[state=checked]:bg-primary/10"
                >
                  <Checkbox
                    id="terms"
                    name="terms"
                    className="mt-0.5 h-5 w-5 shrink-0"
                  />
                  <FieldContent>
                    <FieldLabel
                      htmlFor="terms"
                      className="font-normal cursor-pointer"
                    >
                      Accept{" "}
                      <Link
                        className="underline underline-offset-1 lg:hover:text-secondary transition-all duratio-150 ease-linear"
                        target="_blank"
                        to={"/terms"}
                      >
                        terms
                      </Link>{" "}
                      and{" "}
                      <Link
                        className="underline underline-offset-1 lg:hover:text-secondary transition-all duratio-150 ease-linear"
                        target="_blank"
                        to={"/privacy"}
                      >
                        privacy policies
                      </Link>
                    </FieldLabel>
                    <FieldDescription>
                      By clicking this checkbox, you agree to the terms.
                    </FieldDescription>
                  </FieldContent>
                </Field>
                <Button
                  role="submit-btn"
                  disabled={mutation.isPending}
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark"
                >
                  {mutation.isPending ? (
                    <LoaderCircle className="animate-spin" />
                  ) : (
                    <p>Create New Account</p>
                  )}
                </Button>
              </div>
              <div role="signin-nav" className="text-center text-sm">
                Already have an account?{" "}
                <a
                  href="/auth/signin"
                  className="underline underline-offset-4 font-semibold"
                >
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
