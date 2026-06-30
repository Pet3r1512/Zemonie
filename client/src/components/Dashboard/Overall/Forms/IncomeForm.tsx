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
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import IncomeSelect from "./Selectors/IncomeSelector";
import { Switch } from "@/components/ui/switch";

export type Transaction = {
  categoryId: number;
  amount: number;
  currency: string;
  description?: string;
  createdAt?: string;
  isRecurring?: boolean;
};

export function IncomeForm() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const methods = useForm<Transaction>();
  const { data } = useUserPreferences();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const mutation = useMutation({
    mutationKey: ["income"],
    mutationFn: createNewTransaction,
    onError: (error) => {
      console.error(error?.message);
    },
    onSuccess: async () => {
      toast.success("Add New Income Successfully");

      await queryClient.invalidateQueries({
        queryKey: ["transactions"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["balance"],
      });

      setIsOpen(false);
      useBalanceStore.getState().markUpdated(false);
      queryClient.invalidateQueries({ queryKey: ["totalIncome"] });
      queryClient.invalidateQueries({
        queryKey: ["highestIncomeOfMonth"],
      });
      queryClient.invalidateQueries({ queryKey: ["incomeRate"] });
      queryClient.invalidateQueries({
        queryKey: ["latestTransactions"],
      });
      queryClient.invalidateQueries({
        queryKey: ["totalIncome"],
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
        <Button className="bg-[#38b000] hover:bg-[#38b000]/80 dark:bg-[#38b000]/80 dark:hover:bg-[#38b000]/90 dark:text-white text-white rounded-2xl text-lg h-10.5">
          + Add Income
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
              <DialogTitle>Add Income</DialogTitle>
            </DialogHeader>
            <DialogDescription className="sr-only"></DialogDescription>
            <FieldGroup className="my-8">
              <div className="flex gap-4">
                <div className="flex-1">
                  <input
                    type="hidden"
                    {...register("categoryId", {
                      required: "Please select an income source",
                    })}
                  />
                  <Field>
                    <Label htmlFor="source">Income Source</Label>
                    <IncomeSelect />
                    <FieldError className="text-red-500" errors={[errors.categoryId]} />
                  </Field>
                </div>
                <div>
                  <Label>Recurred</Label>
                  <div className="mt-1.5 h-12 flex items-center justify-center">
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
                  </div>
                </div>
              </div>
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
                {mutation.isPending ? <LoaderCircle className="animate-spin" /> : "Add New Income"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
