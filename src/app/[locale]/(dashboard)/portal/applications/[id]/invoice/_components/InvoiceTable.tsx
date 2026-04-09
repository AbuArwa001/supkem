interface InvoiceTableProps {
  serviceName: string;
  refCode: string;
  fee: number;
}

export function InvoiceTable({ serviceName, refCode, fee }: InvoiceTableProps) {
  return (
    <div>
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Service Details</p>
      <div className="rounded-2xl overflow-hidden border border-slate-100">
        <div className="bg-slate-50 px-6 py-4 grid grid-cols-12 text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">
          <span className="col-span-7">Description</span>
          <span className="col-span-2 text-center">Qty</span>
          <span className="col-span-3 text-right">Amount</span>
        </div>
        <div className="px-6 py-5 grid grid-cols-12 items-center border-t border-slate-100">
          <div className="col-span-7">
            <p className="font-black text-slate-800">{serviceName}</p>
            <p className="text-sm text-slate-500 font-medium mt-0.5">SUPKEM Application — {refCode}</p>
          </div>
          <div className="col-span-2 text-center font-bold text-slate-600">1</div>
          <div className="col-span-3 text-right font-black text-slate-800">KES {fee.toLocaleString()}</div>
        </div>
        <div className="px-6 py-4 grid grid-cols-12 items-center border-t border-slate-100 bg-slate-50/50">
          <div className="col-span-7"><p className="font-semibold text-slate-500 text-sm">Service Charge</p></div>
          <div className="col-span-2 text-center font-semibold text-slate-400 text-sm">—</div>
          <div className="col-span-3 text-right font-bold text-slate-500 text-sm">KES 0</div>
        </div>
        <div className="px-6 py-4 grid grid-cols-12 items-center border-t border-slate-100 bg-slate-50/50">
          <div className="col-span-7"><p className="font-semibold text-slate-500 text-sm">VAT (Included)</p></div>
          <div className="col-span-2 text-center font-semibold text-slate-400 text-sm">—</div>
          <div className="col-span-3 text-right font-bold text-slate-500 text-sm">KES 0</div>
        </div>
        <div className="px-6 py-6 grid grid-cols-12 items-center border-t-2 border-[#0b4a2d]/10 bg-gradient-to-r from-[#0b4a2d]/5 to-transparent">
          <div className="col-span-7"><p className="font-black text-[#0b4a2d] text-lg uppercase tracking-wider">Total Paid</p></div>
          <div className="col-span-2" />
          <div className="col-span-3 text-right"><p className="font-black text-[#0b4a2d] text-3xl">KES {fee.toLocaleString()}</p></div>
        </div>
      </div>
    </div>
  );
}
