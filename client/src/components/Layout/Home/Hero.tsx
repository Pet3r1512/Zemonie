import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { useReleaseBannerVisible } from "@/hooks/useReleaseBanner";
import { cn } from "@/lib/utils";

const BTN_GRADIENT = "linear-gradient(135deg, #ff9d33 0%, #ff7900 55%, #ff6200 100%)";
const NAME_GRADIENT = "linear-gradient(105deg, #ffb257, #ff7900 52%, #ff5e00)";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SHOWCASE_WIDTH = 2400;
const SHOWCASE_HEIGHT = 1488;

const copyVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
};

const showcaseVariants: Variants = {
  hidden: { opacity: 0, y: 90 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, delay: 0.55, ease: EASE } },
};

function GetStarted({ className, label = "Get Started" }: { className?: string; label?: string }) {
  return (
    <Link
      to="/auth/signup"
      className={cn(
        "inline-flex items-center justify-center rounded-full px-[26px] py-[13px] text-[14.5px] font-semibold text-[#1a0c00] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_28px_rgba(255,121,0,0.5)]",
        className,
      )}
      style={{ backgroundImage: BTN_GRADIENT }}
    >
      {label}
    </Link>
  );
}

function HeroCopy() {
  const lines = [
    <>
      <span className="bg-clip-text text-transparent" style={{ backgroundImage: NAME_GRADIENT }}>
        Zemonie
      </span>{" "}
      Master Your Money,
    </>,
    <>Smarter, Faster, Safer.</>,
  ];

  return (
    <div className="text-center">
      <h1 className="font-display text-[38px] leading-[1] font-bold tracking-[-0.03em] sm:text-[50px] md:text-[64px] lg:text-[84px] lg:leading-[0.92]">
        {lines.map((line, index) => (
          <span key={index} className="block overflow-hidden pb-[0.24em]">
            <motion.span
              className="block"
              variants={{
                hidden: { y: "140%" },
                show: {
                  y: "0%",
                  transition: { duration: 0.85, delay: 0.22 + index * 0.14, ease: EASE },
                },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
      <motion.p
        className="mx-auto mt-5 max-w-[880px] text-[15px] leading-[1.65] text-gray-600 md:text-[16.5px] lg:mt-6 lg:leading-[1.7] dark:text-[#b5b3b2]"
        variants={{
          hidden: { opacity: 0, y: 22 },
          show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.56, ease: EASE } },
        }}
      >
        The first fully integrated money management experience. No spreadsheets, no guesswork —
        Zemonie empowers you to track income, label expenses, and grow your savings from one clean
        dashboard.
      </motion.p>
      <motion.div
        className="mt-8 flex items-center justify-center gap-3.5"
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.65, delay: 0.68, ease: EASE } },
        }}
      >
        <GetStarted />
        <Link
          to="/features"
          className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-[26px] py-[13px] text-[14.5px] font-semibold text-gray-900 transition-all duration-200 hover:border-[#ff7900]/40 hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.09] dark:hover:shadow-[0_0_24px_rgba(255,121,0,0.25)]"
        >
          Learn More
        </Link>
      </motion.div>
    </div>
  );
}

function DashboardShowcase() {
  const shared = "mx-auto block h-auto w-full max-w-[1200px]";

  return (
    <motion.div className="relative mt-14 w-full md:mt-20" variants={showcaseVariants}>
      <img
        src="/screenshots/Hero-dashboard-light.webp"
        alt="Zemonie dashboard preview"
        width={SHOWCASE_WIDTH}
        height={SHOWCASE_HEIGHT}
        loading="lazy"
        decoding="async"
        className={cn(shared, "drop-shadow-[0_18px_36px_rgba(255,121,0,0.22)] dark:hidden")}
      />
      <img
        src="/screenshots/Hero-dashboard-dark.webp"
        alt="Zemonie dashboard preview in dark mode"
        width={SHOWCASE_WIDTH}
        height={SHOWCASE_HEIGHT}
        loading="lazy"
        decoding="async"
        className={cn(shared, "hidden drop-shadow-[0_24px_60px_rgba(255,121,0,0.18)] dark:block")}
      />
    </motion.div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const [bannerVisible] = useReleaseBannerVisible();
  const bannerOffset = bannerVisible ? 44 : 0;
  const initial: "hidden" | "show" = reduced ? "show" : "hidden";

  return (
    <section
      aria-label="Zemonie hero"
      className="relative w-full overflow-hidden px-5 pb-16 font-ui text-gray-900 md:pb-24 dark:bg-black dark:text-[#f7f7f8]"
      style={{ paddingTop: 130 + bannerOffset }}
    >
      <motion.div
        className="mx-auto flex max-w-[1200px] flex-col items-center"
        initial={initial}
        animate="show"
        variants={copyVariants}
      >
        <HeroCopy />
        <DashboardShowcase />
      </motion.div>
    </section>
  );
}
