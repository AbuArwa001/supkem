import { Plane, Map } from "lucide-react";
import { CertificateQRCode } from "@/components/CertificateQRCode";

interface LetterFooterProps {
  serialNumber?: string;
  qrCodeHash?: string;
}

export function LetterFooter({ serialNumber, qrCodeHash }: LetterFooterProps) {
  return (
    <div className="mt-12 flex items-center justify-between gap-6">
      <div className="flex gap-4 opacity-40">
        <Plane size={32} />
        <Map size={32} />
      </div>
      <div className="h-px bg-slate-300 flex-1" />
      <div className="shrink-0 flex items-center gap-3">
        <div className="text-right">
          <p className="text-[9px] font-black uppercase tracking-widest text-slate-700">Official Verification</p>
          <p className="text-[7px] font-bold uppercase text-slate-400">Scan to authenticate</p>
        </div>
        <div className="p-1 bg-white border border-slate-200 rounded-lg shadow-xs">
          <CertificateQRCode
            hash={qrCodeHash}
            serialNumber={serialNumber}
            size={56}
            fgColor="#0f172a"
          />
        </div>
      </div>
    </div>
  );
}
