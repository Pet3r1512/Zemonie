import SEO from "@/components/SEO";
import Page from "@/components/Layout/Page";
import { createFileRoute } from "@tanstack/react-router";
import { Tag } from "lucide-react";
export const Route = createFileRoute("/release-notes")({
  component: RouteComponent,
});
const releases = [
  {
    version: "v1.0.4-beta",
    date: "Jun 03, 2026",
    tag: "Beta",
    changes: [
      {
        type: "feature",
        text: "Introduced an animated transaction details popup for a more polished user experience. 🚀",
      },
      {
        type: "fix",
        text: "Fixed an issue where some users could be asked to complete setup again.",
      },
      {
        type: "fix",
        text: "Improved scrolling stability on the Transactions page to prevent interface shifting.",
      },
    ],
  },
  {
    version: "v1.0.3-beta",
    date: "Jun 01, 2026",
    tag: "Beta",
    changes: [
      {
        type: "feature",
        text: "Introduced a Spending by Category chart for better insight into your spending habits. 🚀",
      },
      {
        type: "feature",
        text: "Added a scrollable category list to make selecting transaction categories easier.",
      },
      {
        type: "update",
        text: "Enhanced the Features page with clearer and more detailed feature information.",
      },
      {
        type: "update",
        text: "Improved app stability and consistency across Chrome, Safari, Firefox, and other major browsers.",
      },
      {
        type: "fix",
        text: "Corrected time-related inconsistencies to ensure data is displayed accurately.",
      },
      {
        type: "fix",
        text: "Fixed an issue that could cause a different avatar to appear than the one selected during setup.",
      },
    ],
  },
  {
    version: "v1.0.2-beta.1",
    date: "May 29, 2026",
    tag: "Beta",
    changes: [
      {
        type: "feature",
        text: "Transaction forms now provide clear guidance when required fields are missing.",
      },
      {
        type: "feature",
        text: "Currency amounts are displayed in a cleaner and more consistent format.",
      },
      {
        type: "update",
        text: "Improved usability on mobile devices and smaller screens.",
      },
      {
        type: "update",
        text: "Enhanced security and reliability across the platform.",
      },
      {
        type: "update",
        text: "Faster data loading for a smoother experience.",
      },
      {
        type: "fix",
        text: "Fixed an issue that could allow transactions to be created without a description.",
      },
    ],
  },
  {
    version: "v1.0.2-beta",
    date: "May 27, 2026",
    tag: "Beta",
    changes: [
      {
        type: "feature",
        text: "Improved account security for a safer experience",
      },
      {
        type: "feature",
        text: "Added personalized settings and preferences",
      },
      {
        type: "feature",
        text: "Added a privacy agreement checkbox during account setup",
      },
      {
        type: "update",
        text: "Refreshed app branding and visual design",
      },
      {
        type: "update",
        text: "Improved website visibility and performance on search engines",
      },
      {
        type: "fix",
        text: "Fixed minor interface and layout issues",
      },
    ],
  },
  {
    version: "v1.0.1-beta",
    date: "May 25, 2026",
    tag: "Beta",
    changes: [
      { type: "feature", text: "Improve user interfaces" },
      { type: "fix", text: "Authentication error handler" },
    ],
  },
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

const changeBadge = (type: string) => {
  if (type === "feature") {
    return (
      <span className="mt-0.5 shrink-0 size-5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 flex items-center justify-center text-xs font-bold">
        +
      </span>
    );
  }
  if (type === "update") {
    return (
      <span className="mt-0.5 shrink-0 size-5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-bold">
        ~
      </span>
    );
  }
  // fix
  return (
    <span className="mt-0.5 shrink-0 size-5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center text-xs font-bold">
      ✕
    </span>
  );
};

function RouteComponent() {
  return (
    <>
      <SEO
        title="Release Notes"
        description="What's new in Zemonie — track updates, new features, and improvements."
        canonicalPath="/release-notes"
      />
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
            {releases.map((release, index) => (
              <div
                key={release.version}
                className="rounded-2xl bg-white dark:bg-neutral-950 shadow-2xl p-8 lg:p-10"
              >
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-2xl lg:text-3xl font-bold text-primary">
                    {release.version}
                  </h2>
                  {release.tag === "Beta" ? (
                    <span className="rounded-full bg-yellow-300 text-gray-800 text-xs font-semibold px-3 py-1">
                      {release.tag}
                    </span>
                  ) : (
                    <span className="rounded-full bg-green-500 text-white text-xs font-semibold px-3 py-1">
                      {release.tag}
                    </span>
                  )}
                  {index === 0 && (
                    <div className="text-green-500 text-xs font-extrabold ml-auto flex items-center">
                      <Tag size={16} />
                      <p>Current Version</p>
                    </div>
                  )}
                </div>
                <p className="text-gray-500 text-sm mb-6">{release.date}</p>
                <div className="space-y-3">
                  {release.changes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      {changeBadge(item.type)}
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
    </>
  );
}
