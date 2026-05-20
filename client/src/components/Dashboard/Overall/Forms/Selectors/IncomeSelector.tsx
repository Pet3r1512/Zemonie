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

type SourceIncome = {
  name: string;
  id: number;
};

export default function IncomeSelect() {
  const { setValue } = useFormContext<Transaction>();

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
          {incomesources.map((source: SourceIncome) => {
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
