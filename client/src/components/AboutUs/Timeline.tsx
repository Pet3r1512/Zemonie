import { cn, } from "@/lib/utils";

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
];

export default function Timeline() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary mb-4">Our journey</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">From idea to impact</p>
        </div>
        <div className="relative">
          <div className="absolute left-8 inset-y-0 w-0.5 bg-linear-to-b from-primary to-secondary" />

          <div className="space-y-10">
            {milestones.map((milestone, index,) => {
              const isLast = index === milestones.length - 1;

              return (
                <div key={index} className="relative pl-16">
                  <div className="absolute left-8 top-1/4 -translate-x-1/2 -translate-y-1/2">
                    {isLast && (
                      <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                    )}

                    <div className="relative size-5 rounded-full bg-primary shadow-lg border-4 border-white dark:border-dark-bg" />
                  </div>

                  <div
                    className={cn(
                      "rounded-2xl border border-gray-200 bg-white p-6 dark:border-dark-card dark:bg-dark-card",
                      isLast && "border-primary border-2",
                    )}
                  >
                    <p className="mb-1 text-sm font-semibold text-primary">{milestone.year}</p>

                    <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                      {milestone.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                  </div>
                </div>
              );
            },)}
          </div>
        </div>
      </div>
    </section>
  );
}
