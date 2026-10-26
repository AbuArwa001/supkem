import React from "react";
import { cn } from "@/lib/utils";
import { RECIPIENT_PRESETS } from "./studioTypes";
import { EligibleApplication } from "../_types";

interface StudioLetterMetaProps {
  recipient: string;
  setRecipient: (rec: string) => void;
  subject: string;
  setSubject: (sub: string) => void;
  selectedApp?: EligibleApplication;
}

export function StudioLetterMeta({
  recipient,
  setRecipient,
  subject,
  setSubject,
  selectedApp,
}: StudioLetterMetaProps) {
  return (
    <div className="space-y-4 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
      <div className="space-y-2">
        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">
          Recipient / Addressee
        </label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="e.g. To Whom It May Concern"
          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
        <div className="flex flex-wrap gap-1.5 pt-1">
          {RECIPIENT_PRESETS.map((preset) => (
            <button
              type="button"
              key={preset}
              onClick={() => setRecipient(preset)}
              className={cn(
                "text-[10px] font-bold px-2 py-1 rounded-lg border transition-all",
                recipient === preset
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-slate-600 border-slate-200 hover:border-primary/40"
              )}
            >
              {preset}
            </button>
          ))}
          {selectedApp?.user_name && (
            <button
              type="button"
              onClick={() => setRecipient(selectedApp.user_name || "")}
              className="text-[10px] font-bold px-2 py-1 rounded-lg border bg-white text-slate-600 border-slate-200 hover:border-primary/40"
            >
              Applicant: {selectedApp.user_name}
            </button>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">
          Letter Subject
        </label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. RECOMMENDATION FOR STUDY ABROAD"
          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
        />
      </div>
    </div>
  );
}
