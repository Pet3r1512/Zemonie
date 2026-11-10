import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  ArrowLeftRight,
  Bell,
  Gauge,
  LogOut,
  Maximize2,
  PieChart,
  Search,
  Settings,
  Sun,
  Wallet,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useReleaseBannerVisible } from "@/hooks/useReleaseBanner";
import { cn } from "@/lib/utils";
import Starfield, { CanvasLayer, mulberry32, type DrawFn } from "@/components/Layout/Starfield";

const STAGE_W = 1672;
const STAGE_H = 941;
const DASH_W = 1204;
const DASH_TOP = 651;
const DASH_H = 640;
const VIDEO_W = 1672;
const VIDEO_H = 717;
const RIM_HALF_SPAN = 836;
const RIM_APEX = 217;
const MOBILE_RIM_APEX = 128;
const MOBILE_BREAKPOINT = 900;

const BTN_GRADIENT = "linear-gradient(135deg, #ff9d33 0%, #ff7900 55%, #ff6200 100%)";
const NAME_GRADIENT = "linear-gradient(105deg, #ffb257, #ff7900 52%, #ff5e00)";
const POSITIVE = "#45b558";
const NEGATIVE = "#f03b2a";

const GLOW_VIDEO =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e859f229-8ebd-43fb-a5a0-58006ba75327.mp4";
const DASH_GLOW =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e0e14572-12e1-4c08-b471-a21521844945.png";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SIDE_PRIMARY = [
  { label: "Search", Icon: Search },
  { label: "Dashboard", Icon: Gauge },
  { label: "Transactions", Icon: ArrowLeftRight },
  { label: "Sign out", Icon: LogOut },
];

const SIDE_SECONDARY = [
  { label: "Income", Icon: Wallet },
  { label: "Budgets", Icon: PieChart },
  { label: "Settings", Icon: Settings },
];

type Stage = { mobile: boolean; scale: number; width: number; height: number };

function readStage(): Stage {
  const vw = typeof window === "undefined" ? 1440 : window.innerWidth;
  const vh = typeof window === "undefined" ? 900 : window.innerHeight;
  if (vw < MOBILE_BREAKPOINT || vh >= vw) return { mobile: true, scale: 1, width: vw, height: vh };
  const scale = Math.min(vw / STAGE_W, vh / STAGE_H);
  return { mobile: false, scale, width: vw / scale, height: vh / scale };
}

