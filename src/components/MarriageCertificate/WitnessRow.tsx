interface WitnessRowProps {
  orderNum: "1" | "2";
  suffix: "st" | "nd";
  arLabel: string;
  name: string;
  idNo: string;
}

export const WitnessRow = ({ orderNum, suffix, arLabel, name, idNo }: WitnessRowProps) => (
  <div className="border-b border-slate-900 flex divide-x divide-slate-900 min-h-[46px] text-slate-950">
    {/* Left Column */}
    <div className="w-[190px] sm:w-[210px] p-1.5 px-2 flex flex-col justify-center shrink-0">
      <span className="text-[11px] font-serif font-normal text-slate-900 leading-snug">
        Name of {orderNum}<sup>{suffix}</sup> Witness, <br />
        Identity card no. and <br />
        Signature
      </span>
    </div>

    {/* Center Column */}
    <div className="flex-1 flex flex-col divide-y divide-slate-900">
      {/* Witness Name */}
      <div className="p-1 px-3 flex items-center">
        <p className="text-[12px] sm:text-[13px] font-mono font-bold uppercase tracking-tight text-slate-950">
          {name || ""}
        </p>
      </div>

      {/* Witness Signature and ID */}
      <div className="flex divide-x divide-slate-900 min-h-[26px]">
        {/* Signature */}
        <div className="flex-1 px-3 flex items-center">
          <svg className="w-24 h-6 text-blue-900 fill-none stroke-current stroke-[1.4]" viewBox="0 0 100 24">
            <path d="M5 16 C 15 4, 25 22, 35 8 C 45 18, 55 6, 70 14 C 80 8, 90 12, 95 16" />
            <path d="M12 18 L 85 17" strokeWidth="1" />
          </svg>
        </div>

        {/* ID Number */}
        <div className="w-[140px] sm:w-[160px] px-3 flex items-center shrink-0">
          <p className="text-[11px] font-mono font-bold uppercase text-slate-950">
            {idNo ? (idNo.toUpperCase().startsWith("ID") ? idNo : `ID:${idNo}`) : ""}
          </p>
        </div>
      </div>
    </div>

    {/* Right Column: Arabic */}
    <div className="w-[190px] sm:w-[210px] p-1.5 px-2 flex items-center justify-end text-right shrink-0">
      <span className="text-[12px] font-arabic font-bold text-slate-900 leading-tight" dir="rtl">
        {arLabel}
      </span>
    </div>
  </div>
);
