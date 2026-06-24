import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Logo from "../Logo";
import Navbar from "./Navbar/NavbarContainer";
import PagesNav from "./PagesNav";

export default function Header({ hideHeader }: { hideHeader: boolean }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (hideHeader) return;

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideHeader]);

  if (hideHeader) return null;

  return (
    <header
      role="header"
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex justify-center px-5 lg:px-0 transition-all duration-150 ease-linear",
        scrolled && "py-4",
      )}
    >
      <motion.div
        animate={{
          width: scrolled ? "80%" : "100%",
          maxWidth: scrolled ? "80rem" : "100%",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={cn(
          "flex justify-between items-center px-6 py-3 bg-white/10 backdrop-blur-lg shadow-lg ring-1 ring-black/5",
          !scrolled ? "" : "rounded-full",
        )}
      >
        <Logo />
        <PagesNav />
        <Navbar />
      </motion.div>
    </header>
  );
}
