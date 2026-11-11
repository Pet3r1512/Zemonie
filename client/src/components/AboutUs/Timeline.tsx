import { cn } from "@/lib/utils";

const milestones = [
  {
    year: "2024",
    title: "The Beginning",
    description:
      "Zemonie was founded with a simple vision: make personal finance easier, smarter, and less stressful for everyone.",
  },
  {
    year: "2025",
    title: "Product Development",
    description:
      "The core product began taking shape, transforming early concepts and ideas into a real platform focused on modern financial management.",
  },
  {
    year: "April 2026",
    title: "Closed Beta Launch",
    description:
      "The first closed beta was released to selected users for testing, feedback, and product refinement.",
  },
  {
    year: "May 2026",
    title: "Open Beta Release",
    description:
      "Zemonie opened its beta access to the public, allowing more users to experience and help shape the platform.",
  },
  {
    year: "Sep 2026",
    title: "Official Release 🚀",
    description:
      "Zemonie launches its first official version (v1.1.0), bringing a stable, secure and refined money-management experience — complete with email verification, password recovery, and detailed financial insights — to everyone.",
  },
  {
    year: "Nov 2026",
    title: "V1.2.0 - Huge UI Updates 🔊",
    description:
      "A brand-new look across the app, with clearer colors, spacing, and layouts on every page. Dates and times now match your local time zone, and a new cookie consent pop-up lets you choose your privacy preferences.",
  },
];

export default function Timeline() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold tracking-[-0.03em] text-4xl text-gray-900 dark:text-white mb-4">
            Our journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-[#b5b3b2]">From idea to impact</p>
        </div>
        <div className="relative">
          <div className="absolute left-8 inset-y-0 w-0.5 bg-linear-to-b from-primary to-secondary" />

          <div className="space-y-10">
            {milestones.map((milestone, index) => {
              const isLast = index === milestones.length - 1;

              return (
                <div key={index} className="relative pl-16">
                  <div className="absolute left-8 top-1/4 -translate-x-1/2 -translate-y-1/2">
                    {isLast && (
                      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                    )}

                    <div className="relative size-5 rounded-full bg-primary shadow-lg border-4 border-white dark:border-black" />
                  </div>

                  <div
                    data-highlighted={isLast ? "true" : undefined}
                    className={cn(
                      "rounded-[14px] border border-gray-200 bg-white shadow-sm p-6 dark:border-white/[0.07] dark:bg-[#08080a]/85 dark:backdrop-blur-xl",
                      isLast && "border-[#ff7900]/40 dark:border-[#ff7900]/40",
                    )}
                  >
                    <p className="mb-1 text-sm font-semibold text-primary dark:text-[#ff9a3d]">
                      {milestone.year}
                    </p>

                    <h3 className="mb-2 font-display text-xl font-bold text-gray-900 dark:text-white">
                      {milestone.title}
                    </h3>

                    <p className="text-gray-500 dark:text-[#8b8988]">{milestone.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
