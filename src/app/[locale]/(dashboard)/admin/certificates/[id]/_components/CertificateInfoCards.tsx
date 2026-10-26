import React from "react";

interface CertificateInfoCardsProps {
  serialNumber?: string;
  issueDate: Date | null;
  expiryDate: Date | null;
  isValid: boolean;
  isArabic: boolean;
}

export function CertificateInfoCards({
  serialNumber,
  issueDate,
  expiryDate,
  isValid,
  isArabic,
}: CertificateInfoCardsProps) {
  return (
    <div
      className={`grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-16 ${isArabic ? "flex-row-reverse" : ""}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <CertificateCard label="Serial Number" value={serialNumber || "N/A"} isMono />
      <CertificateCard label="Date of Issue" value={issueDate?.toLocaleDateString() || "N/A"} />
      <CertificateCard label="Valid Until" value={expiryDate ? expiryDate.toLocaleDateString() : "Indefinite"} />
      <StatusCard isValid={isValid} />
    </div>
  );
}

function CertificateCard({ label, value, isMono }: { label: string; value: string; isMono?: boolean }) {
  return (
    <div
      className="p-4 rounded-2xl border"
      style={{
        backgroundColor: "rgba(248, 250, 252, 0.5)",
        borderColor: "rgba(241, 245, 249, 0.5)",
      }}
    >
      <p className="text-[10px] uppercase tracking-widest font-bold mb-1" style={{ color: "#94a3b8" }}>
        {label}
      </p>
      <p className={`font-bold text-sm truncate ${isMono ? "font-mono" : "tracking-wide"}`} style={{ color: "#1e293b" }}>
        {value}
      </p>
    </div>
  );
}

function StatusCard({ isValid }: { isValid: boolean }) {
  return (
    <div
      className="p-4 rounded-2xl border flex flex-col items-center justify-center relative overflow-hidden group"
      style={{
        backgroundColor: isValid ? "#f0fdf4" : "#fef2f2",
        borderColor: "transparent",
      }}
    >
      <p className="text-[10px] uppercase tracking-widest font-bold mb-1 relative z-10" style={{ color: "#94a3b8" }}>
        Status
      </p>
      <p className="font-black tracking-widest uppercase text-sm relative z-10" style={{ color: isValid ? "#059669" : "#dc2626" }}>
        {isValid ? "Active" : "Expired"}
      </p>
    </div>
  );
}
