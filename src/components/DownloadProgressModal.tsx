"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { STEPS_CERT, STEPS_LETTER } from "./downloadProgress/downloadProgressSteps";
import { DownloadProgressVisualBadge } from "./downloadProgress/DownloadProgressVisualBadge";
import { DownloadProgressStepTrack } from "./downloadProgress/DownloadProgressStepTrack";

interface DownloadProgressModalProps {
  isOpen: boolean;
  documentType?: "Certificate" | "Letter";
  title?: string;
  serialNumber?: string;
}

export function DownloadProgressModal({
  isOpen,
  documentType = "Certificate",
  title,
  serialNumber,
}: DownloadProgressModalProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);
  const steps = documentType === "Letter" ? STEPS_LETTER : STEPS_CERT;

  useEffect(() => {
    if (!isOpen) {
      setStepIndex(0);
      setProgress(15);
      return;
    }

    const stepInterval = setInterval(() => {
      setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 700);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 92) return prev;
        const jump = Math.floor(Math.random() * 14) + 8;
        return Math.min(prev + jump, 92);
      });
    }, 350);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [isOpen, steps.length]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.3)] border border-slate-100 p-8 flex flex-col items-center text-center overflow-hidden"
          >
            <div className="absolute -top-24 -left-24 w-52 h-52 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <DownloadProgressVisualBadge documentType={documentType} />

            <div className="space-y-1.5 mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-800 text-[11px] font-bold tracking-wide uppercase">
                <ShieldCheck size={13} className="text-emerald-600" />
                <span>{documentType === "Letter" ? "Official Letter" : "Official Certificate"}</span>
              </div>
              <h3 className="text-xl font-black font-outfit text-slate-900 tracking-tight">
                {title || (documentType === "Letter" ? "Generating Official Letter" : "Generating Official Certificate")}
              </h3>
              {serialNumber && (
                <p className="text-xs font-mono font-bold text-slate-400 tracking-wider">
                  {serialNumber}
                </p>
              )}
            </div>

            <DownloadProgressStepTrack stepIndex={stepIndex} steps={steps} progress={progress} />

            <p className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-600" />
              Standard A4 • Print-Ready Vector Quality
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
