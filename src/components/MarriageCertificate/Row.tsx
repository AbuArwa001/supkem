import { cn } from "@/lib/utils";

export interface RowProps {
  en: string;
  value: string;
  ar: string;
  className?: string;
}

export const Row = ({ en, value, ar, className = "" }: RowProps) => (
  <div
    className={cn(
      "border-b border-slate-900 flex divide-x divide-slate-800 min-h-[42px]",
      className,
    )}
  >
    <div className="w-[190px] p-2 bg-slate-100/30 flex items-center">
      <span className="text-[10px] font-bold text-slate-800 uppercase leading-tight font-sans tracking-tighter">
        {en}
      </span>
    </div>
    <div className="flex-1 p-2 flex items-center px-4">
      <p className="text-sm font-black text-slate-900 uppercase font-mono tracking-tight whitespace-pre-wrap">
        {value || ""}
      </p>
    </div>
    <div className="w-[190px] p-2 bg-slate-100/30 flex items-center justify-end text-right">
      <span
        className="text-[12px] font-black text-slate-900 leading-tight"
        dir="rtl"
      >
        {ar}
      </span>
    </div>
  </div>
);
