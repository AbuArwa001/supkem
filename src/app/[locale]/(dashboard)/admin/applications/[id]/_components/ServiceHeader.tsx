import Image from "next/image";

export default function ServiceHeader({ app }: { app: any }) {
  return (
    <>
      <div className="flex items-center gap-4 text-slate-900">
        <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center shrink-0">
          <Image src="/logo.svg" alt="Logo" width={26} height={26} />
        </div>
        <h3 className="text-2xl font-black font-outfit">Service Details</h3>
      </div>

      <div className="p-5 sm:p-8 rounded-2xl sm:rounded-[24px] bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-5 shadow-inner">
        <div className="min-w-0 flex-1">
          <h4 className="text-xl sm:text-2xl font-black text-slate-900 font-outfit mb-2 flex flex-wrap items-center gap-2.5">
            <span className="break-words">{app.service_name}</span>
            {(!app.payment || app.payment.status !== "Completed") ? (
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-amber-50 text-amber-700 rounded-full border border-amber-200 shadow-sm shrink-0">
                Payment Pending
              </span>
            ) : (
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 shadow-sm shrink-0">
                Paid: KES {app.payment.amount || Number(app.service_fee || 0).toLocaleString()}
              </span>
            )}
          </h4>
          <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-widest break-all">
            Ref: SER-00{app.service}
          </p>
        </div>
        <div className="text-left sm:text-right shrink-0 pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
          <p className="text-2xl sm:text-3xl font-black text-slate-900 font-outfit">
            KES {Number(app.service_fee || 0).toLocaleString()}
          </p>
          <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1">
            Standard Processing Fee
          </p>
        </div>
      </div>
    </>
  );
}
