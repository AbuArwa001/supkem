import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { interpolateVariables } from "@/app/[locale]/(dashboard)/admin/certificates/_components/LetterCanvas";
import type { Certificate } from "@/services/certificate-service";
import { CertificateMetaGrid } from "./CertificateMetaGrid";
import { CertificateFooter } from "./CertificateFooter";
import { getCertificateRecipient } from "../_utils/certificateUtils";

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

  const recipientName = getCertificateRecipient(certificate, isArabic);
  const customText = isArabic ? certificate.custom_text_ar : certificate.custom_text_en;

  return (
    <>
      <Image src="/logo.svg" alt="SUPKEM Logo" width={80} height={80} className="mb-8 opacity-90 drop-shadow-sm" />

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
          <strong className="border-b pb-0.5 mx-1" style={{ color: "#16543d", borderColor: "rgba(22, 84, 61, 0.2)" }}>
            {recipientName}
          </strong>{" "}
          {isArabic ? "قد استوفى بنجاح المعايير والمتطلبات الخاصة بهذا الاعتماد." : "has successfully met the standards and requirements for this certification."}
        </p>
      )}

      <CertificateMetaGrid
        serialNumber={certificate.serial_number}
        issueDate={issueDate}
        expiryDate={expiryDate}
        isValid={isValid}
      />

      <CertificateFooter
        digitalSignature={certificate.digital_signature}
        signatoryTitle={certificate.signatory_title}
        qrCodeHash={certificate.qr_code_hash}
        serialNumber={certificate.serial_number}
      />
    </>
  );
}
