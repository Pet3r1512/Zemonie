import { Globe, Heart, Lightbulb, Shield, } from "lucide-react";

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
    <section className="py-20 px-4 bg-gray-50 dark:bg-dark-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">What we believe</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            The principles that guide every decision we make
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((value, index,) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-card"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            );
          },)}
        </div>
      </div>
    </section>
  );
}
