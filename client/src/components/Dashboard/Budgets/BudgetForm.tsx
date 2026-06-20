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
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ExpenseSelect from "../Overall/Forms/Selectors/ExpenseSelector";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { DialogDescription } from "@radix-ui/react-dialog";

type BudgetFormData = {
  categoryId: string;
  budgetName?: string;
  amount: number;
  isRepeatBudget: boolean;
};

export function BudgetForm() {
  const methods = useForm<BudgetFormData>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

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
              <DialogTitle>Create Budget</DialogTitle>
            </DialogHeader>
            <DialogDescription className="sr-only"></DialogDescription>
            <FieldGroup className="my-8">
              <input
                type="hidden"
                {...register("categoryId", {
                  required: "Please select an expense category",
                })}
              />
              <Field>
                <Label htmlFor="source">For Category</Label>
                <ExpenseSelect />
                <FieldError className="text-red-500" errors={[errors.categoryId]} />
              </Field>
              <Field>
                <Label htmlFor="desc">{"Name"}</Label>
                <Input
                  id="desc"
                  type="text"
                  placeholder="e.g. Shopping for 1 month"
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
                <Input
                  id="amount"
                  type="number"
                  step={"0.01"}
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
            </FieldGroup>
            <DialogFooter className="flex flex-row items-center justify-end gap-x-3.5">
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
                Add
                {/* {mutation.isPending ? <LoaderCircle className="animate-spin" /> : "Add New Expense"} */}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
