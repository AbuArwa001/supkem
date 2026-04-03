"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, CheckCircle2, XCircle, Phone, ArrowLeft, CreditCard } from "lucide-react";
import api from "@/lib/api";

const initiatePayment = (applicationId: string, phoneNumber: string): Promise<any> =>
  api.post(`/applications/applications/${applicationId}/initiate_payment/`, { phone_number: phoneNumber }).then((res) => res.data);

const getApplication = (applicationId: string): Promise<any> =>
  api.get(`/applications/applications/${applicationId}/`).then((res) => res.data);

function PayPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const appId = searchParams.get("appId") ?? "";
  const serviceName = searchParams.get("service") ?? "Service";
  const fee = Number(searchParams.get("fee") ?? "0");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState<"idle" | "initiating" | "waiting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handlePay = async () => {
    if (!phoneNumber.trim()) {
      setErrorMsg("Please enter your M-Pesa phone number.");
      return;
    }
    setErrorMsg("");
    setStatus("initiating");
    try {
      await initiatePayment(appId, phoneNumber.trim());
      setStatus("waiting");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.response?.data?.detail || "Failed to initiate M-Pesa push. Please try again.");
    }
  };

  const handleCancel = () => {
    setStatus("error");
    setErrorMsg("Payment was cancelled.");
  };

  const handleRetry = () => {
    setStatus("idle");
    setErrorMsg("");
  };

  const handleBack = () => {
    router.push(
      `/portal/applications/new/confirm?appId=${appId}&service=${encodeURIComponent(serviceName)}&fee=${fee}`
    );
  };

  // Poll for payment status
  useEffect(() => {
    if (status !== "waiting") return;
    const interval = setInterval(async () => {
      try {
        const appData = await getApplication(appId);
        const payStatus = appData.payment?.status;
        if (payStatus === "Completed") {
          setStatus("success");
          clearInterval(interval);
          setTimeout(() => {
            router.push(`/portal/applications/${appId}`);
          }, 2500);
        } else if (payStatus === "Failed") {
          setStatus("error");
          setErrorMsg("Payment failed or was rejected. Please try again.");
          clearInterval(interval);
        }
      } catch {
        // keep polling silently
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [status, appId, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* ── IDLE: Phone entry ── */}
        {status === "idle" && (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-[#25D366]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-[#25D366]" />
              </div>
              <h1 className="text-2xl font-black text-slate-800">M-Pesa Payment</h1>
              <p className="text-slate-500 text-sm font-medium">
                Enter your Safaricom number to receive the payment prompt.
              </p>
            </div>

            {/* Summary strip */}
            <div className="bg-[#06331e] text-white rounded-2xl px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-0.5">Paying for</p>
                <p className="font-bold text-sm">{serviceName}</p>
              </div>
              <div className="text-right">
                <p className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-0.5">Total</p>
                <p className="font-black text-xl">KES {fee.toLocaleString()}</p>
              </div>
            </div>

            {/* Phone input card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/80 border border-slate-100 p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                  M-Pesa Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="e.g. 0712 345 678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handlePay()}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-xl font-bold text-slate-800 focus:ring-2 focus:ring-[#25D366] focus:border-[#25D366] outline-none transition-all placeholder:text-slate-300 placeholder:font-normal"
                />
              </div>

              {errorMsg && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-sm text-red-700 font-medium">
                  <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <p>{errorMsg}</p>
                </div>
              )}

              <div className="bg-green-50 border border-green-100 rounded-xl px-4 py-3 text-xs text-green-800 font-medium">
                A push notification will be sent to your phone. Enter your <strong>M-Pesa PIN</strong> to confirm payment.
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handlePay}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1db954] text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl shadow-[#25D366]/30 hover:scale-[1.02] transition-all duration-200"
              >
                <CreditCard className="w-5 h-5" />
                Pay KES {fee.toLocaleString()}
              </button>
              <button
                onClick={handleBack}
                className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 py-3.5 px-6 rounded-2xl font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Confirmation
              </button>
            </div>
          </div>
        )}

        {/* ── INITIATING ── */}
        {status === "initiating" && (
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/80 border border-slate-100 p-12 flex flex-col items-center text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="relative">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-[#25D366] animate-spin" />
              </div>
              <div className="absolute -inset-2 bg-green-50 rounded-full animate-ping opacity-60 -z-10" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-800 mb-1">Connecting...</h2>
              <p className="text-slate-500 font-medium">Sending request to Safaricom M-Pesa</p>
            </div>
          </div>
        )}

        {/* ── WAITING ── */}
        {status === "waiting" && (
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/80 border border-slate-100 p-12 flex flex-col items-center text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="relative">
              <div className="w-24 h-24 bg-blue-50 border-4 border-blue-100 rounded-full flex items-center justify-center relative z-10">
                <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
              </div>
              <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-40 z-0" />
            </div>
            <div className="space-y-3">
              <h2 className="text-2xl font-black text-slate-800">Awaiting Your PIN</h2>
              <div className="bg-blue-50 border border-blue-100 rounded-2xl px-5 py-4 max-w-xs mx-auto">
                <p className="text-sm text-blue-800 font-medium leading-relaxed">
                  A prompt has been sent to <strong>{phoneNumber}</strong>.<br />
                  Please open M-Pesa and enter your PIN to complete payment.
                </p>
              </div>
              <p className="text-xs text-slate-400 font-medium">Checking payment status every 3 seconds…</p>
            </div>
            <button
              onClick={handleCancel}
              className="text-sm font-bold text-red-500 hover:text-red-700 underline transition-colors"
            >
              Cancel Transaction
            </button>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {status === "success" && (
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/80 border border-slate-100 p-12 flex flex-col items-center text-center space-y-6 animate-in zoom-in-95 duration-500">
            <div className="w-28 h-28 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-16 h-16 text-green-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-green-800">Payment Successful!</h2>
              <p className="text-slate-500 font-medium">Your application has been received and is being processed.</p>
            </div>
            <div className="flex flex-col items-center gap-2 pt-2">
              <Loader2 className="w-5 h-5 text-green-600 animate-spin" />
              <p className="text-xs font-bold text-green-600 uppercase tracking-widest">Redirecting to your application…</p>
            </div>
          </div>
        )}

        {/* ── ERROR ── */}
        {status === "error" && (
          <div className="space-y-6 animate-in zoom-in-95 duration-300">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/80 border border-slate-100 p-12 flex flex-col items-center text-center space-y-5">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-black text-red-800">Payment Failed</h2>
                <p className="text-sm font-medium text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 max-w-xs">
                  {errorMsg}
                </p>
              </div>
            </div>
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full bg-[#0b4a2d] hover:bg-[#0a3d25] text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl shadow-[#0b4a2d]/20 hover:scale-[1.02] transition-all duration-200"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push("/portal/applications")}
                className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 py-3.5 px-6 rounded-2xl font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Applications
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0b4a2d] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <PayPageContent />
    </Suspense>
  );
}
