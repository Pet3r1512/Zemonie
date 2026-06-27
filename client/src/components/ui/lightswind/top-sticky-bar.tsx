/*Ensure you have installed the package
or read our installation document. (go to lightswind.com/components/Installation)
npm i lightswind@latest*/

import { cn } from "@/lib/utils";
import { Easing, LazyMotion, m } from "motion/react";
import { useEffect, useState } from "react";

const loadFeatures = () => import("motion/react").then((res) => res.domMax);

interface TopStickyBarProps {
  /**
   * Controls the visibility of the bar. True to show, false to hide.
   * This prop is ignored if `showOnScroll` is true.
   */
  show?: boolean;
  /**
   * If true, the bar's visibility will be controlled by scroll position.
   * If false or undefined, the `show` prop controls visibility.
   * @default false
   */
  showOnScroll?: boolean;
  /**
   * The scroll position (in pixels) after which the bar will become visible when `showOnScroll` is true.
   * @default 200
   */
  scrollThreshold?: number;
  /**
   * The content to display inside the sticky bar. Can be a string, JSX, or any React Node.
   */
  children: React.ReactNode;
  /**
   * Optional. Additional Tailwind CSS classes to apply to the bar for styling.
   * Defaults to basic styling for a top bar.
   */
  className?: string;
  /**
   * Optional. The animation duration in seconds.
   * @default 0.4
   */
  duration?: number;
  /**
   * Optional. The easing function for the animation.
   * @default "easeInOut"
   */
  ease?: Easing | Easing[];
  /**
   * Optional. The initial vertical offset for the animation (when hidden).
   * @default -50
   */
  initialY?: number;
  /**
   * Optional. The vertical offset when the bar is shown.
   * @default 0
   */
  visibleY?: number;
  /**
   * Optional. The vertical offset when the bar is hidden.
   * @default -50
   */
  hiddenY?: number;
}

const TopStickyBar = ({
  show = false,
  showOnScroll = false,
  scrollThreshold = 200,
  children,
  className,
  duration = 0.4,
  ease = "easeInOut",
  initialY = -50,
  visibleY = 0,
  hiddenY = -50,
}: TopStickyBarProps) => {
  const [scrollVisible, setScrollVisible] = useState(false);

  useEffect(() => {
    if (!showOnScroll) return;

    const handleScroll = () => {
      setScrollVisible(window.scrollY > scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showOnScroll, scrollThreshold]);

  const finalShow = showOnScroll ? scrollVisible : show;

  return (
    <LazyMotion features={loadFeatures}>
      <m.div
        initial={{ y: initialY, opacity: 0 }}
        animate={{
          y: finalShow ? visibleY : hiddenY,
          opacity: finalShow ? 1 : 0,
        }}
        transition={{ duration, ease }}
        className={cn(
          "fixed top-0 left-0 w-full z-60 bg-gray-800 text-white py-1 text-sm text-center shadow-md",
          className,
        )}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
};

export default TopStickyBar;
