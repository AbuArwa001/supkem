import { useEffect, useRef } from "react";
import { applicationSubmitService } from "@/app/[locale]/(dashboard)/portal/applications/new/_services/applicationSubmitService";

interface PollProps {
  appId: string;
  status: string;
  onSuccess: (data: any) => void;
  onError: (msg: string) => void;
}

export function usePaymentPolling({ appId, status, onSuccess, onError }: PollProps) {
  const attemptsRef = useRef(0);

  useEffect(() => {
    if (status !== "waiting") return;
    attemptsRef.current = 0;
    const MAX = 60; // 2 minutes at 2s intervals

    const poll = async () => {
      attemptsRef.current++;
      try {
        if (attemptsRef.current >= 2 && attemptsRef.current % 2 === 0) {
          try {
            await applicationSubmitService.checkPaymentStatus(appId);
          } catch {
            // fallback quietly
          }
        }
        const data = await applicationSubmitService.getApplication(appId);
        const payStatus = (data as any).payment?.status;
        if (payStatus === "Completed") {
          clearInterval(interval);
          onSuccess(data);
        } else if (payStatus === "Failed") {
          clearInterval(interval);
          onError("M-Pesa payment was declined. Check your PIN and balance.");
        } else if (attemptsRef.current >= MAX) {
          clearInterval(interval);
          onError("Payment confirmation timed out. If money was deducted, please contact support with your reference number.");
        }
      } catch { /* silent poll */ }
    };

    // Poll immediately, then every 2 seconds
    poll();
    const interval = setInterval(poll, 2000);
    return () => clearInterval(interval);
  }, [status, appId, onSuccess, onError]);
}
