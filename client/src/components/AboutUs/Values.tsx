import { Globe, Heart, Lightbulb, Shield } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "People First",
    description:
      "We build for real humans with real financial lives. Every decision starts with the question: does this genuinely help our users?",
  },
  {
    icon: Shield,
    title: "Trust by Design",
    description:
      "Your financial data is sensitive. We treat it that way — with transparent practices, strong security, and a strict no-selling policy.",
  },
  {
    icon: Lightbulb,
    title: "Clarity over Complexity",
    description:
      "Money is already complicated. Our job is to make it simpler — never to add another layer of jargon or noise.",
  },
  {
    icon: Globe,
    title: "Built for Everyone",
    description:
      "Financial wellness shouldn't be a luxury. We design for users at every income level, from first paycheck to retirement planning.",
  },
];

export default function Values() {
  return (
    <section className="py-20 px-4 bg-gray-50 dark:bg-transparent">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold tracking-[-0.03em] text-4xl text-gray-900 dark:text-white mb-4">
            What we believe
          </h2>
          <p className="text-xl text-gray-600 dark:text-[#b5b3b2]">
            The principles that guide every decision we make
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-[14px] bg-white border border-gray-200 shadow-sm hover:border-[#ff7900]/40 transition-colors duration-200 dark:bg-[#08080a]/85 dark:backdrop-blur-xl dark:border-white/[0.07] dark:hover:border-[#ff7900]/25"
              >
                <div className="w-12 h-12 rounded-xl bg-[#ff7900]/10 flex items-center justify-center mb-5 dark:bg-[#ff7900]/12">
                  <Icon size={24} className="text-primary dark:text-[#ff9a3d]" />
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-500 dark:text-[#8b8988] leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
