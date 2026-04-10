// React/Next.js core
import { useState, useEffect } from "react";

// Internal — payment step components
import { PaymentModalHeader } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/payment/PaymentModalHeader";
import { ConfirmationStep } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/payment/ConfirmationStep";
import { PhoneEntryStep } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/payment/PhoneEntryStep";
import { InitiatingStep } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/payment/InitiatingStep";
import { WaitingStep } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/payment/WaitingStep";
import { SuccessStep } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/payment/SuccessStep";
import { ErrorStep } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/payment/ErrorStep";
import { applicationSubmitService } from "@/app/[locale]/(dashboard)/portal/applications/new/_services/applicationSubmitService";

type PaymentStatus = "confirmation" | "idle" | "initiating" | "waiting" | "success" | "error";

interface PaymentModalProps {
  applicationId: string;
  serviceName: string;
  serviceFee: number;
  onSuccess: () => void;
  onClose: () => void;
}

export function PaymentModal({ applicationId, serviceName, serviceFee, onSuccess, onClose }: PaymentModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState<PaymentStatus>("confirmation");
  const [errorMsg, setErrorMsg] = useState("");

  const handlePay = async () => {
    if (!phoneNumber) { setErrorMsg("Please enter an M-Pesa phone number"); return; }
    setErrorMsg("");
    setStatus("initiating");
    try {
      await applicationSubmitService.initiatePayment(applicationId, phoneNumber);
      setStatus("waiting");
    } catch (err: unknown) {
      const apiError = err as { response?: { data?: { detail?: string } } };
      setStatus("error");
      setErrorMsg(apiError.response?.data?.detail ?? "Failed to initiate M-Pesa push. Try again.");
    }
  };

  // Poll payment status every 3 seconds while waiting
  useEffect(() => {
    if (status !== "waiting") return;
    const interval = setInterval(async () => {
      try {
        const appData = await applicationSubmitService.getApplication(applicationId);
        if (appData.payment?.status === "Completed") {
          setStatus("success");
          clearInterval(interval);
          setTimeout(onSuccess, 2000);
        } else if (appData.payment?.status === "Failed") {
          setStatus("error");
          setErrorMsg("Payment failed or was cancelled remotely.");
          clearInterval(interval);
        }
      } catch { /* keep waiting */ }
    }, 3000);
    return () => clearInterval(interval);
  }, [status, applicationId, onSuccess]);

  const canClose = ["confirmation", "idle", "error"].includes(status);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
        <PaymentModalHeader showCloseButton={canClose} onClose={onClose} />
        <div className="p-8 space-y-8 bg-slate-50 relative">
          {status === "confirmation" && (
            <ConfirmationStep serviceName={serviceName} serviceFee={serviceFee} onProceed={() => setStatus("idle")} />
          )}
          {status === "idle" && (
            <PhoneEntryStep
              phoneNumber={phoneNumber} serviceFee={serviceFee} errorMsg={errorMsg}
              onPhoneChange={setPhoneNumber} onBack={() => setStatus("confirmation")} onPay={handlePay}
            />
          )}
          {status === "initiating" && <InitiatingStep />}
          {status === "waiting" && (
            <WaitingStep phoneNumber={phoneNumber} onCancel={() => { setStatus("error"); setErrorMsg("Payment was cancelled by the user."); }} />
          )}
          {status === "success" && <SuccessStep />}
          {status === "error" && <ErrorStep errorMsg={errorMsg} onRetry={() => setStatus("idle")} />}
        </div>
      </div>
    </div>
  );
}
