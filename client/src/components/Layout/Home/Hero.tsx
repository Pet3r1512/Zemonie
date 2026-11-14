import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  ArrowDown,
  ArrowUp,
  Banknote,
  CircleUser,
  Crosshair,
  LayoutDashboard,
  LogOut,
  Menu,
  MoveDown,
  MoveUp,
  Settings,
  TrendingUp,
  Wallet,
  type LucideIcon,
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
const MOCK_BOTTOM = DASH_TOP + DASH_H + 32;
const RIM_HALF_SPAN = 836;
const RIM_APEX = 217;
const MOBILE_RIM_APEX = 128;
const MOBILE_BREAKPOINT = 900;

const BTN_GRADIENT = "linear-gradient(135deg, #ff9d33 0%, #ff7900 55%, #ff6200 100%)";
const NAME_GRADIENT = "linear-gradient(105deg, #ffb257, #ff7900 52%, #ff5e00)";
const DASH_GLOW =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/e0e14572-12e1-4c08-b471-a21521844945.png";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const SIDE_GROUPS = [
  {
    label: "OVERVIEW",
    items: [{ label: "Dashboard", Icon: LayoutDashboard, active: true }],
  },
  {
    label: "TRACKING",
    items: [
      { label: "Money Moves", Icon: Banknote },
      { label: "Income", Icon: ArrowDown },
      { label: "Expenses", Icon: ArrowUp },
    ],
  },
  {
    label: "GOALS",
    items: [{ label: "Budgets", Icon: Crosshair, isNew: true }],
  },
];

const SIDE_FOOTER = [
  { label: "Settings", Icon: Settings },
  { label: "Profile", Icon: CircleUser },
  { label: "Log Out", Icon: LogOut, danger: true },
];

const STAT_ICONS = {
  balance: (
    <span className="grid size-[22px] shrink-0 place-items-center rounded-full sm:size-[26px] bg-blue-100 dark:bg-blue-900/30">
      <Wallet size={14} className="text-blue-500" />
    </span>
  ),
  savings: (
    <span className="grid size-[22px] shrink-0 place-items-center rounded-full sm:size-[26px] bg-yellow-100 dark:bg-yellow-900/30">
      <TrendingUp size={14} className="text-yellow-500" />
    </span>
  ),
  income: (
    <span className="grid size-[22px] shrink-0 place-items-center rounded-full sm:size-[26px] bg-green-100 dark:bg-green-900/30">
      <MoveDown size={14} className="text-green-500" />
    </span>
  ),
  expense: (
    <span className="grid size-[22px] shrink-0 place-items-center rounded-full sm:size-[26px] bg-red-100 dark:bg-red-900/30">
      <MoveUp size={14} className="text-red-500" />
    </span>
  ),
};

const STAT_CARDS = [
  {
    title: "Total Balance",
    value: "A$12,480.50",
    subtitle: "Current Balance",
    icon: STAT_ICONS.balance,
  },
  {
    title: "Net Savings",
    value: "A$1,240.00",
    subtitle: "Current Month",
    icon: STAT_ICONS.savings,
    valueClass: "text-green-500",
  },
  {
    title: "Latest Income",
    value: "A$3,200.00",
    subtitle: "Salary \u00b7 Nov 8",
    icon: STAT_ICONS.income,
  },
  {
    title: "Latest Expense",
    value: "A$860.40",
    subtitle: "Groceries \u00b7 Nov 9",
    icon: STAT_ICONS.expense,
  },
];

const SPEND_SEGMENTS = [
  { name: "Housing", pct: 42, color: "#eab308" },
  { name: "Groceries", pct: 26, color: "#f97316" },
  { name: "Travel", pct: 18, color: "#3b82f6" },
  { name: "Entertainment", pct: 14, color: "#d946ef" },
];

type Stage = { mobile: boolean; scale: number; width: number; height: number };

