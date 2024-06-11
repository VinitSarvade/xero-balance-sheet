import type { Metadata } from "next";
import { Spectral } from "next/font/google";
import "./globals.css";

const spectral = Spectral({
  weight: ["200", "400", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Show me the Money",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={spectral.className}>{children}</body>
    </html>
  );
}
