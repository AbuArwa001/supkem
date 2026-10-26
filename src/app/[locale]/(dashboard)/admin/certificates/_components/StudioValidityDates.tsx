import React from "react";
import { Calendar, Infinity as InfinityIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DocumentType } from "./studioTypes";

interface StudioValidityDatesProps {
  docType: DocumentType;
  startDateString: string;
  setStartDateString: (date: string) => void;
  isIndefinite: boolean;
  setIsIndefinite: (indefinite: boolean) => void;
  expiryDateString: string;
  setExpiryDateString: (date: string) => void;
}

const PRESETS = [
  { label: "+6 Months", m: 6 }, { label: "+1 Year", m: 12 },
  { label: "+2 Years", m: 24 }, { label: "+3 Years", m: 36 }, { label: "+5 Years", m: 60 },
];

export function StudioValidityDates({
  docType, startDateString, setStartDateString,
  isIndefinite, setIsIndefinite, expiryDateString, setExpiryDateString,
}: StudioValidityDatesProps) {
  const isCert = docType === "Certificate";

  const applyPreset = (months: number) => {
    const base = startDateString ? new Date(startDateString) : new Date();
    base.setMonth(base.getMonth() + months);
    setExpiryDateString(base.toISOString().split("T")[0]);
  };

  return (
    <div className="space-y-4 p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80">
      <div className="flex items-center justify-between border-b border-slate-200/60 pb-2.5">
        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-700 flex items-center gap-1.5">
          <Calendar size={13} className="text-primary" /> {isCert ? "Certificate Validity Period" : "Letter Issue Date"}
        </label>
        {isCert && (
          <button
            type="button"
            onClick={() => setIsIndefinite(!isIndefinite)}
            className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold transition-all",
              isIndefinite ? "bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-2xs" : "bg-slate-200 text-slate-600 hover:bg-slate-300"
            )}
          >
            <InfinityIcon size={13} /> {isIndefinite ? "Indefinite (No Expiry)" : "Set Expiry Date"}
          </button>
        )}
      </div>

      <div className={cn("grid gap-3.5", isCert ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1")}>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">{isCert ? "Start / Issue Date" : "Issue Date"}</label>
            <button type="button" onClick={() => setStartDateString(new Date().toISOString().split("T")[0])} className="text-[10px] font-bold text-primary hover:underline">Today</button>
          </div>
          <input type="date" value={startDateString} onChange={(e) => setStartDateString(e.target.value)} className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
        </div>

        {isCert && (
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-500">Expiration Date</label>
            {isIndefinite ? (
              <div className="h-[42px] flex items-center gap-2 px-3 bg-emerald-50/60 rounded-xl border border-emerald-200 text-emerald-800 text-xs font-semibold">
                <InfinityIcon size={14} className="text-emerald-600 shrink-0" />
                <span className="truncate">Indefinite (Never Expires)</span>
              </div>
            ) : (
              <input type="date" value={expiryDateString} onChange={(e) => setExpiryDateString(e.target.value)} min={startDateString} className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
            )}
          </div>
        )}
      </div>

      {isCert && !isIndefinite && (
        <div className="pt-1">
          <p className="text-[10px] font-bold text-slate-400 mb-1.5">Quick Duration Presets:</p>
          <div className="flex flex-wrap gap-1.5">
            {PRESETS.map((p) => (
              <button key={p.label} type="button" onClick={() => applyPreset(p.m)} className="text-[10px] font-bold px-2 py-1 rounded-lg border bg-white text-slate-600 border-slate-200 hover:border-primary/40 hover:bg-primary/5 transition-all">
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
