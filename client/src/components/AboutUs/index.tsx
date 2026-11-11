import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import Team from "./Team";
import Timeline from "./Timeline";
import Values from "./Values";

const BTN_GRADIENT = "linear-gradient(135deg, #ff9d33 0%, #ff7900 55%, #ff6200 100%)";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="relative py-24 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(255,121,0,0.12),transparent)]" />
          <div className="max-w-5xl mx-auto relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ff7900]/30 bg-[#ff7900]/10 mb-6 cursor-default">
              <Sparkles size={16} className="text-primary dark:text-[#ff9a3d]" />
              <span className="text-[13px] font-semibold text-primary dark:text-[#ff9a3d]">
                Our Story
              </span>
            </div>
            <h1 className="font-display font-bold tracking-[-0.03em] text-gray-900 dark:text-white text-4xl md:text-5xl lg:text-6xl mb-6">
              We're building the
              <br />
              <span className="text-primary">future of personal finance</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-[#b5b3b2] max-w-3xl mx-auto">
              <strong className="text-primary">Zemonie</strong> started with a simple belief:
              managing money should feel empowering, not overwhelming. We're here to make that real.
            </p>
          </div>
        </section>

        <Values />
        <Timeline />
        <Team />

        {/* CTA */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-[14px] border border-gray-200 bg-white p-12 md:p-16 text-center shadow-xl dark:border-[#ff7900]/25 dark:bg-[#08080a]/85 dark:backdrop-blur-xl dark:shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
              <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#ff7900_18%,#ffc48a_50%,#ff7900_82%,transparent)] shadow-[0_0_16px_2px_rgba(255,121,0,0.6)]" />
              <TrendingUp size={48} className="text-primary dark:text-[#ff9a3d] mx-auto mb-6" />
              <h2 className="font-display font-bold tracking-[-0.03em] text-3xl md:text-4xl text-gray-900 dark:text-white mb-4">
                Join us on the journey
              </h2>
              <p className="text-xl text-gray-600 dark:text-[#b5b3b2] mb-8 max-w-2xl mx-auto">
                Whether you're just starting or scaling up, we'd love to help you take control of
                your finances.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/auth/signup"
                  className="inline-flex items-center justify-center rounded-full px-8 py-4 font-semibold text-[#1a0c00] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_28px_rgba(255,121,0,0.5)]"
                  style={{ backgroundImage: BTN_GRADIENT }}
                >
                  Get Started Free
                  <ArrowRight size={20} className="ml-2" />
                </Link>
                <a
                  href="https://github.com/Pet3r1512/Zemonie"
                  target="_blank"
                  className="inline-flex items-center justify-center rounded-full px-8 py-4 border border-gray-200 bg-white font-semibold text-gray-900 transition-all duration-200 hover:border-[#ff7900]/40 hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.09]"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
