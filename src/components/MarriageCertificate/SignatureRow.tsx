interface SignatureRowProps {
  enLabel: string;
  arLabel: string;
  signatureStyle?: "style1" | "style2";
}

export const SignatureRow = ({ enLabel, arLabel, signatureStyle = "style1" }: SignatureRowProps) => (
  <div className="border-b border-slate-900 flex divide-x divide-slate-900 min-h-[38px] text-slate-950">
    <div className="w-[190px] sm:w-[210px] p-1.5 px-2 flex items-center shrink-0">
      <span className="text-[11px] font-serif font-normal text-slate-900 leading-snug">
        {enLabel}
      </span>
    </div>

    <div className="flex-1 p-1 px-4 flex items-center relative overflow-hidden">
      {/* Authentic simulated cursive signature */}
      <div className="flex items-center">
        {signatureStyle === "style1" ? (
          <svg className="w-28 h-7 text-blue-900 fill-none stroke-current stroke-[1.5]" viewBox="0 0 120 30">
            <path d="M5 22 C 15 5, 25 28, 35 12 C 45 8, 48 24, 60 18 C 72 12, 85 25, 95 10 C 105 18, 115 15, 118 20" />
            <path d="M25 15 L 75 14" strokeWidth="1" />
          </svg>
        ) : (
          <svg className="w-28 h-7 text-blue-900 fill-none stroke-current stroke-[1.5]" viewBox="0 0 120 30">
            <path d="M8 18 C 20 8, 25 25, 40 10 C 50 20, 65 5, 78 22 C 90 10, 100 16, 112 12" />
            <path d="M12 24 C 40 22, 70 23, 105 20" strokeWidth="1.2" />
          </svg>
        )}
      </div>
    </div>

    <div className="w-[190px] sm:w-[210px] p-1.5 px-2 flex items-center justify-end text-right shrink-0">
      <span className="text-[12px] font-arabic font-bold text-slate-900 leading-tight" dir="rtl">
        {arLabel}
      </span>
    </div>
  </div>
);
