import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Briefcase, Gift, Heart, Home, Laptop, PlusCircle, TrendingUp } from "lucide-react";
import { ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import { Transaction } from "../IncomeForm";

type SourceIncome = {
  name: string;
  id: number;
  icon: ReactNode;
};

export const ICON_SIZE = 16;

const incomesources: SourceIncome[] = [
  {
    name: "Salary",
    id: 1,
    icon: <Briefcase size={ICON_SIZE} className="text-emerald-500" />,
  },
  {
    name: "Freelance",
    id: 3,
    icon: <Laptop size={ICON_SIZE} className="text-violet-500" />,
  },
  {
    name: "Bonus",
    id: 2,
    icon: <Gift size={ICON_SIZE} className="text-yellow-400" />,
  },
  {
    name: "Investment",
    id: 4,
    icon: <TrendingUp size={ICON_SIZE} className="text-sky-500" />,
  },
  {
    name: "Gift",
    id: 6,
    icon: <Heart size={ICON_SIZE} className="text-pink-400" />,
  },
  {
    name: "Retail Income",
    id: 5,
    icon: <Home size={ICON_SIZE} className="text-orange-400" />,
  },
  {
    name: "Other",
    id: 7,
    icon: <PlusCircle size={ICON_SIZE} className="text-teal-400" />,
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
      <SelectContent className={cn("bg-white dark:bg-dark-elevated w-full", contentClassName)}>
        <SelectGroup>
          {incomesources.map((source: SourceIncome) => {
            return (
              <SelectItem
                key={source.id}
                value={source.id.toString()}
                className="lg:hover:bg-gray-200 dark:lg:hover:bg-dark-card"
              >
                <div className="flex items-center gap-x-1">
                  {source.icon}
                  <p>{source.name}</p>
                </div>
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
