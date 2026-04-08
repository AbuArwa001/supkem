// External libraries
import { CheckCircle2 } from "lucide-react";

interface InvoiceHeaderProps {
  refCode: string;
  paidAt: Date;
}

export function InvoiceHeader({ refCode, paidAt }: InvoiceHeaderProps) {
  return (
    <div
      className="relative px-12 py-10 bg-[#0b4a2d] text-white overflow-hidden"
      style={{
        backgroundImage: "url('/payment-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundBlendMode: "soft-light",
      }}
    >
      <div className="absolute inset-0 bg-[#0b4a2d]/80 pointer-events-none" />
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-white rounded-2xl p-2 shadow-lg flex items-center justify-center shrink-0">
            <img src="/logo.png" alt="SUPKEM" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight">SUPKEM</h1>
            <p className="text-white/60 text-sm font-bold uppercase tracking-widest mt-0.5">
              Supreme Council of Kenya Muslims
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 bg-[#25D366]/20 border border-[#25D366]/40 px-5 py-2 rounded-full">
            <CheckCircle2 className="w-5 h-5 text-[#25D366]" />
            <span className="text-[#25D366] font-black text-sm uppercase tracking-widest">PAID</span>
          </div>
          <p className="text-white/50 text-xs font-bold uppercase tracking-widest">Official Receipt</p>
        </div>
      </div>

      <div className="relative z-10 mt-10 pt-8 border-t border-white/10 flex items-end justify-between">
        <div>
          <p className="text-white/50 text-xs font-black uppercase tracking-[0.2em] mb-1">Invoice / Receipt</p>
          <p className="text-5xl font-black tracking-tight text-white">{refCode}</p>
        </div>
        <div className="text-right space-y-1">
          <p className="text-white/50 text-xs font-black uppercase tracking-widest">Date Issued</p>
          <p className="text-white font-bold text-lg">
            {paidAt.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>
      </div>
    </div>
  );
}
