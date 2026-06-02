"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/aceternity/useOutsideClick";
import type { TransactionInfo } from "@/components/Dashboard/Transactions/TransactionsTable/ListByDate";
import { ComponentMap } from "@/types/ComponentMap";
import formatCurrency from "@/helpers/formatCurrency";
import { ArrowDown, ArrowUp } from "lucide-react";

enum CategoryType {
  EXPENSE,
  INCOME,
}

type CurrentCategory = {
  id: number;
  type: CategoryType;
  name: string;
  description: string;
};

export function ExpandableCard({
  transaction,
  lastElementRef,
}: {
  transaction: TransactionInfo;
  lastElementRef?: (node: HTMLDivElement | null) => void;
}) {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const id = useId();

  const globalCategoriesData =
    typeof window !== "undefined"
      ? sessionStorage.getItem("globalCategories")
      : null;
  const globalCategories: CurrentCategory[] = globalCategoriesData
    ? JSON.parse(globalCategoriesData)
    : [];

  const currCategory: CurrentCategory | undefined = globalCategories.find(
    (c) => c.id === transaction.categoryId,
  );

  const isIncome =
    currCategory?.type.toString() === "INCOME" ||
    currCategory?.type === CategoryType.INCOME;

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

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () =>
    setActive(false),
  );

  const TransactionTypeDictionary: ComponentMap = {
    INCOME: (
      <div className="size-max p-2.5 rounded-full bg-green-200">
        <ArrowUp size={20} className="text-green-900 font-extrabold" />
      </div>
    ),
    EXPENSE: (
      <div className="size-max p-2.5 rounded-full bg-red-200">
        <ArrowDown size={20} className="text-red-800 font-extrabold" />
      </div>
    ),
  };

  const TransactionAmountTextColor: Record<string, string> = {
    INCOME: "text-green-500",
    EXPENSE: "text-red-500",
  };

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 grid place-items-center z-100">
            <motion.button
              key={`button-${transaction.id}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(false)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${transaction.id}-${id}`}
              ref={ref}
              className="w-full max-w-125 h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <div className="p-6 space-y-4">
                <motion.div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-x-2">
                      {
                        categoryColorDictionary[currCategory!.id.toString()]
                          .icon
                      }
                      <p className="text-lg font-semibold">
                        {currCategory?.name}
                      </p>
                    </div>
                    <p>{ParseISOStringDate({ date: transaction.date })}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <motion.p
                      layoutId={`amount-${transaction.id}-${id}`}
                      className={`text-lg md:text-xl lg:text-2xl font-bold ${
                        currCategory
                          ? TransactionAmountTextColor[
                              isIncome ? "INCOME" : "EXPENSE"
                            ]
                          : "text-gray-500"
                      }`}
                    >
                      {isIncome ? "+ " : "- "}
                      {formatCurrency(transaction.amount)}
                    </motion.p>
                    <p className="font-semibold">{transaction.currency}</p>
                  </div>
                </motion.div>

                {/* Divider */}
                <div className="h-[0.25px] w-full bg-gray-600"></div>
                  layoutId={`title-${transaction.id}-${id}`}
                  className="font-bold text-2xl text-neutral-700 dark:text-neutral-200"
                >
                  {transaction.description || currCategory?.name || "Transaction"}
                </motion.h3>

                <motion.p
                  layoutId={`amount-${transaction.id}-${id}`}
                  className={`text-3xl font-semibold ${
                    currCategory
                      ? TransactionAmountTextColor[
                          isIncome ? "INCOME" : "EXPENSE"
                        ]
                      : "text-gray-500"
                  }`}
                >
                  {isIncome ? "+ " : "- "}
                  {formatCurrency(transaction.amount)}
                </motion.p>

                {currCategory && (
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Category: {currCategory.name}
                  </p>
                )}

                <p className="text-neutral-500 dark:text-neutral-400">
                  {transaction.currency}
                </p>

                <p className="text-neutral-500 dark:text-neutral-400">
                  {new Date(transaction.date).toLocaleDateString("en-GB", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                {transaction.description && (
                  <p className="text-neutral-600 dark:text-neutral-300 pt-2 border-t border-gray-200">
                    {transaction.description}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div ref={innerRef}>
        <motion.div
          layoutId={`card-${transaction.id}-${id}`}
          onClick={() => setActive(true)}
          className="cursor-pointer"
        >
          <div
            ref={lastElementRef}
            className="px-2.5 py-1.5 lg:py-3 flex items-center gap-x-5 border-b-[1.5px] border-gray-200 lg:hover:bg-gray-200 transition-all duration-150 ease-linear"
          >
            {currCategory &&
              TransactionTypeDictionary[
                isIncome ? "INCOME" : "EXPENSE"
              ]}

            <div className="space-y-0.5 lg:space-y-2 flex-1">
              <p className="font-semibold">{currCategory?.name}</p>
              <p>{transaction.description}</p>
            </div>

            <p
              className={`lg:text-xl font-semibold ${
                currCategory
                  ? TransactionAmountTextColor[
                      isIncome ? "INCOME" : "EXPENSE"
                    ]
                  : "text-gray-500"
              }`}
            >
              {isIncome ? "+ " : "- "}
              {formatCurrency(transaction.amount)}
            </p>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
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
    </motion.svg>
  );
};
