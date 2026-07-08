"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, m } from "motion/react";
import { useOutsideClick } from "@/hooks/aceternity/useOutsideClick";
import { BudgetDuration, BudgetResponseType } from "./types";
import { CurrentCategory } from "@/components/ui/aceternity/ExpandableCard";
import categoryColorDictionary from "@/types/CategoryDict";
import { formatCurrency } from "@/helpers/formatCurrency";
import useUserPreferences from "@/hooks/users/useUserPreferences";
import ParseISOStringDate from "@/helpers/parseISOStringData";
import CalculateBudgetProgress from "@/helpers/calculateBudgetProgress";
import { cn } from "@/lib/utils";

const loadFeatures = () => import("motion/react").then((res) => res.domMax);

const durationDict: Record<BudgetDuration, string> = {
  [BudgetDuration.WEEK_1]: "1 Week",
  [BudgetDuration.WEEK_2]: "2 Weeks",
  [BudgetDuration.MONTH_1]: "1 Month",
  [BudgetDuration.MONTH_3]: "3 Months",
  [BudgetDuration.MONTH_6]: "6 Months",
  [BudgetDuration.MONTH_12]: "12 Months",
};

export function BudgetDetails({
  budget,
  children,
}: {
  budget: BudgetResponseType;
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const currency = useUserPreferences().data?.preferences?.currency ?? "AUD";

  const globalCategories: CurrentCategory[] = useMemo(() => {
    const data = typeof window !== "undefined" ? sessionStorage.getItem("globalCategories") : null;
    return data ? JSON.parse(data) : [];
  }, []);

  const currCategory: CurrentCategory | undefined = globalCategories.find(
    (c) => c.id === budget.categoryId,
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () => setActive(false));

  return (
    <LazyMotion features={loadFeatures}>
      <AnimatePresence>
        {active && (
          <m.div
            key={`backdrop-${id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActive(false)}
            className="fixed inset-0 bg-black/80 z-10 will-change-auto"
          />
        )}
        {active && (
          <m.section
            key={`card-${id}`}
            layoutId={`card-${budget.id}-${id}`}
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 size-fit! m-auto z-100 max-h-[90dvh] w-[95dvw] md:max-w-150 lg:min-w-150 flex flex-col bg-white dark:bg-dark-elevated sm:rounded-3xl rounded-xl overflow-hidden will-change-transform"
          >
            <m.div className="p-6 space-y-4 w-full! overflow-y-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2.5">
                  {currCategory && categoryColorDictionary[currCategory.id.toString()]?.icon}
                  <p className="text-lg font-semibold">{currCategory?.name}</p>
                </div>
                <p className="text-xl font-bold">{formatCurrency(budget.amount, currency)}</p>
              </div>
              <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-600" />
              <div
                className={cn(
                  budget.name
                    ? "grid grid-cols-2 grid-rows-2 gap-2.5"
                    : "grid grid-cols-2 grid-rows-1",
                )}
              >
                {budget.name && (
                  <p className="font-semibold col-span-2 text-sm md:text-base">
                    Name: <span className="font-normal">{budget.name}</span>
                  </p>
                )}
                <p className="font-semibold text-sm md:text-base">
                  Spent:{" "}
                  <span className="font-normal text-green-500">
                    {formatCurrency(budget.spentAmount, currency)}
                  </span>{" "}
                </p>
                <p className="font-semibold text-sm md:text-base">
                  Progress:{" "}
                  <span className="font-normal text-secondary">
                    {CalculateBudgetProgress({ total: budget.amount, spent: budget.spentAmount })}%
                  </span>
                </p>
              </div>
              <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-600" />
              <div className="grid grid-cols-2 grid-rows-2 gap-2.5">
                <p className="font-semibold text-sm md:text-base">
                  Created At:{" "}
                  <span className="font-normal">
                    {ParseISOStringDate({ date: budget.createdAt }).split(",")[1]}
                  </span>
                </p>
                <p className="font-semibold text-sm md:text-base">
                  Duration: <span className="font-normal">{durationDict[budget.duration]}</span>
                </p>
                <p className="font-semibold text-sm md:text-base">
                  Start From:{" "}
                  <span className="font-normal">
                    {ParseISOStringDate({ date: budget.startDate }).split(",")[1]}
                  </span>
                </p>
                <p className="font-semibold text-sm md:text-base">
                  End On:{" "}
                  <span className="font-normal">
                    {ParseISOStringDate({ date: budget.endDate }).split(",")[1]}
                  </span>
                </p>
              </div>
              <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-600" />
              <div className="space-y-2.5">
                <p className="font-semibold text-sm md:text-base">
                  Type:{" "}
                  <span className="font-normal">
                    {budget.isRecurring ? "Recurred" : "One Time"}
                  </span>
                </p>
                <p className="font-semibold text-sm md:text-base">
                  ID: <span className="font-normal">{budget.id}</span>
                </p>
              </div>
            </m.div>
          </m.section>
        )}
      </AnimatePresence>

      <m.div
        layoutId={`card-${budget.id}-${id}`}
        onClick={() => setActive(true)}
        className="cursor-pointer will-change-transform"
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

export const CloseIcon = () => {
  return (
    <m.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </m.svg>
  );
};
