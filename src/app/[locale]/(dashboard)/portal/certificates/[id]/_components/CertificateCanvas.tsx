"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Search, AlertCircle } from "lucide-react";
import Image from "next/image";
import MarriageCertificateTemplate from "@/components/MarriageCertificateTemplate";
import SupportLetterTemplate from "@/components/SupportLetterTemplate";
import StudyAbroadLetterTemplate from "@/components/StudyAbroadLetterTemplate";
import TravelVisaAdvisoryTemplate from "@/components/TravelVisaAdvisoryTemplate";
import { Certificate } from "@/services/certificate-service";

interface CertificateCanvasProps {
  certificate: Certificate;
  issueDate: Date | null;
  expiryDate: Date | null;
  isValid: boolean;
}

export const CertificateCanvas = forwardRef<
  HTMLDivElement,
  CertificateCanvasProps
>(({ certificate, issueDate, expiryDate, isValid }, ref) => {
  const serviceName =
    certificate.application_detail?.service_name?.toLowerCase() || "";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="relative bg-white border border-border/80 shadow-2xl rounded-[20px] overflow-hidden p-8 md:p-16 lg:p-24 flex flex-col items-center text-center max-w-4xl mx-auto print:shadow-none print:border-none print:rounded-none print:m-0 print:p-8 certificate-canvas"
    >
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .certificate-canvas,
          .certificate-canvas * {
            visibility: visible !important;
          }
          .certificate-canvas {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 2rem !important;
            border: none !important;
            box-shadow: none !important;
            border-radius: 0 !important;
            background-color: white !important;
          }
          html,
          body {
            height: auto !important;
            overflow: visible !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          .no-print,
          header,
          nav,
          aside,
          button {
            display: none !important;
            visibility: hidden !important;
          }
        }
        .certificate-canvas {
          --primary-safe: #16543d;
          --secondary-safe: #e7b408;
          --slate-800-safe: #1e293b;
          --slate-500-safe: #64748b;
        }
        .certificate-canvas :global(.text-primary) {
          color: var(--primary-safe) !important;
        }
        .certificate-canvas :global(.text-secondary) {
          color: var(--secondary-safe) !important;
        }
        .certificate-canvas :global(.bg-primary/5) {
          background-color: rgba(22, 84, 61, 0.05) !important;
        }
        .certificate-canvas :global(.bg-secondary/10) {
          background-color: rgba(231, 180, 8, 0.1) !important;
        }
        .certificate-canvas :global(.border-primary/10) {
          border-color: rgba(22, 84, 61, 0.1) !important;
        }
        .certificate-canvas :global(.border-primary/5) {
          border-color: rgba(22, 84, 61, 0.05) !important;
        }
      `}</style>

      {!serviceName.includes("marriage") && (
        <>
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"
            style={{ backgroundColor: "rgba(22, 84, 61, 0.05)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"
            style={{ backgroundColor: "rgba(231, 180, 8, 0.1)" }}
          />
          <div
            className="absolute inset-4 border rounded-[14px] pointer-events-none"
            style={{ borderColor: "rgba(22, 84, 61, 0.1)" }}
          />
          <div
            className="absolute inset-6 border-4 border-double rounded-[20px] pointer-events-none"
            style={{ borderColor: "rgba(22, 84, 61, 0.05)" }}
          />
        </>
      )}

      <div className="relative z-10 w-full flex flex-col items-center">
        {serviceName.includes("marriage") ? (
          <MarriageCertificateTemplate certificate={certificate} />
        ) : serviceName.includes("hajj") || serviceName.includes("umrah") ? (
          certificate.application_detail?.pilgrim_details ? (
            <SupportLetterTemplate certificate={certificate} />
          ) : (
            <Placeholder error="Pilgrim details missing. Please contact support." />
          )
        ) : serviceName.includes("study") || serviceName.includes("abroad") ? (
          certificate.application_detail?.education_details ? (
            <StudyAbroadLetterTemplate certificate={certificate} />
          ) : (
            <Placeholder error="Educational details missing. Please contact support." />
          )
        ) : serviceName.includes("visa") || serviceName.includes("travel") ? (
          certificate.application_detail?.travel_visa_details ? (
            <TravelVisaAdvisoryTemplate certificate={certificate} />
          ) : (
            <Placeholder error="Travel details missing. Please contact support." />
          )
        ) : (
          <GenericCertificateContent
            certificate={certificate}
            issueDate={issueDate}
            expiryDate={expiryDate}
            isValid={isValid}
          />
        )}
      </div>
    </motion.div>
  );
});

CertificateCanvas.displayName = "CertificateCanvas";

function Placeholder({ error }: { error: string }) {
  return (
    <div className="py-20 text-slate-400 font-medium">
      <AlertCircle className="mx-auto mb-4 opacity-20" size={48} />
      <p>{error}</p>
    </div>
  );
}

function GenericCertificateContent({
  certificate,
  issueDate,
  expiryDate,
  isValid,
}: {
  certificate: Certificate;
  issueDate: Date | null;
  expiryDate: Date | null;
  isValid: boolean;
}) {
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
        className="tracking-widest uppercase text-xs font-black mb-12 flex items-center gap-4 w-full"
        style={{ color: "#16543d" }}
      >
        <div
          className="h-px flex-1"
          style={{ backgroundColor: "rgba(22, 84, 61, 0.1)" }}
        />
        <span>Supreme Council of Kenya Muslims</span>
        <div
          className="h-px flex-1"
          style={{ backgroundColor: "rgba(22, 84, 61, 0.1)" }}
        />
      </div>

      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-black font-outfit tracking-tight leading-tight mb-8"
        style={{ color: "#1e293b" }}
      >
        {certificate.application_detail?.service_name ||
          "Official Certification"}
      </h2>

      <p
        className="text-lg md:text-xl font-medium max-w-2xl mb-12"
        style={{ color: "#64748b" }}
      >
        This is to certify that{" "}
        <strong
          className="border-b pb-0.5"
          style={{ color: "#16543d", borderColor: "rgba(22, 84, 61, 0.2)" }}
        >
          {certificate.application_detail?.organization_name ||
            "The designated organization"}
        </strong>{" "}
        has successfully met the standards and requirements for this
        certification.
      </p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-16">
        <InfoBox label="Serial Number" value={certificate.serial_number} mono />
        <InfoBox
          label="Date of Issue"
          value={issueDate?.toLocaleDateString() || ""}
        />
        <InfoBox
          label="Valid Until"
          value={expiryDate ? expiryDate.toLocaleDateString() : "Indefinite"}
        />
        <div
          className="p-4 rounded-2xl border flex flex-col items-center justify-center relative overflow-hidden group"
          style={{
            backgroundColor: isValid ? "#f0fdf4" : "#fef2f2",
            borderColor: "transparent",
          }}
        >
          <p
            className="text-[10px] uppercase tracking-widest font-bold mb-1 relative z-10"
            style={{ color: "#94a3b8" }}
          >
            Status
          </p>
          <p
            className="font-black tracking-widest uppercase text-sm relative z-10"
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
          <div
            className="w-40 h-10 border-b flex items-end"
            style={{ borderColor: "#1e293b" }}
          >
            <span
              className="font-serif text-2xl italic px-2 -mb-2"
              style={{ color: "#475569" }}
            >
              Official Signatory
            </span>
          </div>
          <p
            className="text-[10px] font-bold uppercase tracking-widest mt-4"
            style={{ color: "#94a3b8" }}
          >
            Authorized Signature
          </p>
        </div>

        <div
          className="w-24 h-24 bg-white border rounded-xl p-2 shadow-sm flex flex-col items-center justify-center shrink-0"
          style={{ borderColor: "rgba(226, 232, 240, 0.8)" }}
        >
          <div
            className="w-full h-full rounded flex items-center justify-center"
            style={{ backgroundColor: "#f8fafc" }}
          >
            <Search size={24} style={{ color: "#cbd5e1" }} />
          </div>
        </div>
      </div>
    </>
  );
}

function InfoBox({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div
      className="p-4 rounded-2xl border"
      style={{
        backgroundColor: "rgba(248, 250, 252, 0.5)",
        borderColor: "rgba(241, 245, 249, 0.5)",
      }}
    >
      <p
        className="text-[10px] uppercase tracking-widest font-bold mb-1"
        style={{ color: "#94a3b8" }}
      >
        {label}
      </p>
      <p
        className={`${mono ? "font-mono" : "font-bold"} font-bold text-sm truncate`}
        style={{ color: "#1e293b" }}
      >
        {value}
      </p>
    </div>
  );
}
