"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface StepMeta {
  number: number;
  title: string;
  subtitle: string;
}

interface ApplicationStepPipelineProps {
  step: number;
  maxSteps: number;
  stepMeta: StepMeta[];
}

export function ApplicationStepPipeline({ step, maxSteps, stepMeta }: ApplicationStepPipelineProps) {
  return (
    <div className="relative">
      <div className="hidden sm:block absolute top-6 left-12 right-12 h-1 bg-slate-100 rounded-full z-0">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((step - 1) / (maxSteps - 1)) * 100}%` }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
        {stepMeta.map((s) => {
          const isDone = step > s.number;
          const isActive = step === s.number;

          return (
            <div
              key={s.number}
              className={cn(
                "flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300",
                isActive
                  ? "bg-white border-2 border-primary shadow-lg shadow-primary/5 ring-4 ring-primary/10"
                  : isDone
                  ? "bg-white/80 border border-slate-200 hover:border-slate-300"
                  : "bg-slate-50/70 border border-slate-200/60 opacity-65"
              )}
            >
              <div
                className={cn(
                  "w-11 h-11 rounded-xl flex items-center justify-center font-black font-outfit text-sm shrink-0 transition-all duration-300",
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/30 scale-105"
                    : isDone
                    ? "bg-emerald-500 text-white shadow-xs"
                    : "bg-white text-slate-400 border border-slate-200"
                )}
              >
                {isDone ? <Check size={18} strokeWidth={3} /> : s.number}
              </div>

              <div className="min-w-0">
                <p
                  className={cn(
                    "text-xs font-black uppercase tracking-wider truncate",
                    isActive ? "text-primary" : isDone ? "text-slate-800" : "text-slate-400"
                  )}
                >
                  {s.title}
                </p>
                <p className="text-[11px] text-slate-400 font-medium truncate mt-0.5">
                  {isDone ? "Completed" : isActive ? "In Progress" : s.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
