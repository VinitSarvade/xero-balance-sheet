import {
  BalanceSheetRow,
  HeaderRow,
  SectionRow,
} from "@/modules/xero/xero.module";
import TableHeader from "./TableHeader";
import TableSection from "./TableSection";

interface ReportTableProps {
  data: BalanceSheetRow[];
}

function groupByRowType(data: BalanceSheetRow[]) {
  return data.reduce(
    (acc, row) => {
      if (row.RowType === "Section") {
        acc.sections.push(row);
      }
      if (row.RowType === "Header") {
        acc.header = row;
      }
      return acc;
    },
    {
      header: {} as HeaderRow,
      sections: [] as SectionRow[],
    },
  );
}

export default function ReportTable({ data }: ReportTableProps) {
  const { header, sections } = groupByRowType(data);

  return (
    <table className="w-full border-collapse">
      <TableHeader header={header} />
      <tbody className="capitalize">
        {sections.map((section) => (
          <TableSection
            section={section}
            key={`${section.RowType}-${section.Title}`}
          />
        ))}
      </tbody>
    </table>
  );
}
