import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
import { Repeat } from "lucide-react";
import { BudgetResponseType } from ".";
import CalculateBudgetProgress from "@/helpers/calculateBudgetProgress";
import { formatCurrency } from "@/helpers/formatCurrency";
import useUserPreferences from "@/hooks/users/useUserPreferences";
import categoryColorDictionary from "@/types/CategoryDict";

export default function BudgetItem({ budget }: { budget: BudgetResponseType }) {
  const currency = useUserPreferences().data?.preferences?.currency ?? "AUD";
  const currentCategory = categoryColorDictionary[budget.categoryId];

  return (
    <Card className="p-5 shadow-xl dark:shadow-dark-bg lg:hover:scale-101 transition-all duration-150 ease-linear">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-1.5">
        <div className="space-y-1.5">
          <article className="flex items-center gap-x-1.5">
            {currentCategory.icon}
            <p className={"text-md md:text-lg font-bold"}>{currentCategory.name}</p>
          </article>
          <p className="text-xs md:text-sm text-gray-700 dark:text-gray-500">
            End Date:{" "}
            <span className="text-white/80 font-semibold">
              {new Date(budget.endDate).toLocaleDateString()}
            </span>
          </p>
        </div>
        {budget.isRecurring && (
          <Badge
            variant={"outline"}
            className="text-green-500 dark:text-green-400 space-x-1 border-green-500 dark:border-green-400 w-fit"
          >
            <Repeat size={16} />
            <p className="text-xs md:text-sm">Recurred</p>
          </Badge>
        )}
      </div>
      <div className="w-full">
        <p></p>
        <Field className="w-full">
          <FieldLabel htmlFor="progress-upload">
            <span>{formatCurrency(budget.spentAmount, currency)} spent</span>
            <span className="ms-auto">{formatCurrency(budget.amount, currency)}</span>
          </FieldLabel>
          <Progress
            value={CalculateBudgetProgress({ total: budget.amount, spent: budget.spentAmount })}
            id="progress-upload"
            className="w-full"
          />
          <FieldLabel htmlFor="progress-upload">
            <span>
              {CalculateBudgetProgress({ total: budget.amount, spent: budget.spentAmount })}%
            </span>
            {budget.spentAmount > budget.amount ? (
              <span className="ms-auto text-red-500 dark:text-red-400">
                {formatCurrency(budget.spentAmount - budget.amount, currency)} over budget
              </span>
            ) : (
              <span className="ms-auto text-green-500 dark:text-green-400">
                {formatCurrency(budget.amount - budget.spentAmount, currency)} remaining
              </span>
            )}
          </FieldLabel>
        </Field>
      </div>
    </Card>
  );
}
