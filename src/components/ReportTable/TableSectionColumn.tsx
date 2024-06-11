import { Cell } from "@/modules/xero/xero.module";
import { cn } from "@/utils/cn";
import { formatMoney } from "@/utils/money";

interface TableSectionColumnProps {
  cell: Cell;
  isPrimarySummaryRow?: boolean;
  isNetRow?: boolean;
  isSummaryRow?: boolean;
  particularsColumn: boolean;
  amountColumn: boolean;
}

export default function TableSectionColumn({
  isPrimarySummaryRow = false,
  isNetRow = false,
  particularsColumn,
  amountColumn,
  cell,
}: TableSectionColumnProps) {
  return (
    <td
      className={cn("px-2", {
        "py-1.5 pl-4": particularsColumn && !isPrimarySummaryRow,
        "text-right": amountColumn,
        "py-4": isPrimarySummaryRow || isNetRow,
      })}
    >
      {Number.isNaN(Number(cell.Value))
        ? cell.Value
        : formatMoney(Number(cell.Value))}
    </td>
  );
}
