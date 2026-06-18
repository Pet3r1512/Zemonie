import { useEffect, useState, } from "react";

type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

function getScreenSize(): ScreenSize {
  if (typeof window === "undefined") return "lg";

  const width = window.innerWidth;

  if (width >= 1536) return "2xl";
  if (width >= 1280) return "xl";
  if (width >= 1024) return "lg";
  if (width >= 768) return "md";
  if (width >= 640) return "sm";

  return "xs";
}

export default function useScreenSize() {
  const [screenSize, setScreenSize,] = useState<ScreenSize>(getScreenSize,);

  useEffect(() => {
    let rafId: number;

    const handleResize = () => {
      cancelAnimationFrame(rafId,);
      rafId = requestAnimationFrame(() => {
        setScreenSize(getScreenSize(),);
      },);
    };

    window.addEventListener("resize", handleResize,);

    return () => {
      cancelAnimationFrame(rafId,);
      window.removeEventListener("resize", handleResize,);
    };
  }, [],);

  return {
    screenSize,
    isMobile: screenSize === "xs" || screenSize === "sm",
    isTablet: screenSize === "md",
    isDesktop: ["lg", "xl", "2xl",].includes(screenSize,),
  };
}
