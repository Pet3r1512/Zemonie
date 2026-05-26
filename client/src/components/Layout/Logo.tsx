import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <a data-testid="logo-wrapper" className="w-fit" href="/">
      <img
        className={cn("h-8 md:h-10 lg:h-12! w-auto bg-transparent", className)}
        src="/logo/zemonie_logo.webp"
        alt="Zemonie Logo"
      />
    </a>
  );
}
