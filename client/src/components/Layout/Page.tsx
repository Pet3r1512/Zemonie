import { ReactNode } from "react";
import { cn } from "../../lib/utils";
import Header from "./Header";
import Footer from "./Footer";

export default function Page({
  children,
  className,
  pageName,
}: {
  children: ReactNode;
  className?: string;
  pageName?: string;
}) {
  return (
    <main className="body bg-cover bg-center min-h-screen flex flex-col">
      <Header />

      <section
        role="page-body"
        className={cn(
          "flex-1 flex flex-col mx-auto w-full max-w-360",
          pageName,
        )}
      >
        <div
          className={cn(
            "mx-auto w-full max-w-7xl px-5 lg:px-0 flex-1",
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
