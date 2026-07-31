import { ShieldCheck } from "lucide-react";

interface CertificateFooterProps {
  dateOfIssuance: string;
}

export const CertificateFooter = ({ dateOfIssuance }: CertificateFooterProps) => (
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

    <div className="text-center space-y-3 opacity-70 group hover:opacity-100 transition-opacity">
      <div className="bg-primary/5 p-2 rounded-2xl inline-block border border-primary/10">
        <ShieldCheck className="text-primary" size={28} />
      </div>
      <div className="space-y-0.5">
        <p className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-800">
          AUTHENTIC DOCUMENT
        </p>
        <p className="text-[7px] font-black uppercase tracking-[0.1em] text-slate-500 max-w-[220px] leading-tight mx-auto">
          Issued by the Supreme Council of Kenya Muslims <br /> Verified & Digitally Recorded
        </p>
      </div>
    </div>
  </div>
);
