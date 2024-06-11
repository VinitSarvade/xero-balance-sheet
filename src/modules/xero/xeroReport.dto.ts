export interface BalanceSheetReport {
  ReportID: string;
  ReportName: string;
  ReportTitles: string[];
  ReportDate: string;
  Rows: BalanceSheetRow[];
}

export type BalanceSheetRow = SectionRow | HeaderRow;

export interface HeaderRow {
  RowType: "Header";
  Cells: Cell[];
}

export interface Cell {
  Value: string;
}

export interface SectionRow {
  RowType: "Section";
  Title: string;
  Rows: SectionData[];
}

export type SectionData = DataRow | SummaryRow;

export interface DataRow {
  RowType: "Row";
  Cells: Cell[];
}

export interface SummaryRow {
  RowType: "SummaryRow";
  Cells: Cell[];
}
