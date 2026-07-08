"use client";

import { Transaction } from "@/components/Dashboard/Overall/Forms/IncomeForm";
import ExpenseSelect from "@/components/Dashboard/Overall/Forms/Selectors/ExpenseSelector";
import IncomeSelect from "@/components/Dashboard/Overall/Forms/Selectors/IncomeSelector";
import type { TransactionInfo } from "@/components/Dashboard/Transactions/TransactionsTable/ListByDate";
import { formatCurrency } from "@/helpers/formatCurrency";
import ParseISOStringDate from "@/helpers/parseISOStringData";
import useUserPreferences from "@/hooks/users/useUserPreferences";
import { cn } from "@/lib/utils";
import categoryColorDictionary from "@/types/CategoryDict";
import { ComponentMap } from "@/types/ComponentMap";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, CheckCheck, Pencil, Tag } from "lucide-react";
import { AnimatePresence, LazyMotion, m, easeInOut } from "motion/react";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../button";
import { DatePicker } from "../date-picker";
import { Dialog, DialogHeader } from "../dialog";
import { Field, FieldError, FieldGroup } from "../field";
import { Input } from "../input";
import { Label } from "../label";

const loadFeatures = () => import("motion/react").then((res) => res.domMax);

enum CategoryType {
  EXPENSE,
  INCOME,
}

export type CurrentCategory = {
  id: number;
  type: CategoryType;
  name: string;
  description: string;
};

const TransactionTypeDictionary: ComponentMap = {
  INCOME: (
    <div className="size-max p-2.5 rounded-full bg-green-200 dark:bg-green-900/40">
      <ArrowDown size={20} className="text-green-900 dark:text-green-300 font-extrabold" />
    </div>
  ),
  EXPENSE: (
    <div className="size-max p-2.5 rounded-full bg-red-200 dark:bg-red-900/40">
      <ArrowUp size={20} className="text-red-800 dark:text-red-300 font-extrabold" />
    </div>
  ),
};

const TransactionAmountTextColor: Record<string, string> = {
  INCOME: "text-green-500",
  EXPENSE: "text-red-500",
};

