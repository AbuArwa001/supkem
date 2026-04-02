import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, XCircle, FileText, ChevronRight } from "lucide-react";
import { initiatePayment, getApplication } from "./services";
import Image from "next/image";

interface PaymentModalProps {
  applicationId: string;
  serviceName: string;
  serviceFee: number;
  onSuccess: () => void;
  onClose: () => void;
}

export function PaymentModal({ applicationId, serviceName, serviceFee, onSuccess, onClose }: PaymentModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState<"confirmation" | "idle" | "initiating" | "waiting" | "success" | "error">("confirmation");
  const [errorMsg, setErrorMsg] = useState("");

  const handlePay = async () => {
    if (!phoneNumber) {
      setErrorMsg("Please enter an M-Pesa phone number");
      return;
    }
    setErrorMsg("");
    setStatus("initiating");
    try {
      await initiatePayment(applicationId, phoneNumber);
      setStatus("waiting");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.response?.data?.detail || "Failed to initiate M-Pesa push. Try again.");
    }
  };

  const handleCancel = () => {
    setStatus("error");
    setErrorMsg("Payment was cancelled by the user.");
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (status === "waiting") {
      interval = setInterval(async () => {
        try {
          const appData = await getApplication(applicationId);
          if (appData.payment?.status === "Completed") {
            setStatus("success");
            clearInterval(interval);
            setTimeout(() => {
              onSuccess();
            }, 2000);
          } else if (appData.payment?.status === "Failed") {
            setStatus("error");
            setErrorMsg("Payment failed or was cancelled remotely.");
            clearInterval(interval);
          }
        } catch (e) {
          // keep waiting
        }
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [status, applicationId, onSuccess]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-300">
        
        {/* Dynamic Premium Header */}
        <div className="relative h-48 w-full bg-[#06331e] overflow-hidden flex flex-col justify-end p-6 border-b border-white/10">
          <Image 
            src="/payment-bg.png" 
            alt="Payment Background" 
            layout="fill" 
            objectFit="cover" 
            className="opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#06331e] to-transparent opacity-90" />
          
          <div className="relative z-10 flex justify-between items-end">
            <div>
              <p className="text-amber-400 font-bold uppercase tracking-widest text-xs mb-1">
                Secure Checkout
              </p>
              <h3 className="font-black text-2xl text-white">Application Payment</h3>
            </div>
            
            {(status === "confirmation" || status === "idle" || status === "error") && (
              <button 
                onClick={onClose} 
                className="mb-2 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white/70 hover:text-white transition-colors"
                title="Cancel & Close"
              >
                <XCircle className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
        
        <div className="p-8 space-y-8 bg-slate-50 relative">
          
          {/* CONFIRMATION STEP */}
          {status === "confirmation" && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="bg-white p-6 rounded-2xl border border-border/50 shadow-sm space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#0b4a2d]/10 text-[#0b4a2d] rounded-full flex items-center justify-center shrink-0">
                    <FileText size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-500">Service Request</p>
                    <p className="text-lg font-bold text-slate-800">{serviceName}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-dashed border-border/50 flex justify-between items-end">
                  <p className="text-sm font-semibold text-slate-500">Total Payable Amount</p>
                  <p className="text-3xl font-black text-[#0b4a2d]">KES {serviceFee.toLocaleString()}</p>
                </div>
              </div>
              
              <button
                onClick={() => setStatus("idle")}
                className="w-full bg-[#0b4a2d] text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl shadow-[#0b4a2d]/20 hover:scale-[1.02] transition-all flex justify-center items-center gap-2 group"
              >
                Proceed to Pay <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {/* PHONE ENTRY STEP */}
          {status === "idle" && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="text-center space-y-2">
                <p className="text-slate-600 font-medium">
                  Enter your M-Pesa registered number to receive the payment prompt on your phone.
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-border/50 shadow-sm space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">M-Pesa Phone Number</label>
                  <input
                    type="text"
                    placeholder="e.g. 0712345678"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-border/60 rounded-xl px-5 py-4 text-lg font-bold text-slate-800 focus:ring-2 focus:ring-[#0b4a2d] focus:border-[#0b4a2d] outline-none transition-all placeholder:font-normal placeholder:text-slate-400"
                  />
                </div>
                {errorMsg && (
                  <div className="p-3 bg-red-50 text-red-600 text-sm font-medium rounded-lg border border-red-100 flex items-start gap-2">
                    <XCircle className="w-5 h-5 shrink-0" />
                    <p>{errorMsg}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setStatus("confirmation")}
                  className="px-6 py-4 bg-white border border-border text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handlePay}
                  className="flex-1 bg-[#25D366] text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl shadow-[#25D366]/30 hover:scale-[1.02] transition-all"
                >
                  Pay KES {serviceFee.toLocaleString()}
                </button>
              </div>
            </div>
          )}

          {/* INITIATING STEP */}
          {status === "initiating" && (
            <div className="flex flex-col items-center justify-center py-10 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="relative">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-[#25D366] animate-spin" />
                </div>
                <div className="absolute -inset-2 bg-green-50 rounded-full animate-ping opacity-70 -z-10" />
              </div>
              <div className="text-center space-y-1">
                <h4 className="text-xl font-bold text-slate-800">Initiating Push...</h4>
                <p className="text-slate-500 font-medium">Connecting to Safaricom</p>
              </div>
            </div>
          )}

          {/* WAITING STEP */}
          {status === "waiting" && (
            <div className="flex flex-col items-center justify-center py-10 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="relative">
                <div className="w-24 h-24 bg-blue-50 border-[4px] border-blue-100 rounded-full flex items-center justify-center relative z-10">
                  <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                </div>
                <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-50 z-0" />
              </div>
              <div className="text-center space-y-3">
                <h4 className="text-2xl font-black text-slate-800">Awaiting PIN</h4>
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 inline-block">
                  <p className="text-sm text-blue-800 font-medium">
                    A prompt has been sent to <strong>{phoneNumber}</strong>.<br />
                    Please enter your M-Pesa PIN to complete payment.
                  </p>
                </div>
              </div>
              <button onClick={handleCancel} className="text-sm font-bold text-red-500 hover:text-red-700 underline pt-4 transition-colors">
                Cancel Transaction
              </button>
            </div>
          )}

          {/* SUCCESS STEP */}
          {status === "success" && (
            <div className="flex flex-col items-center justify-center py-10 space-y-6 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-14 h-14 text-green-600" />
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-black text-3xl text-green-800">Payment Successful!</h4>
                <p className="font-medium text-slate-600">Your application has been received and queued.</p>
                <div className="pt-4">
                  <Loader2 className="w-5 h-5 text-green-600 animate-spin mx-auto" />
                  <p className="text-xs font-bold text-green-600 uppercase tracking-widest mt-2">Redirecting</p>
                </div>
              </div>
            </div>
          )}

          {/* ERROR STEP */}
          {status === "error" && (
            <div className="flex flex-col items-center justify-center py-10 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <div className="text-center space-y-2 max-w-xs">
                <h4 className="font-black text-2xl text-red-800">Payment Failed</h4>
                <p className="text-sm font-medium text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                  {errorMsg}
                </p>
              </div>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 py-3 px-8 rounded-xl font-bold transition-all w-full"
              >
                Try Again
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
