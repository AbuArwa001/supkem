import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CertificateCanvasDecor } from "./CertificateCanvasDecor";
import { CertificateInfoCards } from "./CertificateInfoCards";
import { CertificateSignatorySeal } from "./CertificateSignatorySeal";
import { CertificateBodyText } from "./CertificateBodyText";

interface CertificateCanvasProps {
  certificate: any;
  certificateRef: React.RefObject<HTMLDivElement | null>;
  issueDate: Date | null;
  expiryDate: Date | null;
  isValid: boolean;
  language?: "en" | "ar";
  customText?: string;
  signatureBase64?: string;
  signatoryTitle?: string;
  isMarkdown?: boolean;
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
  signatoryTitle,
  isMarkdown = false,
}: CertificateCanvasProps) {
  const isArabic = language === "ar";
  const resolvedSignature = signatureBase64 || certificate.digital_signature;
  const resolvedSignatory = signatoryTitle || certificate.signatory_title || (isArabic ? "الرئيس الوطني" : "National Chairman");

  return (
    <motion.div
      ref={certificateRef}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="relative bg-white border border-border/80 shadow-2xl rounded-[20px] overflow-hidden p-8 md:p-16 lg:p-24 flex flex-col items-center text-center max-w-4xl mx-auto print:shadow-none print:border-none print:rounded-none print:m-0 print:p-8 certificate-canvas"
    >
      <CertificateCanvasDecor />

      <div className="relative z-10 w-full flex flex-col items-center">
        <Image src="/logo.png" alt="SUPKEM Logo" width={80} height={80} className="mb-8 opacity-90 drop-shadow-sm" />

        <div
          className={`tracking-widest uppercase text-xs font-black mb-12 flex items-center gap-4 w-full ${isArabic ? "font-arabic flex-row-reverse" : ""}`}
          style={{ color: "#16543d" }}
        >
          <div className="h-px flex-1" style={{ backgroundColor: "rgba(22, 84, 61, 0.1)" }} />
          <span>{isArabic ? "المجلس الأعلى لمسلمي كينيا" : "Supreme Council of Kenya Muslims"}</span>
          <div className="h-px flex-1" style={{ backgroundColor: "rgba(22, 84, 61, 0.1)" }} />
        </div>

        <h2
          className={`text-4xl md:text-5xl lg:text-6xl font-black font-outfit tracking-tight leading-tight mb-8 ${isArabic ? "font-arabic" : ""}`}
          style={{ color: "#1e293b" }}
        >
          {certificate.service_name || (isArabic ? "شهادة رسمية" : "Official Certification")}
        </h2>

        <CertificateBodyText
          customText={customText}
          isMarkdown={isMarkdown}
          isArabic={isArabic}
          certificate={certificate}
          issueDate={issueDate}
        />

        <CertificateInfoCards
          serialNumber={certificate.serial_number}
          issueDate={issueDate}
          expiryDate={expiryDate}
          isValid={isValid}
          isArabic={isArabic}
        />

        <CertificateSignatorySeal
          isArabic={isArabic}
          resolvedSignature={resolvedSignature}
          resolvedSignatory={resolvedSignatory}
          qrCodeHash={certificate.qr_code_hash}
          serialNumber={certificate.serial_number}
        />
      </div>
    </motion.div>
  );
}
