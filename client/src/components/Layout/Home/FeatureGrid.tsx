import Starfield from "@/components/Layout/Starfield";
import { Award, Github, RefreshCw, ShieldCheck, Wallet, BarChart3Icon } from "lucide-react";

const cards = [
  {
    icon: Github,
    label: "No Catch",
    title: "Free & Open Source. Forever.",
    description: "AGPL-3.0 licensed. Check the code yourself on GitHub.",
  },
  {
    icon: BarChart3Icon,
    label: "Built Different",
    title: "Finance, But Fun",
    description: "Personalised dashboard with useful charts and analysis.",
  },
  {
    icon: ShieldCheck,
    label: "Privacy First",
    title: "Your Amounts Stay Yours",
    description:
      "Every transaction amount is encrypted end-to-end (AES-GCM). Not even we can read your numbers.",
  },
  {
    icon: Wallet,
    label: "No Bank Login Required",
    title: "You're In Control",
    description:
      "Track spending with wallets and envelopes — we never ask for your actual bank credentials.",
  },
  {
    icon: RefreshCw,
    label: "Set Once - Stay Accurate",
    title: "Recurring Transactions",
    description: "Automatically schedule your rent, subcriptions or income",
  },
  {
    icon: Award,
    label: "Spend & Show Off",
    title: "Shareable Achievements",
    description: "Earn unique badges based on how you spend — then share them with friends.",
  },
];

export default function FeatureGrid() {
  return (
    <section
      aria-label="feature-highlights"
      className="relative overflow-hidden px-4 py-16 md:py-24 dark:bg-black"
    >
      <Starfield seed={90210} className="hidden dark:block" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="font-display text-3xl font-bold tracking-[-0.03em] text-balance text-gray-900 dark:text-white md:text-4xl lg:text-5xl">
            Built for <span className="text-primary">privacy</span>, designed for{" "}
            <span className="text-primary">you</span>
          </h2>
          <p className="max-w-2xl text-base text-gray-600 dark:text-[#b5b3b2] lg:text-lg">
            No bank logins, no data mining — just encrypted tracking, recurring automation, and a
            leaderboard that makes saving actually fun.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="group relative overflow-hidden rounded-[14px] border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-[#ff7900]/40 hover:shadow-md dark:border-white/[0.07] dark:bg-[#08080a]/85 dark:backdrop-blur-xl dark:hover:border-[#ff7900]/30 dark:hover:shadow-[0_0_40px_rgba(255,121,0,0.08)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#ff7900_20%,#ffc48a_50%,#ff7900_80%,transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_14px_2px_rgba(255,121,0,0.5)]" />

                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="grid size-10 place-items-center rounded-lg bg-[#ff7900]/10 dark:bg-[#ff7900]/12">
                    <Icon size={20} className="text-primary dark:text-[#ff9a3d]" />
                  </span>
                  <span className="rounded-full border border-[#ff7900]/30 bg-[#ff7900]/10 px-2.5 py-1 text-[11px] font-semibold text-primary dark:bg-[#ff7900]/12 dark:text-[#ff9a3d]">
                    {card.label}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-gray-900 dark:text-white">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-[#8b8988]">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
