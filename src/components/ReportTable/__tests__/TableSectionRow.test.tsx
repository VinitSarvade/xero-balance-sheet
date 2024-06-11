import { expect, describe, it } from "bun:test";
import { render } from "@testing-library/react";
import { SectionData, SectionRow } from "@/modules/xero/xero.module";
import { format } from "@/utils/test-utils";
import TableSectionRow, {
  getRowComponent,
  PrimarySectionSummaryRow,
  SectionSummaryRow,
  NetRow,
  Row,
} from "../TableSectionRow";

describe("getRowComponent", () => {
  it("returns PrimarySectionSummaryRow component for primary summary row", () => {
    const row: SectionData = { RowType: "SummaryRow", Cells: [] };
    const section: SectionRow = {
      Title: "",
      Rows: [row],
      RowType: "Section",
    };
    const [component, props] = getRowComponent(row, section);
    expect(component).toBe(PrimarySectionSummaryRow);
    expect(props).toEqual({ isPrimarySummaryRow: true });
  });

  it("returns SectionSummaryRow component for non-primary summary row", () => {
    const row: SectionData = { RowType: "SummaryRow", Cells: [] };
    const section: SectionRow = {
      Title: "Section Title",
      Rows: [row],
      RowType: "Section",
    };
    const [component, props] = getRowComponent(row, section);
    expect(component).toBe(SectionSummaryRow);
    expect(props).toEqual({ isSummaryRow: true });
  });

  it("returns NetRow component for row with 'Net Assets' cell value", () => {
    const row: SectionData = {
      RowType: "Row",
      Cells: [{ Value: "Net Assets" }],
    };
    const section: SectionRow = {
      Title: "",
      Rows: [row],
      RowType: "Section",
    };
    const [component, props] = getRowComponent(row, section);
    expect(component).toBe(NetRow);
    expect(props).toEqual({ isNetRow: true });
  });

  it("returns Row component for regular row", () => {
    const row: SectionData = {
      RowType: "Row",
      Cells: [{ Value: "Regular Row" }],
    };
    const section: SectionRow = {
      Title: "",
      Rows: [row],
      RowType: "Section",
    };
    const [component, props] = getRowComponent(row, section);
    expect(component).toBe(Row);
    expect(props).toEqual({});
  });
});

describe("TableSectionRow", () => {
  it("renders the correct number of TableSectionColumn components", () => {
    const section: SectionRow = {
      Title: "Section Title",
      Rows: [],
      RowType: "Section",
    };
    const row: SectionData = {
      RowType: "Row",
      Cells: [{ Value: "Cell 1" }, { Value: "Cell 2" }, { Value: "Cell 3" }],
    };
    const { getAllByRole } = render(
      <table>
        <tbody>
          <TableSectionRow section={section} row={row} />
        </tbody>
      </table>,
    );
    const columns = getAllByRole("cell");
    expect(columns).toHaveLength(3);
    expect(columns[0].textContent).toBe("Cell 1");
    expect(columns[1].textContent).toBe("Cell 2");
    expect(columns[2].textContent).toBe("Cell 3");
  });

  it("matches the snapshot", () => {
    const section: SectionRow = {
      Title: "Section Title",
      Rows: [],
      RowType: "Section",
    };
    const row: SectionData = {
      RowType: "Row",
      Cells: [{ Value: "Cell 1" }, { Value: "Cell 2" }, { Value: "Cell 3" }],
    };
    const { asFragment } = render(
      <table>
        <tbody>
          <TableSectionRow section={section} row={row} />
        </tbody>
      </table>,
    );

    expect(format(asFragment())).toMatchSnapshot();
  });

  it("renders the correct RowComponent for SummaryRow", () => {
    const section: SectionRow = {
      Title: "Section Title",
      Rows: [],
      RowType: "Section",
    };
    const summaryRow: SectionData = {
      RowType: "SummaryRow",
      Cells: [{ Value: "Summary Row" }],
    };

    const { getByRole } = render(
      <table>
        <tbody>
          <TableSectionRow section={section} row={summaryRow} />
        </tbody>
      </table>,
    );
    expect(getByRole("row").textContent).toBe("Summary Row");
  });

  it("renders the correct RowComponent for Row", () => {
    const section: SectionRow = {
      Title: "Section Title",
      Rows: [],
      RowType: "Section",
    };
    const regularRow: SectionData = {
      RowType: "Row",
      Cells: [{ Value: "Regular Row" }],
    };
    const { getByRole } = render(
      <table>
        <tbody>
          <TableSectionRow section={section} row={regularRow} />
        </tbody>
      </table>,
    );
    expect(getByRole("row").classList).toHaveLength(0);
  });
});
