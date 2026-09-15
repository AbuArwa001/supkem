interface ResidenceRowProps {
  county: string;
  subCounty: string;
  arLabel: string;
}

export const ResidenceRow = ({ county, subCounty, arLabel }: ResidenceRowProps) => (
  <div className="border-b border-slate-900 flex divide-x divide-slate-900 min-h-[36px] text-slate-950">
    <div className="w-[190px] sm:w-[210px] p-1.5 px-2 flex items-center shrink-0">
      <span className="text-[11px] font-serif font-normal text-slate-900 leading-snug">
        Residence
      </span>
    </div>

    <div className="flex-1 flex divide-x divide-slate-900">
      <div className="flex-1 p-1 px-2.5 flex flex-col justify-center">
        <span className="text-[10px] font-serif text-slate-800 flex items-center gap-1.5">
          <span>County</span>
          <span dir="rtl" className="font-arabic font-bold text-[11px]">
            الإقليم
          </span>
        </span>
        <p className="text-[12px] sm:text-[13px] font-mono font-bold uppercase text-slate-950">
          {county || ""}
        </p>
      </div>

      <div className="flex-1 p-1 px-2.5 flex flex-col justify-center">
        <span className="text-[10px] font-serif text-slate-800 flex items-center gap-1.5">
          <span>Sub-County</span>
          <span dir="rtl" className="font-arabic font-bold text-[11px]">
            المحافظة
          </span>
        </span>
        <p className="text-[12px] sm:text-[13px] font-mono font-bold uppercase text-slate-950">
          {subCounty || ""}
        </p>
      </div>
    </div>

    <div className="w-[190px] sm:w-[210px] p-1.5 px-2 flex items-center justify-end text-right shrink-0">
      <span className="text-[12px] font-arabic font-bold text-slate-900 leading-tight" dir="rtl">
        {arLabel}
      </span>
    </div>
  </div>
);
