import { AuroraTextEffect } from "@/components/ui/lightswind/aurora-text-effect";

export default function Hero() {
  return (
    <section
      aria-label="hero-section"
      className="max-w-6xl mx-auto px-5 pt-20 pb-0 lg:px-0 lg:pt-28 relative overflow-hidden"
    >
      <div className="flex flex-col items-center text-center gap-6 relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-balance text-gray-900 dark:text-white max-w-2xl">
          Manage Your Finances with{" "}
          <AuroraTextEffect className="bg-transparent inline-block" text="Zemonie" />
        </h1>

        <p
          role="description"
          className="text-base lg:text-lg font-medium text-pretty text-white max-w-xl"
        >
          Zemonie is the <span className="text-primary">all-in-one</span> money management tool that
          helps you track your income, label your expenses, and visualize your financial data. Get
          started today and achieve your financial goals.
        </p>

        <div role="action-buttons" className="flex items-center gap-x-4">
          <a
            href="/auth/signin"
            className="rounded-full bg-primary/95 px-5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-colors"
          >
            Get started
          </a>
          <a
            href="/features"
            className="text-sm font-semibold text-gray-900 dark:text-white bg-white dark:bg-dark-card border border-gray-200 dark:border-white/10 px-5 py-2.5 rounded-full transition-colors hover:bg-gray-50 dark:hover:bg-white/5"
          >
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      <div className="relative z-0 mt-14 mx-auto w-full max-w-5xl">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-white dark:from-dark-bg to-transparent z-10 pointer-events-none rounded-b-2xl" />

        <div className="rounded-2xl overflow-hidden shadow-2xl ring-1 ring-gray-900/10 dark:ring-white/10 brightness-[0.97] dark:brightness-100">
          <img
            src="/screenshots/Dashboard-light.webp"
            className="w-full h-auto block dark:hidden"
            alt="Zemonie dashboard screenshot"
          />
          <img
            src="/screenshots/Dashboard-dark.webp"
            className="w-full h-auto hidden dark:block"
            alt="Zemonie dashboard screenshot"
          />
        </div>
      </div>
    </section>
  );
}
