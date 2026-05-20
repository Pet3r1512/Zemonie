import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <a data-testid="logo-wrapper" className="w-fit" href="/">
      <img
        className={cn("w-auto h-18 md:h-24 lg:h-32", className)}
        src="/logo/Full_Logo.png"
        alt="Clario Logo"
      />
    </a>
  );
}
