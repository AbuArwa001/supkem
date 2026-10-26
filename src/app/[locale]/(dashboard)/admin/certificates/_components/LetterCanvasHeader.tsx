import React from "react";
import Image from "next/image";

interface LetterCanvasHeaderProps {
  isArabic: boolean;
  resolvedSignatory: string;
  issueDate: Date | null;
  serialNumber?: string;
}

export function LetterCanvasHeader({
  isArabic,
  resolvedSignatory,
  issueDate,
  serialNumber,
}: LetterCanvasHeaderProps) {
  const isChairman =
    resolvedSignatory.toLowerCase().includes("chairman") || resolvedSignatory.includes("رئيس");

  return (
    <div
      className={`flex items-start justify-between border-b pb-6 mb-6 ${isArabic ? "flex-row-reverse" : ""}`}
      style={{ borderColor: "#cbd5e1" }}
    >
      <div className={`flex flex-col ${isArabic ? "items-end" : "items-start"}`}>
        <Image src="/logo.svg" alt="SUPKEM Logo" width={64} height={64} className="mb-3" />
        <h1 className={`text-xl font-black font-outfit ${isArabic ? "font-arabic" : ""}`} style={{ color: "#16543d" }}>
          {isArabic ? "المجلس الأعلى لمسلمي كينيا" : "Supreme Council of Kenya Muslims"}
        </h1>
        <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: "#94a3b8" }}>
          {isChairman
            ? isArabic
              ? "مكتب الرئيس الوطني"
              : "Office of the National Chairman"
            : isArabic
            ? "الأمانة العامة"
            : "General Secretariat"}
        </p>
      </div>

      <div className={`text-sm font-medium space-y-1.5 ${isArabic ? "text-left font-arabic" : "text-right"}`} style={{ color: "#64748b" }}>
        <p>
          {isArabic ? "التاريخ:" : "Date:"}{" "}
          <span className="font-bold text-slate-800">{issueDate?.toLocaleDateString() || "N/A"}</span>
        </p>
        <p>
          {isArabic ? "الرقم المرجعي:" : "Ref:"}{" "}
          <span className="font-mono text-slate-800">{serialNumber || "PENDING"}</span>
        </p>
      </div>
    </div>
  );
}
