import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useRef, useState } from "react";

export default function Screenshot() {
  const [isScreenshotLoaded, setIsScreenshotLoaded] = useState<boolean>(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = ref.current;

    if (img?.complete && img?.naturalHeight != 0) {
      setIsScreenshotLoaded(true);
    }
  }, [isScreenshotLoaded]);

  return (
    <>
      {!isScreenshotLoaded && (
        <Skeleton className="w-full min-h-[242.91px] md:min-h-[665.59px] lg:min-h-[798.16px]" />
      )}
      <img
        ref={ref}
        src="/screenshots/Dashboard.webp"
        alt="Clario Dashboard Screenshot"
        className={`rounded-2xl shadow-2xl h-auto w-full ${
          isScreenshotLoaded ? "block" : "hidden"
        }`}
        onLoad={() => {
          setIsScreenshotLoaded(true);
        }}
      />
    </>
  );
}
