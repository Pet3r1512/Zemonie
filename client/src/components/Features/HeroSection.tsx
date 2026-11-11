import { SparklesIcon } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-28 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_0%,rgba(255,121,0,0.12),transparent)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ff7900]/30 bg-[#ff7900]/10 mb-6 cursor-default">
            <SparklesIcon size={16} className="text-primary dark:text-[#ff9a3d]" />
            <span className="text-[13px] font-semibold text-primary dark:text-[#ff9a3d]">
              Powerful Features
            </span>
          </div>

          <h1 className="font-display font-bold tracking-[-0.03em] text-gray-900 dark:text-white text-4xl md:text-5xl lg:text-6xl mb-6">
            Everything you need to
            <br />
            <span className="text-primary">master your money</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-[#b5b3b2] max-w-3xl mx-auto">
            Powerful tools and intelligent insights to help you take control of your financial
            future.
          </p>
        </div>
      </div>
    </section>
  );
}