function readStage(): Stage {
  const vw = typeof window === "undefined" ? 1440 : window.innerWidth;
  const vh = typeof window === "undefined" ? 900 : window.innerHeight;
  if (vw < MOBILE_BREAKPOINT || vh >= vw) return { mobile: true, scale: 1, width: vw, height: vh };
  const scale = Math.min(vw / STAGE_W, vh / STAGE_H);
  return {
    mobile: false,
    scale,
    width: vw / scale,
    height: Math.max(vh / scale, MOCK_BOTTOM),
  };
}

function isSameStage(a: Stage, b: Stage) {
  return (
    a.mobile === b.mobile && a.scale === b.scale && a.width === b.width && a.height === b.height
  );
}

function useStage() {
  const [stage, setStage] = useState<Stage>(readStage);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const next = readStage();
      setStage((prev) => (isSameStage(prev, next) ? prev : next));
    };
    const onResize = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(frame);
    };
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
  isNew = false,
  danger = false,
}: {
  label: string;
  Icon: LucideIcon;
  active?: boolean;
  isNew?: boolean;
  danger?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-[30px] items-center gap-[9px] rounded-[9px] px-[10px] text-[12.5px] font-medium",
        active
          ? "border border-[#ff7900]/30 bg-[#ff7900]/12 text-primary dark:text-[#ff9a3d]"
          : danger
            ? "border border-transparent text-red-500"
            : "border border-transparent text-gray-500 dark:text-[#8b8988]",
      )}
    >
      <Icon size={14} strokeWidth={2} />
      <span>{label}</span>
      {isNew ? (
        <span className="ml-auto rounded-full bg-green-100 px-1.5 py-0.5 text-[9.5px] font-bold text-green-700 dark:bg-emerald-400/15 dark:text-emerald-300">
          New
        </span>
      ) : null}
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon,
  valueClass,
}: {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  valueClass?: string;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col justify-center gap-[5px] rounded-[12px] border border-gray-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.03] px-[14px] py-[9px]">
      <div className="flex items-center justify-between gap-3">
        <p className="truncate font-display text-[12px] font-bold text-gray-900 dark:text-white sm:text-[14px]">
          {title}
        </p>
        {icon}
      </div>
      <p
        className={cn(
          "text-[19px] leading-none font-semibold tracking-[-0.02em]",
          valueClass ?? "text-gray-900 dark:text-white",
        )}
      >
        {value}
      </p>
      <p className="truncate text-[11px] text-gray-500 dark:text-[#8b8988]">{subtitle}</p>
    </div>
  );
}

const INCOME_COLOR = "#38b000";
const EXPENSE_COLOR = "#ef233c";

