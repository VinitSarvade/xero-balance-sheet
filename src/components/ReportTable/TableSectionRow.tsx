import { SectionData, SectionRow } from "@/modules/xero/xero.module";
import { twc } from "@/utils/twc";
import TableSectionColumn from "./TableSectionColumn";

interface TableSectionRowProps {
  row: SectionData;
  section: SectionRow;
}

export const PrimarySectionSummaryRow = twc.tr`bg-sky-100 text-lg font-semibold uppercase tracking-tight`;
export const SectionSummaryRow = twc.tr`border-solid border-gray-400 border-y bg-sky-100`;
export const NetRow = twc.tr`bg-orange-100 text-lg font-semibold uppercase tracking-tight`;
export const Row = twc.tr``;

type RowComponentType =
  | typeof PrimarySectionSummaryRow
  | typeof SectionSummaryRow
  | typeof NetRow
  | typeof Row;

export function getRowComponent(
  row: SectionData,
  section: SectionRow,
): [
  RowComponentType,
  { isPrimarySummaryRow?: boolean; isSummaryRow?: boolean; isNetRow?: boolean },
] {
  switch (row.RowType) {
    case "SummaryRow":
      if (section.Title.length === 0 && section.Rows.length === 1) {
        return [PrimarySectionSummaryRow, { isPrimarySummaryRow: true }];
      }
      return [SectionSummaryRow, { isSummaryRow: true }];

    case "Row":
      if (row.Cells[0].Value === "Net Assets") {
        return [NetRow, { isNetRow: true }];
      }

      return [Row, {}];
  }
}

export default function TableSectionRow({
  section,
  row,
}: TableSectionRowProps) {
  const [RowComponent, cellProps] = getRowComponent(row, section);

  return (
    <RowComponent>
      {row.Cells.map((cell, idx) => (
        <TableSectionColumn
          key={`cell-${idx}-${section.Title}-${cell.Value}`}
          cell={cell}
          particularsColumn={idx === 0}
          amountColumn={idx > 0}
          {...cellProps}
        />
      ))}
    </RowComponent>
  );
}
