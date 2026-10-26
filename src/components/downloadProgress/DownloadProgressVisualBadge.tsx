"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, FileText, Sparkles } from "lucide-react";

interface DownloadProgressVisualBadgeProps {
  documentType: "Certificate" | "Letter";
}

export function DownloadProgressVisualBadge({ documentType }: DownloadProgressVisualBadgeProps) {
  return (
    <div className="relative mb-6 mt-2 flex items-center justify-center">
      <div className="absolute w-28 h-28 rounded-full bg-emerald-500/10 animate-ping duration-1000" />
      <div className="absolute w-24 h-24 rounded-full border-2 border-dashed border-emerald-500/30 animate-[spin_8s_linear_infinite]" />

      <motion.div
        animate={{ y: [0, -4, 0], scale: [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
        className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-xl shadow-emerald-700/25 border border-white/20"
      >
        {documentType === "Letter" ? (
          <FileText size={36} className="text-white drop-shadow-md" />
        ) : (
          <Award size={36} className="text-white drop-shadow-md" />
        )}
        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md">
          <Sparkles size={12} className="animate-pulse" />
        </div>
      </motion.div>
    </div>
  );
}
