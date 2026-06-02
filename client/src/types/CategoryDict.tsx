import {
  BookOpen,
  Briefcase,
  Building2,
  Car,
  FileText,
  Gift,
  Heart,
  HeartPulse,
  Home,
  Laptop,
  MoreHorizontal,
  PiggyBank,
  Plane,
  PlusCircle,
  Receipt,
  Shield,
  ShoppingBag,
  ShoppingCart,
  TrendingUp,
  Tv2,
  Utensils,
} from "lucide-react";
import { ReactNode } from "react";

const categoryColorDictionary: Record<
  string,
  { name: string; color: string; icon: ReactNode }
> = {
  // Income - spread across clearly distinct hues
  1: {
    name: "Salary",
    color: "bg-emerald-500",
    icon: <Briefcase className="text-emerald-500" />,
  },
  2: {
    name: "Bonus",
    color: "bg-yellow-400",
    icon: <Gift className="text-yellow-400" />,
  },
  3: {
    name: "Freelance",
    color: "bg-violet-500",
    icon: <Laptop className="text-violet-500" />,
  },
  4: {
    name: "Investment",
    color: "bg-sky-500",
    icon: <TrendingUp className="text-sky-500" />,
  },
  5: {
    name: "Rental Income",
    color: "bg-orange-400",
    icon: <Home className="text-orange-400" />,
  },
  6: {
    name: "Gift",
    color: "bg-pink-400",
    icon: <Heart className="text-pink-400" />,
  },
  7: {
    name: "Other Income",
    color: "bg-teal-400",
    icon: <PlusCircle className="text-teal-400" />,
  },

  // Expense
  8: {
    name: "Food & Drinks",
    color: "bg-red-500",
    icon: <Utensils className="text-red-500" />,
  },
  9: {
    name: "Groceries",
    color: "bg-orange-500",
    icon: <ShoppingCart className="text-orange-500" />,
  },
  10: {
    name: "Vehicle / Transport",
    color: "bg-amber-500",
    icon: <Car className="text-amber-500" />,
  },
  11: {
    name: "Housing",
    color: "bg-yellow-500",
    icon: <Building2 className="text-yellow-500" />,
  },
  12: {
    name: "Bills",
    color: "bg-rose-500",
    icon: <FileText className="text-rose-500" />,
  },
  13: {
    name: "Study / Education",
    color: "bg-purple-500",
    icon: <BookOpen className="text-purple-500" />,
  },
  14: {
    name: "Health",
    color: "bg-pink-500",
    icon: <HeartPulse className="text-pink-500" />,
  },
  15: {
    name: "Entertainment",
    color: "bg-fuchsia-500",
    icon: <Tv2 className="text-fuchsia-500" />,
  },
  16: {
    name: "Shopping",
    color: "bg-violet-500",
    icon: <ShoppingBag className="text-violet-500" />,
  },
  17: {
    name: "Travel",
    color: "bg-blue-500",
    icon: <Plane className="text-blue-500" />,
  },
  18: {
    name: "Insurance",
    color: "bg-slate-500",
    icon: <Shield className="text-slate-500" />,
  },
  19: {
    name: "Taxes",
    color: "bg-stone-500",
    icon: <Receipt className="text-stone-500" />,
  },
  20: {
    name: "Savings & Investments",
    color: "bg-emerald-600",
    icon: <PiggyBank className="text-emerald-600" />,
  },
  21: {
    name: "Other Expense",
    color: "bg-gray-500",
    icon: <MoreHorizontal className="text-gray-500" />,
  },
};

export default categoryColorDictionary;
