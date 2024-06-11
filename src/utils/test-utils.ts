import {
  format as prettyFormat,
  plugins as prettyFormatPlugins,
} from "pretty-format";
import { http, HttpResponse } from "msw";
import { BalanceSheetReport } from "@/modules/xero/xeroReport.dto";

export function format(value: any) {
  return prettyFormat(value, {
    escapeRegex: true,
    indent: 2,
    plugins: [
      prettyFormatPlugins.ReactTestComponent,
      prettyFormatPlugins.ReactElement,
      prettyFormatPlugins.DOMElement,
      prettyFormatPlugins.DOMCollection,
      prettyFormatPlugins.Immutable,
      prettyFormatPlugins.AsymmetricMatcher,
    ],
    printFunctionName: false,
  });
}

export const BalanceSheetMock = {
  ReportID: "report-id",
  ReportName: "Balance Sheet",
  ReportDate: "2022-01-01",
  ReportTitles: ["Balance Sheet", "Test Company"],
  Rows: [
    {
      RowType: "Header",
      Cells: [{ Value: "" }, { Value: "2023" }, { Value: "2024" }],
    },
    {
      RowType: "Section",
      Title: "Assets",
      Rows: [],
    },
    {
      RowType: "Section",
      Title: "Bank",
      Rows: [
        {
          RowType: "Row",
          Cells: [
            { Value: "My Bank Account" },
            { Value: "126.70" },
            { Value: "99.60" },
          ],
        },
        {
          RowType: "Row",
          Cells: [
            { Value: "Sample Business" },
            { Value: "92911.00" },
            { Value: "92911.00" },
          ],
        },
        {
          RowType: "Row",
          Cells: [
            { Value: "Sample Business 1" },
            { Value: "11039.00" },
            { Value: "11039.00" },
          ],
        },
        {
          RowType: "SummaryRow",
          Cells: [
            { Value: "Total Bank" },
            { Value: "104076.70" },
            { Value: "104049.60" },
          ],
        },
      ],
    },
    {
      RowType: "Section",
      Title: "Liabilities",
      Rows: [],
    },
    {
      RowType: "Section",
      Title: "Current Liabilities",
      Rows: [
        {
          RowType: "Row",
          Cells: [
            { Value: "Car Loan" },
            { Value: "8000.00" },
            { Value: "8000.00" },
          ],
        },
      ],
    },
    {
      RowType: "Section",
      Title: "",
      Rows: [
        {
          RowType: "SummaryRow",
          Cells: [
            { Value: "Total Current Liabilities" },
            { Value: "8000.00" },
            { Value: "8000.00" },
          ],
        },
      ],
    },
  ],
} as BalanceSheetReport;

export function getHandlers() {
  return [
    http.get(`${process.env.BASE_URL}/api/xero/balance-sheet`, () => {
      return HttpResponse.json(BalanceSheetMock);
    }),
  ];
}
