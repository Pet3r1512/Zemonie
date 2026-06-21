import createNewTransaction from "@/api/users/transactions/createNewTransaction";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import localISOString from "@/helpers/localISOString";
import useUserPreferences from "@/hooks/users/useUserPreferences";
import useBalanceStore from "@/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Transaction } from "./IncomeForm";
import ExpenseSelect from "./Selectors/ExpenseSelector";

export function ExpenseForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const methods = useForm<Transaction>();
  const queryClient = useQueryClient();
  const { data } = useUserPreferences();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const mutation = useMutation({
    mutationKey: ["expense"],
    mutationFn: createNewTransaction,
    onError: (error) => {
      console.error(error?.message);
    },
    onSuccess: async () => {
      toast.success("Add New Expense Successfully");
      await queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["balance"],
      });
      useBalanceStore.getState().markUpdated(false);
      queryClient.invalidateQueries({
        queryKey: ["totalIncomeQuery"],
      });
      queryClient.invalidateQueries({
        queryKey: ["highestExpense"],
      });
      queryClient.invalidateQueries({
        queryKey: ["latestTransactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["spendingByCategory"],
      });
      queryClient.invalidateQueries({
        queryKey: ["totalExpenses"],
      });
      queryClient.invalidateQueries({
        queryKey: ["last7DaysExpenses"],
      });
      queryClient.invalidateQueries({
        queryKey: ["budget"],
      });
    },
  });

  const onSubmit: SubmitHandler<Transaction> = async (credentials) => {
    mutation.mutate({
      ...credentials,
      currency: data?.preferences?.currency,
      createdAt: credentials.createdAt ?? localISOString(),
    });
    reset();

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        asChild
        autoFocus={isOpen}
        onClick={(e) => {
          e.currentTarget.blur();
        }}
      >
        <Button className="bg-[#d62828] text-white hover:bg-[#d62828]/80 dark:bg-[#d62828]/75 dark:hover:bg-[#d62828]/85 dark:text-white rounded-2xl text-lg h-10.5">
          + Add Expense
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
              <DialogTitle>Add Expense</DialogTitle>
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
                <Label htmlFor="source">Spend On</Label>
                <ExpenseSelect />
                <FieldError className="text-red-500" errors={[errors.categoryId]} />
              </Field>
              <Field>
                <Label htmlFor="amount">Amount</Label>
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
              <Field>
                <Label htmlFor="desc">{"Description (optional)"}</Label>
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
              </Field>
              <Field>
                <Label htmlFor="date">Date</Label>
                <DatePicker />
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
                {mutation.isPending ? <LoaderCircle className="animate-spin" /> : "Add New Expense"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
