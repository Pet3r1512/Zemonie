import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Logo from "../Logo";
import Navbar from "./Navbar/NavbarContainer";
import PagesNav from "./PagesNav";
import StaggeredMenu from "@/components/ui/reactbits/staggered-menu";
import { pages, mobileAuthNavLinks } from "@/lib/navigations";

const menuItems = [
  ...pages.map((page) => ({
    label: page.name,
    ariaLabel: `Go to ${page.name}`,
    link: page.link,
  })),
  ...mobileAuthNavLinks.map((nav) => ({
    label: nav.name,
    ariaLabel: nav.name,
    link: nav.link,
  })),
];

export default function Header({ hideHeader }: { hideHeader: boolean }) {
  const [scrolled, setScrolled] = useState(() => {
    if (typeof window !== "undefined") {
      return window.scrollY > 50;
    }
    return false;
  });

  useEffect(() => {
    if (hideHeader) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideHeader]);

  if (hideHeader) return null;

  return (
    <>
      <header
        role="header"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 hidden lg:flex justify-center px-5 lg:px-0 transition-all duration-150 ease-linear",
          scrolled && "py-4",
        )}
      >
        <motion.div
          initial={{
            width: scrolled ? "80%" : "100%",
            maxWidth: scrolled ? "80rem" : "100%",
          }}
          animate={{
            width: scrolled ? "80%" : "100%",
            maxWidth: scrolled ? "80rem" : "100%",
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={cn(
            "flex justify-between items-center px-6 py-3 bg-white/10 dark:bg-black/10 backdrop-blur-lg shadow-lg ring-1 ring-black/5 dark:ring-white/5 text-gray-900 dark:text-gray-100",
            !scrolled ? "" : "rounded-full",
          )}
        >
          <Logo />
          <PagesNav />
          <Navbar />
        </motion.div>
      </header>

      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 w-full">
        <StaggeredMenu
          position="right"
          items={menuItems}
          displaySocials={false}
          displayItemNumbering={true}
          menuButtonColor="#111"
          openMenuButtonColor="#fff"
          changeMenuColorOnOpen={true}
          colors={["#181C23", "#222833", "#030712", "#111827"]}
          accentColor="#ff7900"
          isFixed={true}
          closeOnClickAway={true}
          headerClassName="bg-white/10 dark:bg-black/10 backdrop-blur-lg shadow-lg ring-1 ring-black/5 dark:ring-white/5"
        />
      </header>
    </>
  );
}
