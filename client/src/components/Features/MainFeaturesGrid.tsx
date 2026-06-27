import { ArrowDownUpIcon, BarChart3Icon, CheckIcon, PieChartIcon, TagIcon } from "lucide-react";

const features = [
  {
    icon: ArrowDownUpIcon,
    title: "Transaction Tracking",
    description:
      "Log your income and expenses quickly and easily. Every transaction is stored and organised so nothing slips through the cracks.",
    color: "from-blue-500 to-cyan-500",
    benefits: [
      "Add income & expenses",
      // "Edit or delete entries",
      "Transaction history",
      "Fast entry flow",
    ],
  },
  {
    icon: TagIcon,
    title: "Category Management",
    description:
      "Assign transactions to meaningful categories — from groceries to salary — so your money always has a label and a story.",
    color: "from-green-500 to-emerald-500",
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
      "Understand where your money goes each month. We break down your transactions so trends and patterns are impossible to miss.",
    color: "from-orange-500 to-red-500",
    benefits: [
      "Monthly summaries",
      "Income vs expense view",
      "Category breakdowns",
      // "Period comparisons",
    ],
  },
  {
    icon: PieChartIcon,
    title: "Visual Reports",
    description:
      "See your finances at a glance with clear, intuitive charts. No spreadsheets — just beautiful visuals that make sense instantly.",
    color: "from-indigo-500 to-purple-500",
    benefits: [
      // "Pie & bar charts",
      "Balance overview",
      "Interactive visuals",
      "At-a-glance dashboard",
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
                className="group relative bg-white dark:bg-dark-card rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-black"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={28} className="text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-6">{feature.description}</p>

                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                    >
                      <CheckIcon size={16} className="text-primary mr-2 shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
