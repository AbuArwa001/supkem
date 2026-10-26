"use client";

import { useState } from "react";
import { PaymentModalHeader } from "./payment/PaymentModalHeader";
import { ConfirmationStep } from "./payment/ConfirmationStep";
import { PhoneEntryStep } from "./payment/PhoneEntryStep";
import { InitiatingStep } from "./payment/InitiatingStep";
import { WaitingStep } from "./payment/WaitingStep";
import { SuccessStep } from "./payment/SuccessStep";
import { ErrorStep } from "./payment/ErrorStep";
import { applicationSubmitService } from "../_services/applicationSubmitService";
import { usePaymentPolling } from "../_hooks/usePaymentPolling";

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

  usePaymentPolling(status, applicationId, onSuccess, setStatus, setErrorMsg);

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
