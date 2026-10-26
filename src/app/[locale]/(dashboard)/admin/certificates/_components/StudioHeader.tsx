import React from "react";
import { Award, X } from "lucide-react";

interface StudioHeaderProps {
  onClose: () => void;
}

export function StudioHeader({ onClose }: StudioHeaderProps) {
  return (
    <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50 shrink-0">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-900 text-white rounded-[18px] flex items-center justify-center shadow-lg">
          <Award size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black font-outfit text-slate-900 tracking-tight">
            Document Issuance Studio
          </h3>
          <p className="text-xs font-medium text-slate-500">
            Configure document type, recipient, sender title, and markdown text
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onClose}
        className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 hover:border-slate-300 rounded-full hover:bg-slate-50 transition-all text-slate-400 hover:text-slate-600 shadow-sm"
      >
        <X size={20} />
      </button>
    </div>
  );
}
