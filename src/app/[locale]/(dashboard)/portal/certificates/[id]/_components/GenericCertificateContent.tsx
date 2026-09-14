import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { InfoBox } from "@/app/[locale]/(dashboard)/portal/certificates/[id]/_components/InfoBox";
import { CertificateQRCode } from "@/components/CertificateQRCode";
import { interpolateVariables } from "@/app/[locale]/(dashboard)/admin/certificates/_components/LetterCanvas";
import type { Certificate } from "@/services/certificate-service";

interface GenericCertificateContentProps {
  certificate: Certificate;
  issueDate: Date | null;
  expiryDate: Date | null;
  isValid: boolean;
}

export function GenericCertificateContent({
  certificate,
  issueDate,
  expiryDate,
  isValid,
}: GenericCertificateContentProps) {
  const isArabic = certificate.language === "ar";
  const serviceName =
    certificate.service_name ||
    certificate.application_detail?.service_name ||
    (isArabic ? "شهادة رسمية" : "Official Certification");

  // Determine recipient name (individual user vs organization)
  const recipientName =
    certificate.holder_name ||
    certificate.application_detail?.holder_name ||
    certificate.organization_name ||
    certificate.application_detail?.organization_name ||
    certificate.user_name ||
    certificate.application_detail?.user_name ||
    certificate.recipient ||
    (isArabic ? "الجهة المعنية" : "The designated entity");

  const customText = isArabic
    ? certificate.custom_text_ar
    : certificate.custom_text_en;

  return (
    <>
      <Image
        src="/logo.svg"
        alt="SUPKEM Logo"
        width={80}
        height={80}
        className="mb-8 opacity-90 drop-shadow-sm"
      />

      <div
        className={`tracking-widest uppercase text-xs font-black mb-12 flex items-center gap-4 w-full ${isArabic ? "flex-row-reverse" : ""}`}
        style={{ color: "#16543d" }}
        dir={isArabic ? "rtl" : "ltr"}
      >
        <div className="h-px flex-1" style={{ backgroundColor: "rgba(22, 84, 61, 0.1)" }} />
        <span>{isArabic ? "المجلس الأعلى لمسلمي كينيا" : "Supreme Council of Kenya Muslims"}</span>
        <div className="h-px flex-1" style={{ backgroundColor: "rgba(22, 84, 61, 0.1)" }} />
      </div>

      <h2
        className={`text-4xl md:text-5xl lg:text-6xl font-black font-outfit tracking-tight leading-tight mb-8 ${isArabic ? "font-arabic" : ""}`}
        style={{ color: "#1e293b" }}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {serviceName}
      </h2>

      {customText ? (
        <div
          className={`text-lg md:text-xl font-medium max-w-2xl mb-12 prose prose-slate ${isArabic ? "font-arabic text-right" : "text-center"}`}
          style={{ color: "#1e293b" }}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {interpolateVariables(customText, {
              userName: recipientName,
              organizationName: certificate.organization_name || certificate.application_detail?.organization_name || recipientName,
              serviceName: serviceName,
              serialNumber: certificate.serial_number,
              date: issueDate?.toLocaleDateString() || new Date().toLocaleDateString(),
            })}
          </ReactMarkdown>
        </div>
      ) : (
        <p
          className={`text-lg md:text-xl font-medium max-w-2xl mb-12 ${isArabic ? "font-arabic text-right" : ""}`}
          style={{ color: "#64748b" }}
          dir={isArabic ? "rtl" : "ltr"}
        >
          {isArabic ? "تؤكد هذه الشهادة أن " : "This is to certify that "}
          <strong
            className="border-b pb-0.5 mx-1"
            style={{ color: "#16543d", borderColor: "rgba(22, 84, 61, 0.2)" }}
          >
            {recipientName}
          </strong>{" "}
          {isArabic
            ? "قد استوفى بنجاح المعايير والمتطلبات الخاصة بهذا الاعتماد."
            : "has successfully met the standards and requirements for this certification."}
        </p>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-16">
        <InfoBox label="Serial Number" value={certificate.serial_number} mono />
        <InfoBox label="Date of Issue" value={issueDate?.toLocaleDateString() || ""} />
        <InfoBox
          label="Valid Until"
          value={expiryDate ? expiryDate.toLocaleDateString() : "Indefinite"}
        />
        <div
          className="p-4 rounded-2xl border flex flex-col items-center justify-center"
          style={{ backgroundColor: isValid ? "#f0fdf4" : "#fef2f2", borderColor: "transparent" }}
        >
          <p className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: "#94a3b8" }}>
            Status
          </p>
          <p
            className="font-black tracking-widest uppercase text-sm"
            style={{ color: isValid ? "#059669" : "#dc2626" }}
          >
            {isValid ? "Valid" : "Expired"}
          </p>
        </div>
      </div>

      <div
        className="flex items-center justify-between w-full border-t pt-8 mt-auto"
        style={{ borderColor: "rgba(226, 232, 240, 0.6)" }}
      >
        <div className="text-left">
          <div className="w-48 h-20 border-b flex items-end justify-center relative overflow-hidden" style={{ borderColor: "#1e293b" }}>
            {certificate.digital_signature ? (
              <img
                src={certificate.digital_signature}
                alt="Signature"
                className="h-full object-contain pb-1 mix-blend-multiply"
              />
            ) : (
              <span className="font-serif text-2xl italic px-2 -mb-2" style={{ color: "#475569" }}>
                {certificate.signatory_title || "Official Signatory"}
              </span>
            )}
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest mt-4" style={{ color: "#94a3b8" }}>
            {certificate.signatory_title || "Authorized Signature"}
          </p>
        </div>

        <div
          className="w-24 h-24 bg-white border rounded-xl p-1.5 shadow-xs flex flex-col items-center justify-center shrink-0 overflow-hidden"
          style={{ borderColor: "rgba(226, 232, 240, 0.8)" }}
        >
          <CertificateQRCode
            hash={certificate.qr_code_hash}
            serialNumber={certificate.serial_number}
            size={70}
            showLabel
            fgColor="#16543d"
          />
        </div>
      </div>
    </>
  );
}
