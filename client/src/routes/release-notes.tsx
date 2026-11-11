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
      <span className="mt-0.5 shrink-0 size-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold dark:bg-emerald-400/15 dark:text-emerald-300">
        +
      </span>
    );
  }
  if (type === "update") {
    return (
      <span className="mt-0.5 shrink-0 size-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold dark:bg-amber-400/15 dark:text-amber-300">
        ~
      </span>
    );
  }
  return (
    <span className="mt-0.5 shrink-0 size-5 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-xs font-bold dark:bg-red-400/15 dark:text-red-300">
      ✕
    </span>
  );
};

function ReleaseCard({ release, showCurrent }: { release: ReleaseNote; showCurrent: boolean }) {
  return (
    <div className="rounded-[14px] border border-gray-200 bg-white shadow-sm p-4.5 md:p-8 lg:p-10 dark:border-white/[0.07] dark:bg-[#08080a]/85 dark:backdrop-blur-xl dark:shadow-none">
      <div className="flex flex-col md:flex-row md:items-center gap-3 mb-1">
        <h3 className="font-display text-2xl lg:text-3xl font-bold text-primary">
          {release.version}
        </h3>
        {showCurrent && (
          <div className="text-green-600 text-xs font-extrabold md:ml-auto flex items-center gap-x-1 dark:text-emerald-400">
            <Tag size={16} />
            <p>Current Version</p>
          </div>
        )}
        {release.tag === "Beta" ? (
          <span className="rounded-full w-fit border border-yellow-300 bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 dark:border-yellow-400/30 dark:bg-yellow-400/15 dark:text-yellow-300">
            {release.tag}
          </span>
        ) : (
          <span className="rounded-full w-fit border border-green-300 bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 dark:border-emerald-400/30 dark:bg-emerald-400/15 dark:text-emerald-300">
            {release.tag}
          </span>
        )}
      </div>
      <p className="text-gray-500 text-sm mb-6 mt-2 md:mt-0 dark:text-[#8b8988]">{release.date}</p>
      <div className="space-y-3">
        {release.changes.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            {changeBadge(item.type)}
            <span className="text-sm md:text-base text-gray-700 leading-relaxed dark:text-[#b5b3b2]">
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
      <Page className="py-12" content>
        <div className="max-w-3xl mx-auto px-5 lg:px-0">
          <div className="mb-10">
            <div className="w-16 h-1 bg-linear-to-r from-primary to-secondary rounded-full mb-4" />
            <h1 className="font-display font-bold tracking-[-0.03em] text-3xl md:text-4xl lg:text-5xl text-gray-900 dark:text-white">
              Release Notes
            </h1>
            <p className="text-gray-500 dark:text-[#8b8988] mt-2">What's new in Zemonie</p>
          </div>
          <Accordion type="single" collapsible defaultValue="official" className="space-y-6">
            <AccordionItem value="official">
              <AccordionTrigger className="text-left text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white">
                Official
                <span className="text-sm md:text-base font-medium text-gray-500 dark:text-[#8b8988]">
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
              <AccordionTrigger className="text-left text-xl md:text-2xl font-display font-bold text-gray-900 dark:text-white">
                Beta
                <span className="text-sm md:text-base font-medium text-gray-500 dark:text-[#8b8988]">
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
