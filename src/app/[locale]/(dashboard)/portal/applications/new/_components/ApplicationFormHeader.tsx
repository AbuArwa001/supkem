"use client";

import { cn } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface ApplicationFormHeaderProps {
  step: number;
  isMarriageService: boolean;
  isOtherService: boolean;
  selectedServiceName?: string;
}

export function ApplicationFormHeader({
  step,
  isMarriageService,
  isOtherService,
  selectedServiceName,
}: ApplicationFormHeaderProps) {
  const maxSteps = isMarriageService ? 3 : isOtherService ? 2 : 1;

  const stepMeta = [
    { number: 1, title: "Select Service", subtitle: "Choose application" },
    {
      number: 2,
      title: isMarriageService ? "Spousal Particulars" : "Applicant Details",
      subtitle: "Personal information",
    },
    { number: 3, title: "Legal & Review", subtitle: "Witnesses & sign-off" },
  ].filter((s) => s.number <= maxSteps);

  const progressPercent = Math.round((step / maxSteps) * 100);

  return (
    <div className="space-y-8 pb-8 border-b border-slate-200/80">
      {/* Header title and meta */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider">
            <Sparkles size={14} className="text-secondary" />
            <span>Official Accreditation Portal</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-outfit text-slate-900 tracking-tight">
            {selectedServiceName ? `Apply for ${selectedServiceName}` : "New Application"}
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium max-w-2xl">
            Complete the application verified under the Supreme Council of Kenya Muslims (SUPKEM) regulatory guidelines.
          </p>
        </div>

        {/* Progress percent pill */}
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl border border-slate-200/80 shadow-xs shrink-0 self-start md:self-auto">
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Completion</p>
            <p className="text-base font-black font-outfit text-primary">{progressPercent}%</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center border border-primary/10">
            <span className="text-xs font-bold text-primary font-outfit">{step}/{maxSteps}</span>
          </div>
        </div>
      </div>

      {/* Multi-Step Pipeline */}
      {maxSteps > 1 && (
        <div className="relative">
          {/* Connecting track line */}
          <div className="hidden sm:block absolute top-6 left-12 right-12 h-1 bg-slate-100 rounded-full z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${((step - 1) / (maxSteps - 1)) * 100}%`,
              }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 relative z-10">
            {stepMeta.map((s) => {
              const isDone = step > s.number;
              const isActive = step === s.number;
              const isUpcoming = step < s.number;

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
      )}
    </div>
  );
}
