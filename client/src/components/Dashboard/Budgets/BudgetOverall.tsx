import useUserPreferences from "@/hooks/users/useUserPreferences";
import { OverallDataType } from "../Overall";
import { Crosshair, HandCoins, TrendingUp } from "lucide-react";
import Data from "../Overall/Data";

export default function BudgetOverall() {
  const currency = useUserPreferences().data?.preferences?.currency ?? "AUD";

  const budgetOverallData: OverallDataType[] = [
    {
      name: "Total Budget",
      subtitle: "Monthly allocation",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-blue-100 dark:bg-blue-900/30">
          <Crosshair className="text-blue-500" />
        </div>
      ),
      isLoading: false,
      isError: false,
      amount: 3200.0,
      currency,
    },
    {
      name: "Total Spent",
      subtitle: "72% of budget",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-red-100 dark:bg-red-900/30">
          <TrendingUp className="text-red-500" />
        </div>
      ),
      isLoading: false,
      isError: false,
      amount: 2310.0,
      currency,
    },
    {
      name: "Remaining",
      subtitle: "Available to spend",
      icon: (
        <div className="flex items-center justify-center rounded-full p-2.5 bg-lime-100 dark:bg-lime-900/30">
          <HandCoins className="text-lime-500" />
        </div>
      ),
      isLoading: false,
      isError: false,
      amount: 3200.0,
      currency,
    },
  ];
}
