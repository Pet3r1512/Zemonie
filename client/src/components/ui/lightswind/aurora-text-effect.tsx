import { cn } from "@/lib/utils";

export interface AuroraTextEffectProps {
  text: string;
  className?: string;
  textClassName?: string;
  fontSize?: string;
  colors?: {
    first?: string;
    second?: string;
    third?: string;
    fourth?: string;
  };
  blurAmount?: string;
  animationSpeed?: {
    border?: number;
    first?: number;
    second?: number;
    third?: number;
    fourth?: number;
  };
}

export function AuroraTextEffect({
  text,
  className,
  textClassName,
  fontSize = "clamp(3.15rem, 7.5vw, 6.5rem)",
  colors = {
    first: "#22d3ee",
    second: "#facc15",
    third: "#4ade80",
    fourth: "#f87171",
  },
  animationSpeed = {
    border: 4,
    first: 5,
    second: 5,
    third: 3,
    fourth: 13,
  },
}: AuroraTextEffectProps) {
  const keyframes = `
    @keyframes aurora-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;

  return (
    <div className={cn(className)}>
      <style>{keyframes}</style>
      <div className="text-center">
        <h2
          className={cn(
            "font-extrabold tracking-tight text-transparent bg-clip-text",
            textClassName,
          )}
          style={{
            fontSize,
            backgroundImage: `linear-gradient(135deg, ${colors.first}, ${colors.second}, ${colors.third}, ${colors.fourth})`,
            backgroundSize: "300% 300%",
            animation: `aurora-shift ${(animationSpeed.first ?? 5) + (animationSpeed.second ?? 5)}s ease infinite`,
          }}
        >
          {text}
        </h2>
      </div>
    </div>
  );
}