function useStage() {
  const [stage, setStage] = useState<Stage>(readStage);

  useEffect(() => {
    const update = () => setStage(readStage());
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return stage;
}

const RIM_STOPS: Array<[number, [number, number, number]]> = [
  [0, [255, 247, 234]],
  [0.14, [255, 226, 180]],
  [0.32, [255, 170, 74]],
  [0.55, [255, 112, 12]],
  [0.78, [168, 64, 4]],
  [1, [48, 17, 2]],
];

function sampleRim(intensity: number): [number, number, number] {
  const t = Math.min(Math.max(intensity, 0), 1);
  for (let i = 1; i < RIM_STOPS.length; i += 1) {
    const [prevAt, prev] = RIM_STOPS[i - 1];
    const [nextAt, next] = RIM_STOPS[i];
    if (t <= nextAt) {
      const mix = (t - prevAt) / (nextAt - prevAt);
      return [
        Math.round(prev[0] + (next[0] - prev[0]) * mix),
        Math.round(prev[1] + (next[1] - prev[1]) * mix),
        Math.round(prev[2] + (next[2] - prev[2]) * mix),
      ];
    }
  }
  return RIM_STOPS[RIM_STOPS.length - 1][1];
}

interface RimOptions {
  width: number;
  height: number;
  cx: number;
  apex: number;
  halfSpan: number;
}

function paintRim(ctx: CanvasRenderingContext2D, options: RimOptions) {
  const { width, height, cx, apex, halfSpan } = options;
  const radius = (halfSpan * halfSpan + apex * apex) / (2 * apex);
  const cy = apex - radius;
  const startX = cx - halfSpan;
  const endX = cx + halfSpan;
  const k = Math.min(Math.max(halfSpan / RIM_HALF_SPAN, 0.55), 1.7);
  const thetaStart = Math.atan2(
    Math.sqrt(Math.max(radius * radius - halfSpan * halfSpan, 0)),
    halfSpan,
  );
  const thetaEnd = Math.PI - thetaStart;
  const limbAt = (x: number) => {
    const dx = x - cx;
    const inside = radius * radius - dx * dx;
    return cy + (inside > 0 ? Math.sqrt(inside) : 0);
  };
  const walkLimb = (
    from: number,
    to: number,
    step: number,
    onPoint: (x: number, y: number) => void,
  ) => {
    for (let x = from; x <= to; x += step) onPoint(x, limbAt(x));
    onPoint(to, limbAt(to));
  };
  const traceLimb = (from: number, to: number) => {
    ctx.moveTo(from, limbAt(from));
    walkLimb(from, to, Math.max(2, halfSpan / 220), (x, y) => ctx.lineTo(x, y));
  };

  const washRadius = halfSpan * 1.15;
  const wash = ctx.createRadialGradient(cx, apex, 0, cx, apex, washRadius);
  wash.addColorStop(0, "rgba(255,121,0,0.12)");
  wash.addColorStop(0.35, "rgba(255,96,0,0.05)");
  wash.addColorStop(1, "rgba(255,60,0,0)");
  ctx.fillStyle = wash;
  ctx.fillRect(0, 0, width, Math.min(height, apex + washRadius));

  ctx.save();
  ctx.beginPath();
  ctx.moveTo(startX, -height);
  walkLimb(startX, endX, Math.max(2, halfSpan / 240), (x, y) => ctx.lineTo(x, y));
  ctx.lineTo(endX, -height);
  ctx.closePath();
  ctx.clip();

  const body = ctx.createRadialGradient(cx, cy, radius * 0.9, cx, cy, radius);
  body.addColorStop(0, "#080300");
  body.addColorStop(0.6, "#160800");
  body.addColorStop(0.86, "#3a1600");
  body.addColorStop(0.965, "#7a3400");
  body.addColorStop(1, "#ff9c30");
  ctx.fillStyle = body;
  ctx.fillRect(startX - 4, -4, endX - startX + 8, height + apex + 4);

  ctx.globalCompositeOperation = "lighter";
  const bands = 8;
  for (let i = 0; i < bands; i += 1) {
    const fade = 1 - i / bands;
    ctx.strokeStyle = `rgba(255,${Math.round(150 - i * 8)},${Math.round(58 - i * 4)},${(0.01 + 0.05 * fade).toFixed(3)})`;
    ctx.lineWidth = (2 + (i % 3)) * k;
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 6 * k - i * 12 * k, thetaStart, thetaEnd);
    ctx.stroke();
  }

  const random = mulberry32(90210);
  for (let i = 0; i < 140; i += 1) {
    const t = random();
    const theta = thetaStart + t * (thetaEnd - thetaStart);
    const inner = radius - 5 * k - random() * 58 * k;
    const length = (4 + random() * 11) * k;
    const centrality = Math.max(0, 1 - Math.abs(t - 0.5) * 1.7);
    const alpha = Math.max(0, 0.07 + random() * 0.34 * centrality);
    ctx.strokeStyle = `rgba(255,${Math.round(180 + random() * 60)},${Math.round(90 + random() * 80)},${alpha.toFixed(3)})`;
    ctx.lineWidth = Math.max(0.6, 1.1 * k);
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(theta) * inner, cy + Math.sin(theta) * inner);
    ctx.lineTo(cx + Math.cos(theta) * (inner + length), cy + Math.sin(theta) * (inner + length));
    ctx.stroke();
  }
  ctx.restore();

  ctx.save();
  ctx.beginPath();
  traceLimb(startX, endX);
  ctx.lineTo(endX, height);
  ctx.lineTo(startX, height);
  ctx.closePath();
  ctx.clip();
  ctx.globalCompositeOperation = "lighter";

  const randomRay = mulberry32(1337);
  for (let i = 0; i < 7; i += 1) {
    const spread = -0.95 + (i / 6) * 1.9 + (randomRay() - 0.5) * 0.16;
    const length = (240 + randomRay() * 160) * k;
    const originX = cx + Math.sin(spread) * halfSpan * 0.5;
    const endRayX = originX + Math.sin(spread) * length;
    const endRayY = apex + Math.cos(spread) * length;
    const ray = ctx.createLinearGradient(originX, apex, endRayX, endRayY);
    ray.addColorStop(0, "rgba(255,178,86,0.16)");
    ray.addColorStop(0.45, "rgba(255,132,20,0.07)");
    ray.addColorStop(1, "rgba(255,110,0,0)");
    ctx.strokeStyle = ray;
    ctx.lineWidth = Math.max(1, 2.4 * k);
    ctx.beginPath();
    ctx.moveTo(originX, apex);
    ctx.lineTo(endRayX, endRayY);
    ctx.stroke();
  }

  const glowLayers = [
    { width: 16, alpha: 0.4, blur: 22, rgb: "255,184,96" },
    { width: 44, alpha: 0.2, blur: 52, rgb: "255,121,0" },
    { width: 104, alpha: 0.1, blur: 120, rgb: "255,88,0" },
  ];
  const glowSegments = 26;
  for (const layer of glowLayers) {
    for (let i = 0; i < glowSegments; i += 1) {
      const from = startX + ((endX - startX) * i) / glowSegments;
      const to = startX + ((endX - startX) * (i + 1)) / glowSegments;
      const u = Math.abs((from + to) / 2 - cx) / halfSpan;
      const alpha = layer.alpha * (1 - 0.72 * u * u);
      if (alpha <= 0.01) continue;
      ctx.strokeStyle = `rgba(${layer.rgb},${alpha.toFixed(3)})`;
      ctx.shadowColor = `rgba(${layer.rgb},${alpha.toFixed(3)})`;
      ctx.shadowBlur = layer.blur * k * (1 - 0.45 * u);
      ctx.lineWidth = layer.width * k;
      ctx.beginPath();
      traceLimb(from, to + 0.5);
      ctx.stroke();
    }
  }
  ctx.restore();

  ctx.globalCompositeOperation = "lighter";
  const coreSegments = 46;
  for (let i = 0; i < coreSegments; i += 1) {
    const from = startX + ((endX - startX) * i) / coreSegments;
    const to = startX + ((endX - startX) * (i + 1)) / coreSegments;
    const u = Math.abs((from + to) / 2 - cx) / halfSpan;
    const [r, g, b] = sampleRim(1 - u);
    const alpha = Math.max(0, 1 - 0.8 * u * u);
    ctx.strokeStyle = `rgba(${r},${g},${b},${(0.85 * alpha).toFixed(3)})`;
    ctx.shadowColor = `rgba(${r},${g},${b},${(0.9 * alpha).toFixed(3)})`;
    ctx.shadowBlur = 26 * k * (1 - 0.5 * u);
    ctx.lineWidth = (5.2 - 2.2 * u) * k;
    ctx.beginPath();
    traceLimb(from, to + 0.5);
    ctx.stroke();
  }
  ctx.shadowBlur = 0;
  ctx.globalCompositeOperation = "source-over";
}

