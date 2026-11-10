import { useCallback, useEffect, useRef, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type DrawFn = (ctx: CanvasRenderingContext2D, width: number, height: number) => void;

export function mulberry32(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value + 0x6d2b79f5) >>> 0;
    let t = Math.imul(value ^ (value >>> 15), 1 | value);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function drawStars(ctx: CanvasRenderingContext2D, width: number, height: number, seed: number) {
  const random = mulberry32(seed);
  const count = Math.min(520, Math.max(90, Math.round((width * height) / 7600)));

  for (let i = 0; i < count; i += 1) {
    const x = random() * width;
    const y = random() * height;
    const bright = random() < 0.07;
    const radius = bright ? 1.5 : 0.4 + random() * 0.75;
    const alpha = bright ? 0.55 + random() * 0.45 : 0.1 + random() * 0.6;
    ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function CanvasLayer({
  draw,
  className,
  style,
}: {
  draw: DrawFn;
  className?: string;
  style?: CSSProperties;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;

    let timer = 0;
    const paint = () => {
      const { width, height } = host.getBoundingClientRect();
      if (width < 1 || height < 1) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(width);
      const h = Math.round(height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      draw(ctx, w, h);
    };
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(paint, 140);
    };

    paint();
    const observer = new ResizeObserver(schedule);
    observer.observe(host);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 block", className)}
      style={style}
    />
  );
}

export default function Starfield({
  seed = 20240117,
  className,
}: {
  seed?: number;
  className?: string;
}) {
  const draw = useCallback<DrawFn>(
    (ctx, width, height) => {
      drawStars(ctx, width, height, seed);
    },
    [seed],
  );

  return <CanvasLayer draw={draw} className={className} />;
}
