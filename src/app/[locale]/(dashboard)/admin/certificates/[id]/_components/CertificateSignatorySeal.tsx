import React from "react";
import { CertificateQRCode } from "@/components/CertificateQRCode";

interface CertificateSignatorySealProps {
  isArabic: boolean;
  resolvedSignature?: string;
  resolvedSignatory: string;
  qrCodeHash?: string;
  serialNumber?: string;
}

export function CertificateSignatorySeal({
  isArabic,
  resolvedSignature,
  resolvedSignatory,
  qrCodeHash,
  serialNumber,
}: CertificateSignatorySealProps) {
  return (
    <div
      className={`flex items-center justify-between w-full border-t pt-8 mt-auto ${isArabic ? "flex-row-reverse" : ""}`}
      style={{ borderColor: "rgba(226, 232, 240, 0.6)" }}
    >
      <div className={isArabic ? "text-right" : "text-left"}>
        <div
          className={`w-48 h-20 border-b flex items-end justify-center relative overflow-hidden ${isArabic ? "ml-auto" : ""}`}
          style={{ borderColor: "#1e293b" }}
        >
          {resolvedSignature ? (
            <img src={resolvedSignature} alt="Signature" crossOrigin="anonymous" className="h-full object-contain pb-1 mix-blend-multiply" />
          ) : (
            <span
              className={`font-serif text-2xl italic px-2 -mb-2 ${isArabic ? "font-arabic" : ""}`}
              style={{ color: "#475569" }}
            >
              {resolvedSignatory}
            </span>
          )}
        </div>
        <p
          className={`text-[10px] font-bold uppercase tracking-widest mt-4 ${isArabic ? "font-arabic" : ""}`}
          style={{ color: "#94a3b8" }}
        >
          {resolvedSignatory}
        </p>
      </div>

      <div
        className="w-24 h-24 bg-white border rounded-xl p-1.5 shadow-xs flex flex-col items-center justify-center shrink-0 overflow-hidden"
        style={{ borderColor: "rgba(226, 232, 240, 0.8)" }}
      >
        <CertificateQRCode
          hash={qrCodeHash}
          serialNumber={serialNumber}
          size={70}
          showLabel
          fgColor="#16543d"
        />
      </div>
    </div>
  );
}
