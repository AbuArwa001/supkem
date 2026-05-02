interface SignatureRowProps {
  enLabel: string;
  arLabel: string;
  rotation?: number;
}

export const SignatureRow = ({ enLabel, arLabel, rotation = 0 }: SignatureRowProps) => (
  <div className="border-b border-slate-900 flex divide-x divide-slate-800 min-h-[50px]">
    <div className="w-[200px] p-2 flex flex-col justify-center">
      <span className="text-[9px] font-black uppercase leading-tight">
        {enLabel}
      </span>
    </div>
    <div className="flex-1 p-2 flex items-center justify-center relative">
      <div className="w-32 h-10 border-b border-slate-400 border-dotted" />
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.6]"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <span className="text-3xl font-signature text-blue-700 font-serif italic tracking-tighter">
          Sign
        </span>
      </div>
    </div>
    <div className="w-[200px] p-2 flex items-center justify-end text-right">
      <span className="text-[11px] font-black" dir="rtl">
        {arLabel}
      </span>
    </div>
  </div>
);
