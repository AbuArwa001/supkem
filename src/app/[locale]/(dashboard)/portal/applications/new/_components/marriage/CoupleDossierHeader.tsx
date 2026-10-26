"use client";

import { Sparkles } from "lucide-react";

interface CoupleDossierHeaderProps {
  husbandName?: string;
  husbandAge?: string;
  wifeName?: string;
  wifeAge?: string;
}

export function CoupleDossierHeader({
  husbandName,
  husbandAge,
  wifeName,
  wifeAge,
}: CoupleDossierHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 p-6 sm:p-7 text-white border border-emerald-500/20 shadow-2xl shadow-emerald-950/20">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-black uppercase tracking-wider">
            <Sparkles size={12} className="text-amber-400" />
            <span>Muslim Marriage Registration (Nikah)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-outfit text-white tracking-tight">
            Couple&apos;s Legal Particulars
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl">
            Switch between the Groom and Bride sections below. All details are saved in real time and verified against SUPKEM Sharia records.
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/15 flex items-center gap-3 shrink-0 shadow-inner">
          <div className="text-right">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Groom</span>
            <p className="text-sm font-black font-outfit text-white truncate max-w-[110px] sm:max-w-[130px]">
              {husbandName || "Enter Groom"}
            </p>
            <span className="text-[11px] text-emerald-400 font-bold">
              {husbandAge ? `${husbandAge} yrs` : "—"}
            </span>
          </div>

          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 text-slate-950 flex items-center justify-center font-bold text-sm shadow-md shrink-0">
            💍
          </div>

          <div className="text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Bride</span>
            <p className="text-sm font-black font-outfit text-white truncate max-w-[110px] sm:max-w-[130px]">
              {wifeName || "Enter Bride"}
            </p>
            <span className="text-[11px] text-rose-400 font-bold">
              {wifeAge ? `${wifeAge} yrs` : "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
