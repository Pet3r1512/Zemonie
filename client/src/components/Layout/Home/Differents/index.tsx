import { SparklesIcon } from "lucide-react";

export default function Differents() {
  return (
    <section className="relative py-20 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6 cursor-default">
            <SparklesIcon size={16} className="text-primary mr-2" />
            <span className="text-sm font-medium text-primary">Built Different</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Finance tools built for
            <br />
            <span className="text-primary">real life</span>, not your banker
          </h1>
        </div>
      </div>
    </section>
  );
}
