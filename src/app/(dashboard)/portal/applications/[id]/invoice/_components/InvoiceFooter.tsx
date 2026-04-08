// External libraries
import { ShieldCheck } from "lucide-react";

export function InvoiceFooter() {
  return (
    <div className="space-y-8">
      <div className="border-t border-dashed border-slate-200 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-[#0b4a2d]" />
          </div>
          <div>
            <p className="font-black text-slate-800 text-sm">Verified Payment</p>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              This receipt was generated automatically upon successful M-Pesa confirmation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Processed via</p>
          <div className="w-24 h-10 bg-slate-50 border border-slate-200 rounded-xl p-2">
            <img src="/M-PESA_LOGO-01.svg" alt="M-Pesa" className="w-full h-full object-contain" />
          </div>
        </div>
      </div>

      <div className="text-center pt-4 border-t border-slate-100">
        <p className="text-xs text-slate-400 font-medium leading-relaxed">
          Thank you for your payment. This is an official receipt from SUPKEM — Supreme Council of Kenya Muslims.
          <br />
          For any queries, contact us at <span className="text-[#0b4a2d] font-bold">applications@supkem.org</span>
        </p>
      </div>
    </div>
  );
}
