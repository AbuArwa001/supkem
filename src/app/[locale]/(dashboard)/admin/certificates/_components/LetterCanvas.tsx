import React from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { interpolateVariables } from "./letterInterpolate";
import { LetterCanvasHeader } from "./LetterCanvasHeader";
import { LetterCanvasFooter } from "./LetterCanvasFooter";

export { interpolateVariables };

export interface LetterCanvasProps {
  letter: any;
  letterRef: React.RefObject<HTMLDivElement | null>;
  issueDate: Date | null;
  language?: "en" | "ar";
  customText?: string;
  signatureBase64?: string;
  recipient?: string;
  subject?: string;
  signatoryTitle?: string;
  isMarkdown?: boolean;
}

export function LetterCanvas({
  letter,
  letterRef,
  issueDate,
  language = "en",
  customText,
  signatureBase64,
  recipient,
  subject,
  signatoryTitle,
  isMarkdown = false,
}: LetterCanvasProps) {
  const isArabic = language === "ar";
  const resolvedRecipient = recipient || letter.recipient || (letter.organization_name || (isArabic ? "الجهة المعنية" : "To Whom It May Concern"));
  const resolvedSubject = subject || letter.subject || (letter.service_name || (isArabic ? "خطاب رسمي" : "Official Letter"));
  const resolvedSignatory = signatoryTitle || letter.signatory_title || (isArabic ? "الأمين العام" : "Secretary General");

  const context = {
    userName: letter.user_name || letter.application_detail?.user_name,
    organizationName: letter.organization_name || letter.application_detail?.organization_name,
    serviceName: letter.service_name || letter.application_detail?.service_name,
    serialNumber: letter.serial_number,
    date: issueDate?.toLocaleDateString() || new Date().toLocaleDateString(),
  };

  const defaultBody = isArabic
    ? "هذا الخطاب يؤكد أن الجهة المذكورة أعلاه معترف بها رسمياً ومسجلة لدى المجلس الأعلى لمسلمي كينيا. الرجاء تقديم المساعدة اللازمة."
    : "This letter serves to confirm that the aforementioned entity is officially recognized and registered by the Supreme Council of Kenya Muslims. Please accord them the necessary assistance.";

  const rawText = customText || letter.custom_text_en || letter.custom_text_ar || defaultBody;
  const processedBody = interpolateVariables(rawText, context);

  return (
    <motion.div
      ref={letterRef}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="relative bg-white shadow-2xl overflow-hidden p-10 md:p-14 flex flex-col text-left w-[210mm] min-h-[297mm] max-h-[297mm] mx-auto border border-border/80 rounded-none print:shadow-none print:border-none print:m-0 print:p-0 letter-canvas shrink-0"
    >
      <style jsx global>{`
        @media print {
          @page { size: A4 portrait; margin: 0; }
          html, body { background: #fff !important; color: #000 !important; margin: 0 !important; padding: 0 !important; width: 210mm !important; height: 297mm !important; overflow: hidden !important; }
          header, nav, aside, button, .no-print, .print\\:hidden { display: none !important; visibility: hidden !important; }
          body * { visibility: hidden; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .letter-canvas, .letter-canvas * { visibility: visible !important; }
          .letter-canvas { position: fixed !important; left: 0 !important; top: 0 !important; width: 210mm !important; height: 297mm !important; box-sizing: border-box !important; margin: 0 !important; padding: 16mm 18mm !important; border: none !important; box-shadow: none !important; background-color: #fff !important; overflow: hidden !important; }
        }
      `}</style>

      <LetterCanvasHeader isArabic={isArabic} resolvedSignatory={resolvedSignatory} issueDate={issueDate} serialNumber={letter.serial_number} />

      <div className={`mb-8 ${isArabic ? "text-right font-arabic" : "text-left"}`}>
        <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#94a3b8" }}>{isArabic ? "إلى:" : "TO:"}</p>
        <h3 className="text-lg font-bold" style={{ color: "#1e293b" }}>{resolvedRecipient}</h3>
      </div>

      <div className={`flex-1 text-base leading-relaxed ${isArabic ? "text-right font-arabic" : "text-left"}`} style={{ color: "#334155" }} dir={isArabic ? "rtl" : "ltr"}>
        <h2 className={`text-lg font-bold uppercase mb-4 pb-2 inline-block border-b-2 ${isArabic ? "font-arabic" : ""}`} style={{ borderColor: "#16543d", color: "#16543d" }}>
          {resolvedSubject}
        </h2>
        {isMarkdown ? (
          <div className="prose prose-slate max-w-none text-base leading-relaxed"><ReactMarkdown remarkPlugins={[remarkGfm]}>{processedBody}</ReactMarkdown></div>
        ) : (
          <p className="text-base leading-relaxed whitespace-pre-wrap">{processedBody}</p>
        )}
      </div>

      <LetterCanvasFooter isArabic={isArabic} signatureBase64={signatureBase64} digitalSignature={letter.digital_signature} resolvedSignatory={resolvedSignatory} qrCodeHash={letter.qr_code_hash} serialNumber={letter.serial_number} />
    </motion.div>
  );
}
