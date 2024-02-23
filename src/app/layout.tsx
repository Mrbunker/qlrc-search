import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "qlrc-search",
  description: "search lyric",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-hans">
      <body className={inter.className}>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
