"use client";

// React/Next.js core
import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";

// Internal — hook, step components
import { useConfirmPayment, isValidPhone } from "./_hooks/useConfirmPayment";
import { OrderDetailsCard } from "./_components/OrderDetailsCard";
import { PaymentPanel } from "./_components/PaymentPanel";
import { useAuth } from "@/hooks/useAuth";

function ConfirmPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const appId = searchParams.get("appId") ?? "";
  const serviceName = searchParams.get("service") ?? "Service";
  const fee = Number(searchParams.get("fee") ?? "0");
  const displayRef = appId ? `APP-${appId.split("-").pop()?.toUpperCase()}` : "PENDING";

  const payment = useConfirmPayment(appId);

  return (
    <div
      className="min-h-screen relative overflow-hidden py-10 px-4 md:px-8 lg:px-12 flex flex-col items-center"
      style={{ backgroundImage: "url('/payment-bg.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed" }}
    >
      <div className="absolute inset-0 bg-[#01200f]/80 backdrop-blur-[2px] pointer-events-none z-0" />

      <div className="w-full max-w-6xl animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10">
        <div className="mb-12">
          <button
            onClick={() => router.push("/portal/applications")}
            className="group flex items-center gap-2 text-white/60 hover:text-white font-bold transition-colors mb-8"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/20 transition-all">
              <ArrowLeft className="w-4 h-4 text-white" />
            </div>
            Back to Applications
          </button>

          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-lg shrink-0">
              <ShieldCheck className="w-8 h-8 text-emerald-300" />
            </div>
            <div>
              <h1 className="text-4xl font-black font-outfit text-white tracking-tight drop-shadow-lg">Secure Checkout</h1>
              <p className="text-white/60 font-medium text-lg mt-1">Review your application and pay securely via M-Pesa STK push.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-5">
            <OrderDetailsCard
              serviceName={serviceName} displayRef={displayRef}
              appData={payment.appData} user={user}
            />
          </div>
          <div className="lg:col-span-7">
            <PaymentPanel
              fee={fee} phoneNumber={payment.phoneNumber} status={payment.status}
              errorMsg={payment.errorMsg} isValidPhone={isValidPhone}
              onPhoneChange={payment.setPhoneNumber} onPay={payment.handlePay}
              onCancel={payment.handleCancel} onRetry={payment.handleRetry}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-8 h-8 border-4 border-[#0b4a2d] border-t-transparent rounded-full animate-spin" /></div>}>
      <ConfirmPageContent />
    </Suspense>
  );
}
