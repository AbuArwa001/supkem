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
      className="relative bg-white shadow-2xl overflow-hidden p-12 md:p-16 flex flex-col text-left w-[210mm] min-h-[297mm] mx-auto border border-border/80 rounded-none print:shadow-none print:border-none print:m-0 print:p-12 letter-canvas shrink-0"
    >
      <style jsx global>{`
        @media print {
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
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 40px !important;
            border: none !important;
            box-shadow: none !important;
            background-color: white !important;
            min-height: 100vh !important;
          }
          html, body {
            height: auto !important;
            overflow: visible !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Header */}
      <div className={`flex items-start justify-between border-b pb-8 mb-8 ${isArabic ? "flex-row-reverse" : ""}`} style={{ borderColor: "#cbd5e1" }}>
        <div className={`flex flex-col ${isArabic ? "items-end" : "items-start"}`}>
          <Image
            src="/logo.svg"
            alt="SUPKEM Logo"
            width={70}
            height={70}
            className="mb-4"
          />
          <h1 className={`text-xl font-black font-outfit ${isArabic ? "font-arabic" : ""}`} style={{ color: "#16543d" }}>
            {isArabic ? "المجلس الأعلى لمسلمي كينيا" : "Supreme Council of Kenya Muslims"}
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: "#94a3b8" }}>
            {isArabic ? "الأمانة العامة" : "General Secretariat"}
          </p>
        </div>
        
        <div className={`text-sm font-medium space-y-2 ${isArabic ? "text-left font-arabic" : "text-right"}`} style={{ color: "#64748b" }}>
          <p>{isArabic ? "التاريخ:" : "Date:"} <span className="font-bold text-slate-800">{issueDate?.toLocaleDateString() || "N/A"}</span></p>
          <p>{isArabic ? "الرقم المرجعي:" : "Ref:"} <span className="font-mono text-slate-800">{letter.serial_number || "PENDING"}</span></p>
        </div>
      </div>

      {/* Recipient */}
      <div className={`mb-12 ${isArabic ? "text-right font-arabic" : "text-left"}`}>
        <p className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "#94a3b8" }}>
          {isArabic ? "إلى:" : "TO:"}
        </p>
        <h3 className="text-xl font-bold" style={{ color: "#1e293b" }}>
          {letter.organization_name || (isArabic ? "الجهة المعنية" : "To Whom It May Concern")}
        </h3>
      </div>

      {/* Body */}
      <div 
        className={`flex-1 text-base leading-loose whitespace-pre-wrap ${isArabic ? "text-right font-arabic" : "text-left"}`} 
        style={{ color: "#334155" }}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <h2 className={`text-xl font-bold uppercase mb-6 pb-2 inline-block border-b-2 ${isArabic ? "font-arabic" : ""}`} style={{ borderColor: "#16543d", color: "#16543d" }}>
          {letter.service_name || (isArabic ? "خطاب رسمي" : "Official Letter")}
        </h2>
        
        <p className="text-lg">
          {customText || (isArabic ? 
            "هذا الخطاب يؤكد أن الجهة المذكورة أعلاه معترف بها رسمياً ومسجلة لدى المجلس الأعلى لمسلمي كينيا. الرجاء تقديم المساعدة اللازمة." 
            : "This letter serves to confirm that the aforementioned entity is officially recognized and registered by the Supreme Council of Kenya Muslims. Please accord them the necessary assistance.")}
        </p>
      </div>

      {/* Signature */}
      <div className={`mt-20 pt-12 border-t flex flex-col ${isArabic ? "items-end text-right" : "items-start text-left"}`} style={{ borderColor: "#e2e8f0" }}>
        <div className="w-48 h-24 mb-4 flex items-end justify-start relative">
            {signatureBase64 ? (
              <img src={signatureBase64} alt="Signature" className="max-h-full max-w-full object-contain mix-blend-multiply" />
            ) : (
              <span className={`font-serif italic text-2xl ${isArabic ? "font-arabic" : ""}`} style={{ color: "#94a3b8" }}>
                {isArabic ? "[ توقيع غير متوفر ]" : "[ No Signature ]"}
              </span>
            )}
        </div>
        <p className={`font-bold text-lg ${isArabic ? "font-arabic" : ""}`} style={{ color: "#1e293b" }}>
          {isArabic ? "الأمين العام" : "Secretary General"}
        </p>
        <p className={`text-sm font-medium mt-1 ${isArabic ? "font-arabic" : ""}`} style={{ color: "#64748b" }}>
          {isArabic ? "المجلس الأعلى لمسلمي كينيا" : "Supreme Council of Kenya Muslims"}
        </p>
      </div>

    </motion.div>
  );
}
