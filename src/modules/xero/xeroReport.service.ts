import { BalanceSheetReport } from "./xeroReport.dto";

const BALANCE_SHEET_API = `${process.env.XERO_API_BASE_URL}/api.xro/2.0/Reports/BalanceSheet`;

export async function getReport(): Promise<BalanceSheetReport> {
  const response = await fetch(BALANCE_SHEET_API, {
    headers: {
      // assuming authentication is done by API token
      Authorization: `Bearer ${process.env.XERO_API_TOKEN ?? ""}`,
    },
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const result = await response.json();

  return result.Reports[0];
}
