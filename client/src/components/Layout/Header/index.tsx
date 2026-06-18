import { cn, } from "@/lib/utils";
import Logo from "../Logo";
import Navbar from "./Navbar/NavbarContainer";
import PagesNav from "./PagesNav";

export default function Header({ hideHeader, }: { hideHeader: boolean; },) {
  return (
    <header
      role="header"
      className={cn(
        hideHeader ? "hidden" : "flex",
        "w-full justify-between items-center max-w-7xl mx-auto px-5 lg:px-0 py-10 lg:py-5",
      )}
    >
      <Logo />
      <PagesNav />
      <Navbar />
    </header>
  );
}
