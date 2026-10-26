"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DocumentTypeBannerProps {
  docType: { label: string; icon: any; color: string };
  category?: string;
  serialNumber?: string;
}

export function DocumentTypeBanner({ docType, category, serialNumber }: DocumentTypeBannerProps) {
  const DocIcon = docType.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-center gap-4 p-5 rounded-2xl bg-white border border-slate-100 shadow-sm"
    >
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0", docType.color)}>
        <DocIcon size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Document Type</p>
        <p className="font-black text-slate-800">{docType.label}</p>
      </div>
      {category && (
        <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0">
          {category}
        </span>
      )}
      {serialNumber && (
        <span className="font-mono text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1.5 rounded-xl border border-slate-200 shrink-0">
          {serialNumber}
        </span>
      )}
    </motion.div>
  );
}
