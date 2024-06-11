import { twc } from "@/utils/twc";

interface ReportTitlesProps {
  titles: string[];
}

const H1 = twc.h1`text-4xl`;
const H2 = twc.h2`mt-2 text-2xl tracking-tight text-zinc-700`;

export default function ReportTitles({ titles }: ReportTitlesProps) {
  return titles.map((title, idx) => {
    const Title = idx === 0 ? H1 : H2;
    return (
      <Title key={title} className="text-center font-semibold">
        {title}
      </Title>
    );
  });
}
