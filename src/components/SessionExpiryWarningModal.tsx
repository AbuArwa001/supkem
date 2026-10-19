"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Clock, ShieldAlert, LogOut, RefreshCw, Sparkles, CheckCircle2 } from "lucide-react";
import { parseJwt, refreshAccessToken } from "@/lib/jwt";
import { toast } from "sonner";

// Warn user with 60 seconds (1 minute) remaining so mobile users have ample time to tap
const WARNING_THRESHOLD_SECONDS = 60;

export function SessionExpiryWarningModal() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(WARNING_THRESHOLD_SECONDS);
  const [isExtending, setIsExtending] = useState(false);

  const isLoggingOutRef = useRef(false);

  // Normalize pathname to check if user is in an authenticated dashboard route
  const normalizedPath = pathname.replace(/^\/(en|ar)/, "") || "/";
  const isDashboardRoute =
    normalizedPath.startsWith("/admin") || normalizedPath.startsWith("/portal");

  const handleLogout = useCallback(() => {
    if (isLoggingOutRef.current) return;
    isLoggingOutRef.current = true;
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    setIsOpen(false);
    toast.error("Your session has expired. Please sign in again.");
    router.push("/login");
  }, [router]);

  const handleExtendSession = async () => {
    setIsExtending(true);
    try {
      const newAccess = await refreshAccessToken();
      if (newAccess) {
        setIsOpen(false);
        toast.success("Session successfully extended.");
      } else {
        handleLogout();
      }
    } catch {
      handleLogout();
    } finally {
      setIsExtending(false);
    }
  };

  useEffect(() => {
    // Only monitor on dashboard routes when authenticated
    if (!isDashboardRoute) {
      setIsOpen(false);
      return;
    }

    const interval = setInterval(() => {
      const token = Cookies.get("access_token");
      if (!token) return;

      const payload = parseJwt(token);
      if (!payload || !payload.exp) return;

      const currentTime = Math.floor(Date.now() / 1000);
      const timeLeft = payload.exp - currentTime;

      if (timeLeft <= 0) {
        // Token has expired completely
        handleLogout();
      } else if (timeLeft <= WARNING_THRESHOLD_SECONDS) {
        setSecondsRemaining(Math.max(0, timeLeft));
        setIsOpen(true);
      } else {
        if (isOpen) {
          setIsOpen(false);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isDashboardRoute, handleLogout, isOpen]);

  if (!isOpen) return null;

  // Percentage for circular or linear timer representation
  const progressPercent = Math.min(100, Math.max(0, (secondsRemaining / WARNING_THRESHOLD_SECONDS) * 100));

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent
        className="fixed inset-x-0 bottom-0 top-auto translate-x-0 translate-y-0 sm:left-[50%] sm:top-[50%] sm:bottom-auto sm:translate-x-[-50%] sm:translate-y-[-50%] w-full sm:max-w-md p-0 overflow-hidden border-none shadow-2xl rounded-t-[28px] sm:rounded-3xl bg-white z-[9999] max-h-[92vh] flex flex-col focus:outline-none"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* Mobile handle indicator */}
        <div className="w-12 h-1.5 bg-slate-200/80 rounded-full mx-auto mt-3 mb-1 sm:hidden shrink-0" />

        {/* Header with animated elements */}
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

        {/* Live Timer Countdown & Progress bar */}
        <div className="p-5 sm:p-7 space-y-4 sm:space-y-6 text-center overflow-y-auto">
          <div className="flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl bg-rose-50/80 border border-rose-100 shadow-sm relative overflow-hidden">
            {/* Visual timer bar that decreases */}
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

          {/* Action buttons with high touch targets for phones */}
          <div className="flex flex-col-reverse sm:flex-row items-center gap-2.5 sm:gap-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:pb-0">
            <button
              type="button"
              onClick={handleLogout}
              className="w-full sm:w-1/2 min-h-[48px] sm:h-12 py-3 px-4 rounded-2xl border border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <LogOut className="w-4 h-4 text-slate-400" />
              <span>Log Out Now</span>
            </button>

            <button
              type="button"
              onClick={handleExtendSession}
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
      </DialogContent>
    </Dialog>
  );
}
