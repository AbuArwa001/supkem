import { useState, useEffect, useRef, useCallback } from "react";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { parseJwt, refreshAccessToken } from "@/lib/jwt";
import { toast } from "sonner";

export const WARNING_THRESHOLD_SECONDS = 60;

export function useSessionExpiryMonitor() {
  const router = useRouter();
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(WARNING_THRESHOLD_SECONDS);
  const [isExtending, setIsExtending] = useState(false);
  const isLoggingOutRef = useRef(false);

  const normalizedPath = pathname.replace(/^\/(en|ar)/, "") || "/";
  const isDashboardRoute = normalizedPath.startsWith("/admin") || normalizedPath.startsWith("/portal");

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
        handleLogout();
      } else if (timeLeft <= WARNING_THRESHOLD_SECONDS) {
        setSecondsRemaining(Math.max(0, timeLeft));
        setIsOpen(true);
      } else if (isOpen) {
        setIsOpen(false);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isDashboardRoute, handleLogout, isOpen]);

  return {
    isOpen,
    secondsRemaining,
    isExtending,
    handleLogout,
    handleExtendSession,
    progressPercent: Math.min(100, Math.max(0, (secondsRemaining / WARNING_THRESHOLD_SECONDS) * 100)),
  };
}
