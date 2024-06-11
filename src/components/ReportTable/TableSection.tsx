import { SectionRow } from "@/modules/xero/xero.module";
import { cn } from "@/utils/cn";
import TableSectionRow from "./TableSectionRow";

interface TableSectionProps {
  section: SectionRow;
}

export default function TableSection({ section }: TableSectionProps) {
  const hasEntries = section.Rows.length > 0;
  const hasTitle = section.Title.length > 0;

  const isPrimarySectionTitle =
    section.Title === "Assets" || section.Title === "Liabilities";
  const isSubSectionTitleRow = !isPrimarySectionTitle && hasEntries && hasTitle;

  return (
    <>
      <tr key={`section-${section.Title}`}>
        <td colSpan={3} className="py-2">
          <div
            className={cn("text-xl font-semibold", {
              "text-2xl": isPrimarySectionTitle,
              "pl-4": isSubSectionTitleRow,
            })}
            data-testid="section-title"
          >
            {section.Title}
          </div>
        </td>
      </tr>

      {section.Rows.map((row) => (
        <TableSectionRow
          key={`row-${row.RowType}-${section.RowType}-${row.Cells[0].Value}`}
          row={row}
          section={section}
        />
      ))}
    </>
  );
}
