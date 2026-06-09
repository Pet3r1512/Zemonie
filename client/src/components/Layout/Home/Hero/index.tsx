import { AuroraTextEffect } from "@/components/ui/lightswind/aurora-text-effect";
import Screenshot from "./Screenshot";

export default function Hero() {
  return (
    <section
      aria-label="hero-section"
      className="lg:mt-24 text-center max-w-6xl mx-auto space-y-10"
    >
      <div className="space-y-5">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance text-gray-900 dark:text-white sm:text-7xl">
          Manage Your Finances with{" "}
        </h1>
        <AuroraTextEffect className="bg-transparent" text="Zemonie" />
      </div>
      <p
        role="description"
        className="mt-8 text-md lg:text-lg font-medium text-pretty text-gray-500 dark:text-gray-300 sm:text-xl/8"
      >
        Zemonie is the <span className="text-primary">all-in-one</span> money management tool that
        helps you track your income, label your expenses, and visualize your financial data. Get
        started today and achieve your financial goals.
      </p>
      <div role="action-buttons" className="mt-10 flex items-center justify-center gap-x-6">
        <a
          href="/auth/signin"
          className="rounded-md bg-primary/95 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Get started
        </a>
        <a
          href="/features"
          className="text-sm/6 font-semibold text-gray-900 dark:text-white bg-white dark:bg-neutral-800 px-3.5 py-2.5 rounded-md"
        >
          Learn more <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className="relative lg:mt-24">
        <div className="border border-gray-400 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-950 relative z-20">
          <Screenshot />
        </div>
        <div className="absolute -inset-1 rounded-md blur-md bg-linear-to-br from-primary via-primary/85 to-primary/60 z-10"></div>
      </div>
    </section>
  );
}
