import { Link } from "@tanstack/react-router";
import Starfield from "@/components/Layout/Starfield";
import { Info, Play } from "lucide-react";

const BTN_GRADIENT = "linear-gradient(135deg, #ff9d33 0%, #ff7900 55%, #ff6200 100%)";

export default function CTASection() {
  return (
    <section
      aria-label="get-started"
      className="relative overflow-hidden px-4 py-16 md:py-24 dark:bg-black"
    >
      <Starfield seed={1337} className="hidden dark:block" />
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-[14px] border border-gray-200 bg-white p-12 text-center shadow-xl dark:border-[#ff7900]/25 dark:bg-[#08080a]/85 dark:backdrop-blur-xl dark:shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#ff7900_18%,#ffc48a_50%,#ff7900_82%,transparent)] shadow-[0_0_16px_2px_rgba(255,121,0,0.6)]" />

          <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-gray-900 dark:text-white md:text-4xl">
            Get started today and achieve your financial goals.
          </h2>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <Link
              to="/auth/signin"
              className="inline-flex w-52 items-center justify-center gap-2 rounded-full px-[26px] py-[13px] text-[14.5px] font-semibold text-[#1a0c00] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_28px_rgba(255,121,0,0.5)]"
              style={{ backgroundImage: BTN_GRADIENT }}
            >
              <Play size={17} />
              Get started
            </Link>
            <Link
              to="/features"
              className="inline-flex w-52 items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-[26px] py-[13px] text-[14.5px] font-semibold text-gray-900 transition-all duration-200 hover:border-[#ff7900]/40 hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.09] dark:hover:shadow-[0_0_24px_rgba(255,121,0,0.25)]"
            >
              <Info size={17} />
              Explore features
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
