"use client";

import { MarriageCertificateTemplateProps } from "./MarriageCertificate/types";
import { CertificateHeader } from "./MarriageCertificate/CertificateHeader";
import { HusbandDetails } from "./MarriageCertificate/HusbandDetails";
import { WifeDetails } from "./MarriageCertificate/WifeDetails";
import { MarriageDetailsSection } from "./MarriageCertificate/MarriageDetailsSection";
import { Row } from "./MarriageCertificate/Row";
import { CertificateQRCode } from "@/components/CertificateQRCode";

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
      style={{
        boxSizing: "border-box",
      }}
    >
      {/* Subtle Government Document Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Official Header */}
      <CertificateHeader serialNumber={certificate.serial_number} />

      {/* The Official 26-Row Table */}
      <div className="border border-slate-900 bg-white/60 shadow-xs relative z-10">
        {/* Row 1: Marriage Entry No. */}
        <Row
          en="Marriage Entry No."
          value={entryNo}
          ar="رقم تسجيل الزواج"
        />

        {/* Row 2: Date of Marriage */}
        <Row
          en="Date of Marriage"
          value={formattedDateOfMarriage}
          ar="تاريخ الزواج"
        />

        {/* Rows 3 - 8: Husband's Details */}
        <HusbandDetails details={details} />

        {/* Rows 9 - 14: Wife's Details */}
        <WifeDetails details={details} />

        {/* Rows 15 - 26: Waliyy, Mahr, Venue, Signatures, Witnesses, Officer, Issuance */}
        <MarriageDetailsSection
          details={details}
          dateOfIssuance={details.date_of_issuance || certificate.issued_at}
        />
      </div>

      {/* Discreet Verification Seal & QR Code below the table */}
      <div className="mt-3 pt-2 flex items-center justify-between text-slate-600 border-t border-slate-200/80">
        <div className="text-left space-y-0.5">
          <p className="text-[8px] font-sans font-black uppercase tracking-[0.2em] text-slate-700">
            OFFICIAL REPUBLIC OF KENYA MUSLIM MARRIAGE REGISTER
          </p>
          <p className="text-[7.5px] font-serif text-slate-500">
            Supreme Council of Kenya Muslims (SUPKEM) • Sharia Compliance Unit
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="text-[7.5px] font-mono font-bold text-slate-500 uppercase block">
              Digital Verification
            </span>
            <span className="text-[8.5px] font-mono font-black text-slate-800">
              SN: {certificate.serial_number}
            </span>
          </div>
          <div className="p-1 bg-white border border-slate-300 rounded shadow-2xs">
            <CertificateQRCode
              hash={certificate.qr_code_hash}
              serialNumber={certificate.serial_number}
              size={36}
              fgColor="#0f172a"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
