import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye } from "lucide-react";

export default function UpdatePassword() {
  return (
    <div className="px-6 md:px-10">
      <form>
        <FieldGroup className="md:w-1/2">
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
                type="text"
                role="currentPasswordInput"
                className="h-10 bg-white dark:bg-dark-card/50 border-neutral-200 dark:border-dark-elevated text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
              />
              <button
                tabIndex={-1}
                type="button"
                data-testid="currentpassword-toggle"
                className="absolute top-1/2 right-2.5 -translate-y-1/2"
              >
                <Eye />
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
                type="text"
                role="newPasswordConfirmInput"
                className="h-10 bg-white dark:bg-dark-card/50 border-neutral-200 dark:border-dark-elevated text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
              />
              <button
                tabIndex={-1}
                type="button"
                data-testid="newpassword-confirm-toggle"
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
