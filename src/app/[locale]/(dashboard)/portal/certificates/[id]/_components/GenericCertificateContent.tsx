import Image from "next/image";
import { Search } from "lucide-react";

import { InfoBox } from "@/app/[locale]/(dashboard)/portal/certificates/[id]/_components/InfoBox";
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
  const serviceName =
    certificate.application_detail?.service_name || "Official Certification";
  const orgName =
    certificate.application_detail?.organization_name ||
    "The designated organization";

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
        <div className="h-px flex-1" style={{ backgroundColor: "rgba(22, 84, 61, 0.1)" }} />
        <span>Supreme Council of Kenya Muslims</span>
        <div className="h-px flex-1" style={{ backgroundColor: "rgba(22, 84, 61, 0.1)" }} />
      </div>

      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-black font-outfit tracking-tight leading-tight mb-8"
        style={{ color: "#1e293b" }}
      >
        {serviceName}
      </h2>

      <p className="text-lg md:text-xl font-medium max-w-2xl mb-12" style={{ color: "#64748b" }}>
        This is to certify that{" "}
        <strong
          className="border-b pb-0.5"
          style={{ color: "#16543d", borderColor: "rgba(22, 84, 61, 0.2)" }}
        >
          {orgName}
        </strong>{" "}
        has successfully met the standards and requirements for this certification.
      </p>

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
          <div className="w-40 h-10 border-b flex items-end" style={{ borderColor: "#1e293b" }}>
            <span className="font-serif text-2xl italic px-2 -mb-2" style={{ color: "#475569" }}>
              Official Signatory
            </span>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest mt-4" style={{ color: "#94a3b8" }}>
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
