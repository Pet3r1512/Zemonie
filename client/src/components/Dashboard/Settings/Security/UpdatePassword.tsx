import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
            </div>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