function Bolt({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("grid size-[30px] place-items-center rounded-[9px]", className)}
      style={{ background: "linear-gradient(150deg, rgba(255,121,0,0.24), rgba(255,121,0,0.06))" }}
    >
      <Zap size={17} strokeWidth={2.4} className="text-[#ff9a3d]" fill="currentColor" />
    </span>
  );
}

function GetStarted({ className, label = "Get Started" }: { className?: string; label?: string }) {
  return (
    <Link
      to="/auth/signup"
      className={cn(
        "inline-flex items-center justify-center rounded-full px-[26px] py-[13px] text-[14.5px] font-semibold text-[#1a0c00] transition-all duration-200 hover:brightness-110 hover:shadow-[0_0_28px_rgba(255,121,0,0.5)]",
        className,
      )}
      style={{ backgroundImage: BTN_GRADIENT }}
    >
      {label}
    </Link>
  );
}

function HeroCopy({
  lines,
  headingClass,
  ledeClass,
  compact = false,
}: {
  lines: ReactNode[];
  headingClass: string;
  ledeClass: string;
  compact?: boolean;
}) {
  return (
    <div className="text-center">
      <h1 className={cn("font-display font-bold tracking-[-0.03em]", headingClass)}>
        {lines.map((line, index) => (
          <span key={index} className="block overflow-hidden pb-[0.24em]">
            <motion.span
              className="block"
              variants={{
                hidden: { y: "140%" },
                show: {
                  y: "0%",
                  transition: { duration: 0.85, delay: 0.22 + index * 0.14, ease: EASE },
                },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>
      <motion.p
        className={cn("mx-auto", ledeClass)}
        variants={{
          hidden: { opacity: 0, y: 22 },
          show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.56, ease: EASE } },
        }}
      >
        The first fully integrated money management experience. No spreadsheets, no guesswork —
        Zemonie empowers you to track income, label expenses, and grow your savings from one clean
        dashboard.
      </motion.p>
      <motion.div
        className={cn("flex items-center justify-center gap-3", compact ? "mt-6" : "mt-8 gap-3.5")}
        variants={{
          hidden: { opacity: 0, y: 20 },
          show: { opacity: 1, y: 0, transition: { duration: 0.65, delay: 0.68, ease: EASE } },
        }}
      >
        <GetStarted className={compact ? "px-5 py-2.5 text-[13.5px]" : ""} />
        <Link
          to="/features"
          className={cn(
            "inline-flex items-center justify-center rounded-full border border-gray-200 bg-white font-semibold text-gray-900 transition-all duration-200 hover:border-[#ff7900]/40 hover:bg-gray-50 dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:hover:bg-white/[0.09] dark:hover:shadow-[0_0_24px_rgba(255,121,0,0.25)]",
            compact ? "px-5 py-2.5 text-[13.5px]" : "px-[26px] py-[13px] text-[14.5px]",
          )}
        >
          Learn More
        </Link>
      </motion.div>
    </div>
  );
}

function SidebarItem({
  label,
  Icon,
  active = false,
}: {
  label: string;
  Icon: typeof Search;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-[30px] items-center gap-[9px] rounded-[9px] px-[10px] text-[12.5px] font-medium",
        active
          ? "border border-[#ff7900]/30 bg-[#ff7900]/12 text-[#ff9a3d]"
          : "border border-transparent text-[#8b8988]",
      )}
    >
      <Icon size={14} strokeWidth={2} />
      <span>{label}</span>
    </div>
  );
}

function StatCard({
  label,
  value,
  delta,
  positive,
}: {
  label: string;
  value: string;
  delta: string;
  positive: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col justify-center gap-[7px] rounded-[12px] border border-white/[0.07] bg-white/[0.03] px-[16px] py-[13px]">
      <p className="truncate text-[11px] text-[#8b8988]">{label}</p>
      <div className="flex items-end justify-between gap-3">
        <p className="text-[26px] leading-none font-semibold tracking-[-0.02em] text-white">
          {value}
        </p>
        <span
          className="rounded-full px-[8px] py-[3px] text-[11px] font-semibold"
          style={{
            color: positive ? POSITIVE : NEGATIVE,
            background: positive ? "rgba(69,181,88,0.14)" : "rgba(240,59,42,0.14)",
          }}
        >
          {delta}
        </span>
      </div>
    </div>
  );
}

const CHART_VALUES = [46, 58, 51, 66, 60, 74, 63, 79, 71, 86, 77, 92, 84, 96];

function buildChartPath(values: number[], width: number, height: number) {
  const points = values.map((value, index) => ({
    x: (index / (values.length - 1)) * width,
    y: height - (value / 100) * height,
  }));

  const line = points.reduce((path, point, index, all) => {
    if (index === 0) return `M ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
    const prev = all[index - 1];
    const midX = (prev.x + point.x) / 2;
    return `${path} C ${midX.toFixed(2)} ${prev.y.toFixed(2)}, ${midX.toFixed(2)} ${point.y.toFixed(2)}, ${point.x.toFixed(2)} ${point.y.toFixed(2)}`;
  }, "");

  const last = points[points.length - 1];
  return { line, area: `${line} L ${width} ${height} L 0 ${height} Z`, last };
}

function ChartCard({ className }: { className?: string }) {
  const { line, area, last } = useMemo(() => buildChartPath(CHART_VALUES, 600, 170), []);

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-[10px] rounded-[12px] border border-white/[0.07] bg-white/[0.03] p-[14px]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[12.5px] font-medium text-white">Daily spending dynamics</p>
        <p className="text-[11px] text-[#8b8988]">Last 30 days</p>
      </div>
      <div className="relative min-h-0 flex-1">
        <svg
          aria-hidden
          viewBox="0 0 600 170"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <defs>
            <linearGradient id="zemonie-hero-chart" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff7900" stopOpacity="0.42" />
              <stop offset="100%" stopColor="#ff7900" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3].map((row) => (
            <line
              key={row}
              x1="0"
              x2="600"
              y1={12 + row * 48}
              y2={12 + row * 48}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <path d={area} fill="url(#zemonie-hero-chart)" />
          <path
            d={line}
            fill="none"
            stroke="#ff7900"
            strokeWidth="2"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <circle cx={last.x} cy={last.y} r="4" fill="#ff9a3d" />
        </svg>
      </div>
    </div>
  );
}

function CalendarRow({
  label,
  value,
  delta,
  positive,
}: {
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-white/[0.06] py-[7px] text-[11.5px]">
      <span className="truncate text-[#8b8988]">{label}</span>
      <span className="flex shrink-0 items-center gap-[8px]">
        <span className="font-semibold text-white">{value}</span>
        {delta ? (
          <span
            className="text-[11px] font-semibold"
            style={{ color: positive ? POSITIVE : NEGATIVE }}
          >
            {delta}
          </span>
        ) : null}
      </span>
    </div>
  );
}

function CalendarCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col rounded-[12px] border border-white/[0.07] bg-white/[0.03] p-[14px]",
        className,
      )}
    >
      <p className="text-[12.5px] font-semibold text-white">January 2026</p>
      <p className="mt-[2px] text-[11px] text-[#8b8988]">This month – Now (monthly)</p>
      <div className="mt-[8px] flex flex-col">
        <CalendarRow label="Total transactions" value="1,284" delta="+8.4%" positive />
        <CalendarRow label="Avg. categorisation" value="0.42s" />
        <CalendarRow label="Savings rate" value="68.2%" delta="+2.1%" positive />
        <CalendarRow label="Connected apps" value="Banking · Wallets" />
      </div>
    </div>
  );
}

function ProCard() {
  return (
    <div
      className="rounded-[12px] border border-[#ff7900]/25 p-[12px]"
      style={{ background: "linear-gradient(160deg, rgba(255,121,0,0.16), rgba(255,121,0,0.04))" }}
    >
      <p className="flex items-center gap-[6px] text-[12px] font-semibold text-white">
        <Zap size={12} className="text-[#ff9a3d]" fill="currentColor" />
        Zemonie Pro
      </p>
      <p className="mt-[4px] text-[10.5px] leading-[1.45] text-[#b9b7b6]">
        Smart rules, unlimited budgets and priority sync.
      </p>
      <span
        className="mt-[10px] inline-flex rounded-full px-[14px] py-[6px] text-[10.5px] font-semibold text-[#1a0c00]"
        style={{ backgroundImage: BTN_GRADIENT }}
      >
        Upgrade
      </span>
    </div>
  );
}

function TopBar() {
  return (
    <div className="flex h-[30px] shrink-0 items-center justify-end gap-[10px]">
      {[Bell, Sun, Maximize2].map((Icon, index) => (
        <span
          key={index}
          className="grid size-[28px] place-items-center rounded-[8px] border border-white/[0.07] bg-white/[0.03] text-[#8b8988]"
        >
          <Icon size={13} />
        </span>
      ))}
      <span className="ml-[4px] flex items-center gap-[8px] rounded-full border border-white/[0.07] bg-white/[0.03] py-[3px] pr-[12px] pl-[3px]">
        <span
          className="grid size-[24px] place-items-center rounded-full text-[11px] font-semibold text-[#1a0c00]"
          style={{ backgroundImage: BTN_GRADIENT }}
        >
          A
        </span>
        <span className="flex flex-col leading-[1.15]">
          <span className="text-[11.5px] font-medium text-white">Alex T.</span>
          <span className="text-[9.5px] text-[#8b8988]">alex@zemonie.app</span>
        </span>
      </span>
    </div>
  );
}

const dashVariants: Variants = {
  hidden: { opacity: 0, y: 150 },
  show: { opacity: 1, y: 0, transition: { duration: 0.95, delay: 0.74, ease: EASE } },
};

function dashPart(delay: number): Variants {
  return {
    hidden: { opacity: 0, y: 26 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: EASE } },
  };
}

function DesktopStage({ stage, initial }: { stage: Stage; initial: "hidden" | "show" }) {
  const dashLeft = (stage.width - DASH_W) / 2;

  return (
    <div
      className="absolute left-0 top-0 origin-top-left"
      style={{ width: stage.width, height: stage.height, transform: `scale(${stage.scale})` }}
    >
      <motion.div className="h-full w-full" initial={initial} animate="show">
        <div className="absolute inset-x-0 top-[272px] mx-auto w-[1180px]">
          <HeroCopy
            headingClass="text-[84px] leading-[0.92]"
            ledeClass="mt-[24px] w-[880px] text-[16.5px] leading-[1.7] text-gray-600 dark:text-[#b5b3b2]"
            lines={[
              <>
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: NAME_GRADIENT }}
                >
                  Zemonie
                </span>{" "}
                Master Your Money,
              </>,
              <>Smarter, Faster, Safer.</>,
            ]}
          />
        </div>

        <motion.div className="pointer-events-none absolute inset-0" variants={dashVariants}>
          <motion.aside
            aria-hidden
            className="pointer-events-auto absolute overflow-hidden rounded-[14px] border border-[#ff7900]/35 bg-[#08080a]/85 backdrop-blur-xl"
            style={{
              left: dashLeft,
              top: DASH_TOP,
              width: DASH_W,
              height: DASH_H,
              boxShadow: "inset 0 1px 0 rgba(255,121,0,0.35), 0 40px 120px rgba(0,0,0,0.65)",
            }}
          >
            <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#ff7900_18%,#ffc48a_50%,#ff7900_82%,transparent)] shadow-[0_0_16px_2px_rgba(255,121,0,0.6)]" />
            <div className="flex h-full">
              <motion.div
                variants={dashPart(1.16)}
                className="flex w-[236px] shrink-0 flex-col gap-[14px] border-r border-white/[0.07] bg-white/[0.02] p-[18px]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-[8px]">
                    <Bolt className="size-[24px] rounded-[7px]" />
                    <span className="font-display text-[14.5px] font-bold text-white">Zemonie</span>
                  </span>
                  <Settings size={13} className="text-[#8b8988]" />
                </div>
                <div className="flex flex-col gap-[6px]">
                  {SIDE_PRIMARY.map((item) => (
                    <SidebarItem key={item.label} {...item} active={item.label === "Dashboard"} />
                  ))}
                </div>
                <div className="flex flex-col gap-[6px]">
                  {SIDE_SECONDARY.map((item) => (
                    <SidebarItem key={item.label} {...item} />
                  ))}
                </div>
                <ProCard />
              </motion.div>

              <div className="flex min-w-0 flex-1 flex-col gap-[14px] p-[18px]">
                <motion.div variants={dashPart(1.24)}>
                  <TopBar />
                </motion.div>
                <motion.div className="flex gap-[14px]" variants={dashPart(1.36)}>
                  <StatCard
                    label="Money managed (since inception)"
                    value="$214,402"
                    delta="+12.5%"
                    positive
                  />
                  <StatCard label="Active users" value="6,412" delta="-3.1%" positive={false} />
                </motion.div>
                <motion.div className="flex gap-[14px]" variants={dashPart(1.48)}>
                  <ChartCard className="h-[280px] flex-1" />
                  <CalendarCard className="h-[280px] w-[330px]" />
                </motion.div>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      </motion.div>
    </div>
  );
}

function MobileStage({ initial }: { initial: "hidden" | "show" }) {
  return (
    <motion.div
      className="relative z-10 flex flex-col px-5 pt-[164px] pb-16"
      initial={initial}
      animate="show"
    >
      <motion.div
        className="mt-0"
        variants={{
          hidden: { opacity: 0, y: 26 },
          show: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.1, ease: EASE } },
        }}
      >
        <HeroCopy
          compact
          headingClass="text-[30px] leading-[1] sm:text-[40px] md:text-[50px]"
          ledeClass="mt-5 text-[14.5px] leading-[1.65] text-gray-600 dark:text-[#b5b3b2]"
          lines={[
            <>
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: NAME_GRADIENT }}
              >
                Zemonie
              </span>{" "}
              Master
            </>,
            <>Your Money, Smarter,</>,
            <>Faster, Safer.</>,
          ]}
        />
      </motion.div>

      <motion.div
        className="relative mt-12"
        variants={{
          hidden: { opacity: 0, y: 90 },
          show: { opacity: 1, y: 0, transition: { duration: 0.85, delay: 0.55, ease: EASE } },
        }}
      >
        <img
          src={DASH_GLOW}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 hidden dark:block"
          style={{
            width: "150%",
            maxWidth: "none",
            height: 140,
            mixBlendMode: "screen",
            filter: "sepia(1) saturate(6) hue-rotate(-8deg) brightness(2.2)",
          }}
        />
        <div
          aria-hidden
          className="relative overflow-hidden rounded-[16px] border border-[#ff7900]/30 bg-[#08080a]/85 p-4 backdrop-blur-xl"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#ff7900_20%,#ffc48a_50%,#ff7900_80%,transparent)] shadow-[0_0_14px_2px_rgba(255,121,0,0.55)]" />
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[...SIDE_PRIMARY, ...SIDE_SECONDARY].map((item) => (
              <span
                key={item.label}
                className={cn(
                  "flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium",
                  item.label === "Dashboard"
                    ? "border-[#ff7900]/30 bg-[#ff7900]/12 text-[#ff9a3d]"
                    : "border-white/10 bg-white/5 text-[#8b8988]",
                )}
              >
                <item.Icon size={13} />
                {item.label}
              </span>
            ))}
          </div>
          <div className="mt-3 space-y-3">
            <div className="flex gap-3">
              <StatCard label="Money managed" value="$214,402" delta="+12.5%" positive />
              <StatCard label="Active users" value="6,412" delta="-3.1%" positive={false} />
            </div>
            <ChartCard className="h-[190px] w-full" />
            <CalendarCard className="w-full" />
            <ProCard />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const reduced = useReducedMotion();
  const stage = useStage();
  const [bannerVisible] = useReleaseBannerVisible();
  const [videoState, setVideoState] = useState<"idle" | "ready" | "error">("idle");
  const bannerOffset = bannerVisible ? 44 : 0;
  const showVideo = !stage.mobile && !reduced;
  const initial: "hidden" | "show" = reduced ? "show" : "hidden";

  const drawRimLayer = useMemo<DrawFn>(() => {
    if (stage.mobile) {
      return (ctx, width, height) => {
        paintRim(ctx, { width, height, cx: width / 2, apex: MOBILE_RIM_APEX, halfSpan: width / 2 });
      };
    }
    return (ctx, width, height) => {
      const unit = stage.scale;
      ctx.save();
      ctx.scale(unit, unit);
      paintRim(ctx, {
        width: width / unit,
        height: height / unit,
        cx: width / unit / 2,
        apex: RIM_APEX,
        halfSpan: RIM_HALF_SPAN,
      });
      ctx.restore();
    };
  }, [stage.mobile, stage.scale]);

  const rimVisible = !showVideo || videoState !== "ready";
  const videoWidth = Math.max(VIDEO_W, stage.width) * stage.scale;
  const videoHeight = (VIDEO_H / VIDEO_W) * videoWidth;
  const dashLeft = (stage.width - DASH_W) / 2;

  return (
    <section
      aria-label="Zemonie hero"
      className="relative w-full overflow-hidden font-ui text-gray-900 dark:bg-black dark:text-[#f7f7f8]"
      style={{
        height: stage.mobile ? undefined : `calc(100vh - ${bannerOffset}px)`,
        minHeight: stage.mobile ? `calc(100vh - ${bannerOffset}px)` : undefined,
        isolation: "isolate",
      }}
    >
      <Starfield className="hidden dark:block" />
      <CanvasLayer
        draw={drawRimLayer}
        className="hidden dark:block transition-opacity duration-[800ms]"
        style={{ opacity: rimVisible ? 1 : 0 }}
      />
      {showVideo ? (
        <video
          className="pointer-events-none absolute top-0 hidden dark:block"
          style={{
            left: "50%",
            width: videoWidth,
            height: videoHeight,
            transform: "translateX(-50%)",
            mixBlendMode: "screen",
            filter: "hue-rotate(128deg) saturate(1.15)",
            opacity: videoState === "ready" ? 1 : 0,
            transition: "opacity 0.8s ease",
          }}
          src={GLOW_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          onLoadedData={() => setVideoState("ready")}
          onCanPlay={() => setVideoState("ready")}
          onError={() => setVideoState("error")}
        />
      ) : null}
      {stage.mobile ? null : (
        <motion.img
          src={DASH_GLOW}
          alt=""
          aria-hidden
          className="pointer-events-none absolute hidden dark:block"
          initial={initial}
          animate="show"
          variants={dashVariants}
          style={{
            left: (dashLeft - 130) * stage.scale,
            top: (DASH_TOP - 78) * stage.scale,
            width: (DASH_W + 260) * stage.scale,
            height: 156 * stage.scale,
            maxWidth: "none",
            mixBlendMode: "screen",
            filter: "sepia(1) saturate(6) hue-rotate(-8deg) brightness(2.2)",
          }}
        />
      )}
      {stage.mobile ? (
        <MobileStage initial={initial} />
      ) : (
        <DesktopStage stage={stage} initial={initial} />
      )}
    </section>
  );
}
