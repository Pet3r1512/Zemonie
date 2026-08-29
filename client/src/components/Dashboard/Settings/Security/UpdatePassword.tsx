import FormErrorMessage from "@/components/Auth/FormErrorMessage";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Save } from "lucide-react";
import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export interface UpdatePassswordFormType {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

const onSubmit: SubmitHandler<UpdatePassswordFormType> = (credentials) => {
  console.log(credentials);
};

export default function UpdatePassword() {
  const [hideCurrentPassword, setHideCurrentPassword] = useState<boolean>(true);
  const [hideNewPassword, setHideNewPassword] = useState<boolean>(true);
  const [hideNewConfirmPassword, setHideNewConfirmPassword] = useState<boolean>(true);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePassswordFormType>();

  const newPasswordRef = useRef({});
  const currentPasswordRef = useRef({});
  newPasswordRef.current = watch("newPassword", "");
  currentPasswordRef.current = watch("currentPassword", "");

  return (
    <div className="px-6 md:px-10  md:max-w-xl lg:max-w-2xl">
      <form role="form" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <Label
              htmlFor="currentPassword"
              className="text-sm font-medium text-neutral-900 dark:text-neutral-100"
            >
              Current Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={hideCurrentPassword ? "password" : "text"}
                role="currentPasswordInput"
                className="h-10 bg-white dark:bg-dark-card/50 border-neutral-200 dark:border-dark-elevated text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                {...register("currentPassword", {
                  required: "Current password is required",
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
                type="button"
                data-testid="currentpassword-toggle"
                aria-label={hideCurrentPassword ? "Show current password" : "Hide current password"}
                className="absolute top-1/2 right-2.5 -translate-y-1/2"
                onClick={() => {
                  setHideCurrentPassword((prev) => !prev);
                }}
              >
                {hideCurrentPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            {errors.currentPassword && errors.currentPassword?.message && (
              <FormErrorMessage message={errors.currentPassword.message} />
            )}
          </Field>
          <Field>
            <Label
              htmlFor="newPassword"
              className="text-sm font-medium text-neutral-900 dark:text-neutral-100"
            >
              New Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={hideNewPassword ? "password" : "text"}
                role="newPasswordInput"
                className="h-10 bg-white dark:bg-dark-card/50 border-neutral-200 dark:border-dark-elevated text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  pattern: {
                    value: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/,
                    message: "Minimum 8 characters, at least one letter and one number",
                  },
                  validate: (value) =>
                    value !== currentPasswordRef.current ||
                    "New password must different with current password",
                })}
              />
              <button
                tabIndex={-1}
                type="button"
                data-testid="newpassword-toggle"
                aria-label={hideNewPassword ? "Show new password" : "Hide new password"}
                className="absolute top-1/2 right-2.5 -translate-y-1/2"
                onClick={() => {
                  setHideNewPassword((prev) => !prev);
                }}
              >
                {hideNewPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            {errors.newPassword && errors.newPassword.message && (
              <FormErrorMessage message={errors.newPassword.message} />
            )}
          </Field>
          <Field>
            <Label
              htmlFor="newPassword"
              className="text-sm font-medium text-neutral-900 dark:text-neutral-100"
            >
              Confirm New Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="newPasswordConfirm"
                type={hideNewConfirmPassword ? "password" : "text"}
                role="newPasswordConfirmInput"
                className="h-10 bg-white dark:bg-dark-card/50 border-neutral-200 dark:border-dark-elevated text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
                {...register("newPasswordConfirm", {
                  required: "New password confirm is required",
                  validate: (value) =>
                    value === newPasswordRef.current || "The passwords do not match",
                })}
              />
              <button
                tabIndex={-1}
                type="button"
                data-testid="newpassword-confirm-toggle"
                aria-label={
                  hideNewConfirmPassword ? "Show confirm password" : "Hide confirm password"
                }
                className="absolute top-1/2 right-2.5 -translate-y-1/2"
                onClick={() => {
                  setHideNewConfirmPassword((prev) => !prev);
                }}
              >
                {hideNewConfirmPassword ? <Eye /> : <EyeOff />}
              </button>
            </div>
            {errors.newPasswordConfirm && errors.newPasswordConfirm.message && (
              <FormErrorMessage message={errors.newPasswordConfirm.message} />
            )}
          </Field>
          <Button role="submit-btn" type="submit" className="w-fit ml-auto">
            <Save />
            Update Password
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
