import { ExpenseForm, } from "./Forms/ExpenseForm";
import { IncomeForm, } from "./Forms/IncomeForm";

export default function TransactionButtons() {
  return (
    <div className="flex items-center gap-x-5 lg:justify-end">
      <IncomeForm />
      <ExpenseForm />
    </div>
  );
}
