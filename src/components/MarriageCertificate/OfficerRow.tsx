interface OfficerRowProps {
  name: string;
}

export const OfficerRow = ({ name }: OfficerRowProps) => (
  <div className="flex divide-x divide-slate-800 min-h-[100px] relative">
    <div className="w-[230px] p-2 flex flex-col justify-start">
      <span className="text-[9px] font-black uppercase font-sans leading-tight">
        Name and Signature of Muslim Marriage Officer
      </span>
    </div>
    <div className="flex-1 p-2 flex flex-col items-center justify-center space-y-1 relative">
      <p className="text-2xl font-black font-serif italic text-blue-800 mt-2 tracking-tighter drop-shadow-sm rotate-[-1deg]">
        {name || "Hon. Khamis Ramadhani"}
      </p>
      <p className="text-[11px] font-black uppercase border-t-2 border-slate-900 pt-0.5 tracking-widest bg-slate-900 text-white px-3">
        Principal Kadhi
      </p>
      <div className="absolute right-6 top-1/2 -translate-y-1/2 w-32 h-32 border-[3px] border-blue-800/20 rounded-full flex flex-col items-center justify-center text-[9px] font-black text-blue-800/30 uppercase rotate-12 pointer-events-none border-double">
        <span className="scale-[1.5]">KADHI'S COURT</span>
        <span className="text-[7px] mt-1">REPUBLIC OF KENYA</span>
      </div>
    </div>
    <div className="w-[230px] p-2 flex items-center justify-end text-right">
      <span className="text-[12px] font-black text-slate-900 leading-tight" dir="rtl">
        إسم المأذون الشرعي الذي عقد النكاح وتوقيعه
      </span>
    </div>
  </div>
);
