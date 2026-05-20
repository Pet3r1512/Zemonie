import { IncomeForm } from "./Forms/IncomeForm";
import { ExpenseForm } from "./Forms/ExpenseForm";

export default function TransactionButtons() {
  return (
    <div className="flex items-center gap-x-5 lg:justify-end">
      <IncomeForm />
      <ExpenseForm />
    </div>
  );
}