function IncomeVsExpensesCard({ className }: { className?: string }) {
  const incomeH = 118;
  const expenseH = 42;

  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-[10px] rounded-[12px] border border-gray-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.03] p-[14px]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-[12.5px] font-medium text-gray-900 dark:text-white">
          Income vs Expenses
        </p>
        <span className="flex items-center gap-[10px] text-[10.5px] text-gray-500 dark:text-[#8b8988]">
          <span className="flex items-center gap-[5px]">
            <i className="size-[7px] rounded-full" style={{ background: INCOME_COLOR }} />
            Income
          </span>
          <span className="flex items-center gap-[5px]">
            <i className="size-[7px] rounded-full" style={{ background: EXPENSE_COLOR }} />
            Expenses
          </span>
        </span>
      </div>
      <div className="relative min-h-0 flex-1">
        <svg
          aria-hidden
          viewBox="0 0 600 170"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {[0, 1, 2, 3].map((row) => (
            <line
              key={row}
              x1="0"
              x2="600"
              y1={14 + row * 40}
              y2={14 + row * 40}
              className="stroke-gray-200 dark:stroke-white/[0.06]"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          <rect x="238" y={150 - incomeH} width="86" height={incomeH} rx="4" fill={INCOME_COLOR} />
          <rect
            x="342"
            y={150 - expenseH}
            width="86"
            height={expenseH}
            rx="4"
            fill={EXPENSE_COLOR}
          />
        </svg>
        <span className="absolute inset-x-0 bottom-[-2px] text-center text-[10.5px] text-gray-500 dark:text-[#8b8988]">
          Nov 2026
        </span>
      </div>
    </div>
  );
}

function SpendingByCategoryCard({ className }: { className?: string }) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div
      className={cn(
        "flex shrink-0 flex-col gap-[6px] rounded-[12px] border border-gray-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.03] p-[12px]",
        className,
      )}
    >
      <p className="text-[12.5px] font-medium text-gray-900 dark:text-white">
        Spending by Category
      </p>
      <div className="flex flex-1 flex-col items-center justify-center gap-[6px]">
        <div className="relative mx-auto size-[96px] shrink-0">
          <svg aria-hidden viewBox="0 0 104 104" className="size-full -rotate-90">
            <circle
              cx="52"
              cy="52"
              r={radius}
              fill="none"
              className="stroke-gray-200 dark:stroke-white/[0.06]"
              strokeWidth="15"
            />
            {SPEND_SEGMENTS.map((seg) => {
              const length = (seg.pct / 100) * circumference;
              const element = (
                <circle
                  key={seg.name}
                  cx="52"
                  cy="52"
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth="15"
                  strokeDasharray={`${length} ${circumference - length}`}
                  strokeDashoffset={-offset}
                />
              );
              offset += length;
              return element;
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[10px] font-bold text-gray-900 dark:text-white">A$2,184.60</span>
            <span className="text-[9.5px] text-gray-500 dark:text-[#8b8988]">Total</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-[12px] gap-y-[6px] text-[10.5px]">
          {SPEND_SEGMENTS.map((seg) => (
            <div key={seg.name} className="flex items-center gap-[5px]">
              <i className="size-[7px] shrink-0 rounded-full" style={{ background: seg.color }} />
              <span className="font-medium text-gray-900 dark:text-white">{seg.name}</span>
              <span className="text-gray-500 dark:text-[#8b8988]">{seg.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Last7DaysCard({ className }: { className?: string }) {
  const bars = [
    { day: "Mon", h: 46 },
    { day: "Tue", h: 72 },
    { day: "Wed", h: 38 },
    { day: "Thu", h: 88 },
    { day: "Fri", h: 64 },
    { day: "Sat", h: 96 },
    { day: "Sun", h: 54 },
  ];

  return (
    <div
      className={cn(
        "flex min-h-0 flex-col gap-[8px] rounded-[12px] border border-gray-200 bg-white dark:border-white/[0.07] dark:bg-white/[0.03] p-[14px]",
        className,
      )}
    >
      <p className="text-[12.5px] font-medium text-gray-900 dark:text-white">
        Last 7 Days Spendings
      </p>
      <div className="flex min-h-0 flex-1 items-end gap-[10px]">
        {bars.map((bar) => (
          <div key={bar.day} className="flex min-w-0 flex-1 flex-col items-center gap-[5px]">
            <div
              className="w-full max-w-[26px] rounded-t-[6px]"
              style={{ height: `${bar.h * 1.4}px`, background: "#ff7900" }}
            />
            <span className="text-[9.5px] text-gray-500 dark:text-[#8b8988]">{bar.day}</span>
          </div>
        ))}
      </div>
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
        <div className="absolute inset-x-0 top-[190px] mx-auto w-[1180px]">
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
            className="pointer-events-auto absolute overflow-hidden rounded-[14px] border border-[#ff7900]/35 bg-white/90 dark:bg-[#08080a]/85 backdrop-blur-xl"
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
                className="flex w-[256px] shrink-0 flex-col border-r border-gray-200 bg-gray-50 dark:border-white/[0.07] dark:bg-white/[0.02]"
              >
                <div className="flex flex-col gap-2 px-5 py-2">
                  <img
                    src="/logo/zemonie_logo.webp"
                    alt=""
                    className="my-5 h-12 w-auto self-start"
                  />
                </div>
                <div className="flex flex-1 flex-col space-y-5 px-5">
                  {SIDE_GROUPS.map((group) => (
                    <div key={group.label} className="flex flex-col p-2">
                      <p className="flex h-8 shrink-0 items-center px-2 text-xs font-semibold text-secondary">
                        {group.label}
                      </p>
                      <div className="flex flex-col gap-[14px]">
                        {group.items.map((item) => (
                          <SidebarItem key={item.label} {...item} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-[6px] px-5 pb-2">
                  {SIDE_FOOTER.map((item) => (
                    <SidebarItem key={item.label} {...item} />
                  ))}
                </div>
              </motion.div>

              <div className="flex min-w-0 flex-1 flex-col gap-[8px] p-[18px]">
                <motion.div className="flex flex-col gap-[4px]" variants={dashPart(1.24)}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-[10px]">
                      <span className="grid size-[26px] shrink-0 place-items-center text-gray-500 dark:text-[#8b8988]">
                        <Menu size={16} />
                      </span>
                      <span className="truncate font-display text-[24px] leading-none font-bold tracking-[-0.03em] text-gray-900 dark:text-white">
                        Dashboard
                      </span>
                    </span>
                    <span
                      className="shrink-0 rounded-full px-[16px] py-[7px] text-[12px] font-semibold text-[#1a0c00]"
                      style={{ backgroundImage: BTN_GRADIENT }}
                    >
                      + Add
                    </span>
                  </div>
                  <p className="pl-[36px] text-[12.5px] text-gray-600 dark:text-[#b5b3b2]">
                    Welcome back, Alex
                  </p>
                </motion.div>
                <motion.div className="flex gap-[12px]" variants={dashPart(1.36)}>
                  {STAT_CARDS.map((card) => (
                    <StatCard key={card.title} {...card} />
                  ))}
                </motion.div>
                <motion.div className="grid grid-cols-2 gap-[12px]" variants={dashPart(1.48)}>
                  <IncomeVsExpensesCard className="h-[176px] min-w-0" />
                  <SpendingByCategoryCard className="h-[176px] min-w-0" />
                </motion.div>
                <motion.div
                  className="grid min-h-0 flex-1 grid-cols-2 gap-[12px]"
                  variants={dashPart(1.56)}
                >
                  <Last7DaysCard className="h-full min-w-0" />
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
          className="relative overflow-hidden rounded-[16px] border border-[#ff7900]/30 bg-white/90 dark:bg-[#08080a]/85 p-4 backdrop-blur-xl"
        >
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#ff7900_20%,#ffc48a_50%,#ff7900_80%,transparent)] shadow-[0_0_14px_2px_rgba(255,121,0,0.55)]" />
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              {STAT_CARDS.map((card) => (
                <StatCard key={card.title} {...card} />
              ))}
            </div>
            <IncomeVsExpensesCard className="h-[190px] w-full" />
            <SpendingByCategoryCard className="h-[224px] w-full" />
            <Last7DaysCard className="h-[200px] w-full" />
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
  const bannerOffset = bannerVisible ? 44 : 0;
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

  const dashLeft = (stage.width - DASH_W) / 2;

  return (
    <section
      aria-label="Zemonie hero"
      className="relative w-full overflow-hidden font-ui text-gray-900 dark:bg-black dark:text-[#f7f7f8]"
      style={{
        height: stage.mobile
          ? undefined
          : `max(calc(100vh - ${bannerOffset}px), ${MOCK_BOTTOM * stage.scale}px)`,
        minHeight: stage.mobile ? `calc(100vh - ${bannerOffset}px)` : undefined,
        isolation: "isolate",
      }}
    >
      <Starfield className="hidden dark:block" />
      <CanvasLayer draw={drawRimLayer} className="hidden dark:block" />
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
