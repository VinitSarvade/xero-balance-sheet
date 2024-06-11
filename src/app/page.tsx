import { BalanceSheetReport } from "@/modules/xero/xero.module";
import ReportTable from "@/components/ReportTable/ReportTable";
import ReportTitles from "@/components/ReportTitles";

function getBalanceSheet(): Promise<BalanceSheetReport> {
  return fetch(`${process.env.BASE_URL}/api/xero/balance-sheet`, {
    credentials: "same-origin", // assuming the FE is passing back saved cookies
    cache: "force-cache",
  }).then((res) => res.json());
}

export default async function Home() {
  const { ReportTitles: reportTitles, Rows: rows } = await getBalanceSheet();

  return (
    <main className="m-4 mx-auto min-h-[calc(100vh-2rem)] max-w-4xl rounded-lg bg-white p-8 shadow-lg outline outline-1 outline-gray-200">
      <ReportTitles titles={reportTitles} />

      <div className="mt-8">
        <ReportTable data={rows} />
      </div>
    </main>
  );
}
