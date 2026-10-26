import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CertificateDecor } from "./CertificateDecor";
import { CertificateInfoCards } from "./CertificateInfoCards";
import { CertificateSignatureSeal } from "./CertificateSignatureSeal";

interface CertificateCanvasProps {
  certificate: any;
  certificateRef: React.RefObject<HTMLDivElement | null>;
  issueDate: Date | null;
  expiryDate: Date | null;
  isValid: boolean;
  language?: "en" | "ar";
  customText?: string;
  signatureBase64?: string;
}

export function CertificateCanvas({
  certificate,
  certificateRef,
  issueDate,
  expiryDate,
  isValid,
  language = "en",
  customText,
  signatureBase64,
}: CertificateCanvasProps) {
  const isArabic = language === "ar";

  return (
    <motion.div
      ref={certificateRef}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="relative bg-white border border-border/80 shadow-2xl rounded-[20px] overflow-hidden p-8 md:p-16 lg:p-24 flex flex-col items-center text-center max-w-4xl mx-auto print:shadow-none print:border-none print:rounded-none print:m-0 print:p-8 certificate-canvas"
    >
      <style jsx global>{`
        @media print {
          @page { size: A4 landscape; margin: 0; }
          header, nav, aside, button, .no-print, .print\\:hidden { display: none !important; visibility: hidden !important; }
          html, body { background: #fff !important; color: #000 !important; margin: 0 !important; padding: 0 !important; width: 297mm !important; height: 210mm !important; overflow: hidden !important; }
          body * { visibility: hidden; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .certificate-canvas, .certificate-canvas * { visibility: visible !important; }
          .certificate-canvas { position: fixed !important; left: 0 !important; top: 0 !important; width: 297mm !important; height: 210mm !important; box-sizing: border-box !important; margin: 0 !important; padding: 10mm 14mm !important; border: none !important; box-shadow: none !important; background-color: #fff !important; overflow: hidden !important; }
        }
      `}</style>

      <CertificateDecor />

      <div className="relative z-10 w-full flex flex-col items-center">
        <Image src="/logo.svg" alt="SUPKEM Logo" width={80} height={80} className="mb-8 opacity-90 drop-shadow-sm" />

        <div className={`tracking-widest uppercase text-xs font-black mb-12 flex items-center gap-4 w-full ${isArabic ? "font-arabic flex-row-reverse" : ""}`} style={{ color: "#16543d" }}>
          <div className="h-px flex-1" style={{ backgroundColor: "rgba(22, 84, 61, 0.1)" }} />
          <span>{isArabic ? "المجلس الأعلى لمسلمي كينيا" : "Supreme Council of Kenya Muslims"}</span>
          <div className="h-px flex-1" style={{ backgroundColor: "rgba(22, 84, 61, 0.1)" }} />
        </div>

        <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black font-outfit tracking-tight leading-tight mb-8 ${isArabic ? "font-arabic" : ""}`} style={{ color: "#1e293b" }}>
          {certificate.service_name || (isArabic ? "شهادة رسمية" : "Official Certification")}
        </h2>

        {customText ? (
          <p className={`text-lg md:text-xl font-medium max-w-2xl mb-12 whitespace-pre-wrap ${isArabic ? "font-arabic text-right" : ""}`} style={{ color: "#1e293b" }} dir={isArabic ? "rtl" : "ltr"}>
            {customText}
          </p>
        ) : (
          <p className={`text-lg md:text-xl font-medium max-w-2xl mb-12 ${isArabic ? "font-arabic text-right" : ""}`} style={{ color: "#64748b" }} dir={isArabic ? "rtl" : "ltr"}>
            {isArabic ? "تؤكد هذه الوثيقة أن " : "This record confirms that "}
            <strong className="border-b pb-0.5 mx-1" style={{ color: "#16543d", borderColor: "rgba(226, 232, 240, 0.2)" }}>
              {certificate.holder_name || certificate.organization_name || certificate.user_name || (isArabic ? "الجهة المعنية" : "The designated entity")}
            </strong>
            {isArabic ? " معتمدة رسمياً من قبل المجلس الأعلى." : " has been officially accredited by SUPKEM."}
          </p>
        )}

        <CertificateInfoCards serialNumber={certificate.serial_number} issueDate={issueDate} expiryDate={expiryDate} isValid={isValid} isArabic={isArabic} />
        <CertificateSignatureSeal isArabic={isArabic} signatureBase64={signatureBase64} />
      </div>
    </motion.div>
  );
}
