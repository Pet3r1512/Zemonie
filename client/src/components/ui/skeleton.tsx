import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-testid="skeleton"
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-gray-100 dark:bg-white/[0.06]", className)}
      {...props}
    />
  );
}

export { Skeleton };
