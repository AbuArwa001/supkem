import React from "react";
import { AlignLeft, Code2, Sparkles, User, Building, Award, Hash, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Language } from "./studioTypes";

interface StudioContentEditorProps {
  language: Language;
  isMarkdown: boolean;
  setIsMarkdown: (val: boolean) => void;
  insertVariable: (key: string) => void;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  customTextEn: string;
  setCustomTextEn: (val: string) => void;
  customTextAr: string;
  setCustomTextAr: (val: string) => void;
}

const VARS = [
  { key: "user_name", label: "Applicant Name", icon: User },
  { key: "organization_name", label: "Organization", icon: Building },
  { key: "service_name", label: "Service Name", icon: Award },
  { key: "ref_number", label: "Ref No", icon: Hash },
  { key: "date", label: "Date", icon: Calendar },
];

export function StudioContentEditor({
  language, isMarkdown, setIsMarkdown, insertVariable,
  textareaRef, customTextEn, setCustomTextEn, customTextAr, setCustomTextAr,
}: StudioContentEditorProps) {
  const isEn = language === "en";

  return (
    <div className="space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          {isEn ? "Body Content (EN)" : "Body Content (AR)"}
        </label>
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg">
          <button type="button" onClick={() => setIsMarkdown(false)} className={cn("px-2 py-1 text-[10px] font-bold rounded-md flex items-center gap-1 transition-all", !isMarkdown ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-700")}>
            <AlignLeft size={11} /> Text
          </button>
          <button type="button" onClick={() => setIsMarkdown(true)} className={cn("px-2 py-1 text-[10px] font-bold rounded-md flex items-center gap-1 transition-all", isMarkdown ? "bg-white text-slate-900 shadow-xs" : "text-slate-500 hover:text-slate-700")}>
            <Code2 size={11} /> Markdown
          </button>
        </div>
      </div>

      <div className="space-y-1.5 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
        <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
          <Sparkles size={11} className="text-secondary" /> Insert Variable:
        </span>
        <div className="flex flex-wrap gap-1">
          {VARS.map(({ key, label, icon: Icon }) => (
            <button key={key} type="button" onClick={() => insertVariable(key)} className="text-[10px] font-bold bg-white hover:bg-primary hover:text-white text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md flex items-center gap-1 transition-colors">
              <Icon size={10} /> {label}
            </button>
          ))}
        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={isEn ? customTextEn : customTextAr}
        onChange={(e) => isEn ? setCustomTextEn(e.target.value) : setCustomTextAr(e.target.value)}
        placeholder={isMarkdown ? "Write Markdown (e.g. **bold**, *italics*, - items, {{user_name}})..." : isEn ? "Enter custom body text (insert {{user_name}})..." : "أضف نصاً مخصصاً هنا..."}
        className={cn("w-full p-3.5 bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-2xl text-xs sm:text-sm text-slate-800 outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all min-h-[140px] resize-y font-mono", !isEn && "text-right font-arabic")}
        dir={isEn ? "ltr" : "rtl"}
      />
      {isMarkdown && (
        <p className="text-[10px] text-slate-400 font-medium">
          💡 Markdown: <code className="bg-slate-100 px-1 py-0.5 rounded">**bold**</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">*italic*</code>, <code className="bg-slate-100 px-1 py-0.5 rounded">- list</code>
        </p>
      )}
    </div>
  );
}
