"use client";

import { Sparkles } from "lucide-react";
import { ApplicationStepPipeline } from "./ApplicationStepPipeline";

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

      {maxSteps > 1 && (
        <ApplicationStepPipeline step={step} maxSteps={maxSteps} stepMeta={stepMeta} />
      )}
    </div>
  );
}
