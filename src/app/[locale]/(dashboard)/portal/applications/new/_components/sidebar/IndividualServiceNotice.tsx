import { Info } from "lucide-react";

export function IndividualServiceNotice() {
  return (
    <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex gap-3">
      <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
      <p className="text-xs text-blue-700/70 font-bold leading-relaxed">
        INDIVIDUAL SERVICE<br />
        This application will be filed under your personal profile.
      </p>
    </div>
  );
}
