/// <reference lib="dom" />
import { expect, describe, it, afterEach } from "bun:test";
import { render, cleanup } from "@testing-library/react";
import { format } from "@/utils/test-utils";
import ReportTitles from "../ReportTitles";

describe("ReportTitles", () => {
  it("renders titles with correct heading levels", () => {
    const titles = ["Title 1", "Title 2", "Title 3"];
    const { getAllByRole } = render(<ReportTitles titles={titles} />);

    const headings = getAllByRole("heading");
    expect(headings).toHaveLength(3);
    expect(headings[0].textContent).toBe(titles[0]);
    expect(headings[0].tagName).toBe("H1");
    expect(headings[1].textContent).toBe(titles[1]);
    expect(headings[1].tagName).toBe("H2");
    expect(headings[2].textContent).toBe(titles[2]);
    expect(headings[2].tagName).toBe("H2");
  });

  it("renders no titles when empty array is passed", () => {
    const { queryAllByRole } = render(<ReportTitles titles={[]} />);
    const headings = queryAllByRole("heading");
    expect(headings).toHaveLength(0);
  });

  it("matches snapshot", () => {
    const titles = ["Title 1", "Title 2", "Title 3"];
    const { asFragment } = render(<ReportTitles titles={titles} />);
    expect(format(asFragment())).toMatchSnapshot();
  });
});
