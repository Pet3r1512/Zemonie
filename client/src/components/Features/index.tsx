import { cn } from "@/lib/utils";
import {
  PieChartIcon,
  TrendingUpIcon,
  BarChart3Icon,
  WalletIcon,
  CalendarIcon,
  Users,
  TargetIcon,
  RefreshCwIcon,
  DownloadIcon,
  UsersIcon,
  LockIcon,
  CheckIcon,
  ArrowRightIcon,
  SparklesIcon,
  DollarSignIcon,
  LineChartIcon,
  ZapIcon,
} from "lucide-react";

const features = [
  {
    icon: PieChartIcon,
    title: "Smart Expense Tracking",
    description:
      "Automatically categorize and track your expenses with intelligent insights into your spending patterns.",
    color: "from-blue-500 to-cyan-500",
    benefits: [
      "Auto-categorization",
      "Receipt scanning",
      "Custom categories",
      "Real-time updates",
    ],
  },
  {
    icon: TrendingUpIcon,
    title: "Income Management",
    description:
      "Track multiple income sources, forecast future earnings, and understand your revenue streams.",
    color: "from-green-500 to-emerald-500",
    benefits: [
      "Multiple sources",
      "Recurring income",
      "Growth analytics",
      "Forecasting",
    ],
  },
  {
    icon: TargetIcon,
    title: "Budget Planning",
    description:
      "Set realistic budgets for each category and get alerts when you're approaching your limits.",
    color: "from-purple-500 to-pink-500",
    benefits: [
      "Category budgets",
      "Smart alerts",
      "Progress tracking",
      "Recommendations",
    ],
  },
  {
    icon: BarChart3Icon,
    title: "Advanced Analytics",
    description:
      "Visualize your financial data with interactive charts and comprehensive reports.",
    color: "from-orange-500 to-red-500",
    benefits: [
      "Interactive charts",
      "Custom reports",
      "Trend analysis",
      "Export data",
    ],
  },
  {
    icon: WalletIcon,
    title: "Unified Dashboard",
    description:
      "See your complete financial picture at a glance with a beautifully organized, customizable dashboard.",
    color: "from-yellow-500 to-orange-500",
    benefits: [
      "Real-time balance",
      "Custom widgets",
      "Quick actions",
      "Personalized layout",
    ],
  },
  {
    icon: DollarSignIcon,
    title: "Goal Tracking",
    description:
      "Set meaningful financial goals and watch your progress unfold with motivating visual milestones.",
    color: "from-indigo-500 to-purple-500",
    benefits: [
      "Custom goals",
      "Milestone tracking",
      "Smart suggestions",
      "Progress insights",
    ],
  },
];

const additionalFeatures = [
  {
    icon: LockIcon,
    title: "Privacy First",
    description: "Your data is yours. We never sell your information.",
  },
  {
    icon: RefreshCwIcon,
    title: "Auto-Sync",
    description: "Real-time synchronization across all your devices.",
    badge: "New",
  },
  {
    icon: CalendarIcon,
    title: "Recurring Transactions",
    description:
      "Automatically track and predict recurring income and expenses.",
    badge: "Coming Soon",
  },
  {
    icon: Users,
    title: "Friends & Leaderboard",
    description:
      "Connect with friends and compete on a personalised leaderboard.",
    badge: "Coming Soon",
  },
  {
    icon: DownloadIcon,
    title: "Export & Reports",
    description: "Export your data in multiple formats for tax season.",
    badge: "Coming Soon",
  },
  {
    icon: UsersIcon,
    title: "Shared Budgets",
    description: "Collaborate on budgets with family or roommates.",
    badge: "Coming Soon",
  },
];

export default function Features() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <main className="grow">
        {/* Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent"></div>

          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6 cursor-default">
                <SparklesIcon size={16} className="text-primary mr-2" />
                <span className="text-sm font-medium text-primary">
                  Powerful Features
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Everything you need to
                <br />
                <span className="text-primary">master your money</span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Powerful tools and intelligent insights to help you take control
                of your financial future.
              </p>
            </div>
          </div>
        </section>

        {/* Main Features Grid */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={index}
                    className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                  >
                    <div
                      className={`w-14 h-14 rounded-xl bg-linear-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon size={28} className="text-white" />
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {feature.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {feature.description}
                    </p>

                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, i) => (
                        <li
                          key={i}
                          className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                        >
                          <CheckIcon
                            size={16}
                            className="text-primary mr-2 shrink-0"
                          />
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

        {/* Interactive Feature Showcase */}
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
                {[
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
                ].map((item, index) => {
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
                <div className="aspect-square rounded-2xl bg-linear-to-br from-primary/20 to-primary/5 p-8 flex items-center justify-center">
                  <div className="w-full h-full rounded-xl bg-white dark:bg-gray-800 shadow-2xl p-6 flex flex-col">
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
                    <div className="grow flex items-center justify-center">
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

        {/* Additional Features */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4">
                <SparklesIcon size={16} className="text-primary" />

                <span className="text-sm font-medium text-primary">
                  Additional Features
                </span>
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
                      "relative flex items-start p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-primary transition-colors duration-200",
                      feature.badge === "Coming Soon" &&
                        "opacity-75 cursor-default pointer-events-none",
                    )}
                  >
                    {feature.badge && (
                      <span
                        className={cn(
                          "absolute top-0 right-0 px-2 py-0.5 rounded-full text-xs font-semibold text-white  cursor-default",
                          feature.badge === "New"
                            ? "bg-green-500"
                            : "bg-blue-400",
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
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-linear-to-br from-primary to-secondary rounded-3xl p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to take control of your finances?
              </h2>

              <p className="text-xl text-white/90 mb-8">
                Join thousands of users who are already managing their money
                smarter.
              </p>

              <a
                href="/auth/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              >
                Get Started Free
                <ArrowRightIcon size={20} className="ml-2" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
