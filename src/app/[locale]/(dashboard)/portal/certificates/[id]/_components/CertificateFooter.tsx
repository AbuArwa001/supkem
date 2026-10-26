import { CertificateQRCode } from "@/components/CertificateQRCode";

interface CertificateFooterProps {
  digitalSignature?: string | null;
  signatoryTitle?: string | null;
  qrCodeHash?: string | null;
  serialNumber: string;
}

export function CertificateFooter({
  digitalSignature,
  signatoryTitle,
  qrCodeHash,
  serialNumber,
}: CertificateFooterProps) {
  return (
    <div
      className="flex items-center justify-between w-full border-t pt-8 mt-auto"
      style={{ borderColor: "rgba(226, 232, 240, 0.6)" }}
    >
      <div className="text-left">
        <div className="w-48 h-20 border-b flex items-end justify-center relative overflow-hidden" style={{ borderColor: "#1e293b" }}>
          {digitalSignature ? (
            <img
              src={digitalSignature}
              alt="Signature"
              crossOrigin="anonymous"
              className="h-full object-contain pb-1 mix-blend-multiply"
            />
          ) : (
            <span className="font-serif text-2xl italic px-2 -mb-2" style={{ color: "#475569" }}>
              {signatoryTitle || "Official Signatory"}
            </span>
          )}
        </div>
        <p className="text-[10px] font-bold uppercase tracking-widest mt-4" style={{ color: "#94a3b8" }}>
          {signatoryTitle || "Authorized Signature"}
        </p>
      </div>

      <div
        className="w-24 h-24 bg-white border rounded-xl p-1.5 shadow-xs flex flex-col items-center justify-center shrink-0 overflow-hidden"
        style={{ borderColor: "rgba(226, 232, 240, 0.8)" }}
      >
        <CertificateQRCode
          hash={qrCodeHash || undefined}
          serialNumber={serialNumber}
          size={70}
          showLabel
          fgColor="#16543d"
        />
      </div>
    </div>
  );
}
