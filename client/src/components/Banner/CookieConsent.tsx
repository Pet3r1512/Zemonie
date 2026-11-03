import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "./useCookieConsent";

export default function CookieConsent() {
  const { visible, accept } = useCookieConsent();

  if (!visible) return null;

  return (
    <section
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-4 rounded-2xl border border-black/5 bg-white p-4 shadow-md sm:flex-row sm:items-center sm:justify-between sm:p-5 dark:border-white/10 dark:bg-dark-card">
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Cookie className="size-4.5" aria-hidden="true" />
          </span>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            We use essential cookies to keep you signed in and secure. Zemonie doesn&apos;t use
            tracking or advertising cookies.{" "}
            <Link to="/cookie-policy" className="font-semibold text-primary hover:underline">
              Cookie Policy
            </Link>
          </p>
        </div>
        <Button
          onClick={accept}
          className="w-full shrink-0 bg-primary dark:bg-primary/85 dark:text-white text-white hover:bg-primary/90 sm:w-auto"
        >
          Got it
        </Button>
      </div>
    </section>
  );
}
