"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, ShieldAlert, LogOut, RefreshCw, Sparkles } from "lucide-react";
import { parseJwt, refreshAccessToken } from "@/lib/jwt";
import { toast } from "sonner";

const WARNING_THRESHOLD_SECONDS = 30; // Show warning modal when 30 seconds or less remain

export function SessionExpiryWarningModal() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(30);
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
    } catch (err) {
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
      if (!token) {
        // No token, don't show warning
        return;
      }

      const payload = parseJwt(token);
      if (!payload || !payload.exp) {
        return;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      const timeLeft = payload.exp - currentTime;

      if (timeLeft <= 0) {
        // Token has expired completely and user did not extend
        handleLogout();
      } else if (timeLeft <= WARNING_THRESHOLD_SECONDS) {
        // Show modal and update remaining countdown
        setSecondsRemaining(Math.max(0, timeLeft));
        setIsOpen(true);
      } else {
        // Token was refreshed or still has plenty of time
        if (isOpen) {
          setIsOpen(false);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isDashboardRoute, handleLogout, isOpen]);

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent
        className="max-w-md p-0 overflow-hidden border-none shadow-2xl rounded-3xl bg-white z-[9999]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        {/* Header with animated pulse and timer badge */}
        <div className="bg-slate-900 p-7 text-white relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/10 rounded-full blur-3xl -mt-10 -mr-10" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative mb-3">
              <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center border border-rose-500/30">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500" />
              </span>
            </div>

            <DialogTitle className="text-2xl font-black uppercase tracking-tight font-outfit text-white">
              Session <span className="text-rose-400">Expiring Soon</span>
            </DialogTitle>
            <DialogDescription className="text-slate-400 font-medium text-xs mt-1 max-w-xs">
              For your security, your session will automatically terminate due to inactivity.
            </DialogDescription>
          </div>
        </div>

        {/* Body countdown display */}
        <div className="p-7 space-y-6 text-center">
          <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-rose-50/70 border border-rose-100/80">
            <span className="text-[11px] font-black uppercase tracking-widest text-rose-600 mb-1">
              Time Remaining
            </span>
            <div className="text-5xl font-black font-outfit text-rose-600 tracking-tight flex items-baseline gap-1">
              <span>{secondsRemaining}</span>
              <span className="text-base font-bold text-rose-400">sec</span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-2">
              Click &quot;Stay Logged In&quot; to keep your work and extend your session.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleLogout}
              className="w-full sm:w-1/2 h-12 rounded-xl border-slate-200 text-slate-600 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 hover:text-slate-900"
            >
              <LogOut className="w-4 h-4 mr-1.5 text-slate-400" />
              Log Out Now
            </Button>

            <Button
              type="button"
              onClick={handleExtendSession}
              disabled={isExtending}
              className="w-full sm:w-1/2 h-12 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/20 flex items-center justify-center"
            >
              {isExtending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Extending...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-1.5" />
                  Stay Logged In
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
