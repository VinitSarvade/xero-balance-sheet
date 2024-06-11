import { HeaderRow } from "@/modules/xero/xero.module";

interface TableHeaderProps {
  header: HeaderRow;
}

export default function TableHeader({ header }: TableHeaderProps) {
  return (
    <thead>
      <tr>
        {header.Cells.map((cell) => (
          <th key={`header-${cell.Value}`}>{cell.Value}</th>
        ))}
      </tr>
    </thead>
  );
}
