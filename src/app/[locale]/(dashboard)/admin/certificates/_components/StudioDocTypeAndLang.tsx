import React from "react";
import { Award, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { DocumentType, Language } from "./studioTypes";

interface StudioDocTypeAndLangProps {
  docType: DocumentType;
  setDocType: (type: DocumentType) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export function StudioDocTypeAndLang({
  docType,
  setDocType,
  language,
  setLanguage,
}: StudioDocTypeAndLangProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-2">
        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Document Type</label>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setDocType("Certificate")}
            className={cn(
              "flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all",
              docType === "Certificate" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <Award size={14} /> Cert
          </button>
          <button
            type="button"
            onClick={() => setDocType("Letter")}
            className={cn(
              "flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all",
              docType === "Letter" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            <FileText size={14} /> Letter
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Language</label>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setLanguage("en")}
            className={cn(
              "flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all",
              language === "en" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLanguage("ar")}
            className={cn(
              "flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all font-arabic",
              language === "ar" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
            )}
          >
            عربي
          </button>
        </div>
      </div>
    </div>
  );
}
