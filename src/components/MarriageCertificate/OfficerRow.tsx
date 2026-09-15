interface OfficerRowProps {
  name?: string;
  county?: string;
}

export const OfficerRow = ({ name, county = "Mombasa" }: OfficerRowProps) => {
  const officerName = name || "Hon. Khamis Ramadhani";
  const courtLocation = county.toUpperCase() || "NAIROBI";

  return (
    <div className="border-b border-slate-900 flex divide-x divide-slate-900 min-h-[58px] text-slate-950 relative overflow-hidden">
      {/* Left: English */}
      <div className="w-[190px] sm:w-[210px] p-1.5 px-2 flex items-center shrink-0">
        <span className="text-[11px] font-serif font-normal text-slate-900 leading-snug">
          Name and Signature of Muslim <br />
          Marriage Officer
        </span>
      </div>

      {/* Center: Name, Kadhi designation, signature & official stamp */}
      <div className="flex-1 p-1.5 px-4 flex items-center justify-between relative">
        <div className="space-y-0.5 z-10">
          <p className="text-base sm:text-lg font-serif font-black italic text-blue-900 tracking-tight">
            {officerName}
          </p>
          <div className="flex items-center gap-3">
            <span className="text-xs sm:text-sm font-serif font-black text-slate-950 underline underline-offset-2">
              Principal Kadhi
            </span>
            {/* Signature flourish */}
            <svg className="w-24 h-6 text-blue-900 fill-none stroke-current stroke-[1.8]" viewBox="0 0 90 24">
              <path d="M2 14 C 12 2, 22 22, 32 4 C 42 16, 52 2, 65 18 C 75 4, 82 12, 88 8" />
              <path d="M10 20 L 78 16" strokeWidth="1.2" />
            </svg>
          </div>
        </div>

        {/* Authentic Kadhi Court Purple Circular Rubber Stamp */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 w-28 h-28 pointer-events-none opacity-85 rotate-[-8deg]">
          <div className="w-full h-full rounded-full border-[2.5px] border-dashed border-indigo-900 flex flex-col items-center justify-center text-center p-1.5 shadow-xs">
            <div className="w-full h-full rounded-full border border-indigo-900 flex flex-col items-center justify-center p-1">
              <span className="text-[7.5px] font-mono font-black uppercase text-indigo-900 tracking-wider">
                KADHI&apos;S COURT
              </span>
              <span className="text-[7px] font-mono font-black uppercase text-indigo-950 tracking-tight my-0.5">
                ★ {courtLocation} ★
              </span>
              <span className="text-[6.5px] font-mono font-bold uppercase text-indigo-900 tracking-widest">
                REPUBLIC OF KENYA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Arabic */}
      <div className="w-[190px] sm:w-[210px] p-1.5 px-2 flex items-center justify-end text-right shrink-0">
        <span className="text-[12px] font-arabic font-bold text-slate-900 leading-tight" dir="rtl">
          إسم المأذون الشرعي الذي عقد النكاح وتوقيعه
        </span>
      </div>
    </div>
  );
};
