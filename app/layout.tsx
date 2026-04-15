import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BİGG 2026-1 Başvuru Formu",
  description: "TÜBİTAK 1812 BİGG 2026-1 Çağrısı başvuru formunu doldur, PDF olarak indir.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
