import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";
import { Transaction } from "../IncomeForm";
import { cn } from "@/lib/utils";

type SourceExpense = {
  name: string;
  id: number;
};

const expenseSources: SourceExpense[] = [
  {
    name: "Food & Drinks",
    id: 8,
  },
  { name: "Groceries", id: 9 },
  {
    name: "Vehicle / Transport",
    id: 10,
  },
  {
    name: "Housing",
    id: 11,
  },
  {
    name: "Bills",
    id: 12,
  },
  {
    name: "Study / Education",
    id: 13,
  },
  { name: "Health", id: 14 },
  { name: "Entertainment", id: 15 },
  { name: "Shopping", id: 16 },
  { name: "Travel", id: 17 },
  { name: "Insurance", id: 18 },
  { name: "Taxes", id: 19 },
  {
    name: "Savings & Investments",
    id: 20,
  },
  { name: "Other Expense", id: 21 },
];

export default function ExpenseSelect({
  value,
  contentClassName,
}: {
  value?: string;
  contentClassName?: string;
}) {
  const { setValue } = useFormContext<Transaction>();

  return (
    <Select
      value={value}
      onValueChange={(newValue) => {
        setValue("categoryId", +newValue, { shouldValidate: true });
      }}
    >
      <SelectTrigger id="source" name="source" className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        className={cn("bg-white dark:bg-neutral-900 w-full max-h-64", contentClassName)}
      >
        <SelectGroup>
          {expenseSources.map((source: SourceExpense) => {
            return (
              <SelectItem
                key={source.id}
                value={source.id.toString()}
                className="lg:hover:bg-gray-200 dark:lg:hover:bg-neutral-800"
              >
                {source.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
