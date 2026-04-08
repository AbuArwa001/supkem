// Internal — state components
import { PaymentIdle } from "./payment_states/PaymentIdle";
import { PaymentProcessing, PaymentWaiting, PaymentSuccess, PaymentError } from "./payment_states/PaymentFeedback";

type PaymentStatus = "idle" | "initiating" | "waiting" | "success" | "error";

interface Props {
  fee: number; phoneNumber: string; status: PaymentStatus; errorMsg: string;
  isValidPhone: (p: string) => boolean; onPhoneChange: (v: string) => void;
  onPay: () => void; onCancel: () => void; onRetry: () => void;
}

export function PaymentPanel({ fee, phoneNumber, status, errorMsg, isValidPhone, onPhoneChange, onPay, onCancel, onRetry }: Props) {
  return (
    <div className="bg-black/30 backdrop-blur-xl rounded-[20px] shadow-2xl overflow-hidden relative border border-white/20">
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/10 rounded-full blur-[60px] pointer-events-none" />
      <div className="p-10 border-b border-white/10 relative z-10">
        <h3 className="text-white/60 text-xs font-black uppercase tracking-[0.2em] mb-6">Payment Summary</h3>
        <div className="space-y-3 text-sm font-semibold text-white/80">
          <div className="flex justify-between"><span>Subtotal</span><span className="text-white">KES {fee.toLocaleString()}</span></div>
          <div className="flex justify-between"><span>Service Charge</span><span className="text-white">KES 0</span></div>
        </div>
        <div className="pt-6 mt-6 border-t border-white/10 flex justify-between items-end">
          <span className="text-white/60 font-black uppercase tracking-widest text-sm">Total Due</span>
          <span className="text-5xl font-black text-white font-outfit tracking-tight">KES {fee.toLocaleString()}</span>
        </div>
      </div>

      <div className="p-10 bg-gradient-to-b from-[#06331e] to-[#01140b] relative z-10 min-h-[380px] flex flex-col justify-center">
        {status === "idle" && <PaymentIdle fee={fee} phoneNumber={phoneNumber} isValid={isValidPhone(phoneNumber)} errorMsg={errorMsg} onPhoneChange={onPhoneChange} onPay={onPay} />}
        {status === "initiating" && <PaymentProcessing title="Secure Connection..." sub="Handshaking with Safaricom M-Pesa" />}
        {status === "waiting" && <PaymentWaiting phone={phoneNumber} onCancel={onCancel} />}
        {status === "success" && <PaymentSuccess />}
        {status === "error" && <PaymentError msg={errorMsg} onRetry={onRetry} />}
      </div>
    </div>
  );
}
