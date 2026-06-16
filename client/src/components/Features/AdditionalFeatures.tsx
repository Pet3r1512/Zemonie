import { cn } from "@/lib/utils";
import {
  LockIcon,
  RefreshCwIcon,
  CalendarIcon,
  DownloadIcon,
  SparklesIcon,
  Award,
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
    badge: "New" as const,
  },
  {
    icon: CalendarIcon,
    title: "Smart Recurring Tracking",
    description: "We automatically keep bills, salary or subscriptions on recurring transactions.",
    badge: "Coming Soon" as const,
  },
  {
    icon: Target,
    title: "Budget & Savings",
    description: "Set budgets, track spending, and actually keep your savings on point.",
    badge: "Coming Soon" as const,
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
            <SparklesIcon size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Additional Features</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            And there's more
          </h2>

          <p className="text-xl text-gray-600 dark:text-gray-400">
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
                  "relative flex items-start p-6 rounded-xl bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-card/80 hover:border-primary transition-colors duration-200",
                  feature.badge === "Coming Soon" &&
                    "opacity-75 cursor-default pointer-events-none",
                )}
              >
                {feature.badge && (
                  <span
                    className={cn(
                      "absolute top-0 right-0 px-2 py-0.5 rounded-full text-xs font-semibold text-white cursor-default",
                      feature.badge === "New"
                        ? "bg-green-500 dark:bg-green-600"
                        : "bg-blue-400 dark:bg-blue-500",
                    )}
                  >
                    {feature.badge}
                  </span>
                )}

                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                  <Icon size={20} className="text-primary" />
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
