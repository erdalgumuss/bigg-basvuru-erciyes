import { pdf } from "@react-pdf/renderer";
import React from "react";
import { BasvuruPDF } from "./BasvuruPDF";
import type { BasvuruData } from "../schema";

export async function generateAndDownloadPdf(data: BasvuruData) {
  const element = React.createElement(BasvuruPDF, { data }) as any;
  const blob = await pdf(element).toBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const fileName = `BIGG-2026-1-Basvuru-${(data.adSoyad || "form").replace(/\s+/g, "_")}.pdf`;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
