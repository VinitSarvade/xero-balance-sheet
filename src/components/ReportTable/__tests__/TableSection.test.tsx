import { expect, describe, it } from "bun:test";
import { render } from "@testing-library/react";
import { SectionRow } from "@/modules/xero/xeroReport.dto";
import TableSection from "../TableSection";
import { format } from "@/utils/test-utils";

const section: SectionRow = {
  Title: "Assets",
  RowType: "Section",
  Rows: [
    {
      RowType: "Row",
      Cells: [{ Value: "Cash" }, { Value: "100" }, { Value: "120" }],
    },
    {
      RowType: "Row",
      Cells: [{ Value: "Checking Account" }, { Value: "50" }, { Value: "100" }],
    },
    {
      RowType: "Row",
      Cells: [{ Value: "Savings Account" }, { Value: "50" }, { Value: "500" }],
    },
    {
      RowType: "SummaryRow",
      Cells: [{ Value: "Total Assets" }, { Value: "200" }, { Value: "720" }],
    },
  ],
};

describe("TableSection", () => {
  it("renders primary section title correctly", () => {
    const section: SectionRow = {
      Title: "Assets",
      RowType: "Section",
      Rows: [
        {
          RowType: "Row",
          Cells: [{ Value: "Cash" }, { Value: "100" }, { Value: "120" }],
        },
        {
          RowType: "Row",
          Cells: [
            { Value: "Checking Account" },
            { Value: "50" },
            { Value: "100" },
          ],
        },
        {
          RowType: "Row",
          Cells: [
            { Value: "Savings Account" },
            { Value: "50" },
            { Value: "500" },
          ],
        },
        {
          RowType: "SummaryRow",
          Cells: [
            { Value: "Total Assets" },
            { Value: "200" },
            { Value: "720" },
          ],
        },
      ],
    };
    const { getByText } = render(
      <table>
        <tbody>
          <TableSection section={section} />
        </tbody>
      </table>,
    );
    const sectionTitle = getByText("Assets");
    expect(sectionTitle).toBeTruthy();
    expect(sectionTitle.tagName).toBe("DIV");
    expect(sectionTitle.className).toContain("text-2xl");
    expect(sectionTitle.className).toContain("font-semibold");
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <table>
        <tbody>
          <TableSection section={section} />
        </tbody>
      </table>,
    );

    expect(format(asFragment())).toMatchSnapshot();
  });

  it("renders sub-section title row correctly", () => {
    const section: SectionRow = {
      Title: "Current Assets",
      RowType: "Section",
      Rows: [
        {
          RowType: "Row",
          Cells: [{ Value: "Cash" }, { Value: "100" }, { Value: "100" }],
        },
      ],
    };
    const { getByText } = render(
      <table>
        <tbody>
          <TableSection section={section} />
        </tbody>
      </table>,
    );
    const sectionTitle = getByText("Current Assets");
    expect(sectionTitle).toBeTruthy();
    expect(sectionTitle.tagName).toBe("DIV");
    expect(sectionTitle.className).toContain("text-xl");
    expect(sectionTitle.className).toContain("font-semibold");
    expect(sectionTitle.className).toContain("pl-4");
  });

  it("renders no section title when title is empty", () => {
    const section: SectionRow = {
      Title: "",
      RowType: "Section",
      Rows: [
        {
          RowType: "Row",
          Cells: [{ Value: "Cash" }, { Value: "100" }, { Value: "100" }],
        },
      ],
    };
    const { findByTestId } = render(
      <table>
        <tbody>
          <TableSection section={section} />
        </tbody>
      </table>,
    );
    const sectionTitle = findByTestId("section-title");
    expect(sectionTitle).toBeEmpty();
  });

  it("renders no rows when Rows array is empty", () => {
    const section: SectionRow = {
      Title: "Current Assets",
      RowType: "Section",
      Rows: [],
    };
    const { queryAllByRole } = render(
      <table>
        <tbody>
          <TableSection section={section} />
        </tbody>
      </table>,
    );
    const rows = queryAllByRole("row");
    expect(rows).toHaveLength(1);
  });
});
