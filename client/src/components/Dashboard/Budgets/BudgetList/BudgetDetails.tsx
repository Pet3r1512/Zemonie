"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, m } from "motion/react";
import { useOutsideClick } from "@/hooks/aceternity/useOutsideClick";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCheck, Pencil, Repeat } from "lucide-react";
import { BudgetDuration, BudgetResponseType } from "./types";
import { CurrentCategory } from "@/components/ui/aceternity/ExpandableCard";
import categoryColorDictionary from "@/types/CategoryDict";
import { formatCurrency } from "@/helpers/formatCurrency";
import useUserPreferences from "@/hooks/users/useUserPreferences";
import CalculateBudgetProgress from "@/helpers/calculateBudgetProgress";
import { Button } from "@/components/ui/button";
import { AmountInput } from "@/components/ui/amount-input";
import { DialogHeader, Dialog } from "@/components/ui/dialog";
import {
  FieldGroup,
  Field,
  FieldError,
  FieldContent,
  FieldLabel,
  FieldDescription,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Switch } from "@/components/ui/switch";
import { FormProvider, Controller, useForm, SubmitHandler } from "react-hook-form";
import ExpenseSelect from "../../Overall/Forms/Selectors/ExpenseSelector";
import { getMonthDateRange } from "../BudgetForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import updateBudget from "@/api/dashboard/budget/updateBudget";
import getCreatedBudgetCategory from "@/helpers/getCreatedBudgetCategory";
import { toast } from "sonner";

const loadFeatures = () => import("motion/react").then((res) => res.domMax);

interface UpdateBudget {
  id: string;
  categoryId: number;
  budgetName?: string;
  amount: number;
  isRecurring: boolean;
}

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
  const queryClient = useQueryClient();
  const currency = useUserPreferences().data?.preferences?.currency ?? "AUD";
  const disabledCategories = useMemo(
    () =>
      getCreatedBudgetCategory({
        budgets: queryClient.getQueryData<any>(["budgets"])?.budgets?.budgets ?? [],
      }).filter((categoryId) => categoryId !== budget.categoryId),
    [queryClient, budget.categoryId],
  );

  const globalCategories: CurrentCategory[] = useMemo(() => {
    const data = typeof window !== "undefined" ? sessionStorage.getItem("globalCategories") : null;
    return data ? JSON.parse(data) : [];
  }, []);

  const updateBudgetMutation = useMutation({
    mutationKey: ["updatedBudget"],
    mutationFn: (credentials: UpdateBudget) => updateBudget({ credentials }),
    onSuccess: () => {
      toast.success("Budget updated");
      queryClient.invalidateQueries({
        queryKey: ["budgets"],
      });
      setEditMode(false);
    },
    onError: (error) => {
      toast.error(error.message);
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

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () => setActive(false), [
    "[data-radix-select-viewport]",
  ]);

  const handleSave: SubmitHandler<UpdateBudget> = (credentials) => {
    updateBudgetMutation.mutate(credentials);
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
              <BudgetEditForm
                budget={budget}
                disabledCategories={disabledCategories}
                onSave={handleSave}
              />
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
                    onClick={() => setEditMode(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    size="sm"
                    type="submit"
                    form={`budget-form-${budget.id}`}
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
        style={{ visibility: active ? "hidden" : "visible" }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}

function BudgetEditForm({
  budget,
  disabledCategories,
  onSave,
}: {
  budget: BudgetResponseType;
  disabledCategories: number[];
  onSave: SubmitHandler<UpdateBudget>;
}) {
  const { data: userPreferences } = useUserPreferences();
  const monthRange = useMemo(() => getMonthDateRange(), []);
  const methods = useForm<UpdateBudget>({
    defaultValues: {
      id: budget.id,
      categoryId: budget.categoryId ?? 8,
      budgetName: budget.name,
      amount: budget.amount,
      isRecurring: budget.isRecurring,
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form id={`budget-form-${budget.id}`} onSubmit={handleSubmit(onSave)}>
        <Dialog>
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Edit budget</DialogTitle>
          </DialogHeader>
          <DialogDescription className="sr-only"></DialogDescription>
          <FieldGroup className="my-8 p-6 w-2xl">
            <Field>
              <FieldLabel htmlFor="source">Category</FieldLabel>
              <ExpenseSelect
                value={methods.watch("categoryId")?.toString()}
                disabled={disabledCategories}
                contentClassName="z-[110]"
              />
              <FieldError className="text-red-500" errors={[errors.categoryId]} />
            </Field>
            <Field className="mb-2">
              <FieldLabel htmlFor="desc">{"Budget name (optional)"}</FieldLabel>
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
              <FieldLabel htmlFor="amount">Max Spend</FieldLabel>
              <Controller
                name="amount"
                control={methods.control}
                rules={{
                  required: "Amount is required",
                  min: { value: 0.01, message: "Amount must be greater than 0" },
                  validate: (v) => (v !== undefined && v > 0) || "Amount must be greater than 0",
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
                <FieldDescription>Automatically creates next month&apos;s budget</FieldDescription>
              </FieldContent>
              <Controller
                name="isRecurring"
                control={methods.control}
                defaultValue={false}
                render={({ field }) => (
                  <Switch id="isRecurring" checked={field.value} onCheckedChange={field.onChange} />
                )}
              />
            </Field>
          </FieldGroup>
        </Dialog>
      </form>
    </FormProvider>
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
