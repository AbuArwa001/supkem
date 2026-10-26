import React from "react";
import { Ban, Loader2 } from "lucide-react";

export function WithdrawModalActions({
  isLoading,
  onClose,
}: {
  isLoading: boolean;
  onClose: () => void;
}) {
  return (
    <div className="flex items-center justify-end gap-3 pt-2">
      <button
        type="button"
        onClick={onClose}
        disabled={isLoading}
        className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs uppercase tracking-wider transition-all"
      >
        Cancel
      </button>
      <button
        type="submit"
        disabled={isLoading}
        className="px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-rose-600/20 transition-all flex items-center gap-2 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Withdrawing...
          </>
        ) : (
          <>
            <Ban size={16} />
            Confirm Withdrawal
          </>
        )}
      </button>
    </div>
  );
}
