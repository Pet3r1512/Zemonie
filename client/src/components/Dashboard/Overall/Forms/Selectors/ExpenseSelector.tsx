import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, } from "@/lib/utils";
import {
  BookOpen,
  Building2,
  Car,
  FileText,
  HeartPulse,
  MoreHorizontal,
  PiggyBank,
  Plane,
  Receipt,
  Shield,
  ShoppingBag,
  ShoppingCart,
  Tv2,
  Utensils,
} from "lucide-react";
import { ReactNode, } from "react";
import { useFormContext, } from "react-hook-form";
import { Transaction, } from "../IncomeForm";
import { ICON_SIZE, } from "./IncomeSelector";

type SourceExpense = {
  name: string;
  id: number;
  icon: ReactNode;
};

const expenseSources: SourceExpense[] = [
  { name: "Shopping", id: 16, icon: <ShoppingBag size={ICON_SIZE} className="text-violet-500" />, },
  {
    name: "Food & Drinks",
    id: 8,
    icon: <Utensils size={ICON_SIZE} className="text-red-500" />,
  },
  {
    name: "Groceries",
    id: 9,
    icon: <ShoppingCart size={ICON_SIZE} className="text-orange-500" />,
  },
  {
    name: "Vehicle / Transport",
    id: 10,
    icon: <Car size={ICON_SIZE} className="text-amber-500" />,
  },
  {
    name: "Bills",
    id: 12,
    icon: <FileText size={ICON_SIZE} className="text-rose-500" />,
  },
  {
    name: "Housing",
    id: 11,
    icon: <Building2 size={ICON_SIZE} className="text-yellow-500" />,
  },
  {
    name: "Study / Education",
    id: 13,
    icon: <BookOpen size={ICON_SIZE} className="text-purple-500" />,
  },
  { name: "Health", id: 14, icon: <HeartPulse size={ICON_SIZE} className="text-pink-500" />, },
  { name: "Entertainment", id: 15, icon: <Tv2 size={ICON_SIZE} className="text-fuchsia-500" />, },

  { name: "Travel", id: 17, icon: <Plane size={ICON_SIZE} className="text-blue-500" />, },
  { name: "Insurance", id: 18, icon: <Shield size={ICON_SIZE} className="text-slate-500" />, },
  { name: "Taxes", id: 19, icon: <Receipt size={ICON_SIZE} className="text-stone-500" />, },
  {
    name: "Savings & Investments",
    id: 20,
    icon: <PiggyBank size={ICON_SIZE} className="text-emerald-600" />,
  },
  {
    name: "Other Expense",
    id: 21,
    icon: <MoreHorizontal size={ICON_SIZE} className="text-gray-500" />,
  },
];

export default function ExpenseSelect({
  value,
  contentClassName,
}: {
  value?: string;
  contentClassName?: string;
},) {
  const { setValue, } = useFormContext<Transaction>();

  return (
    <Select
      value={value}
      onValueChange={(newValue,) => {
        setValue("categoryId", +newValue, { shouldValidate: true, },);
      }}
    >
      <SelectTrigger id="source" name="source" className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent
        className={cn("bg-white dark:bg-dark-elevated w-full max-h-72", contentClassName,)}
      >
        <SelectGroup>
          {expenseSources.map((source: SourceExpense,) => {
            return (
              <SelectItem
                key={source.id}
                value={source.id.toString()}
                className="lg:hover:bg-gray-200 dark:lg:hover:bg-dark-card"
              >
                <div className="flex items-center gap-x-1 size={ICON_SIZE}">
                  {source.icon}
                  <p>{source.name}</p>
                </div>
              </SelectItem>
            );
          },)}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
