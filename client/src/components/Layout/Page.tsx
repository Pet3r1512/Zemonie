import { ReactNode } from "react";
import { cn } from "../../lib/utils";
import Starfield from "./Starfield";
import Footer from "./Footer";
import Header from "./Header";

export default function Page({
  children,
  className,
  pageName,
  fullScreen = false,
  hideHeader = false,
  content = false,
}: {
  children: ReactNode;
  className?: string;
  pageName?: string;
  fullScreen?: boolean;
  hideHeader?: boolean;
  content?: boolean;
}) {
  return (
    <main
      className={cn(
        "min-h-screen flex flex-col",
        content
          ? "font-ui text-gray-900 dark:bg-black dark:text-[#f7f7f8]"
          : "body bg-cover bg-center",
      )}
    >
      {content ? <Starfield seed={77113} className="hidden dark:block" /> : null}
      <Header hideHeader={hideHeader} />
      <section
        role="page-body"
        className={cn(
          "flex-1 flex flex-col pt-20 md:pt-24",
          content && "relative z-10",
          !fullScreen && "mx-auto w-full max-w-360",
          pageName,
        )}
      >
        <div
          className={cn(
            "flex-1",
            fullScreen ? "w-screen px-0" : "mx-auto w-full max-w-7xl px-5 lg:px-0 lg:mt-4",
            className,
          )}
        >
          {children}
        </div>
      </section>

      <Footer />
    </main>
  );
}
