import { cn } from "@/lib/utils";

export default function CategoryTag({ categoryId }: { categoryId: string }) {
  const categoryColorDictionary: Record<
    string,
    { name: string; color: string }
  > = {
    // Income - spread across clearly distinct hues
    1: { name: "Salary", color: "bg-emerald-500" }, // green
    2: { name: "Bonus", color: "bg-yellow-400" }, // yellow
    3: { name: "Freelance", color: "bg-violet-500" }, // purple
    4: { name: "Investment", color: "bg-sky-500" }, // blue
    5: { name: "Rental Income", color: "bg-orange-400" }, // orange
    6: { name: "Gift", color: "bg-pink-400" }, // pink
    7: { name: "Other Income", color: "bg-teal-400" }, // teal

    // Expense - kept in warm/cool tones, distinct from income
    8: { name: "Food & Drinks", color: "bg-red-500" },
    9: { name: "Groceries", color: "bg-orange-500" },
    10: { name: "Vehicle / Transport", color: "bg-amber-500" },
    11: { name: "Housing", color: "bg-yellow-500" },
    12: { name: "Bills", color: "bg-rose-500" },
    13: { name: "Study / Education", color: "bg-purple-500" },
    14: { name: "Health", color: "bg-pink-500" },
    15: { name: "Entertainment", color: "bg-fuchsia-500" },
    16: { name: "Shopping", color: "bg-violet-500" },
    17: { name: "Travel", color: "bg-blue-500" },
    18: { name: "Insurance", color: "bg-slate-500" },
    19: { name: "Taxes", color: "bg-stone-500" },
    20: { name: "Savings & Investments", color: "bg-emerald-600" },
    21: { name: "Other Expense", color: "bg-gray-500" },
  };
  return (
    <p
      className={cn(
        categoryColorDictionary[categoryId].color,
        "max-w-fit px-2 py-1 rounded-lg text-white/90 cursor-default",
      )}
    >
      {categoryColorDictionary[categoryId].name}
    </p>
  );
}
