import { ArrowDownUpIcon, BarChart3Icon, CheckIcon, PieChartIcon, TagIcon } from "lucide-react";

const features = [
  {
    icon: ArrowDownUpIcon,
    title: "Transaction Tracking",
    description:
      "Log income and expenses, edit past entries, and mark transactions as recurring — everything stays organised and up to date.",
    benefits: [
      "Add, edit & delete entries",
      "Recurring transactions",
      "Transaction history",
      "Fast entry flow",
    ],
  },
  {
    icon: TagIcon,
    title: "Category Management",
    description:
      "Assign every transaction to a category — from salary to subscriptions — so your money always tells a clear story.",
    benefits: [
      "Predefined categories",
      "Income & expense types",
      "Filter by category",
      "Clean organisation",
    ],
  },
  {
    icon: BarChart3Icon,
    title: "Spending Analysis",
    description:
      "See monthly summaries, compare income vs expenses, and drill into category breakdowns — all updated in real time.",
    benefits: [
      "Monthly summaries",
      "Income vs expense view",
      "Category breakdowns",
      "Net savings overview",
    ],
  },
  {
    icon: PieChartIcon,
    title: "Visual Reports",
    description:
      "Your finances at a glance. Pie charts, bar charts, and a clean dashboard — no spreadsheets, just clarity.",
    benefits: [
      "At-a-glance pie & bar charts",
      "Balance overview",
      "Last 7 days view",
      "Daily net summary",
    ],
  },
];

export default function MainFeaturesGrid() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="group relative bg-white rounded-[14px] p-8 transition-all duration-300 border border-gray-200 shadow-sm hover:border-[#ff7900]/40 hover:shadow-md dark:bg-[#08080a]/85 dark:backdrop-blur-xl dark:border-white/[0.07] dark:hover:border-[#ff7900]/30 dark:hover:shadow-[0_0_40px_rgba(255,121,0,0.08)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#ff7900_20%,#ffc48a_50%,#ff7900_80%,transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_14px_2px_rgba(255,121,0,0.5)]" />

                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-[#ff9d33] to-[#ff6200] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={28} className="text-white" />
                </div>

                <h3 className="font-display text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-500 dark:text-[#8b8988] mb-6">{feature.description}</p>

                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-center text-sm text-gray-600 dark:text-[#b5b3b2]"
                    >
                      <CheckIcon
                        size={16}
                        className="text-primary mr-2 shrink-0 dark:text-[#ff9a3d]"
                      />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="absolute inset-0 rounded-[14px] bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
