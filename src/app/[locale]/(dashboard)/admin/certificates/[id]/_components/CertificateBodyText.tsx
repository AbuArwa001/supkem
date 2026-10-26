import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { interpolateVariables } from "@/app/[locale]/(dashboard)/admin/certificates/_components/LetterCanvas";

interface CertificateBodyTextProps {
  customText?: string;
  isMarkdown?: boolean;
  isArabic: boolean;
  certificate: any;
  issueDate: Date | null;
}

export function CertificateBodyText({
  customText,
  isMarkdown = false,
  isArabic,
  certificate,
  issueDate,
}: CertificateBodyTextProps) {
  if (customText) {
    const interpolated = interpolateVariables(customText, {
      userName: certificate.user_name || certificate.application_detail?.user_name,
      organizationName: certificate.organization_name || certificate.application_detail?.organization_name,
      serviceName: certificate.service_name || certificate.application_detail?.service_name,
      serialNumber: certificate.serial_number,
      date: issueDate?.toLocaleDateString() || new Date().toLocaleDateString(),
    });

    if (isMarkdown) {
      return (
        <div
          className={`text-lg md:text-xl font-medium max-w-2xl mb-12 prose prose-slate ${isArabic ? "font-arabic text-right" : "text-center"}`}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{interpolated}</ReactMarkdown>
        </div>
      );
    }

    return (
      <p
        className={`text-lg md:text-xl font-medium max-w-2xl mb-12 whitespace-pre-wrap ${isArabic ? "font-arabic text-right" : ""}`}
        style={{ color: "#1e293b" }}
        dir={isArabic ? "rtl" : "ltr"}
      >
        {interpolated}
      </p>
    );
  }

  return (
    <p
      className={`text-lg md:text-xl font-medium max-w-2xl mb-12 ${isArabic ? "font-arabic text-right" : ""}`}
      style={{ color: "#64748b" }}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {isArabic ? "تؤكد هذه الوثيقة أن " : "This record confirms that "}
      <strong className="border-b pb-0.5 mx-1" style={{ color: "#16543d", borderColor: "rgba(226, 232, 240, 0.2)" }}>
        {certificate.organization_name || certificate.user_name || (isArabic ? "الجهة المعنية" : "The designated entity")}
      </strong>
      {isArabic ? " معتمدة رسمياً من قبل المجلس الأعلى." : " has been officially accredited by SUPKEM."}
    </p>
  );
}
