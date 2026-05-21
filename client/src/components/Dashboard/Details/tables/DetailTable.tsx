import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TransactionInfo } from "../../Transactions/TransactionsTable/ListByDate";
import ParseISOStringDate from "@/helpers/parseISOStringData";
import CategoryTag from "../../Category/CategoryTag";
import { cn } from "@/lib/utils";

const TABLE_TITLE_FONT_SIZE = "text-xs sm:text-sm md:text-base";

export function IncomeTable({
  transactions,
  lastElementRef,
}: {
  transactions: TransactionInfo[];
  lastElementRef: (node: HTMLTableRowElement | null) => void;
}) {
  const lastTxId = transactions[transactions.length - 1]?.id;

  return (
    <div className="w-full overflow-x-auto rounded-lg border">
      <Table className="min-w-150 md:min-w-full">
        <TableHeader>
          <TableRow>
            <TableHead className={cn(TABLE_TITLE_FONT_SIZE)}>Date</TableHead>

            <TableHead className={cn(TABLE_TITLE_FONT_SIZE)}>Source</TableHead>

            <TableHead className={cn(TABLE_TITLE_FONT_SIZE, "text-right")}>
              Amount
            </TableHead>

            <TableHead className={cn(TABLE_TITLE_FONT_SIZE, "text-right")}>
              Description
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {transactions.map((transaction) => (
            <TableRow
              key={transaction.id}
              ref={transaction.id === lastTxId ? lastElementRef : undefined}
              className="transition-all duration-150 ease-linear lg:hover:bg-gray-100"
            >
              <TableCell className="text-xs sm:text-sm md:text-base whitespace-nowrap">
                {ParseISOStringDate({ date: transaction.date })}
              </TableCell>

              <TableCell>
                <CategoryTag
                  categoryId={transaction.categoryId?.toString() || "0"}
                />
              </TableCell>

              <TableCell className="text-right font-medium text-xs sm:text-sm md:text-base whitespace-nowrap">
                ${transaction.amount}
              </TableCell>

              <TableCell className="text-right max-w-62.5 truncate">
                {transaction.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
