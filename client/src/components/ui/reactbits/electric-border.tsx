import React, { useRef, CSSProperties, ReactNode } from "react";
import { hexToRgba } from "./electric-border-utils";
import { useElectricBorderCanvas } from "./use-electric-border-canvas";

interface ElectricBorderProps {
  children?: ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  borderRadius?: number;
  className?: string;
  style?: CSSProperties;
}

function GlowOverlay({ color }: { color: string }) {
  return (
    <div className="absolute inset-0 rounded-[inherit] pointer-events-none z-0">
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{ border: `2px solid ${hexToRgba(color, 0.6)}`, filter: "blur(1px)" }}
      />
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none"
        style={{ border: `2px solid ${color}`, filter: "blur(4px)" }}
      />
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none z-[-1] scale-110 opacity-30"
        style={{
          filter: "blur(8px)",
          background: `linear-gradient(-30deg, ${color}, transparent, ${color})`,
        }}
      />
    </div>
  );
}

const ElectricBorder: React.FC<ElectricBorderProps> = ({
  children,
  color = "#5227FF",
  speed = 1,
  chaos = 0.12,
  borderRadius = 24,
  className,
  style,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useElectricBorderCanvas({ canvasRef, containerRef, color, speed, chaos, borderRadius });

  return (
    <div
      ref={containerRef}
      className={`relative overflow-visible isolate ${className ?? ""}`}
      style={{ "--electric-border-color": color, borderRadius, ...style } as CSSProperties}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-2">
        <canvas ref={canvasRef} className="block" />
      </div>
      <GlowOverlay color={color} />
      <div className="relative rounded-[inherit] z-1 px-5 py-2.5 bg-white/85 dark:bg-dark-bg/90">
        {children}
      </div>
    </div>
  );
};

export default ElectricBorder;
