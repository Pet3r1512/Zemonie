import Page from "@/components/Layout/Page";
import SEO from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import releases from "@/doc/release";
import officialReleases from "@/doc/release-official";
import { createFileRoute } from "@tanstack/react-router";
import { Tag } from "lucide-react";

export const Route = createFileRoute("/release-notes")({
  component: RouteComponent,
});

type ChangeItem = { type: string; text: string };
type ReleaseNote = { version: string; date: string; tag: string; changes: ChangeItem[] };

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
  return (
    <span className="mt-0.5 shrink-0 size-5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center text-xs font-bold">
      ✕
    </span>
  );
};

function ReleaseCard({ release, showCurrent }: { release: ReleaseNote; showCurrent: boolean }) {
  return (
    <div className="rounded-2xl bg-white dark:bg-dark-card/50 shadow-2xl p-4.5 md:p-8 lg:p-10">
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1">
        <h3 className="text-2xl lg:text-3xl font-bold text-primary">{release.version}</h3>
        {release.tag === "Beta" ? (
          <span className="rounded-full w-fit bg-yellow-300 dark:bg-yellow-600 text-gray-800 dark:text-gray-200 text-xs font-semibold px-3 py-1">
            {release.tag}
          </span>
        ) : (
          <span className="rounded-full bg-green-500 text-white text-xs font-semibold px-3 py-1">
            {release.tag}
          </span>
        )}
        {showCurrent && (
          <div className="text-green-500 text-xs font-extrabold md:ml-auto flex items-center gap-x-1">
            <Tag size={16} />
            <p>Current Version</p>
          </div>
        )}
      </div>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 mt-2 md:mt-0">{release.date}</p>
      <div className="space-y-3">
        {release.changes.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            {changeBadge(item.type)}
            <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

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
            <p className="text-gray-500 dark:text-gray-400 mt-2">What's new in Zemonie</p>
          </div>
          <Accordion type="single" collapsible defaultValue="official" className="space-y-6">
            <AccordionItem value="official">
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-primary">
                Official
                <span className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">
                  Stable releases
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  {officialReleases.map((release, index) => (
                    <ReleaseCard
                      key={release.version}
                      release={release}
                      showCurrent={index === 0}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="beta">
              <AccordionTrigger className="text-left text-xl md:text-2xl font-bold text-primary">
                Beta
                <span className="text-sm md:text-base font-medium text-gray-500 dark:text-gray-400">
                  Preview releases
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-6">
                  {releases.map((release) => (
                    <ReleaseCard key={release.version} release={release} showCurrent={false} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Page>
    </>
  );
}
