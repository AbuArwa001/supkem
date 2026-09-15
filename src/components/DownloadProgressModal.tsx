"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, FileText, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";

interface DownloadProgressModalProps {
  isOpen: boolean;
  documentType?: "Certificate" | "Letter";
  title?: string;
  serialNumber?: string;
}

const STEPS_CERT = [
  "Securing document credentials...",
  "Inlining cryptographic signatures & QR verify code...",
  "Rasterizing high-resolution A4 landscape canvas...",
  "Compiling official SUPKEM PDF...",
  "Finalizing download...",
];

const STEPS_LETTER = [
  "Securing letter credentials...",
  "Validating official signatory seal...",
  "Formatting standard A4 portrait letterhead...",
  "Compiling official SUPKEM PDF...",
  "Finalizing download...",
];

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
          {/* Main Card */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.3)] border border-slate-100 p-8 flex flex-col items-center text-center overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -top-24 -left-24 w-52 h-52 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-52 h-52 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            {/* Central Animated Badge */}
            <div className="relative mb-6 mt-2 flex items-center justify-center">
              {/* Outer pulsing ring */}
              <div className="absolute w-28 h-28 rounded-full bg-emerald-500/10 animate-ping duration-1000" />
              
              {/* Spinning dashed ring */}
              <div className="absolute w-24 h-24 rounded-full border-2 border-dashed border-emerald-500/30 animate-[spin_8s_linear_infinite]" />

              {/* Glowing Icon Container */}
              <motion.div
                animate={{
                  y: [0, -4, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.4,
                  ease: "easeInOut",
                }}
                className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-xl shadow-emerald-700/25 border border-white/20"
              >
                {documentType === "Letter" ? (
                  <FileText size={36} className="text-white drop-shadow-md" />
                ) : (
                  <Award size={36} className="text-white drop-shadow-md" />
                )}
                
                {/* Sparkle badge */}
                <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md">
                  <Sparkles size={12} className="animate-pulse" />
                </div>
              </motion.div>
            </div>

            {/* Title & Document Badge */}
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

            {/* Dynamic Stepped Status */}
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

              {/* Progress Track */}
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

            {/* Footer reassurance */}
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
