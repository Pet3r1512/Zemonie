import { ReactNode } from "react";
import { cn } from "../../lib/utils";
import Footer from "./Footer";
import Header from "./Header";

export default function Page({
  children,
  className,
  pageName,
  fullScreen = false,
  hideHeader = false,
}: {
  children: ReactNode;
  className?: string;
  pageName?: string;
  fullScreen?: boolean;
  hideHeader?: boolean;
}) {
  return (
    <main className="body bg-cover bg-center min-h-screen flex flex-col">
      <Header hideHeader={hideHeader} />
      <section
        role="page-body"
        className={cn(
          "flex-1 flex flex-col pt-20 md:pt-24",
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
