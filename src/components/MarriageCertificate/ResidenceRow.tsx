interface ResidenceRowProps {
  county: string;
  subCounty: string;
  arLabel: string;
}

export const ResidenceRow = ({ county, subCounty, arLabel }: ResidenceRowProps) => (
  <div className="border-b border-slate-900 flex divide-x divide-slate-800 min-h-[45px]">
    <div className="w-[190px] p-2 bg-slate-100/30 flex items-center">
      <span className="text-[10px] font-bold text-slate-800 uppercase leading-tight font-sans tracking-tighter">
        Residence
      </span>
    </div>
    <div className="flex-1 flex divide-x divide-slate-800">
      <div className="flex-1 p-2 flex flex-col items-center justify-center bg-white/60">
        <span className="text-[9px] font-black text-slate-900 uppercase tracking-tighter flex items-center gap-1">
          County{" "}
          <span dir="rtl" className="text-[11px] font-black">
            الإقليم
          </span>
        </span>
        <p className="text-[13px] font-black uppercase font-mono">{county}</p>
      </div>
      <div className="flex-1 p-2 flex flex-col items-center justify-center bg-white/60">
        <span className="text-[9px] font-black text-slate-900 uppercase tracking-tighter flex items-center gap-1">
          Sub-County{" "}
          <span dir="rtl" className="text-[11px] font-black">
            المحافظة
          </span>
        </span>
        <p className="text-[13px] font-black uppercase font-mono">{subCounty}</p>
      </div>
    </div>
    <div className="w-[190px] p-2 bg-slate-100/30 flex items-center justify-end text-right">
      <span className="text-[12px] font-black text-slate-900 leading-tight" dir="rtl">
        {arLabel}
      </span>
    </div>
  </div>
);
