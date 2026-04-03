"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, Suspense } from "react";
import { 
  FileText, ArrowLeft, ShieldCheck, Clock, CreditCard,
  Loader2, CheckCircle2, XCircle, Phone
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/lib/api";

const initiatePayment = (applicationId: string, phoneNumber: string): Promise<any> =>
  api.post(`/applications/applications/${applicationId}/initiate_payment/`, { phone_number: phoneNumber }).then((res) => res.data);

const getApplication = (applicationId: string): Promise<any> =>
  api.get(`/applications/applications/${applicationId}/`).then((res) => res.data);

function ConfirmPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user } = useAuth();

  const appId = searchParams.get("appId") ?? "";
  const serviceName = searchParams.get("service") ?? "Service";
  const fee = Number(searchParams.get("fee") ?? "0");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState<"idle" | "initiating" | "waiting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (user?.phone_number && !phoneNumber) {
        setPhoneNumber(user.phone_number);
    }
  }, [user, phoneNumber]);

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
    <div className="min-h-[85vh] bg-slate-50/50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => router.push("/portal/applications")}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold transition-colors mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Applications
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#0b4a2d]/10 rounded-2xl flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-[#0b4a2d]" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-slate-800">Complete Payment</h1>
              <p className="text-slate-500 font-medium mt-1">
                Review your application details and pay securely via M-Pesa.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Column: Application Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800">Application Summary</h3>
            <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 overflow-hidden">
               <div className="bg-slate-50 px-8 py-5 flex items-center gap-4 border-b border-slate-200">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-slate-100">
                    <FileText className="w-6 h-6 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Type</p>
                    <p className="text-slate-800 font-bold">Application Checkout</p>
                  </div>
               </div>
               <div className="p-8 space-y-8">
                 <div>
                   <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Service Requested</p>
                   <p className="text-xl font-black text-slate-800">{serviceName}</p>
                 </div>
                 <div>
                   <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Reference Number</p>
                   <p className="font-mono bg-slate-100 text-slate-700 px-4 py-2 rounded-xl inline-block font-bold tracking-wide">
                     {appId || "N/A"}
                   </p>
                 </div>
                 {user && (
                 <div>
                   <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Applicant Profile</p>
                   <p className="font-bold text-slate-700">{user.first_name} {user.last_name}</p>
                   <p className="text-sm font-medium text-slate-500">{user.email}</p>
                 </div>
                 )}
               </div>
            </div>
          </div>

          {/* Right Column: Payment Details */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800">Payment Details</h3>
            
            <div className="bg-white rounded-[24px] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden relative">
              
              {/* Fee Breakdown */}
              <div className="p-8 pb-6 border-b border-dashed border-slate-200 space-y-4 relative z-10 bg-white">
                <div className="flex justify-between items-center text-sm font-semibold text-slate-500">
                  <span>Subtotal</span>
                  <span className="text-slate-700">KES {fee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-semibold text-slate-500">
                  <span>Service Charge</span>
                  <span className="text-slate-700">KES 0</span>
                </div>
                <div className="flex justify-between items-center text-sm font-semibold text-slate-500">
                  <span>VAT (Included)</span>
                  <span className="text-slate-700">KES 0</span>
                </div>
                <div className="pt-5 mt-3 border-t border-slate-100 flex justify-between items-end">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-1">Total Payable</span>
                  <span className="text-4xl font-black text-[#0b4a2d]">KES {fee.toLocaleString()}</span>
                </div>
              </div>

              {/* M-Pesa Interactive Area */}
              <div className="p-8 bg-slate-50 relative min-h-[320px] flex flex-col justify-center">
                
                {status === "idle" && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      {/* M-Pesa styled logo block */}
                      <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-slate-200 flex items-center justify-center p-2">
                        <div className="w-full h-full bg-[#25D366] rounded-xl flex items-center justify-center">
                          <Phone className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-slate-800 tracking-tight">M-Pesa Express</h4>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-0.5">Secure STK Push</p>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2 ml-1">
                        M-pesa Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 0712 345 678"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handlePay()}
                        className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-lg font-black text-slate-800 focus:ring-4 focus:ring-[#25D366]/20 focus:border-[#25D366] outline-none transition-all placeholder:text-slate-300 placeholder:font-medium shadow-sm"
                      />
                    </div>

                    {errorMsg && (
                      <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl text-sm text-red-700 font-bold">
                        <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <p>{errorMsg}</p>
                      </div>
                    )}

                    <button
                      onClick={handlePay}
                      className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white py-4 px-6 rounded-2xl font-black text-lg shadow-xl shadow-[#25D366]/30 hover:scale-[1.02] transition-all duration-200"
                    >
                      <CreditCard className="w-5 h-5" />
                      Pay KES {fee.toLocaleString()}
                    </button>
                    
                    <p className="text-xs text-center text-slate-400 font-bold uppercase tracking-wider mt-2">
                      Prompt sent to your phone. Enter <strong className="text-slate-500">M-Pesa PIN</strong> to confirm.
                    </p>
                  </div>
                )}

                {status === "initiating" && (
                  <div className="flex flex-col items-center justify-center text-center space-y-5 animate-in zoom-in-95 duration-300">
                    <Loader2 className="w-12 h-12 text-[#25D366] animate-spin" />
                    <div>
                      <h4 className="text-lg font-black text-slate-800">Connecting...</h4>
                      <p className="text-sm text-slate-500 font-medium mt-1">Sending request to Safaricom</p>
                    </div>
                  </div>
                )}

                {status === "waiting" && (
                  <div className="flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95 duration-300">
                    <div className="relative">
                      <div className="w-20 h-20 bg-blue-50 border-4 border-blue-100 rounded-full flex items-center justify-center relative z-10">
                        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
                      </div>
                      <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-40 z-0" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-800">Awaiting Your PIN</h4>
                      <p className="text-sm font-medium text-slate-500 mt-2 px-4 leading-relaxed">
                        A prompt has been sent to <strong>{phoneNumber}</strong>.<br />
                        Please enter your M-Pesa PIN to complete payment.
                      </p>
                    </div>
                    <button
                      onClick={handleCancel}
                      className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors mt-2"
                    >
                      Cancel Transaction
                    </button>
                  </div>
                )}

                {status === "success" && (
                  <div className="flex flex-col items-center justify-center text-center space-y-5 animate-in zoom-in-95 duration-300">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-green-800">Payment Successful!</h4>
                      <p className="text-sm text-slate-500 mt-2 font-medium">Your application is being processed.</p>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in-95 duration-300">
                    <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                      <XCircle className="w-10 h-10 text-red-600" />
                    </div>
                    <div className="w-full">
                      <h4 className="text-xl font-black text-red-800">Payment Failed</h4>
                      <p className="text-sm font-bold text-red-600 mt-3 bg-red-50 px-4 py-3 rounded-xl border border-red-100 w-full">{errorMsg}</p>
                    </div>
                    <button
                      onClick={handleRetry}
                      className="w-full bg-white border border-slate-200 text-slate-700 py-4 px-6 rounded-2xl font-black shadow-sm hover:bg-slate-50 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                )}

              </div>
            </div>
            
            <div className="flex items-center gap-2 justify-center text-slate-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-black tracking-widest uppercase">Secure encrypted checkout</span>
            </div>
          </div>
          
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
