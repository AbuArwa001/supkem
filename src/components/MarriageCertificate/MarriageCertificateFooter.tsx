import React from "react";
import { CertificateQRCode } from "@/components/CertificateQRCode";

export function MarriageCertificateFooter({
  serialNumber,
  qrCodeHash,
}: {
  serialNumber?: string;
  qrCodeHash?: string;
}) {
  return (
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
            SN: {serialNumber}
          </span>
        </div>
        <div className="p-1 bg-white border border-slate-300 rounded shadow-2xs">
          <CertificateQRCode
            hash={qrCodeHash}
            serialNumber={serialNumber}
            size={36}
            fgColor="#0f172a"
          />
        </div>
      </div>
    </div>
  );
}
