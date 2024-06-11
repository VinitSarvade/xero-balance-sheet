import { expect, describe, it } from "bun:test";
import { render } from "@testing-library/react";
import { HeaderRow } from "@/modules/xero/xero.module";
import TableHeader from "../TableHeader";
import { format } from "@/utils/test-utils";

const header: HeaderRow = {
  RowType: "Header",
  Cells: [{ Value: "Column 1" }, { Value: "Column 2" }, { Value: "Column 3" }],
};

describe("TableHeader", () => {
  it("renders table header cells correctly", () => {
    // Table header cannot be rendered without a table,
    // so we wrap it in a table element
    const { getAllByRole } = render(
      <table>
        <TableHeader header={header} />
      </table>,
    );
    const headerCells = getAllByRole("columnheader");
    expect(headerCells).toHaveLength(3);
    expect(headerCells[0].textContent).toBe("Column 1");
    expect(headerCells[1].textContent).toBe("Column 2");
    expect(headerCells[2].textContent).toBe("Column 3");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <table>
        <TableHeader header={header} />
      </table>,
    );

    expect(format(asFragment())).toMatchSnapshot();
  });

  it("renders no header cells when Cells array is empty", () => {
    const header: HeaderRow = { RowType: "Header", Cells: [] };
    const { queryAllByRole } = render(
      <table>
        <TableHeader header={header} />
      </table>,
    );
    const headerCells = queryAllByRole("columnheader");
    expect(headerCells).toHaveLength(0);
  });
});
