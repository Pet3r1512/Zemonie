import MagicBento from "@/components/ui/reactbits/magic-bento";

export default function FeatureHighlight() {
  return (
    <section className="flex flex-col items-center gap-12 my-16 md:my-32">
      <div className="flex flex-col items-center text-center gap-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-balance text-gray-900 dark:text-white">
          Built for <span className="text-primary">privacy</span>, designed for{" "}
          <span className="text-primary">you</span>
        </h2>
        <p className="text-base lg:text-lg text-black dark:text-white/80 max-w-2xl">
          No bank logins, no data mining — just encrypted tracking, recurring automation, and a
          leaderboard that makes saving actually fun.
        </p>
      </div>
      <MagicBento
        textAutoHide={true}
        enableStars
        enableSpotlight
        enableBorderGlow={true}
        enableTilt={false}
        enableMagnetism={false}
        clickEffect
        spotlightRadius={400}
        particleCount={12}
        glowColor="255, 121, 0"
        disableAnimations={false}
      />
    </section>
  );
}
