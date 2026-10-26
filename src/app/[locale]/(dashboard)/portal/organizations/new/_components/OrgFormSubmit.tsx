"use client";

import { ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

interface OrgFormSubmitProps {
  loading: boolean;
}

export function OrgFormSubmit({ loading }: OrgFormSubmitProps) {
  return (
    <div className="pt-4">
      <button
        type="submit"
        disabled={loading}
        className="w-full py-5 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] hover:bg-right text-white rounded-[24px] font-black text-lg sm:text-xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 flex items-center justify-center gap-3 disabled:opacity-50 transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] cursor-pointer font-outfit"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" size={22} />
            <span>Submitting Registration...</span>
          </>
        ) : (
          <>
            <ShieldCheck size={22} />
            <span>Submit Accreditation Application</span>
            <ArrowRight size={22} />
          </>
        )}
      </button>
      <p className="text-center text-xs text-slate-400 mt-4 font-medium">
        By submitting, you certify that all information is accurate and adheres to the SUPKEM constitutional accreditation standards.
      </p>
    </div>
  );
}
