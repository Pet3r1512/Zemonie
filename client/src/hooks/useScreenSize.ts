import { useEffect, useState } from "react";

type ScreenSize = "sm" | "md" | "lg" | "xl" | "2xl";

export default function useScreenSize() {
    const getScreenSize = (): ScreenSize => {
        if (typeof window === "undefined") return "lg";

        const width = window.innerWidth;

        if (width >= 1536) return "2xl";
        if (width >= 1280) return "xl";
        if (width >= 1024) return "lg";
        if (width >= 768) return "md";

        return "sm";
    };

    const [screenSize, setScreenSize] = useState<ScreenSize>(
        getScreenSize(),
    );

    useEffect(() => {
        const handleResize = () => {
            setScreenSize(getScreenSize());
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return {
        screenSize,
        isMobile: screenSize === "sm",
        isTablet: screenSize === "md",
        isDesktop: ["lg", "xl", "2xl"].includes(screenSize),
    };
}