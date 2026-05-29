import {
  LineChartIcon,
  ZapIcon,
  DollarSignIcon,
  WalletIcon,
  TrendingUpIcon,
  BarChart3Icon,
  TargetIcon,
} from "lucide-react";

const showcaseItems = [
  {
    icon: LineChartIcon,
    title: "Real-time Insights",
    description:
      "Get instant visibility into your spending patterns and financial health with live dashboards.",
  },
  {
    icon: ZapIcon,
    title: "Smart Automation",
    description:
      "Automatically organize and track your transactions to save time and reduce manual work.",
  },
  {
    icon: DollarSignIcon,
    title: "Goal Tracking",
    description:
      "Set financial goals and watch your progress with visual milestones and celebrations.",
  },
];

export default function InteractiveShowcase() {
  return (
    <section className="py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            See it in action
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Experience the power of intelligent financial management
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {showcaseItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-start p-6 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors duration-200"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4 shrink-0">
                    <Icon size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="relative cursor-default pointer-events-none">
            <div className="rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center h-fit!">
              <div className="w-full rounded-xl bg-white dark:bg-gray-800 shadow-2xl p-6 flex flex-col min-h-fit">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
                      <WalletIcon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Balance
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        $12,450.00
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grow flex items-center justify-center max-h-fit">
                  <div className="relative w-48 h-48">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="96"
                        cy="96"
                        r="88"
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray="552.92"
                        strokeDashoffset="138.23"
                        className="text-primary transition-all duration-1000"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center flex-col">
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        75%
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Budget Used
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-2">
                      <TrendingUpIcon
                        size={16}
                        className="text-green-600 dark:text-green-400"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Income
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      $4,250
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-2">
                      <BarChart3Icon
                        size={16}
                        className="text-red-600 dark:text-red-400"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Expenses
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      $1,970
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-2">
                      <TargetIcon
                        size={16}
                        className="text-blue-600 dark:text-blue-400"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Savings
                    </p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      $2,280
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
