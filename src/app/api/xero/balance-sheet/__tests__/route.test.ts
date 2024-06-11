import { describe, it, expect, spyOn } from "bun:test";
import { BalanceSheetMock } from "@/utils/test-utils";
import * as xeroModule from "@/modules/xero/xero.module";
import * as handler from "../route";

const getReportSpy = spyOn(xeroModule, "getReport").mockImplementation(
  async () => BalanceSheetMock,
);

describe("GET /api/xero/balance-sheet", () => {
  it("should return a balance sheet report", async () => {
    const response = await handler.GET();
    expect(getReportSpy).toHaveBeenCalledTimes(1);

    const json = await response.json();
    expect(json).toEqual(BalanceSheetMock);
  });
});
