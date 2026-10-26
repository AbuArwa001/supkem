"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface DownloadProgressStepTrackProps {
  stepIndex: number;
  steps: string[];
  progress: number;
}

export function DownloadProgressStepTrack({
  stepIndex,
  steps,
  progress,
}: DownloadProgressStepTrackProps) {
  return (
    <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-5">
      <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-700 min-h-[22px]">
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <AnimatePresence mode="wait">
          <motion.span
            key={stepIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            {steps[stepIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="w-full bg-slate-200/80 rounded-full h-2 mt-3 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 rounded-full shadow-xs"
          initial={{ width: "15%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
      <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-1.5 px-0.5">
        <span>Rendering High-Res PDF</span>
        <span>{progress}%</span>
      </div>
    </div>
  );
}
