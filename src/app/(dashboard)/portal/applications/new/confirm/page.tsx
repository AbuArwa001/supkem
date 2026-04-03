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
    <div className="min-h-screen bg-slate-50 relative overflow-hidden py-10 px-4 md:px-8 lg:px-12 flex flex-col items-center">
      {/* Decorative Background Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="w-full max-w-6xl animate-in fade-in slide-in-from-bottom-8 duration-700 relative z-10">
        
        {/* Header Section */}
        <div className="mb-12">
          <button
            onClick={() => router.push("/portal/applications")}
            className="group flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold transition-colors mb-8"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm border border-slate-200 flex items-center justify-center group-hover:scale-110 transition-transform">
              <ArrowLeft className="w-4 h-4" />
            </div>
            Back to Applications
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center gap-5">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0b4a2d] to-[#06331e] rounded-2xl flex items-center justify-center shadow-lg shadow-[#0b4a2d]/20 shrink-0">
              <ShieldCheck className="w-8 h-8 text-emerald-100" />
            </div>
            <div>
              <h1 className="text-4xl font-black font-outfit text-slate-800 tracking-tight">Complete Payment</h1>
              <p className="text-slate-500 font-medium text-lg mt-1">
                Review your application details and pay securely via M-Pesa STK push.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Application Info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white/70 backdrop-blur-xl rounded-[32px] shadow-xl shadow-slate-200/40 border border-white overflow-hidden p-8">
              
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center border border-slate-200 text-slate-600">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-outfit text-slate-800 leading-tight">Order Details</h3>
                  <p className="text-xs uppercase tracking-widest font-bold text-slate-400 mt-1">Application Checkout</p>
                </div>
              </div>

               <div className="space-y-8">
                 <div>
                   <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Service Requested</p>
                   <div className="bg-white border border-slate-200 rounded-2xl px-6 py-5 shadow-sm">
                     <p className="text-xl font-black text-slate-800 leading-snug">{serviceName}</p>
                   </div>
                 </div>
                 
                 <div>
                   <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Reference Number</p>
                   <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl px-6 py-4 flex items-center justify-between">
                     <p className="font-mono text-lg font-bold text-slate-700 tracking-wider">
                       {appId || "PENDING"}
                     </p>
                     <Clock className="w-5 h-5 text-slate-400" />
                   </div>
                 </div>

                 {user && (
                 <div>
                   <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-1">Applicant Profile</p>
                   <div className="flex items-center gap-4 px-2">
                     <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center font-black text-xl border border-emerald-100 shrink-0">
                       {user.first_name?.[0]}{user.last_name?.[0]}
                     </div>
                     <div>
                       <p className="font-bold text-slate-800 text-lg leading-tight">{user.first_name} {user.last_name}</p>
                       <p className="text-sm font-medium text-slate-500 mt-1">{user.email}</p>
                     </div>
                   </div>
                 </div>
                 )}
               </div>
            </div>
            
            <div className="flex items-center gap-3 justify-center text-slate-400 bg-white/50 backdrop-blur-md border border-white rounded-2xl py-4 shadow-sm">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-xs font-black tracking-[0.1em] uppercase">256-Bit SSL Encrypted Checkout</span>
            </div>
          </div>

          {/* Right Column: Payment Details */}
          <div className="lg:col-span-7">
            <div className="bg-[#0b4a2d] bg-[url('/payment-bg.png')] bg-cover bg-center bg-blend-soft-light rounded-[40px] shadow-2xl shadow-[#0b4a2d]/30 overflow-hidden relative border border-[#0b4a2d]/50">
              {/* Premium Dark Modal Effects */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#25D366]/10 rounded-full blur-[60px] pointer-events-none" />
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />

              {/* Fee Breakdown */}
              <div className="p-10 border-b border-white/10 relative z-10">
                <h3 className="text-white/60 text-xs font-black uppercase tracking-[0.2em] mb-6">Payment Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm font-semibold text-white/80">
                    <span>Subtotal</span>
                    <span className="text-white">KES {fee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold text-white/80">
                    <span>Service Charge</span>
                    <span className="text-white">KES 0</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-semibold text-white/80">
                    <span>VAT (Included)</span>
                    <span className="text-emerald-300">KES 0</span>
                  </div>
                </div>
                <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-end">
                  <span className="text-white/60 font-black uppercase tracking-widest text-sm mb-1">Total Due</span>
                  <span className="text-5xl font-black text-white font-outfit tracking-tight">KES {fee.toLocaleString()}</span>
                </div>
              </div>

              {/* M-Pesa Interactive Area */}
              <div className="p-10 bg-gradient-to-b from-[#06331e] to-[#01140b] relative z-10 min-h-[380px] flex flex-col justify-center">
                
                {status === "idle" && (
                  <div className="space-y-8 animate-in fade-in duration-500">
                    <div className="flex items-center gap-5">
                      <div className="w-24 h-14 bg-white rounded-2xl shadow-lg border border-white/10 flex items-center justify-center p-3 shrink-0">
                        <img src="/M-PESA_LOGO-01.svg" alt="M-PESA" className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-white tracking-tight">M-Pesa Express</h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="flex w-2 h-2 rounded-full bg-[#25D366] animate-pulse"></span>
                          <p className="text-xs text-white/60 font-bold uppercase tracking-widest">Instant STK Push</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="block text-xs font-black uppercase tracking-[0.1em] text-white/60 ml-2">
                        Mobile Money Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. 0712 345 678"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handlePay()}
                        className="w-full bg-white/5 border border-white/10 rounded-[20px] px-6 py-5 text-xl font-bold text-white focus:bg-white/10 focus:ring-2 focus:ring-[#25D366]/50 focus:border-[#25D366] outline-none transition-all placeholder:text-white/20"
                      />
                    </div>

                    {errorMsg && (
                      <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-sm text-red-400 font-bold">
                        <XCircle className="w-5 h-5 shrink-0 mt-0.5" />
                        <p>{errorMsg}</p>
                      </div>
                    )}

                    <button
                      onClick={handlePay}
                      className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white py-5 px-6 rounded-[20px] font-black text-xl shadow-[0_0_40px_rgba(37,211,102,0.3)] hover:shadow-[0_0_60px_rgba(37,211,102,0.5)] transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <CreditCard className="w-6 h-6" />
                      Pay KES {fee.toLocaleString()} Now
                    </button>
                    
                    <p className="text-[11px] text-center text-white/40 font-bold uppercase tracking-wider mt-2">
                      Prompt sent securely to your device. Pin confirmation required.
                    </p>
                  </div>
                )}

                {status === "initiating" && (
                  <div className="flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                    <div className="relative">
                      <div className="w-20 h-20 bg-[#25D366]/20 rounded-full flex items-center justify-center">
                        <Loader2 className="w-10 h-10 text-[#25D366] animate-spin" />
                      </div>
                      <div className="absolute inset-0 border-2 border-[#25D366]/40 rounded-full animate-ping" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-white">Secure Connection...</h4>
                      <p className="text-white/50 font-medium mt-2 text-lg">Handshaking with Safaricom M-Pesa</p>
                    </div>
                  </div>
                )}

                {status === "waiting" && (
                  <div className="flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-500">
                    <div className="relative">
                      <div className="w-24 h-24 bg-white/10 border border-white/20 rounded-full flex items-center justify-center relative z-10 backdrop-blur-md">
                        <div className="w-16 h-16 border-4 border-t-[#25D366] border-white/10 rounded-full animate-spin" />
                      </div>
                      <div className="absolute inset-0 bg-[#25D366]/20 rounded-full animate-ping z-0" />
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-3xl font-black text-white tracking-tight">Check Your Phone</h4>
                      <p className="text-base font-medium text-white/70 max-w-sm mx-auto leading-relaxed">
                        An M-Pesa prompt has been sent to <strong className="text-white">{phoneNumber}</strong>.<br />
                        Please enter your PIN to authorize payment.
                      </p>
                    </div>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-2 rounded-full border border-white/10 text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/10 transition-all"
                    >
                      Cancel Transaction
                    </button>
                  </div>
                )}

                {status === "success" && (
                  <div className="flex flex-col items-center justify-center text-center space-y-6 animate-in zoom-in duration-500">
                    <div className="w-28 h-28 bg-[#25D366]/20 rounded-full flex items-center justify-center mb-2">
                      <CheckCircle2 className="w-14 h-14 text-[#25D366]" />
                    </div>
                    <div>
                      <h4 className="text-3xl font-black text-white">Payment Successful</h4>
                      <p className="text-white/60 mt-2 font-medium text-lg">Your application is now processing.</p>
                      <div className="mt-8 flex items-center justify-center gap-2 text-[#25D366]">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-xs font-bold uppercase tracking-widest">Redirecting</span>
                      </div>
                    </div>
                  </div>
                )}

                {status === "error" && (
                  <div className="flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center">
                      <XCircle className="w-12 h-12 text-red-500" />
                    </div>
                    <div className="w-full">
                      <h4 className="text-2xl font-black text-white">Transaction Failed</h4>
                      <div className="mt-4 bg-red-500/10 border border-red-500/30 px-6 py-4 rounded-[20px]">
                        <p className="text-red-400 font-bold">{errorMsg}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleRetry}
                      className="w-full bg-white text-[#0b4a2d] hover:bg-slate-100 py-5 px-6 rounded-[20px] font-black text-xl shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                    >
                      Retry Payment
                    </button>
                  </div>
                )}

              </div>
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
