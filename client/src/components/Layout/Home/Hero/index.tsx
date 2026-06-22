import { AuroraTextEffect } from "@/components/ui/lightswind/aurora-text-effect";

export default function Hero() {
  return (
    <section
      aria-label="hero-section"
      className="lg:mt-24 max-w-6xl mx-auto px-5 pb-32 lg:px-0 lg:pt-28 relative"
    >
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-5">
        <div className="lg:w-2/5 text-center lg:text-left space-y-5 relative z-10 backdrop-blur-[2px]">
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-semibold tracking-tight text-balance text-gray-900 dark:text-white sm:text-7xl">
            Manage Your Finances with{" "}
          </h1>
          <AuroraTextEffect className="bg-transparent lg:w-fit" text="Zemonie" />
          <p
            role="description"
            className="text-md lg:text-lg font-medium text-pretty text-gray-500 dark:text-gray-300 sm:text-xl/8"
          >
            Zemonie is the <span className="text-primary">all-in-one</span> money management tool
            that helps you track your income, label your expenses, and visualize your financial
            data. Get started today and achieve your financial goals.
          </p>
          <div
            role="action-buttons"
            className="flex items-center gap-x-6 justify-center lg:justify-start"
          >
            <a
              href="/auth/signin"
              className="rounded-md bg-primary/95 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Get started
            </a>
            <a
              href="/features"
              className="text-sm/6 font-semibold text-gray-900 dark:text-white bg-white dark:bg-dark-card px-3.5 py-2.5 rounded-md"
            >
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="flex-1 relative w-full lg:-ml-32 z-0 transform-3d perspective-[1250px] mt-5 md:mt-12 lg:mt-0">
          <div
            className="rounded-2xl overflow-hidden relative z-20 bg-image-light dark:bg-image-dark bg-cover brightness-95 dark:brightness-100 shadow-2xl w-auto object-cover h-40 md:h-96"
            style={{
              transform: "rotateY(-25deg) rotateX(10deg) rotateZ(15deg)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
