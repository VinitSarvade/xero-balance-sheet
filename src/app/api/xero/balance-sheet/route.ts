import { getReport } from "@/modules/xero/xero.module";

export async function GET() {
  const balanceSheet = await getReport();

  return Response.json(balanceSheet);
}
