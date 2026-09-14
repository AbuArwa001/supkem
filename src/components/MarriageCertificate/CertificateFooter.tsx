import { CertificateQRCode } from "@/components/CertificateQRCode";

interface CertificateFooterProps {
  dateOfIssuance: string;
  serialNumber?: string;
  qrCodeHash?: string;
}

export const CertificateFooter = ({ dateOfIssuance, serialNumber, qrCodeHash }: CertificateFooterProps) => (
  <div className="mt-8 flex justify-between items-end border-t-2 border-slate-200 pt-4">
    <div className="flex gap-8 items-end">
      <div className="space-y-1.5 flex flex-col items-start min-w-[200px]">
        <p className="text-[9px] font-bold text-slate-500 uppercase font-sans tracking-[0.15em] border-b border-slate-200 w-full mb-1">
          Date of Issuance
        </p>
        <p className="text-[15px] font-black text-slate-900 font-mono tracking-tighter">
          {dateOfIssuance
            ? new Date(dateOfIssuance)
                .toLocaleDateString(undefined, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
                .toUpperCase()
            : ""}
        </p>
        <div className="h-0.5 w-full bg-slate-900 mt-1" />
      </div>
      <div className="space-y-1 pt-4">
        <p className="text-[14px] font-black text-right text-slate-900" dir="rtl">
          تاريخ الإصدار
        </p>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <div className="text-right space-y-0.5 hidden sm:block">
        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-800">
          AUTHENTIC DOCUMENT
        </p>
        <p className="text-[7px] font-black uppercase tracking-[0.1em] text-slate-500 max-w-[180px] leading-tight ml-auto">
          Supreme Council of Kenya Muslims <br /> Scan QR code to verify
        </p>
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
