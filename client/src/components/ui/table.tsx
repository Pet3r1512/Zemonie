import * as React from "react";

import { cn } from "@/lib/utils";

const Table = ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
  <div className="relative w-full overflow-auto">
    <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
  </div>
);
Table.displayName = "Table";

const TableHeader = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <thead className={cn("[&_tr]:border-b", className)} {...props} />
);
TableHeader.displayName = "TableHeader";

const TableBody = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tbody className={cn("[&_tr:last-child]:border-0", className)} {...props} />
);
TableBody.displayName = "TableBody";

const TableFooter = ({ className, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) => (
  <tfoot
    className={cn(
      "border-t bg-oklch(0.97 0 0)/50 font-medium [&>tr]:last:border-b-0 dark:bg-oklch(0.269 0 0)/50",
      className,
    )}
    {...props}
  />
);
TableFooter.displayName = "TableFooter";

const TableRow = ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr
    className={cn(
      "border-b border-neutral-200 transition-colors hover:bg-oklch(0.97 0 0)/50 data-[state=selected]:bg-oklch(0.97 0 0) dark:border-dark-elevated dark:hover:bg-oklch(0.269 0 0)/50 dark:data-[state=selected]:bg-oklch(0.269 0 0)",
      className,
    )}
    {...props}
  />
);
TableRow.displayName = "TableRow";

const TableHead = ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
  <th
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-oklch(0.556 0 0) [&:has([role=checkbox])]:pr-0 dark:text-oklch(0.708 0 0)",
      className,
    )}
    {...props}
  />
);
TableHead.displayName = "TableHead";

const TableCell = ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
  <td
    className={cn("p-2.5 lg:p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
);
TableCell.displayName = "TableCell";

const TableCaption = ({ className, ...props }: React.HTMLAttributes<HTMLTableCaptionElement>) => (
  <caption
    className={cn("mt-4 text-sm text-oklch(0.556 0 0) dark:text-oklch(0.708 0 0)", className)}
    {...props}
  />
);
TableCaption.displayName = "TableCaption";

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
