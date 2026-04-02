import { useState, useEffect } from "react";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { initiatePayment, getApplication } from "./services";

interface PaymentModalProps {
  applicationId: string;
  onSuccess: () => void;
  onClose: () => void;
}

export function PaymentModal({ applicationId, onSuccess, onClose }: PaymentModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState<"idle" | "initiating" | "waiting" | "success" | "error">("idle");
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
            setErrorMsg("Payment failed or was cancelled.");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-green-50">
          <h3 className="font-semibold text-lg text-green-900">Complete Payment</h3>
          {(status === "idle" || status === "error") && (
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XCircle className="w-6 h-6" />
            </button>
          )}
        </div>
        
        <div className="p-6 space-y-6">
          {status === "idle" && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">
                To complete your application, please provide an M-Pesa number. An STK push will be sent to this number.
              </p>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">M-Pesa Phone Number</label>
                <input
                  type="text"
                  placeholder="e.g. 0712345678 or 254712345678"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 px-4 py-2 border"
                />
              </div>
              {errorMsg && <p className="text-sm text-red-600">{errorMsg}</p>}
              <button
                onClick={handlePay}
                className="w-full bg-[#0b4a2d] hover:bg-[#0a4027] text-white py-2 px-4 rounded-lg font-medium transition-colors"
              >
                Pay via M-Pesa
              </button>
            </div>
          )}

          {status === "initiating" && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-gray-600 font-medium text-center">Initiating STK Push...</p>
            </div>
          )}

          {status === "waiting" && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="relative">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-medium text-gray-900">Awaiting Payment Confirmation</p>
                <p className="text-sm text-gray-500">Please check your phone and enter your M-Pesa PIN. Do not close this window.</p>
              </div>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center justify-center py-8 space-y-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <div className="text-center space-y-1">
                <p className="font-medium text-xl text-green-800">Payment Successful!</p>
                <p className="text-sm text-gray-600">Redirecting to application details...</p>
              </div>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center justify-center py-6 space-y-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <div className="text-center space-y-2">
                <p className="font-medium text-lg text-red-800">Payment Failed</p>
                <p className="text-sm text-red-600">{errorMsg}</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 bg-gray-100 text-gray-800 hover:bg-gray-200 py-2 px-6 rounded-lg font-medium transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
