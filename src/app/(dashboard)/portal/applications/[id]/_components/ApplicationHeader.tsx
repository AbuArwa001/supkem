"use client";

import { ArrowLeft } from "lucide-react";

interface ApplicationHeaderProps {
  id: string;
  submittedAt: string;
  onBack: () => void;
}

export const ApplicationHeader = ({ id, submittedAt, onBack }: ApplicationHeaderProps) => {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={onBack}
        className="p-3 bg-white border border-border/50 rounded-2xl hover:bg-slate-50 hover:shadow-sm transition-all group"
      >
        <ArrowLeft
          size={20}
          className="text-slate-600 group-hover:-translate-x-1 transition-transform"
        />
      </button>
      <div>
        <h1 className="text-3xl font-black font-outfit text-primary tracking-tight">
          Application Details
        </h1>
        <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
          <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest text-slate-500">
            #{id.substring(0, 8).toUpperCase()}
          </span>
          <span>{new Date(submittedAt).toLocaleString()}</span>
        </p>
      </div>
    </div>
  );
};
