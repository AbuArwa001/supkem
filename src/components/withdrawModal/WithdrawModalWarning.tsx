import React from "react";
import { AlertTriangle } from "lucide-react";

export function WithdrawModalWarning() {
  return (
    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-medium flex items-start gap-3">
      <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
      <p>
        Withdrawing will cancel further processing by SUPKEM officers. Once withdrawn, this application cannot be un-withdrawn.
      </p>
    </div>
  );
}
