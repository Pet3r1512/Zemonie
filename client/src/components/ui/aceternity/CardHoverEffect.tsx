import { FeatureCardData, } from "@/components/Layout/Home/Features/FeatureCards";
import { cn, } from "@/lib/utils";
import { AnimatePresence, motion, } from "motion/react";

import { useState, } from "react";

export const HoverEffect = ({
  items,
  className,
}: {
  items: FeatureCardData[];
  className?: string;
},) => {
  const [hoveredIndex, setHoveredIndex,] = useState<number | null>(null,);

  return (
    <div
      role="card-hover-effect"
      className={cn("grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-[0.425rem]", className,)}
    >
      {items.map((item, idx,) => (
        <div
          data-testid={item.title}
          key={item?.title}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx,)}
          onMouseLeave={() => setHoveredIndex(null,)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-primary dark:bg-dark-elevated block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0, }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15, },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2, },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <div className="flex items-center justify-center p-2 rounded-full size-fit bg-zinc-100 dark:bg-dark-elevated">
              {item.icon}
            </div>
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.desc}</CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
},) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-white dark:bg-dark-card border border-transparent dark:border-dark-card group-hover:border-primary relative z-20",
        className,
      )}
    >
      <div className="relative z-50">
        <div className="!p-2 lg:text-left">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
},) => {
  return (
    <h4
      className={cn("text-primary font-bold tracking-wide mt-4 md:text-lg lg:text-xl", className,)}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
},) => {
  return (
    <p
      className={cn(
        "mt-8 text-zinc-800 dark:text-gray-300 tracking-wide leading-relaxed text-sm",
        className,
      )}
    >
      {children}
    </p>
  );
};
