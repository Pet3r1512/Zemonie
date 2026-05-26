import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <a data-testid="logo-wrapper" className="w-fit" href="/">
      <img
        className={cn("h-12 md:h-14 lg:h-18! w-auto", className)}
        src="/logo/zemonie-wordmark-light.svg"
        alt="Zemonie Logo"
      />
    </a>
  );
}
