import { Clock, LogOut, RefreshCw, Sparkles } from "lucide-react";
import { DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface SessionExpiryModalContentProps {
  secondsRemaining: number;
  progressPercent: number;
  isExtending: boolean;
  onLogout: () => void;
  onExtend: () => void;
}

export function SessionExpiryModalContent({
  secondsRemaining,
  progressPercent,
  isExtending,
  onLogout,
  onExtend,
}: SessionExpiryModalContentProps) {
  return (
    <>
      <div className="w-12 h-1.5 bg-slate-200/80 rounded-full mx-auto mt-3 mb-1 sm:hidden shrink-0" />

      <div className="bg-slate-900 p-5 sm:p-7 text-white relative overflow-hidden text-center shrink-0">
        <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/15 rounded-full blur-3xl -mt-10 -mr-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl -mb-10 -ml-10 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative mb-2 sm:mb-3">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30 shadow-inner">
              <Clock className="w-7 h-7 sm:w-8 sm:h-8 animate-pulse text-rose-400" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500" />
            </span>
          </div>

          <DialogTitle className="text-xl sm:text-2xl font-black uppercase tracking-tight font-outfit text-white">
            Session <span className="text-rose-400">Expiring Soon</span>
          </DialogTitle>
          <DialogDescription className="text-slate-400 font-medium text-xs mt-1 max-w-xs px-2">
            To protect your account data, your current session will automatically end.
          </DialogDescription>
        </div>
      </div>

      <div className="p-5 sm:p-7 space-y-4 sm:space-y-6 text-center overflow-y-auto">
        <div className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-rose-50/80 border border-rose-100 shadow-sm relative overflow-hidden">
          <div
            className="absolute bottom-0 left-0 h-1.5 bg-rose-500 transition-all duration-1000 ease-linear rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
          <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-rose-600 mb-0.5">
            Time Remaining To Refresh
          </span>
          <div className="text-4xl sm:text-5xl font-black font-outfit text-rose-600 tracking-tight flex items-baseline gap-1 my-1">
            <span className="tabular-nums font-mono">{secondsRemaining}</span>
            <span className="text-sm sm:text-base font-bold text-rose-400">sec</span>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1 leading-relaxed">
            Tap <strong className="text-slate-700">&quot;Stay Logged In&quot;</strong> to save your active work and continue without interruption.
          </p>
        </div>

        <div className="flex flex-col-reverse sm:flex-row items-center gap-2.5 sm:gap-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-0">
          <button
            type="button"
            onClick={onLogout}
            className="w-full sm:w-1/2 min-h-[48px] sm:h-12 py-3 px-4 rounded-2xl border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <LogOut className="w-4 h-4 text-slate-400" />
            <span>Log Out Now</span>
          </button>

          <button
            type="button"
            onClick={onExtend}
            disabled={isExtending}
            className="w-full sm:w-1/2 min-h-[50px] sm:h-12 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-60"
          >
            {isExtending ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Refreshing...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Stay Logged In</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
