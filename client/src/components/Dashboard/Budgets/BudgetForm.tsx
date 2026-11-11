import { AmountInput } from "@/components/ui/amount-input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUserPreferences from "@/hooks/users/useUserPreferences";
import ExpenseSelect from "../Overall/Forms/Selectors/ExpenseSelector";
import { FormProvider, SubmitHandler, useForm, Controller } from "react-hook-form";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useMemo, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import createBudget from "@/api/dashboard/budget/createBudget";
import getBudgets from "@/api/dashboard/budget/getBudgets";
import { toast } from "sonner";
import getCreatedBudgetCategory from "@/helpers/getCreatedBudgetCategory";
import { getMonthDateRange } from "@/helpers/getCurrentMonthRange";

export type BudgetFormData = {
  categoryId: number;
  budgetName?: string;
  amount: number;
  isRecurring: boolean;
};

export function BudgetForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { data: userPreferences } = useUserPreferences();
  const methods = useForm<BudgetFormData>({
    defaultValues: {
      isRecurring: false,
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = methods;

  const addBudgetMutation = useMutation({
    mutationKey: ["addBudget"],
    mutationFn: createBudget,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("New Budget Added!!!");
      queryClient.invalidateQueries({
        queryKey: ["budgets"],
      });
    },
  });

  const { data: budgetsData } = useQuery({
    queryKey: ["budgets"],
    queryFn: getBudgets,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const disabledCategories = useMemo(
    () =>
      getCreatedBudgetCategory({
        budgets: budgetsData?.budgets.budgets ?? [],
      }),
    [budgetsData],
  );

  const monthRange = useMemo(() => getMonthDateRange(), []);

  const onSubmit: SubmitHandler<BudgetFormData> = async (credentials) => {
    addBudgetMutation.mutate({
      credentials,
    });
    reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        asChild
        onClick={(e) => {
          e.currentTarget.blur();
        }}
      >
        <Button className="text-lg h-10.5">+ Add Budget</Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={() => {}}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-sm pointer-events-auto"
      >
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
                      className="text-5xl! h-24! px-8"
                    />
                  )}
                />
                <FieldError className="text-red-500" errors={[errors.amount]} />
              </Field>

              <Field
                orientation="horizontal"
                className="rounded-lg border border-gray-200 px-3 py-2 dark:border-white/[0.07]"
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
              {watch("isRecurring") === true && (
                <div className="rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 px-3 py-2 text-sm text-orange-800 dark:text-orange-300">
                  This budget runs for the current calendar month — {monthRange}
                </div>
              )}
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
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
