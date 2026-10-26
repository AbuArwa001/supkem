import React from "react";
import { CertificateQRCode } from "@/components/CertificateQRCode";

interface LetterCanvasFooterProps {
  isArabic: boolean;
  signatureBase64?: string;
  digitalSignature?: string;
  resolvedSignatory: string;
  qrCodeHash?: string;
  serialNumber?: string;
}

export function LetterCanvasFooter({
  isArabic,
  signatureBase64,
  digitalSignature,
  resolvedSignatory,
  qrCodeHash,
  serialNumber,
}: LetterCanvasFooterProps) {
  const sig = signatureBase64 || digitalSignature;

  return (
    <div
      className={`mt-auto pt-8 border-t flex items-end justify-between ${isArabic ? "flex-row-reverse" : ""}`}
      style={{ borderColor: "#e2e8f0" }}
    >
      <div className={`flex flex-col ${isArabic ? "items-end text-right" : "items-start text-left"}`}>
        <div className="w-44 h-20 mb-3 flex items-end justify-start relative">
          {sig ? (
            <img src={sig} alt="Signature" crossOrigin="anonymous" className="max-h-full max-w-full object-contain mix-blend-multiply" />
          ) : (
            <span className={`font-serif italic text-xl ${isArabic ? "font-arabic" : ""}`} style={{ color: "#94a3b8" }}>
              {isArabic ? "[ توقيع غير متوفر ]" : "[ No Signature ]"}
            </span>
          )}
        </div>
        <p className={`font-bold text-base ${isArabic ? "font-arabic" : ""}`} style={{ color: "#1e293b" }}>
          {resolvedSignatory}
        </p>
        <p className={`text-xs font-medium mt-0.5 ${isArabic ? "font-arabic" : ""}`} style={{ color: "#64748b" }}>
          {isArabic ? "المجلس الأعلى لمسلمي كينيا" : "Supreme Council of Kenya Muslims"}
        </p>
      </div>

      <div className="flex flex-col items-center">
        <CertificateQRCode
          hash={qrCodeHash}
          serialNumber={serialNumber}
          size={68}
          showLabel
          fgColor="#16543d"
        />
      </div>
    </div>
  );
}
