"use client";

import Image from "next/image";
import { Award } from "lucide-react";
import { MarriageCertificateTemplateProps } from "./MarriageCertificate/types";
import { CertificateHeader } from "./MarriageCertificate/CertificateHeader";
import { CertificateFooter } from "./MarriageCertificate/CertificateFooter";
import { HusbandDetails } from "./MarriageCertificate/HusbandDetails";
import { WifeDetails } from "./MarriageCertificate/WifeDetails";
import { MarriageDetailsSection } from "./MarriageCertificate/MarriageDetailsSection";
import { Row } from "./MarriageCertificate/Row";

export default function MarriageCertificateTemplate({
  certificate,
}: MarriageCertificateTemplateProps) {
  const details = certificate.application_detail?.marriage_details;
  if (!details) return null;

  return (
    <div className="w-full max-w-[850px] mx-auto p-12 bg-[#fafaf8] text-slate-900 font-serif relative border-[16px] border-double border-slate-300 shadow-2xl print:shadow-none print:p-8 print:border-none overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">
        <Image src="/logo.svg" alt="" width={600} height={600} />
      </div>

      <div className="relative z-10 border-[1px] border-slate-400 p-8 h-full">
        <CertificateHeader serialNumber={certificate.serial_number} />

        <div className="border-[2px] border-slate-900 overflow-hidden shadow-sm bg-white/40">
          <Row
            en="Marriage Entry No."
            value={details.marriage_entry_no}
            ar="رقم تسجيل الزواج"
          />
          <Row
            en="Date of Marriage"
            value={new Date(details.date_of_marriage)
              .toLocaleDateString(undefined, {
                day: "numeric",
                month: "long",
                year: "numeric",
              })
              .toUpperCase()}
            ar="تاريخ الزواج"
          />
          <HusbandDetails details={details} />
          <WifeDetails details={details} />
          <MarriageDetailsSection details={details} />
        </div>

        <CertificateFooter dateOfIssuance={details.date_of_issuance} />

        <div className="absolute bottom-2 left-2 rotate-12 opacity-10">
          <Award size={16} />
        </div>
        <div className="absolute bottom-2 right-2 -rotate-12 opacity-10">
          <Award size={16} />
        </div>
      </div>

      <style jsx>{`
        .divide-slate-800 > :not([hidden]) ~ :not([hidden]) {
          border-color: #1e293b;
        }
        .font-mono {
          font-family:
            ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas,
            "Liberation Mono", "Courier New", monospace;
        }
      `}</style>
    </div>
  );
}
