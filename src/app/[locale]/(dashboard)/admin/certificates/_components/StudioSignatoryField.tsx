import React from "react";
import { cn } from "@/lib/utils";
import { DocumentType, SIGNATORY_PRESETS_LETTER, SIGNATORY_PRESETS_CERT } from "./studioTypes";

interface StudioSignatoryFieldProps {
  docType: DocumentType;
  signatoryTitle: string;
  setSignatoryTitle: (title: string) => void;
}

export function StudioSignatoryField({
  docType,
  signatoryTitle,
  setSignatoryTitle,
}: StudioSignatoryFieldProps) {
  const presets = docType === "Letter" ? SIGNATORY_PRESETS_LETTER : SIGNATORY_PRESETS_CERT;

  return (
    <div className="space-y-2">
      <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
        Signatory / Sender Title
      </label>
      <input
        type="text"
        value={signatoryTitle}
        onChange={(e) => setSignatoryTitle(e.target.value)}
        placeholder={docType === "Letter" ? "Secretary General" : "National Chairman"}
        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
      />
      <div className="flex flex-wrap gap-1.5 pt-1">
        {presets.map((preset) => (
          <button
            type="button"
            key={preset}
            onClick={() => setSignatoryTitle(preset)}
            className={cn(
              "text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all",
              signatoryTitle === preset
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
            )}
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}
