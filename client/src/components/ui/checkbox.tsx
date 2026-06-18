import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-oklch(0.922 0 0) border-oklch(0.205 0 0) ring-offset-oklch(1 0 0) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oklch(0.708 0 0) focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-oklch(0.205 0 0) data-[state=checked]:text-oklch(0.985 0 0) dark:border-oklch(1 0 0 / 10%) dark:border-oklch(0.922 0 0) dark:ring-offset-oklch(0.145 0 0) dark:focus-visible:ring-oklch(0.556 0 0) dark:data-[state=checked]:bg-oklch(0.922 0 0) dark:data-[state=checked]:text-oklch(0.205 0 0)",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className={cn("grid place-content-center text-current")}>
      <Check className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
