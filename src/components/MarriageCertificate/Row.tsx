import { cn } from "@/lib/utils";

export interface RowProps {
  en: string;
  value: string;
  ar: string;
  className?: string;
  superscript?: string;
}

export const Row = ({ en, value, ar, className = "" }: RowProps) => (
  <div
    className={cn(
      "border-b border-slate-900 flex divide-x divide-slate-900 min-h-[34px] text-slate-950",
      className
    )}
  >
    {/* Left: English Label */}
    <div className="w-[190px] sm:w-[210px] p-1.5 px-2 bg-transparent flex items-center shrink-0">
      <span className="text-[11px] font-serif font-normal text-slate-900 leading-snug">
        {en}
      </span>
    </div>

    {/* Center: Value */}
    <div className="flex-1 p-1.5 px-3 flex items-center">
      <p className="text-[12px] sm:text-[13px] font-mono font-bold uppercase tracking-tight text-slate-950 whitespace-pre-wrap">
        {value || ""}
      </p>
    </div>

    {/* Right: Arabic Label */}
    <div className="w-[190px] sm:w-[210px] p-1.5 px-2 bg-transparent flex items-center justify-end text-right shrink-0">
      <span
        className="text-[12px] font-arabic font-bold text-slate-900 leading-tight"
        dir="rtl"
      >
        {ar}
      </span>
    </div>
  </div>
);
