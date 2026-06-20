import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ExpenseSelect from "../Overall/Forms/Selectors/ExpenseSelector";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useMemo } from "react";

type BudgetFormData = {
  categoryId: string;
  budgetName?: string;
  amount: number;
  isRepeatBudget: boolean;
};

function getMonthDateRange() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const start = new Date(year, month, 1);
  const end = new Date(year, month + 1, 0);
  const formatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
  return `${formatter.format(start)} to ${formatter.format(end)}`;
}

export function BudgetForm() {
  const methods = useForm<BudgetFormData>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const monthRange = useMemo(() => getMonthDateRange(), []);

  const onSubmit: SubmitHandler<BudgetFormData> = async (credentials) => {
    console.log(credentials);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger
        asChild
        onClick={(e) => {
          e.currentTarget.blur();
        }}
      >
        <Button className="bg-primary text-white hover:bg-primary/80 dark:bg-primary/75 dark:hover:bg-primary/85 dark:text-white rounded-2xl text-lg h-10.5">
          + Add Budget
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={() => {}}
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className="sm:max-w-sm bg-white dark:bg-dark-elevated pointer-events-auto"
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
                <ExpenseSelect />
                <FieldError className="text-red-500" errors={[errors.categoryId]} />
              </Field>
              <Field className="mb-2">
                <Label htmlFor="desc">Budget name</Label>
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
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 dark:text-neutral-400 text-sm font-medium pointer-events-none select-none">
                    $
                  </span>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder="500"
                    className="pl-7"
                    {...register("amount", {
                      required: "Amount is required",
                      valueAsNumber: true,
                      min: {
                        value: 0.01,
                        message: "Amount must be greater than 0",
                      },
                    })}
                  />
                </div>
                <FieldError className="text-red-500" errors={[errors.amount]} />
              </Field>
              <div className="rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-900/50 px-4 py-3 text-sm text-orange-800 dark:text-orange-300">
                This budget runs for the current calendar month — {monthRange}
              </div>
              <label className="flex items-start gap-3 cursor-pointer group">
                <Checkbox {...register("isRepeatBudget")} className="mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                    Repeat every month
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    Automatically creates next month&apos;s budget
                  </span>
                </div>
              </label>
            </FieldGroup>
            <DialogFooter className="flex flex-col gap-2">
              <DialogClose asChild>
                <Button variant="outline" className="text-neutral-600 dark:text-neutral-400">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 dark:bg-primary/90 dark:hover:bg-primary/80 dark:text-white"
              >
                Create budget
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
