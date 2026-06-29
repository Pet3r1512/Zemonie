import { useCallback, useEffect, useRef, useState } from "react";
import ScrollStack, { ScrollStackItem } from "@/components/ui/reactbits/scroll-stack";
import { Banknote, Lock, ShieldOff } from "lucide-react";

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
    title: "Your amounts are encrypted. Not just stored.",
    subtitle: "Actually encrypted",
    description:
      "Every transaction amount is AES-GCM encrypted before it ever hits the database — so even a data breach exposes nothing readable. Most finance apps store your numbers in plain text and hope for the best.",
    tag: "Field-level AES-GCM encryption",
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

export default function Differents() {
  const [isStackComplete, setIsStackComplete] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollStackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stackEl = scrollStackRef.current;
    if (!section || !stackEl) return;

    const onWheel = (e: WheelEvent) => {
      if (isStackComplete) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top <= 0 && rect.bottom >= window.innerHeight * 0.5;
      if (!inView) return;
      e.preventDefault();
      stackEl.scrollTop += e.deltaY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [isStackComplete]);

  const handleStackComplete = useCallback(() => {
    setIsStackComplete(true);
  }, []);

  return (
    <section ref={sectionRef} className="lg:mb-48">
      {/* Header */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6 cursor-default">
            <span className="text-sm font-medium text-primary">Built Different</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Finance tools built for
            <br />
            <span className="text-primary">real life</span>, not your banker
          </h1>
        </div>
      </div>

      {/* ScrollStack */}
      <div ref={scrollStackRef} className="h-[50dvh] max-w-5xl mx-auto overflow-hidden">
        <ScrollStack
          itemDistance={80}
          blurAmount={3}
          baseScale={0.92}
          stackPosition="35%"
          onStackComplete={handleStackComplete}
          className="no-scrollbar"
        >
          {cards.map((card, i) => (
            <ScrollStackItem
              key={i}
              itemClassName="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-elevated"
            >
              <div className="lex items-center gap-8 h-full">
                {/* Content */}
                <div className={"flex flex-col gap-3 max-w-md"}>
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
                  <div className="inline-flex items-center gap-1.5 mt-1 px-3.5 py-1.5 rounded-full border border-gray-200 dark:border-dark-elevated w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-70 shrink-0" />
                    <span className="text-xs font-medium text-gray-400 dark:text-gray-500 tracking-wide">
                      {card.tag}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
