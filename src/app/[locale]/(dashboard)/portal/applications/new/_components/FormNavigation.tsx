"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight, ArrowLeft, Loader2, AlertTriangle, ShieldCheck } from "lucide-react";
import { scrollToFirstError } from "../_utils/formScrollUtils";

interface FormNavigationProps {
  step: number;
  loading: boolean;
  isMarriageService: boolean;
  isOtherService: boolean;
  errors?: Record<string, string>;
  onBack: () => void;
  onNext: () => void;
}

export function FormNavigation({
  step,
  loading,
  isMarriageService,
  isOtherService,
  errors = {},
  onBack,
  onNext,
}: FormNavigationProps) {
  const hasMultipleSteps = isMarriageService || isOtherService;
  const isLastStep =
    (isMarriageService && step === 3) ||
    (isOtherService && step === 2) ||
    (!hasMultipleSteps && step === 1);

  const activeErrors = Object.entries(errors).filter(([_, val]) => !!val);
  const hasErrors = activeErrors.length > 0;

  return (
    <div className="pt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 border-t border-slate-200/80">
      <div className="flex items-center gap-4">
        <Link
          href="/portal"
          className="text-slate-400 hover:text-rose-600 font-bold text-sm transition-colors flex items-center gap-2 py-2"
        >
          Cancel Application
        </Link>

        {hasErrors && (
          <button
            type="button"
            onClick={() => scrollToFirstError(errors)}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-bold hover:bg-rose-100/70 transition-all cursor-pointer"
          >
            <AlertTriangle size={13} className="text-rose-500 animate-pulse" />
            <span>{activeErrors.length} required {activeErrors.length === 1 ? "field" : "fields"} incomplete</span>
          </button>
        )}
      </div>

      <div className="flex items-center gap-4 self-end sm:self-auto w-full sm:w-auto justify-between sm:justify-end">
        {hasMultipleSteps && step > 1 && (
          <button
            type="button"
            onClick={onBack}
            className="px-6 sm:px-8 py-4 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900 rounded-2xl font-bold hover:bg-slate-50 transition-all font-outfit shadow-xs flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        )}

        {!isLastStep ? (
          <button
            type="button"
            onClick={onNext}
            className="flex-1 sm:flex-none px-8 sm:px-10 py-4 bg-primary hover:bg-accent text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 flex items-center justify-center gap-3 font-outfit shadow-md group cursor-pointer"
          >
            <span>Next Step</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="flex-1 sm:flex-none px-8 sm:px-12 py-4 sm:py-5 bg-gradient-to-r from-primary to-accent text-white rounded-[24px] font-black text-lg sm:text-xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 flex items-center justify-center gap-3 disabled:opacity-50 disabled:pointer-events-none hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 font-outfit cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={22} />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={22} />
                <span>Complete Submission</span>
                <ArrowRight size={22} />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}
