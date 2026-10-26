import { InfoBox } from "./InfoBox";

interface CertificateMetaGridProps {
  serialNumber: string;
  issueDate: Date | null;
  expiryDate: Date | null;
  isValid: boolean;
}

export function CertificateMetaGrid({
  serialNumber,
  issueDate,
  expiryDate,
  isValid,
}: CertificateMetaGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full mb-16">
      <InfoBox label="Serial Number" value={serialNumber} mono />
      <InfoBox label="Date of Issue" value={issueDate?.toLocaleDateString() || ""} />
      <InfoBox label="Valid Until" value={expiryDate ? expiryDate.toLocaleDateString() : "Indefinite"} />
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
  );
}
