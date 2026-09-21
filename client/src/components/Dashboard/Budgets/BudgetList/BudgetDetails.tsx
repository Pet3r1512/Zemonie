"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, m } from "motion/react";
import { useOutsideClick } from "@/hooks/aceternity/useOutsideClick";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCheck, Pencil, Repeat } from "lucide-react";
import { BudgetDuration, BudgetResponseType } from "./types";
import { CategoryType, CurrentCategory } from "@/components/ui/aceternity/ExpandableCard";
import categoryColorDictionary from "@/types/CategoryDict";
import { formatCurrency } from "@/helpers/formatCurrency";
import useUserPreferences from "@/hooks/users/useUserPreferences";
import CalculateBudgetProgress from "@/helpers/calculateBudgetProgress";
import { Button } from "@/components/ui/button";
import { AmountInput } from "@/components/ui/amount-input";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";
import {
  FieldGroup,
  Field,
  FieldError,
  FieldContent,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DialogTitle, DialogDescription, DialogClose } from "@radix-ui/react-dialog";
import { Switch } from "@radix-ui/react-switch";
import { FormProvider, Controller, useForm } from "react-hook-form";
import { Label } from "recharts";
import ExpenseSelect from "../../Overall/Forms/Selectors/ExpenseSelector";
import { BudgetFormData } from "../BudgetForm";
import { useMutation } from "@tanstack/react-query";
import updateBudget from "@/api/dashboard/budget/updateBudget";

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
  const [editMode, setEditMode] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const currency = useUserPreferences().data?.preferences?.currency ?? "AUD";

  const methods = useForm<BudgetFormData>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const globalCategories: CurrentCategory[] = useMemo(() => {
    const data = typeof window !== "undefined" ? sessionStorage.getItem("globalCategories") : null;
    return data ? JSON.parse(data) : [];
  }, []);

  const updateBudgetMutation = useMutation({
    mutationKey: ["updatedBudget"],
    mutationFn: updateBudget,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const currCategory: CurrentCategory | undefined = globalCategories.find(
    (c) => c.id === budget.categoryId,
  );

  const progress = CalculateBudgetProgress({ total: budget.amount, spent: budget.spentAmount });

  const period = `${new Date(budget.startDate).toLocaleDateString([], {
    day: "2-digit",
    month: "short",
  })} – ${new Date(budget.endDate).toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })}`;

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
        categoryId:
          budget.categoryId ??
          (currCategory?.type.toString() === "INCOME" || currCategory?.type === CategoryType.INCOME
            ? 1
            : 8),
        budgetName: budget.name,
        amount: budget.amount,
        isRecurring: budget.isRecurring,
      });
    }
    // oxlint-disable-next-line react-hooks/exhaustive-deps
  }, [editMode]);

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
            {editMode ? (
              <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <DialogHeader>
                    <DialogTitle>Add budget</DialogTitle>
                  </DialogHeader>
                  <DialogDescription className="sr-only"></DialogDescription>
                  <FieldGroup className="my-8">
                    <Field>
                      <Label htmlFor="source">Category</Label>
                      <ExpenseSelect disabled={disabledCategories} />
                      <FieldError className="text-red-500" errors={[errors.categoryId]} />
                    </Field>
                    <Field className="mb-2">
                      <Label htmlFor="desc">{"Budget name (optional)"}</Label>
                      <Input
                        id="desc"
                        type="text"
                        placeholder="e.g. Shopping"
                        {...register("budgetName", {
                          maxLength: {
                            value: 50,
                            message: "Max length is 50 characters",
                          },
                        })}
                      />
                    </Field>
                    <Field>
                      <Label htmlFor="amount">Max Spend</Label>
                      <Controller
                        name="amount"
                        control={methods.control}
                        rules={{
                          required: "Amount is required",
                          min: { value: 0.01, message: "Amount must be greater than 0" },
                          validate: (v) =>
                            (v !== undefined && v > 0) || "Amount must be greater than 0",
                        }}
                        render={({ field }) => (
                          <AmountInput
                            id="amount"
                            value={field.value}
                            onChange={(val) => field.onChange(val ?? 0)}
                            onBlur={field.onBlur}
                            currency={userPreferences?.preferences?.currency}
                            placeholder={"500"}
                          />
                        )}
                      />
                      <FieldError className="text-red-500" errors={[errors.amount]} />
                    </Field>
                    <div className="rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 px-3 py-2 text-sm text-orange-800 dark:text-orange-300">
                      This budget runs for the current calendar month — {monthRange}
                    </div>
                    <Field
                      orientation="horizontal"
                      className="rounded-lg border border-neutral-200 dark:border-dark-card px-3 py-2"
                    >
                      <FieldContent>
                        <FieldLabel htmlFor="isRecurring">Repeat every month</FieldLabel>
                        <FieldDescription>
                          Automatically creates next month&apos;s budget
                        </FieldDescription>
                      </FieldContent>
                      <Controller
                        name="isRecurring"
                        control={methods.control}
                        defaultValue={false}
                        render={({ field }) => (
                          <Switch
                            id="isRecurring"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        )}
                      />
                    </Field>
                  </FieldGroup>
                  <DialogFooter className="flex flex-row justify-end items-center gap-x-2">
                    <DialogClose asChild>
                      <Button
                        variant="outline"
                        className="text-red-500 dark:text-red-500 dark:hover:text-red-500"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      type="submit"
                      className="bg-primary hover:bg-primary/90 dark:bg-primary/90 dark:hover:bg-primary/80 dark:text-white"
                    >
                      Create
                    </Button>
                  </DialogFooter>
                </form>
              </FormProvider>
            ) : (
              <m.div className="p-6 space-y-5 w-full! overflow-y-auto">
                <div className="flex items-start justify-between gap-x-4">
                  <div className="flex items-center gap-x-2">
                    {currCategory && categoryColorDictionary[currCategory.id.toString()]?.icon}
                    <div>
                      <p className="text-lg font-semibold">
                        {currCategory?.name ?? "Uncategorized"}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {budget.name ? budget.name : period}
                      </p>
                    </div>
                  </div>
                  {budget.isRecurring && (
                    <Badge className="bg-[#00b4d8] text-white cursor-default whitespace-nowrap">
                      <Repeat size={12} />
                      Recurring
                    </Badge>
                  )}
                </div>

                <p className="text-3xl lg:text-4xl font-bold">
                  {formatCurrency(budget.amount, currency)}
                </p>

                <div className="space-y-2">
                  <Progress value={progress} className="w-full" />
                  <div className="flex items-center justify-between text-sm">
                    <p className="text-gray-600 dark:text-gray-400">
                      {formatCurrency(budget.spentAmount, currency)} spent · {progress}%
                    </p>
                    {budget.spentAmount > budget.amount ? (
                      <p className="font-semibold text-red-500 dark:text-red-400">
                        {formatCurrency(budget.spentAmount - budget.amount, currency)} over budget
                      </p>
                    ) : (
                      <p className="font-semibold text-green-500 dark:text-green-400">
                        {formatCurrency(budget.amount - budget.spentAmount, currency)} remaining
                      </p>
                    )}
                  </div>
                </div>

                <div className="h-0.5 w-full bg-gray-200 dark:bg-gray-600" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      Period
                    </span>
                    <p className="text-sm">{period}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      Duration
                    </span>
                    <p className="text-sm">{durationDict[budget.duration]}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      Type
                    </span>
                    <p className="text-sm">{budget.isRecurring ? "Recurring" : "One Time"}</p>
                  </div>
                </div>
              </m.div>
            )}
            <div className="flex items-center justify-end gap-x-2 p-6 mt-auto">
              {editMode ? (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 dark:text-red-500 dark:hover:text-red-500"
                    onClick={() => {
                      reset({
                        categoryId:
                          budget.categoryId ??
                          (currCategory?.type.toString() === "INCOME" ||
                          currCategory?.type === CategoryType.INCOME
                            ? 1
                            : 8),
                        budgetName: budget.name,
                        amount: budget.amount,
                        isRecurring: budget.isRecurring,
                      });
                      setEditMode(false);
                    }}
                  >
                    Cancel
                  </Button>

                  <Button
                    size="sm"
                    type="submit"
                    form={`transaction-form-${budget.id}`}
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
