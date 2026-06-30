"use client";

import { useRef } from "react";
import { Banknote, Lock, ShieldOff } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

const cards = [
  {
    icon: <Lock size={28} className="text-primary" />,
    title: "We never touch your bank account.",
    subtitle: "No credentials, ever",
    description:
      "Zemonie works without linking a single account. No bank login, no routing number, no OAuth handshake with your institution. Wallets are just named envelopes you control — nothing connects to the real thing.",
    tag: "Zero banking credentials stored",
  },
  {
    icon: <ShieldOff size={28} className="text-primary" />,
    title: "Your amounts are all encrypted. Not just stored.",
    subtitle: "Actually encrypted",
    description:
      "Every transaction amount is AES-GCM encrypted before it ever hits the database — so even a data breach exposes nothing readable. Most finance apps store your numbers in plain text and hope for the best.",
    tag: "Applied AES-GCM encryption",
  },
  {
    icon: <Banknote size={28} className="text-primary" />,
    title: "Free. Open source. No subscription tax.",
    subtitle: "No catch",
    description:
      "Every other app locks insights behind a paywall. Zemonie is fully free and open source — no premium tier, no 14-day trial, no card required. Just sign up and go.",
    tag: "AGPL-3.0 licensed on GitHub",
  },
];

interface CardItemProps {
  card: (typeof cards)[number];
  i: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  targetScale: number;
}

function CardItem({ card, i, progress, range, targetScale }: CardItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scale this card down as the next one scrolls over it
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    // Each card takes full viewport height — this is what gives scroll distance
    <div ref={containerRef} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 28}px)`, // stacking offset per Olivier's pattern
        }}
        className="relative w-full max-w-5xl mx-auto px-4"
      >
        <div
          className={`
            flex items-center gap-8 p-10 rounded-[40px] min-h-72
            bg-white dark:bg-dark-card
            border border-gray-200 dark:border-dark-elevated
            shadow-[0_0_30px_rgba(0,0,0,0.08)]
          `}
        >
          {/* Content */}
          <div
            className={cn(
              "flex flex-col gap-3 max-w-lg",
              i % 2 !== 0 ? "ml-auto items-end text-right" : "",
            )}
          >
            <div className="flex items-center gap-2.5">
              {card.icon}
              <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-primary opacity-85">
                {card.subtitle}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white leading-snug tracking-tight">
              {card.title}
            </h2>

            <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed">
              {card.description}
            </p>

            <div
              className={`inline-flex items-center gap-1.5 mt-1 px-3.5 py-1.5 rounded-full border border-primary dark:border-primary w-fit`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-70 shrink-0" />
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 tracking-wide">
                {card.tag}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Differents() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress across the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="lg:mb-48">
      {/* Header — normal flow, not sticky */}
      <div className="max-w-6xl mx-auto relative z-10 px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6 cursor-default">
            <span className="text-sm font-medium text-primary">Built Different</span>
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Finance tools built for <span className="text-primary">real life</span>, not your banker
          </h1>
        </div>
      </div>

      {/* Cards container — its full scroll height drives the animation */}
      <div ref={containerRef}>
        {cards.map((card, i) => {
          const targetScale = 1 - (cards.length - i) * 0.05;
          return (
            <CardItem
              key={i}
              card={card}
              i={i}
              progress={scrollYProgress}
              range={[i / cards.length, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </section>
  );
}
