import Page from "@/components/Layout/Page";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/release-notes")({
  component: RouteComponent,
});

const releases = [
  {
    version: "v1.0.0-beta",
    date: "May 25, 2026",
    tag: "Beta",
    changes: [
      { type: "feature", text: "Track income and expenses with ease" },
      {
        type: "feature",
        text: "Interactive dashboard with real-time analytics",
      },
      { type: "feature", text: "Currency supported: AUD and USD" },
      { type: "feature", text: "Category-based transaction management" },
      { type: "feature", text: "User authentication with email and password" },
      {
        type: "feature",
        text: "Responsive design — works on desktop and mobile",
      },
      { type: "feature", text: "Account setup wizard with avatar picker" },
    ],
  },
];

function RouteComponent() {
  return (
    <Page className="py-12">
      <div className="max-w-3xl mx-auto px-5 lg:px-0">
        <div className="mb-10">
          <div className="w-16 h-1 bg-primary rounded-full mb-4" />
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            Release Notes
          </h1>
          <p className="text-gray-500 mt-2">What's new in Zemonie</p>
        </div>

        <div className="space-y-6">
          {releases.map((release) => (
            <div
              key={release.version}
              className="rounded-2xl bg-white dark:bg-neutral-950 shadow-2xl p-8 lg:p-10"
            >
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                  {release.version}
                </h2>
                <span className="rounded-full bg-primary/10 text-primary text-xs font-semibold px-3 py-1">
                  {release.tag}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-6">{release.date}</p>

              <div className="space-y-3">
                {release.changes.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {item.type === "feature" ? (
                      <span className="mt-0.5 shrink-0 size-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-bold">
                        +
                      </span>
                    ) : (
                      <span className="mt-0.5 shrink-0 size-5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-bold">
                        ~
                      </span>
                    )}
                    <span className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
