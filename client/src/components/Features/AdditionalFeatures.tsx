import { cn } from "@/lib/utils";
import {
  Award,
  CalendarIcon,
  DownloadIcon,
  LockIcon,
  RefreshCwIcon,
  SparklesIcon,
  Target,
} from "lucide-react";

const additionalFeatures = [
  {
    icon: LockIcon,
    title: "Your Data, Your Rules",
    description: "Your financial data stays private. No selling, no creepy tracking, no surprises.",
  },
  {
    icon: RefreshCwIcon,
    title: "Instant Sync Everywhere",
    description: "Update a transaction on one device and see it reflected everywhere in real time.",
  },
  {
    icon: CalendarIcon,
    title: "Smart Recurring Tracking",
    description: "We automatically keep bills, salary or subscriptions on recurring transactions.",
    badge: "New" as const,
  },
  {
    icon: Target,
    title: "Budget & Savings",
    description: "Set budgets, track spending, and actually keep your savings on point.",
    badge: "Developing" as const,
  },
  {
    icon: Award,
    title: "Level Up Your Money Game",
    description: "Get rewards, earn achievements, and see what your spending says about you.",
    badge: "Coming Soon" as const,
  },
  {
    icon: DownloadIcon,
    title: "Shareable Reports",
    description: "Generate clean reports and export your data whenever you need it.",
    badge: "Coming Soon" as const,
  },
];

export default function AdditionalFeatures() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#ff7900]/30 bg-[#ff7900]/10 mb-4">
            <SparklesIcon size={16} className="text-primary dark:text-[#ff9a3d]" />
            <span className="text-[13px] font-semibold text-primary dark:text-[#ff9a3d]">
              Additional Features
            </span>
          </div>

          <h2 className="font-display font-bold tracking-[-0.03em] text-3xl md:text-4xl text-gray-900 dark:text-white mb-4">
            And there's more
          </h2>

          <p className="text-xl text-gray-600 dark:text-[#b5b3b2]">
            Additional features to make your financial life easier
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalFeatures.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className={cn(
                  "relative flex items-start p-6 rounded-[14px] bg-white border border-gray-200 shadow-sm hover:border-[#ff7900]/40 transition-colors duration-200 dark:bg-[#08080a]/85 dark:backdrop-blur-xl dark:border-white/[0.07] dark:hover:border-[#ff7900]/30",
                  feature.badge === "Coming Soon" &&
                    "opacity-75 cursor-default pointer-events-none",
                )}
              >
                {feature.badge && (
                  <span
                    className={cn(
                      "absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-xs font-semibold border cursor-default",
                      feature.badge === "New"
                        ? "bg-green-100 text-green-700 border-green-300 dark:bg-emerald-400/15 dark:text-emerald-300 dark:border-emerald-400/30"
                        : "bg-blue-100 text-blue-700 border-blue-300 dark:bg-sky-400/15 dark:text-sky-300 dark:border-sky-400/30",
                    )}
                  >
                    {feature.badge}
                  </span>
                )}

                <div className="w-10 h-10 rounded-lg bg-[#ff7900]/10 flex items-center justify-center mr-4 shrink-0 dark:bg-[#ff7900]/12">
                  <Icon size={20} className="text-primary dark:text-[#ff9a3d]" />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-[#8b8988]">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
