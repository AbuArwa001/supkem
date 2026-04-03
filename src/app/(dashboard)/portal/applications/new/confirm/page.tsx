"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { FileText, ChevronRight, ArrowLeft, ShieldCheck, Clock, CreditCard } from "lucide-react";

function ConfirmPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const appId = searchParams.get("appId") ?? "";
  const serviceName = searchParams.get("service") ?? "Service";
  const fee = Number(searchParams.get("fee") ?? "0");

  const handleProceed = () => {
    router.push(
      `/portal/applications/new/pay?appId=${appId}&service=${encodeURIComponent(serviceName)}&fee=${fee}`
    );
  };

  const handleCancel = () => {
    router.push("/portal/applications");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-[#0b4a2d]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-[#0b4a2d]" />
          </div>
          <h1 className="text-2xl font-black text-slate-800">Review & Confirm</h1>
          <p className="text-slate-500 text-sm font-medium">
            Please review your application details before proceeding to payment.
          </p>
        </div>

        {/* Confirmation Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/80 border border-slate-100 overflow-hidden">

          {/* Card Header */}
          <div className="bg-[#06331e] px-6 py-4 flex items-center gap-3">
            <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center">
              <FileText className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <p className="text-amber-400 text-xs font-bold uppercase tracking-widest">Application Summary</p>
              <p className="text-white font-bold text-sm">Order Confirmation</p>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 space-y-5">

            {/* Service */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">Service Requested</p>
                <p className="text-base font-bold text-slate-800">{serviceName}</p>
              </div>
            </div>

            {/* Application ID */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-0.5">Application ID</p>
                <p className="text-base font-mono font-bold text-slate-700">{appId}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-dashed border-slate-200" />

            {/* Total Fee */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-slate-400" />
                <span className="text-sm font-bold text-slate-500">Total Payable Amount</span>
              </div>
              <p className="text-3xl font-black text-[#0b4a2d]">
                KES {fee.toLocaleString()}
              </p>
            </div>

            {/* Info badge */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3 text-xs text-amber-800 font-medium">
              Payment is processed securely via <strong>M-Pesa STK Push</strong>. Ensure your phone is on and reachable.
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleProceed}
            className="w-full flex items-center justify-center gap-2 bg-[#0b4a2d] hover:bg-[#0a3d25] text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl shadow-[#0b4a2d]/20 hover:scale-[1.02] transition-all duration-200 group"
          >
            Proceed to Payment
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={handleCancel}
            className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 py-3.5 px-6 rounded-2xl font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Cancel & Go to Applications
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#0b4a2d] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ConfirmPageContent />
    </Suspense>
  );
}
