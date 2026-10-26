"use client";

import { MarriageCertificateTemplateProps } from "./MarriageCertificate/types";
import { CertificateHeader } from "./MarriageCertificate/CertificateHeader";
import { HusbandDetails } from "./MarriageCertificate/HusbandDetails";
import { WifeDetails } from "./MarriageCertificate/WifeDetails";
import { MarriageDetailsSection } from "./MarriageCertificate/MarriageDetailsSection";
import { Row } from "./MarriageCertificate/Row";
import { MarriageCertificateFooter } from "./MarriageCertificate/MarriageCertificateFooter";

export default function MarriageCertificateTemplate({
  certificate,
}: MarriageCertificateTemplateProps) {
  const details = certificate.application_detail?.marriage_details;
  if (!details) return null;

  const entryNo =
    details.marriage_entry_no ||
    `KCMRC  ${certificate.serial_number || "E88"} OF ${new Date(
      details.date_of_marriage || Date.now()
    ).getFullYear()}`;

  const formattedDateOfMarriage = details.date_of_marriage
    ? new Date(details.date_of_marriage)
        .toLocaleDateString(undefined, {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
        .toUpperCase()
    : "";

  return (
    <div
      className="w-full max-w-[820px] mx-auto p-6 sm:p-8 bg-[#fdfdfc] text-slate-950 font-serif relative border-2 border-slate-900 shadow-2xl print:shadow-none print:p-6 print:border-slate-900 print:w-full print:max-w-none overflow-hidden"
      style={{ boxSizing: "border-box" }}
    >
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      <CertificateHeader serialNumber={certificate.serial_number} />

      <div className="border border-slate-900 bg-white/60 shadow-xs relative z-10">
        <Row
          en="Marriage Entry No."
          value={entryNo}
          ar="رقم تسجيل الزواج"
        />
        <Row
          en="Date of Marriage"
          value={formattedDateOfMarriage}
          ar="تاريخ الزواج"
        />

        <HusbandDetails details={details} />
        <WifeDetails details={details} />
        <MarriageDetailsSection
          details={details}
          dateOfIssuance={details.date_of_issuance || certificate.issued_at}
        />
      </div>

      <MarriageCertificateFooter
        serialNumber={certificate.serial_number}
        qrCodeHash={certificate.qr_code_hash}
      />
    </div>
  );
}
