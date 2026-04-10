import { useEffect } from "react";
import { applicationSubmitService } from "@/app/[locale]/(dashboard)/portal/applications/new/_services/applicationSubmitService";

interface PollProps {
  appId: string;
  status: string;
  onSuccess: (data: any) => void;
  onError: (msg: string) => void;
}

export function usePaymentPolling({ appId, status, onSuccess, onError }: PollProps) {
  useEffect(() => {
    if (status !== "waiting") return;
    let attempts = 0;
    const MAX = 40;
    const interval = setInterval(async () => {
      attempts++;
      try {
        const data = await applicationSubmitService.getApplication(appId);
        const payStatus = (data as any).payment?.status;
        if (payStatus === "Completed") {
          clearInterval(interval);
          onSuccess(data);
        } else if (payStatus === "Failed") {
          clearInterval(interval);
          onError("M-Pesa payment was declined. Check your PIN and balance.");
        } else if (attempts >= MAX) {
          clearInterval(interval);
          onError("Payment confirmation timed out. Please refresh.");
        }
      } catch { /* silent poll */ }
    }, 3000);
    return () => clearInterval(interval);
  }, [status, appId, onSuccess, onError]);
}
