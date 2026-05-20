import { Currency } from "@/api/users/createBalance";
import TransactionSummary from "./TransactionSummary";
import groupTransactions from "@/lib/groupTransactions";
import ParseISOStringDate from "@/helpers/parseISOStringData";

export type TransactionInfo = {
  id: string;
  userId: string;
  categoryId?: number;
  amount: number;
  currency: Currency;
  date: string;
  description: string;
};

export default function ListByDate({
  transactions = [],
  lastElementRef,
}: {
  transactions?: TransactionInfo[];
  lastElementRef: (node: HTMLDivElement | null) => void;
}) {
  const groupedByDate = groupTransactions(transactions);

  if (Object.keys(groupedByDate).length === 0) {
    return <div className="text-gray-500">No transactions</div>;
  }

  const sortedEntries = Object.entries(groupedByDate).sort(
    ([a], [b]) => new Date(b).getTime() - new Date(a).getTime(),
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const allTxs = sortedEntries.flatMap(([_, txs]) => txs);
  const lastTxId = allTxs[allTxs.length - 1]?.id;

  return (
    <section className="space-y-10 max-h-[85%] lg:max-h-[92.5%] overflow-y-auto pr-2.5">
      {sortedEntries.map(([date, txs]) => (
        <div key={date} className="space-y-5">
          <div className="p-1.5 rounded-lg bg-gray-200 font-bold">
            {ParseISOStringDate({ date: date })}
          </div>

          {txs.map((tx) => (
            <TransactionSummary
              key={tx.id}
              transaction={tx}
              lastElementRef={tx.id === lastTxId ? lastElementRef : undefined}
            />
          ))}
        </div>
      ))}
    </section>
  );
}