export function ExpandableCard({
  transaction,
  lastElementRef,
  onSave,
}: {
  transaction: TransactionInfo;
  lastElementRef?: (node: HTMLDivElement | null) => void;
  onSave?: (updatedTransaction: TransactionInfo) => void;
}) {
  const [active, setActive] = useState(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const currency = useUserPreferences().data?.preferences?.currency ?? "AUD";
  const methods = useForm<Transaction>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;
  const queryClient = useQueryClient();

  const globalCategories: CurrentCategory[] = useMemo(() => {
    const data = typeof window !== "undefined" ? sessionStorage.getItem("globalCategories") : null;
    return data ? JSON.parse(data) : [];
  }, []);

  const currCategory: CurrentCategory | undefined = globalCategories.find(
    (c) => c.id === transaction.categoryId,
  );

  const isIncome =
    currCategory?.type.toString() === "INCOME" || currCategory?.type === CategoryType.INCOME;

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

  useEffect(() => {
    if (editMode) {
      reset({
        categoryId: transaction.categoryId ?? (isIncome ? 1 : 8),
        amount: transaction.amount,
        currency: transaction.currency,
        description: transaction.description,
        createdAt: transaction.date,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

  const onSubmit: SubmitHandler<Transaction> = async (credentials) => {
    onSave?.({
      id: transaction.id,
      userId: transaction.userId,
      categoryId: credentials.categoryId,
      amount: credentials.amount,
      currency: transaction.currency,
      date: credentials.createdAt ?? transaction.date,
      description: credentials.description ?? "",
    });
    setEditMode(false);
    await queryClient.invalidateQueries({
      queryKey: ["last7DaysExpenses"],
    });
  };

  const transition = {
    duration: 0.25,
    ease: easeInOut,
  };

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
          <m.div
            key={`card-${id}`}
            layoutId={`card-${transaction.id}-${id}`}
            ref={ref}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={transition}
            className="fixed inset-0 size-fit! m-auto z-100 max-h-[90dvh] w-[95dvw] md:max-w-150 lg:min-w-150 flex flex-col bg-white dark:bg-dark-elevated sm:rounded-3xl rounded-xl overflow-hidden will-change-transform"
          >
            {!editMode ? (
              <div className="p-6 space-y-4 w-full! overflow-y-auto">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-x-2">
                      {currCategory && categoryColorDictionary[currCategory.id.toString()]?.icon}
                      <p className="text-lg font-semibold">
                        {transaction.description === ""
                          ? "No Description"
                          : transaction.description}
                      </p>
                    </div>
                    <p>{ParseISOStringDate({ date: transaction.date })}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p
                      className={`text-lg md:text-xl lg:text-2xl font-bold ${
                        currCategory
                          ? TransactionAmountTextColor[isIncome ? "INCOME" : "EXPENSE"]
                          : "text-gray-500"
                      }`}
                    >
                      {isIncome ? "+ " : "- "}
                      {formatCurrency(transaction.amount, currency)}
                    </p>
                    <p className="font-semibold">{transaction.currency}</p>
                  </div>
                </div>

                <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-600" />

                <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-x-10 gap-y-5">
                  <div className="space-y-2">
                    <p className="font-semibold">TRANSACTION ID</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                      {transaction.id}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold">TYPE</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{currCategory?.type}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold">CATEGORY</p>
                    <div
                      className={cn(
                        "flex items-center gap-x-1 text-xs w-fit text-white px-2 py-1 rounded-2xl cursor-default",
                        currCategory && categoryColorDictionary[currCategory.id.toString()]?.color,
                      )}
                    >
                      <Tag size={12} />
                      <p>{currCategory?.name ?? "Uncategorized"}</p>
                    </div>
                  </div>
                </div>

                <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-600" />
              </div>
            ) : (
              <FormProvider {...methods}>
                <form id={`transaction-form-${transaction.id}`} onSubmit={handleSubmit(onSubmit)}>
                  <Dialog>
                    <DialogHeader className="px-6 pt-6">
                      <DialogTitle>{isIncome ? "Edit Income" : "Edit Expense"}</DialogTitle>
                    </DialogHeader>

                    <DialogDescription className="sr-only" />

                    <FieldGroup className="px-6 py-6 w-2xl overflow-y-auto">
                      <input
                        type="hidden"
                        {...register("categoryId", {
                          required: "Please select a category",
                        })}
                      />

                      <Field>
                        <Label htmlFor="source">{isIncome ? "Income Source" : "Spend On"}</Label>

                        {isIncome ? (
                          <IncomeSelect
                            value={transaction.categoryId?.toString()}
                            contentClassName="z-[110]"
                          />
                        ) : (
                          <ExpenseSelect
                            value={transaction.categoryId?.toString()}
                            contentClassName="z-[110]"
                          />
                        )}

                        <FieldError className="text-red-500" errors={[errors.categoryId]} />
                      </Field>

                      <Field>
                        <Label htmlFor="amount">Amount</Label>

                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          {...register("amount", {
                            required: "Amount is required",
                            valueAsNumber: true,
                            min: {
                              value: 0.01,
                              message: "Amount must be greater than 0",
                            },
                          })}
                        />

                        <FieldError className="text-red-500" errors={[errors.amount]} />
                      </Field>

                      <Field>
                        <Label htmlFor="desc">Description</Label>

                        <Input
                          id="desc"
                          type="text"
                          {...register("description", {
                            maxLength: {
                              value: 50,
                              message: "Max length is 50 characters",
                            },
                          })}
                        />

                        <FieldError className="text-red-500" errors={[errors.description]} />
                      </Field>

                      <Field>
                        <Label htmlFor="date">Date</Label>
                        <DatePicker defaultDate={transaction.date} />
                      </Field>
                    </FieldGroup>
                  </Dialog>
                </form>
              </FormProvider>
            )}

            <div className="flex items-center justify-end gap-x-2 px-6 pb-6 mt-auto">
              {editMode ? (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 dark:text-red-500 dark:hover:text-red-500"
                    onClick={() => {
                      reset({
                        categoryId: transaction.categoryId ?? (isIncome ? 1 : 8),
                        amount: transaction.amount,
                        currency: transaction.currency,
                        description: transaction.description,
                        createdAt: transaction.date,
                      });
                      setEditMode(false);
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    size="sm"
                    type="submit"
                    form={`transaction-form-${transaction.id}`}
                    className="bg-green-500 text-white hover:bg-green-500/80 dark:bg-green-500/80 dark:hover:bg-green-500 dark:text-white"
                  >
                    <CheckCheck className="size-4" />
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  onClick={() => setEditMode(true)}
                  className="bg-primary/85 text-white hover:bg-primary"
                >
                  <Pencil className="size-4" />
                  Edit
                </Button>
              )}
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <m.div
        layoutId={`card-${transaction.id}-${id}`}
        onClick={() => setActive(true)}
        className="cursor-pointer will-change-transform"
      >
        <div
          ref={lastElementRef}
          className="px-2.5 py-1.5 lg:py-3 flex items-center gap-x-5 border-b-[1.5px] border-gray-200 dark:border-dark-card lg:hover:bg-gray-200 dark:lg:hover:bg-dark-card transition-all duration-150 ease-linear"
        >
          {currCategory && TransactionTypeDictionary[isIncome ? "INCOME" : "EXPENSE"]}

          <div className="space-y-0.5 lg:space-y-2 flex-1">
            <p className="font-semibold cursor-default">{currCategory?.name}</p>

            <p>{transaction.description}</p>
          </div>

          <div className="flex flex-col items-end">
            <p
              className={`lg:text-xl font-semibold ${
                currCategory
                  ? TransactionAmountTextColor[isIncome ? "INCOME" : "EXPENSE"]
                  : "text-gray-500"
              }`}
            >
              {isIncome ? "+ " : "- "}
              {formatCurrency(transaction.amount, currency)}
            </p>
            {transaction.parentTransactionId ? (
              <p className="text-xs md:text-md text-center text-secondary border border-secondary px-.5 md:px-1 md:py-.5 py-.25 rounded-xl">
                Recurred
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
      </m.div>
    </LazyMotion>
  );
}

export const CloseIcon = () => {
  return (
    <LazyMotion features={loadFeatures}>
      <m.svg
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
        className="h-4 w-4 text-black dark:text-white"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M18 6l-12 12" />
        <path d="M6 6l12 12" />
      </m.svg>
    </LazyMotion>
  );
};
