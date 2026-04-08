// React/Next.js core
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { applicationSubmitService } from "@/app/(dashboard)/portal/applications/new/_services/applicationSubmitService";
import { usePaymentPolling } from "./usePaymentPolling";

type ConfirmStatus = "idle" | "initiating" | "waiting" | "success" | "error";

const formatPhone = (raw: string): string => {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("254") && digits.length > 3) digits = "0" + digits.slice(3);
  digits = digits.slice(0, 10);
  if (digits.length <= 4) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
};

export const isValidPhone = (formatted: string): boolean => /^0(7|1)\d{8}$/.test(formatted.replace(/\D/g, ""));

export function useConfirmPayment(appId: string) {
  const router = useRouter();
  const { user } = useAuth();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState<ConfirmStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [appData, setAppData] = useState<any | null>(null);

  useEffect(() => { if (user?.phone_number && !phoneNumber) setPhoneNumber(formatPhone(user.phone_number)); }, [user, phoneNumber]);

  useEffect(() => {
    if (!appId) return;
    applicationSubmitService.getApplication(appId).then((data) => {
      setAppData(data);
      if ((data as any).payment?.status === "Completed") router.push(`/portal/applications/${appId}/invoice`);
    });
  }, [appId, router]);

  const onPollSuccess = useCallback((data: any) => {
    setAppData(data); setStatus("success");
    setTimeout(() => router.push(`/portal/applications/${appId}/invoice`), 2500);
  }, [appId, router]);

  const onPollError = useCallback((msg: string) => { setStatus("error"); setErrorMsg(msg); }, []);

  usePaymentPolling({ appId, status, onSuccess: onPollSuccess, onError: onPollError });

  const handlePay = async () => {
    if (!isValidPhone(phoneNumber)) { setErrorMsg("Enter a valid Kenyan number."); return; }
    setErrorMsg(""); setStatus("initiating");
    try {
      await applicationSubmitService.initiatePayment(appId, phoneNumber.replace(/\s/g, ""));
      setStatus("waiting");
    } catch (err: any) {
      setStatus("error"); setErrorMsg(err.response?.data?.detail ?? "Failed to initiate M-Pesa push.");
    }
  };

  return {
    phoneNumber, setPhoneNumber: (v: string) => { setErrorMsg(""); setPhoneNumber(formatPhone(v)); },
    status, errorMsg, appData, handlePay, handleRetry: () => { setStatus("idle"); setErrorMsg(""); },
    handleCancel: () => { setStatus("error"); setErrorMsg("Payment was cancelled."); }
  };
}
