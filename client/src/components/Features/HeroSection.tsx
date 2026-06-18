import { SparklesIcon, } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6 cursor-default">
            <SparklesIcon size={16} className="text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Powerful Features</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Everything you need to
            <br />
            <span className="text-primary">master your money</span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Powerful tools and intelligent insights to help you take control of your financial
            future.
          </p>
        </div>
      </div>
    </section>
  );
}
