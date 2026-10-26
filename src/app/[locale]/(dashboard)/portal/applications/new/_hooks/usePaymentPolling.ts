"use client";

import { useEffect } from "react";
import { applicationSubmitService } from "../_services/applicationSubmitService";

export function usePaymentPolling(
  status: string,
  applicationId: string,
  onSuccess: () => void,
  setStatus: (status: any) => void,
  setErrorMsg: (msg: string) => void
) {
  useEffect(() => {
    if (status !== "waiting") return;
    let attempts = 0;
    const interval = setInterval(async () => {
      attempts++;
      try {
        const appData = await applicationSubmitService.getApplication(applicationId);
        if (appData.payment?.status === "Completed") {
          setStatus("success");
          clearInterval(interval);
          setTimeout(onSuccess, 2000);
          return;
        } else if (appData.payment?.status === "Failed") {
          setStatus("error");
          setErrorMsg("Payment failed or was cancelled remotely.");
          clearInterval(interval);
          return;
        }

        if (attempts >= 3 && attempts % 3 === 0) {
          applicationSubmitService.checkPaymentStatus(applicationId).then((res) => {
            if (res?.status === "Completed" || res?.payment?.status === "Completed") {
              setStatus("success");
              clearInterval(interval);
              setTimeout(onSuccess, 2000);
            }
          }).catch(() => {});
        }
      } catch {
        /* keep waiting */
      }
    }, 2500);
    return () => clearInterval(interval);
  }, [status, applicationId, onSuccess, setStatus, setErrorMsg]);
}
