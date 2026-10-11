import { Currency } from "@/api/users/createBalance";
import { CurrentCategory, ExpandableCard } from "@/components/ui/aceternity/ExpandableCard";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import dailySummary from "@/helpers/dailySummary";
import { formatCurrency } from "@/helpers/formatCurrency";
import ParseISOStringDate from "@/helpers/parseISOStringData";
import groupTransactions from "@/lib/groupTransactions";
import { useMemo } from "react";

export type TransactionInfo = {
  id: string;
  userId: string;
  categoryId?: number;
  amount: number;
  currency: Currency;
  createdAt: string;
  description: string;
  parentTransactionId?: string;
};

export default function ListByDate({
  transactions = [],
  lastElementRef,
  onSave,
}: {
  transactions?: TransactionInfo[];
  lastElementRef?: (node: HTMLDivElement | null) => void;
  onSave?: (transaction: TransactionInfo) => void;
}) {
  const globalCategories: CurrentCategory[] = useMemo(() => {
    const data = sessionStorage.getItem("globalCategories");
    return data ? JSON.parse(data) : [];
  }, []);

  const categoryLookup = useMemo(
    () => Object.fromEntries(globalCategories.map((c) => [c.id, c.type])),
    [globalCategories],
  );

  const groupedByDate = groupTransactions(transactions);

  if (Object.keys(groupedByDate).length === 0) {
    return <div className="text-gray-500 dark:text-gray-400">No transactions</div>;
  }

  const sortedEntries = Object.entries(groupedByDate).toSorted(
    ([a], [b]) => new Date(b).getTime() - new Date(a).getTime(),
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const allTxs = sortedEntries.flatMap(([_, txs]) => txs);
  const lastTxId = allTxs[allTxs.length - 1]?.id;

  return (
    <section className="space-y-10 min-h-0 ">
      {dailySummary(sortedEntries, categoryLookup).map(([date, txs, dailyNet]) => (
        <div key={date} className="space-y-1 lg:space-y-5">
          <div className="p-0.5 lg:p-1.5 rounded-lg bg-gray-200 dark:bg-dark-card font-bold flex items-center justify-between">
            <p>{ParseISOStringDate({ date: date })}</p>
            {txs.length > 1 ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="text-sm cursor-default">
                    {dailyNet > 0 && (
                      <span className="text-green-500/90">
                        {formatCurrency(dailyNet, txs[0].currency)}
                      </span>
                    )}
                    {dailyNet < 0 && (
                      <span className="text-red-500/90">
                        {formatCurrency(dailyNet, txs[0].currency)}
                      </span>
                    )}
                    {dailyNet === 0 && <span className=""></span>}
                  </p>
                </TooltipTrigger>
                <TooltipContent>Daily Net</TooltipContent>
              </Tooltip>
            ) : null}
          </div>

          {txs.map((tx) => (
            <ExpandableCard
              key={tx.id}
              transaction={tx}
              lastElementRef={tx.id === lastTxId ? lastElementRef : undefined}
              onSave={onSave}
            />
          ))}
        </div>
      ))}
    </section>
  );
}
