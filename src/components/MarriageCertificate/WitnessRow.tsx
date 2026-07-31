interface WitnessRowProps {
  enLabel: string;
  arLabel: string;
  name: string;
  idNo: string;
  sealRotationClass?: string;
}

export const WitnessRow = ({ enLabel, arLabel, name, idNo, sealRotationClass = "-rotate-12" }: WitnessRowProps) => (
  <div className="border-b border-slate-900 flex divide-x divide-slate-800 min-h-[80px]">
    <div className="w-[230px] p-2 flex flex-col justify-start">
      <span className="text-[9px] font-black uppercase font-sans leading-tight">
        {enLabel}
      </span>
    </div>
    <div className="flex-1 flex divide-x divide-slate-800 relative overflow-hidden">
      <div className="flex-[2] p-2 flex items-center">
        <p className="text-sm font-black uppercase font-mono">{name}</p>
      </div>
      <div className="flex-1 p-2 flex flex-col justify-center border-l border-slate-800 bg-white/20">
        <span className="text-[9px] font-black text-slate-500 uppercase">
          ID: <span className="text-slate-900">{idNo}</span>
        </span>
      </div>
      <div className={`absolute right-4 bottom-2 opacity-[0.15] scale-[2.5] ${sealRotationClass} pointer-events-none translate-x-4`}>
        <div className="w-12 h-12 rounded-full border-2 border-blue-900 flex items-center justify-center text-[10px] font-black text-blue-900">
          SEAL
        </div>
      </div>
    </div>
    <div className="w-[230px] p-2 flex items-center justify-end text-right">
      <span className="text-[12px] font-black text-slate-900 leading-tight" dir="rtl">
        {arLabel}
      </span>
    </div>
  </div>
);
