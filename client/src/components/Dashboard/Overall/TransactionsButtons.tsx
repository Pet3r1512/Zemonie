import NewTransactionForm from "./Forms/NewTransactionForm";

export default function TransactionButtons() {
  return (
    <div className="flex items-center gap-x-5 lg:justify-end">
      <NewTransactionForm />
    </div>
  );
}
