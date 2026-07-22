import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { formatCurrency } from "@/helpers/formatCurrency";
import useUserPreferences from "@/hooks/users/useUserPreferences";
import { cn } from "@/lib/utils";
import CategoryTag from "../../Category/CategoryTag";
import { TransactionInfo } from "../../Transactions/TransactionsTable/ListByDate";
import { Badge } from "@/components/ui/badge";

const TABLE_TITLE_FONT_SIZE = "text-xs sm:text-sm md:text-base";

// const TransactionFrequencyTag: Record<string, ReactElement> = {
//   "monthly": <Badge>Monthly</Badge>,
//   "oneTime": <Badge>One Time</Badge>
// };

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
        <Table className="min-w-150 md:min-w-full table-fixed">
          <TableHeader>
            <TableRow>
              <TableHead className={cn(TABLE_TITLE_FONT_SIZE, "w-28")}>Date</TableHead>

              <TableHead className={cn(TABLE_TITLE_FONT_SIZE, "w-30")}>Source</TableHead>

              <TableHead className={cn(TABLE_TITLE_FONT_SIZE, "text-right w-26")}>Amount</TableHead>

              <TableHead className={cn(TABLE_TITLE_FONT_SIZE, "text-right w-24")}>
                Frequency
              </TableHead>

              <TableHead className={cn(TABLE_TITLE_FONT_SIZE, "text-right w-45")}>
                Description
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow
                key={index + "_" + transaction.id}
                ref={transaction.id === lastTxId ? lastElementRef : undefined}
                className="transition-all duration-150 ease-linear lg:hover:bg-gray-100 dark:lg:hover:bg-dark-card"
              >
                <TableCell className="text-xs sm:text-sm md:text-base truncate">
                  {new Date(transaction.date).toLocaleDateString("en-DB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </TableCell>

                <TableCell>
                  <CategoryTag categoryId={transaction.categoryId?.toString() || "0"} />
                </TableCell>

                <TableCell className="text-right font-medium text-xs sm:text-sm md:text-base whitespace-nowrap">
                  {formatCurrency(transaction.amount, currency)}
                </TableCell>

                <TableCell className="text-right">
                  {transaction.parentTransactionId ? (
                    <Badge className="bg-[#00b4d8] cursor-default">Monthly</Badge>
                  ) : (
                    <Badge className="bg-[#dad7cd] text-black cursor-default">One Time</Badge>
                  )}
                </TableCell>

                <TableCell className="text-right w-45 truncate" title={transaction.description}>
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
