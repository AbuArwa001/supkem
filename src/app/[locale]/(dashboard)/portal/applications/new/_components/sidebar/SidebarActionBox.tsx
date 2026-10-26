"use client";

import { ArrowRight, ArrowLeft, ShieldCheck, Sparkles, Loader2, Lock } from "lucide-react";
import { useLocale } from "next-intl";

interface SidebarActionBoxProps {
  step: number;
  maxSteps: number;
  isLastStep: boolean;
  loading: boolean;
  onNext?: () => void;
  onBack?: () => void;
}

export function SidebarActionBox({
  step,
  maxSteps,
  isLastStep,
  loading,
  onNext,
  onBack,
}: SidebarActionBoxProps) {
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <div className="p-6 rounded-[24px] bg-gradient-to-b from-white to-slate-50/90 border border-slate-200/90 shadow-xl shadow-slate-200/60 space-y-4 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-emerald-500 to-accent" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none -translate-y-8 translate-x-8" />

      <div className="flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
          <Sparkles size={12} className="text-secondary animate-pulse" />
          <span>{isLastStep ? (isAr ? "المرحلة النهائية" : "Final Step") : (isAr ? `الخطوة ${step} من ${maxSteps}` : `Step ${step} of ${maxSteps}`)}</span>
        </div>
        <span className="text-[11px] font-bold text-slate-400">
          {isLastStep ? (isAr ? "جاهز للإرسال" : "Ready to submit") : (isAr ? "المتابعة للبيانات" : "Ready to proceed")}
        </span>
      </div>

      <div className="pt-1">
        {!isLastStep ? (
          <div className="flex items-center gap-3">
            {step > 1 && onBack && (
              <button
                type="button"
                onClick={onBack}
                className="py-4 px-4 sm:px-5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-black font-outfit text-sm rounded-2xl transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer hover:scale-105 active:scale-95 shadow-xs"
              >
                <ArrowLeft size={18} className="rtl:rotate-180" /><span className="hidden sm:inline">{isAr ? "رجوع" : "Back"}</span>
              </button>
            )}
            <button
              type="button"
              onClick={onNext}
              className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-primary via-emerald-600 to-accent hover:opacity-95 text-white font-black text-base font-outfit shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer border border-white/20 group"
            >
              <span>{isAr ? "المتابعة للخطوة التالية" : "Next Step"}</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1.5" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            {step > 1 && onBack && (
              <button
                type="button"
                onClick={onBack}
                disabled={loading}
                className="py-4 px-4 sm:px-5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-black font-outfit text-sm rounded-2xl transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer hover:scale-105 active:scale-95 shadow-xs disabled:opacity-50"
              >
                <ArrowLeft size={18} className="rtl:rotate-180" /><span className="hidden sm:inline">{isAr ? "رجوع" : "Back"}</span>
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-primary to-accent hover:opacity-95 text-white font-black text-base font-outfit shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer border border-white/20 disabled:opacity-50 disabled:pointer-events-none group"
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={20} /><span>{isAr ? "جاري المعالجة..." : "Processing..."}</span></>
              ) : (
                <><ShieldCheck size={20} className="text-emerald-200" /><span>{isAr ? "إكمال وتقديم الطلب" : "Complete Submission"}</span><ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1.5" /></>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-1.5 pt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        <Lock size={12} className="text-emerald-600" />
        <span>{isAr ? "إجراء رسمي آمن ومعتمد من سوبكيم" : "Official SUPKEM Secure Accreditation"}</span>
      </div>
    </div>
  );
}
