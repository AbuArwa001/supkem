import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export interface LetterCanvasProps {
  letter: any;
  letterRef: React.RefObject<HTMLDivElement | null>;
  issueDate: Date | null;
  language?: "en" | "ar";
  customText?: string;
  signatureBase64?: string;
}

export function LetterCanvas({
  letter,
  letterRef,
  issueDate,
  language = "en",
  customText,
  signatureBase64,
}: LetterCanvasProps) {
  const isArabic = language === "ar";

  return (
    <motion.div
      ref={letterRef}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="relative bg-white shadow-2xl overflow-hidden p-10 md:p-14 flex flex-col text-left w-[210mm] min-h-[297mm] max-h-[297mm] mx-auto border border-border/80 rounded-none print:shadow-none print:border-none print:m-0 print:p-0 letter-canvas shrink-0"
    >
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }

          html,
          body {
            background: #ffffff !important;
            color: #000000 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            overflow: hidden !important;
          }

          header,
          nav,
          aside,
          button,
          .no-print,
          .print\:hidden {
            display: none !important;
            visibility: hidden !important;
          }

          body * {
            visibility: hidden;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }

          .letter-canvas,
          .letter-canvas * {
            visibility: visible !important;
          }

          .letter-canvas {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            max-height: 297mm !important;
            box-sizing: border-box !important;
            margin: 0 !important;
            padding: 16mm 18mm !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background-color: #ffffff !important;
            overflow: hidden !important;
            transform: none !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className={`flex items-start justify-between border-b pb-6 mb-6 ${isArabic ? "flex-row-reverse" : ""}`} style={{ borderColor: "#cbd5e1" }}>
        <div className={`flex flex-col ${isArabic ? "items-end" : "items-start"}`}>
          <Image
            src="/logo.svg"
            alt="SUPKEM Logo"
            width={64}
            height={64}
            className="mb-3"
          />
          <h1 className={`text-xl font-black font-outfit ${isArabic ? "font-arabic" : ""}`} style={{ color: "#16543d" }}>
            {isArabic ? "المجلس الأعلى لمسلمي كينيا" : "Supreme Council of Kenya Muslims"}
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: "#94a3b8" }}>
            {isArabic ? "الأمانة العامة" : "General Secretariat"}
          </p>
        </div>
        
        <div className={`text-sm font-medium space-y-1.5 ${isArabic ? "text-left font-arabic" : "text-right"}`} style={{ color: "#64748b" }}>
          <p>{isArabic ? "التاريخ:" : "Date:"} <span className="font-bold text-slate-800">{issueDate?.toLocaleDateString() || "N/A"}</span></p>
          <p>{isArabic ? "الرقم المرجعي:" : "Ref:"} <span className="font-mono text-slate-800">{letter.serial_number || "PENDING"}</span></p>
        </div>
      </div>

      {/* Recipient */}
      <div className={`mb-8 ${isArabic ? "text-right font-arabic" : "text-left"}`}>
        <p className="text-xs font-bold uppercase tracking-wider mb-1 text-slate-400" style={{ color: "#94a3b8" }}>
          {isArabic ? "إلى:" : "TO:"}
        </p>
        <h3 className="text-lg font-bold" style={{ color: "#1e293b" }}>
          {letter.organization_name || (isArabic ? "الجهة المعنية" : "To Whom It May Concern")}
        </h3>
      </div>

      {/* Body */}
      <div 
        className={`flex-1 text-base leading-relaxed whitespace-pre-wrap ${isArabic ? "text-right font-arabic" : "text-left"}`} 
        style={{ color: "#334155" }}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <h2 className={`text-lg font-bold uppercase mb-4 pb-2 inline-block border-b-2 ${isArabic ? "font-arabic" : ""}`} style={{ borderColor: "#16543d", color: "#16543d" }}>
          {letter.service_name || (isArabic ? "خطاب رسمي" : "Official Letter")}
        </h2>
        
        <p className="text-base leading-relaxed">
          {customText || (isArabic ? 
            "هذا الخطاب يؤكد أن الجهة المذكورة أعلاه معترف بها رسمياً ومسجلة لدى المجلس الأعلى لمسلمي كينيا. الرجاء تقديم المساعدة اللازمة." 
            : "This letter serves to confirm that the aforementioned entity is officially recognized and registered by the Supreme Council of Kenya Muslims. Please accord them the necessary assistance.")}
        </p>
      </div>

      {/* Signature */}
      <div className={`mt-auto pt-8 border-t flex flex-col ${isArabic ? "items-end text-right" : "items-start text-left"}`} style={{ borderColor: "#e2e8f0" }}>
        <div className="w-44 h-20 mb-3 flex items-end justify-start relative">
            {signatureBase64 ? (
              <img src={signatureBase64} alt="Signature" className="max-h-full max-w-full object-contain mix-blend-multiply" />
            ) : (
              <span className={`font-serif italic text-xl ${isArabic ? "font-arabic" : ""}`} style={{ color: "#94a3b8" }}>
                {isArabic ? "[ توقيع غير متوفر ]" : "[ No Signature ]"}
              </span>
            )}
        </div>
        <p className={`font-bold text-base ${isArabic ? "font-arabic" : ""}`} style={{ color: "#1e293b" }}>
          {isArabic ? "الأمين العام" : "Secretary General"}
        </p>
        <p className={`text-xs font-medium mt-0.5 ${isArabic ? "font-arabic" : ""}`} style={{ color: "#64748b" }}>
          {isArabic ? "المجلس الأعلى لمسلمي كينيا" : "Supreme Council of Kenya Muslims"}
        </p>
      </div>

    </motion.div>
  );
}
