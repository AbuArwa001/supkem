import { Link } from "@/i18n/routing";
import { ArrowRight, Loader2 } from "lucide-react";

interface FormNavigationProps {
  step: number;
  loading: boolean;
  isMarriageService: boolean;
  isOtherService: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function FormNavigation({
  step,
  loading,
  isMarriageService,
  isOtherService,
  onBack,
  onNext,
}: FormNavigationProps) {
  const hasMultipleSteps = isMarriageService || isOtherService;
  const isLastStep = (isMarriageService && step === 3) || (isOtherService && step === 2) || (!hasMultipleSteps && step === 1);

  return (
    <div className="pt-10 flex items-center justify-between gap-6 border-t border-border">
      <Link
        href="/portal"
        className="text-slate-400 font-bold hover:text-primary transition-colors flex items-center gap-2"
      >
        Cancel Application
      </Link>
      <div className="flex items-center gap-4">
        {hasMultipleSteps && step > 1 && (
          <button
            type="button"
            onClick={onBack}
            className="px-8 py-4 bg-white border border-border text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all font-outfit"
          >
            Back
          </button>
        )}

        {!isLastStep ? (
          <button
            type="button"
            onClick={onNext}
            className="px-10 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-3 font-outfit"
          >
            Next Step <ArrowRight size={20} />
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="px-12 py-5 bg-primary text-white rounded-[28px] font-black text-xl shadow-2xl shadow-primary/30 flex items-center gap-3 disabled:opacity-30 disabled:pointer-events-none hover:scale-105 transition-all font-outfit"
          >
            {loading ? <Loader2 className="animate-spin" /> : <>Complete Submission <ArrowRight size={22} /></>}
          </button>
        )}
      </div>
    </div>
  );
}
