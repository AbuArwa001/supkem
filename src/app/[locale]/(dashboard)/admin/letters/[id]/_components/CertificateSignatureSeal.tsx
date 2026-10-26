import React from "react";
import { ShieldCheck } from "lucide-react";

interface CertificateSignatureSealProps {
  isArabic: boolean;
  signatureBase64?: string;
}

export function CertificateSignatureSeal({ isArabic, signatureBase64 }: CertificateSignatureSealProps) {
  return (
    <div className={`flex items-center justify-between w-full border-t pt-8 mt-auto ${isArabic ? "flex-row-reverse" : ""}`} style={{ borderColor: "rgba(226, 232, 240, 0.6)" }}>
      <div className={isArabic ? "text-right" : "text-left"}>
        <div className={`w-48 h-20 border-b flex items-end justify-center relative overflow-hidden ${isArabic ? "ml-auto" : ""}`} style={{ borderColor: "#1e293b" }}>
          {signatureBase64 ? (
            <img src={signatureBase64} alt="Signature" className="h-full object-contain pb-1 mix-blend-multiply" />
          ) : (
            <span className={`font-serif text-2xl italic px-2 -mb-2 ${isArabic ? "font-arabic" : ""}`} style={{ color: "#475569" }}>
              {isArabic ? "مسؤول السجل" : "Registry Officer"}
            </span>
          )}
        </div>
        <p className={`text-[10px] font-bold uppercase tracking-widest mt-4 ${isArabic ? "font-arabic" : ""}`} style={{ color: "#94a3b8" }}>
          {isArabic ? "ختم المقر الرئيسي" : "SUPKEM HQ Seal"}
        </p>
      </div>

      <div className="w-24 h-24 bg-white border rounded-xl p-2 shadow-sm flex flex-col items-center justify-center shrink-0" style={{ borderColor: "rgba(226, 232, 240, 0.8)" }}>
        <div className="w-full h-full rounded flex items-center justify-center" style={{ backgroundColor: "#f8fafc" }}>
          <ShieldCheck size={32} style={{ color: "#cbd5e1" }} />
        </div>
      </div>
    </div>
  );
}
