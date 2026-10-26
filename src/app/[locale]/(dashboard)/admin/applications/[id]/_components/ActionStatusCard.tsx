import React from "react";
import { ThumbsUp, ThumbsDown, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionStatusCardProps {
  status: string;
  payment?: { status?: string } | null;
  submitting: boolean;
  handleAction: (status: string) => void;
  onOpenStudio: () => void;
}

export function ActionStatusCard({
  status,
  payment,
  submitting,
  handleAction,
  onOpenStudio,
}: ActionStatusCardProps) {
  const isApproved = status === "Approved";
  const isPaymentIncomplete = !payment || payment.status !== "Completed";

  return (
    <div className="p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-[32px] bg-slate-900 text-white shadow-[0_20px_50px_rgb(0,0,0,0.15)] border border-slate-800 space-y-6 sm:space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
      <div className="space-y-4 relative z-10">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Current Status
        </p>
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "w-4 h-4 rounded-full animate-pulse shadow-lg",
              isApproved
                ? "bg-emerald-400 shadow-emerald-400/50"
                : status === "Rejected"
                  ? "bg-rose-400 shadow-rose-400/50"
                  : "bg-amber-400 shadow-amber-400/50",
            )}
          />
          <h3 className="text-2xl sm:text-3xl font-black font-outfit">{status}</h3>
        </div>
      </div>

      {isPaymentIncomplete && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-100 relative z-10 text-sm font-medium">
          <strong className="block text-amber-400 mb-1">⚠️ Payment Incomplete</strong>
          Admin override: You can still process this application even though the payment was not completed by the user.
        </div>
      )}

      <div className="space-y-4 relative z-10">
        {isApproved ? (
          <button
            onClick={onOpenStudio}
            className="w-full py-4 sm:py-5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl sm:rounded-[24px] font-bold text-base sm:text-lg hover:shadow-lg hover:shadow-emerald-500/20 transition-all flex items-center justify-center gap-2"
          >
            <Award size={20} /> Issue Official Document
          </button>
        ) : (
          <>
            <button
              onClick={() => handleAction("Approved")}
              disabled={submitting}
              className="w-full py-4 sm:py-5 bg-white text-slate-900 rounded-2xl sm:rounded-[24px] font-bold text-base sm:text-lg hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10 hover:shadow-emerald-500/20"
            >
              <ThumbsUp size={20} /> Approve Entry
            </button>
            <button
              onClick={() => handleAction("Rejected")}
              disabled={submitting}
              className="w-full py-4 sm:py-5 bg-slate-800 text-white border border-slate-700 rounded-2xl sm:rounded-[24px] font-bold text-base sm:text-lg hover:bg-rose-600 hover:border-rose-600 hover:shadow-lg hover:shadow-rose-600/20 transition-all flex items-center justify-center gap-2"
            >
              <ThumbsDown size={20} /> Reject Submission
            </button>
          </>
        )}
      </div>
    </div>
  );
}
