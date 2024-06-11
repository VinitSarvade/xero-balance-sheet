import { expect, describe, it } from "bun:test";
import { render, within } from "@testing-library/react";
import { formatMoney } from "@/utils/money";
import { format } from "@/utils/test-utils";
import Home from "../page";

describe("Home", () => {
  it("renders ReportTitles and ReportTable components", async () => {
    const HomeComponent = await Home();
    const { getByText, getAllByRole, debug } = render(HomeComponent);

    const titles = getAllByRole("heading");
    expect(titles).toHaveLength(2);
    expect(titles[0].textContent).toBe("Balance Sheet");
    expect(titles[1].textContent).toBe("Test Company");

    const tableHeaders = getAllByRole("columnheader");
    expect(tableHeaders).toHaveLength(3);
    expect(tableHeaders[0].textContent).toBeEmpty();
    expect(tableHeaders[1].textContent).toBe("2023");
    expect(tableHeaders[2].textContent).toBe("2024");

    const tableRows = getAllByRole("row");
    expect(tableRows).toHaveLength(12); // including header

    const firstRowColumns = within(tableRows[1]).getAllByRole("cell");
    expect(firstRowColumns).toHaveLength(1);
    expect(firstRowColumns[0].textContent).toBe("Assets");
    expect(firstRowColumns[0].getAttribute("colspan")).toEqual("3");

    const secondRowColumns = within(tableRows[2]).getAllByRole("cell");
    expect(secondRowColumns).toHaveLength(1);
    expect(secondRowColumns[0].textContent).toBe("Bank");
    expect(secondRowColumns[0].getAttribute("colspan")).toEqual("3");

    const thirdRowColumns = within(tableRows[3]).getAllByRole("cell");
    expect(thirdRowColumns).toHaveLength(3);
    expect(thirdRowColumns[0].textContent).toBe("My Bank Account");
    expect(thirdRowColumns[1].textContent).toBe(formatMoney(126.7));
    expect(thirdRowColumns[2].textContent).toBe(formatMoney(99.6));

    const fourthRowColumns = within(tableRows[4]).getAllByRole("cell");
    expect(fourthRowColumns).toHaveLength(3);
    expect(fourthRowColumns[0].textContent).toBe("Sample Business");
    expect(fourthRowColumns[1].textContent).toBe(formatMoney(92911));
    expect(fourthRowColumns[2].textContent).toBe(formatMoney(92911));

    const fifthRowColumns = within(tableRows[5]).getAllByRole("cell");
    expect(fifthRowColumns).toHaveLength(3);
    expect(fifthRowColumns[0].textContent).toBe("Sample Business 1");
    expect(fifthRowColumns[1].textContent).toBe(formatMoney(11039));
    expect(fifthRowColumns[2].textContent).toBe(formatMoney(11039));

    const lastRowColumns = within(tableRows[11]).getAllByRole("cell");
    expect(lastRowColumns).toHaveLength(3);
    expect(lastRowColumns[0].textContent).toBe("Total Current Liabilities");
    expect(lastRowColumns[1].textContent).toBe(formatMoney(8000));
    expect(lastRowColumns[2].textContent).toBe(formatMoney(8000));
  });

  it("matches snapshot", async () => {
    const HomeComponent = await Home();
    const { asFragment } = render(HomeComponent);

    expect(format(asFragment())).toMatchSnapshot();
  });
});
