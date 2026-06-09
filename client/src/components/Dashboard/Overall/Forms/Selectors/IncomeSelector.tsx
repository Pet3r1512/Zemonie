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

type SourceIncome = {
  name: string;
  id: number;
};

const incomesources: SourceIncome[] = [
  {
    name: "Salary",
    id: 1,
  },
  {
    name: "Bonus",
    id: 2,
  },
  {
    name: "Freelance",
    id: 3,
  },
  {
    name: "Investment",
    id: 4,
  },
  {
    name: "Retail Income",
    id: 5,
  },
  {
    name: "Gift",
    id: 6,
  },
  {
    name: "Other",
    id: 7,
  },
];

export default function IncomeSelect({
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
      <SelectContent className={cn("bg-white dark:bg-neutral-900 w-full", contentClassName)}>
        <SelectGroup>
          {incomesources.map((source: SourceIncome) => {
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
