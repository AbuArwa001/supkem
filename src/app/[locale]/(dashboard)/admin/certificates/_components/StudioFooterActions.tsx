import React from "react";
import { Award, Loader2 } from "lucide-react";
import { DocumentType } from "./studioTypes";

interface StudioFooterActionsProps {
  submitForm: (e: React.FormEvent) => void;
  selectedAppId: string;
  isIssuing: boolean;
  hasSuccessMessage: boolean;
  docType: DocumentType;
}

export function StudioFooterActions({
  submitForm,
  selectedAppId,
  isIssuing,
  hasSuccessMessage,
  docType,
}: StudioFooterActionsProps) {
  return (
    <div className="p-6 border-t border-slate-100 bg-slate-50 mt-auto shrink-0 space-y-3">
      <button
        onClick={submitForm}
        disabled={!selectedAppId || isIssuing || hasSuccessMessage}
        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-base hover:bg-emerald-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-slate-900/10 hover:shadow-emerald-600/20 disabled:opacity-50 disabled:hover:bg-slate-900 disabled:hover:shadow-none hover:-translate-y-0.5"
      >
        {isIssuing ? (
          <>
            <Loader2 size={20} className="animate-spin" /> Issuing...
          </>
        ) : (
          <>
            <Award size={20} /> Issue {docType}
          </>
        )}
      </button>
    </div>
  );
}
