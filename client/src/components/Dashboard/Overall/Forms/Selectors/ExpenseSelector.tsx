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

type SourceExpense = {
  name: string;
  id: number;
};

export default function ExpenseSelect() {
  const { setValue } = useFormContext<Transaction>();

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

  return (
    <Select
      onValueChange={(value) => {
        setValue("categoryId", +value);
      }}
    >
      <SelectTrigger id="source" name="source" className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="bg-white w-full">
        <SelectGroup>
          {expenseSources.map((source: SourceExpense) => {
            return (
              <SelectItem
                key={source.id}
                value={source.id.toString()}
                className="lg:hover:bg-gray-200"
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
