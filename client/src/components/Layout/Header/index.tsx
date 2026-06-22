import { cn } from "@/lib/utils";
import Logo from "../Logo";
import Navbar from "./Navbar/NavbarContainer";
import PagesNav from "./PagesNav";

export default function Header({ hideHeader }: { hideHeader: boolean }) {
  return (
    <header
      role="header"
      className={cn(
        hideHeader ? "hidden" : "flex",
        "fixed top-0 left-0 right-0 z-50 w-full justify-between items-center max-w-7xl mx-auto px-5 lg:px-0 py-4",
      )}
    >
      <div className="isolate flex w-full justify-between items-center px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full shadow-lg ring-1 ring-black/5">
        <Logo />
        <PagesNav />
        <Navbar />
      </div>
    </header>
  );
}
