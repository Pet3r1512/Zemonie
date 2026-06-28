import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatCurrency } from "@/helpers/formatCurrency";
import ParseISOStringDate from "@/helpers/parseISOStringData";
import useUserPreferences from "@/hooks/users/useUserPreferences";
import { cn } from "@/lib/utils";
import CategoryTag from "../../Category/CategoryTag";
import { TransactionInfo } from "../../Transactions/TransactionsTable/ListByDate";

const TABLE_TITLE_FONT_SIZE = "text-xs sm:text-sm md:text-base";

export function DetailsTable({
  transactions,
  lastElementRef,
  isLoadingMore,
}: {
  transactions: TransactionInfo[];
  lastElementRef: (node: HTMLTableRowElement | null) => void;
  isLoadingMore?: boolean;
}) {
  const lastTxId = transactions[transactions.length - 1]?.id;
  const currency = useUserPreferences().data?.preferences?.currency ?? "AUD";

  return (
    <div className="w-full h-full overflow-hidden rounded-lg border dark:border-dark-elevated">
      <div className="h-full overflow-auto">
        <Table className="min-w-150 md:min-w-full">
          <TableHeader>
            <TableRow>
              <TableHead className={cn(TABLE_TITLE_FONT_SIZE)}>Date</TableHead>

              <TableHead className={cn(TABLE_TITLE_FONT_SIZE)}>Source</TableHead>

              <TableHead className={cn(TABLE_TITLE_FONT_SIZE, "text-right")}>Amount</TableHead>

              <TableHead className={cn(TABLE_TITLE_FONT_SIZE, "text-right")}>Description</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                ref={transaction.id === lastTxId ? lastElementRef : undefined}
                className="transition-all duration-150 ease-linear lg:hover:bg-gray-100 dark:lg:hover:bg-dark-card"
              >
                <TableCell className="text-xs sm:text-sm md:text-base whitespace-nowrap">
                  {ParseISOStringDate({ date: transaction.date })}
                </TableCell>

                <TableCell>
                  <CategoryTag categoryId={transaction.categoryId?.toString() || "0"} />
                </TableCell>

                <TableCell className="text-right font-medium text-xs sm:text-sm md:text-base whitespace-nowrap">
                  {formatCurrency(transaction.amount, currency)}
                </TableCell>

                <TableCell className="text-right max-w-62.5 truncate">
                  {transaction.description}
                </TableCell>
              </TableRow>
            ))}
            {isLoadingMore && (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-4 text-sm text-gray-400">
                  Loading more...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
