import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function UpdatePassword() {
  const [hideCurrentPassword, setHideCurrentPassword] = useState<boolean>(true);
  const [hideNewPassword, setHideNewPassword] = useState<boolean>(true);
  const [hideNewConfirmPassword, setHideNewConfirmPassword] = useState<boolean>(true);

  return (
    <div className="px-6 md:px-10  md:max-w-xl lg:max-w-2xl">
      <form>
        <FieldGroup>
          <Field>
            <Label
              htmlFor="currentPassword"
              className="text-sm font-medium text-neutral-900 dark:text-neutral-100"
            >
              Current Password
            </Label>
            <div className="relative">
              <Input
                id="currentPassword"
                type={hideCurrentPassword ? "password" : "text"}
                role="currentPasswordInput"
                className="h-10 bg-white dark:bg-dark-card/50 border-neutral-200 dark:border-dark-elevated text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
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
          </Field>
          <Field>
            <Label
              htmlFor="newPassword"
              className="text-sm font-medium text-neutral-900 dark:text-neutral-100"
            >
              New Password
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={hideNewPassword ? "password" : "text"}
                role="newPasswordInput"
                className="h-10 bg-white dark:bg-dark-card/50 border-neutral-200 dark:border-dark-elevated text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
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
          </Field>
          <Field>
            <Label
              htmlFor="newPassword"
              className="text-sm font-medium text-neutral-900 dark:text-neutral-100"
            >
              Confirm New Password
            </Label>
            <div className="relative">
              <Input
                id="newPasswordConfirm"
                type={hideNewConfirmPassword ? "password" : "text"}
                role="newPasswordConfirmInput"
                className="h-10 bg-white dark:bg-dark-card/50 border-neutral-200 dark:border-dark-elevated text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
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
          </Field>
          <Field>
            <Label
              htmlFor="newPassword"
              className="text-sm font-medium text-neutral-900 dark:text-neutral-100"
            >
              New Password
            </Label>
            <div className="relative">
              <Input
                id="newPassword"
                type="text"
                role="newPasswordInput"
                className="h-10 bg-white dark:bg-dark-card/50 border-neutral-200 dark:border-dark-elevated text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
              />
              <button
                tabIndex={-1}
                type="button"
                data-testid="newpassword-toggle"
                className="absolute top-1/2 right-2.5 -translate-y-1/2"
              >
                <Eye />
              </button>
            </div>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
