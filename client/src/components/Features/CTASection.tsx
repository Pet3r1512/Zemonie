import { Link } from "@tanstack/react-router";
import { ArrowRightIcon } from "lucide-react";

const BTN_GRADIENT = "linear-gradient(135deg, #ff9d33 0%, #ff7900 55%, #ff6200 100%)";

export default function CTASection() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="relative overflow-hidden rounded-[14px] border border-gray-200 bg-white p-12 shadow-xl dark:border-[#ff7900]/25 dark:bg-[#08080a]/85 dark:backdrop-blur-xl dark:shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#ff7900_18%,#ffc48a_50%,#ff7900_82%,transparent)] shadow-[0_0_16px_2px_rgba(255,121,0,0.6)]" />

          <h2 className="font-display font-bold tracking-[-0.03em] text-3xl md:text-4xl text-gray-900 dark:text-white mb-6">
            Ready to take control of your finances?
          </h2>

          <p className="text-xl text-gray-600 dark:text-[#b5b3b2] mb-8">
            Join thousands of users who are already managing their money smarter.
          </p>

          <Link
            to="/auth/signup"
            className="inline-flex items-center justify-center rounded-full px-[26px] py-[13px] text-[14.5px] font-semibold text-[#1a0c00] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_28px_rgba(255,121,0,0.5)]"
            style={{ backgroundImage: BTN_GRADIENT }}
          >
            Get Started Free
            <ArrowRightIcon size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
