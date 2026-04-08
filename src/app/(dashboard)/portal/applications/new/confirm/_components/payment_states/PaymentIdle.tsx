// External libraries
import { CreditCard, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaymentIdleProps {
  fee: number;
  phoneNumber: string;
  isValid: boolean;
  errorMsg: string;
  onPhoneChange: (val: string) => void;
  onPay: () => void;
}

export function PaymentIdle({ fee, phoneNumber, isValid, errorMsg, onPhoneChange, onPay }: PaymentIdleProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-5">
        <div className="w-24 h-14 bg-white rounded-2xl shadow-lg border border-white/10 flex items-center justify-center p-3 shrink-0">
          <img src="/M-PESA_LOGO-01.svg" alt="M-PESA" className="w-full h-full object-contain" />
        </div>
        <div>
          <h4 className="text-2xl font-black text-white tracking-tight">M-Pesa Express</h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
            <p className="text-xs text-white/60 font-bold uppercase tracking-widest">Instant STK Push</p>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-xs font-black uppercase tracking-[0.1em] text-white/60 ml-2">Mobile Money Number</label>
        <div className="relative">
          <input
            type="tel" inputMode="numeric" placeholder="0712 345 678" maxLength={12}
            value={phoneNumber} onChange={(e) => onPhoneChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onPay()}
            className={cn(
              "w-full bg-white/5 border rounded-[20px] px-6 py-5 pr-14 text-xl font-bold text-white focus:bg-white/10 focus:ring-2 focus:ring-[#25D366]/50 outline-none transition-all placeholder:text-white/20",
              phoneNumber && !isValid ? "border-red-500/50" : isValid ? "border-[#25D366]/50" : "border-white/10"
            )}
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
            {isValid ? (
              <div className="w-7 h-7 rounded-full bg-[#25D366]/20 flex items-center justify-center"><CheckCircle2 className="w-4 h-4 text-[#25D366]" /></div>
            ) : phoneNumber.length > 3 ? (
              <div className="w-7 h-7 rounded-full bg-red-500/20 flex items-center justify-center"><XCircle className="w-4 h-4 text-red-400" /></div>
            ) : null}
          </div>
        </div>
      </div>
      {errorMsg && (
        <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-sm text-red-400 font-bold">
          <XCircle className="w-5 h-5 shrink-0 mt-0.5" /><p>{errorMsg}</p>
        </div>
      )}
      <button onClick={onPay} disabled={!isValid}
        className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] disabled:opacity-40 disabled:cursor-not-allowed text-white py-5 px-6 rounded-[20px] font-black text-xl shadow-[0_0_40px_rgba(37,211,102,0.3)] hover:shadow-[0_0_60px_rgba(37,211,102,0.5)] transform hover:-translate-y-1 transition-all duration-300">
        <CreditCard className="w-6 h-6" /> Pay KES {fee.toLocaleString()} Now
      </button>
    </div>
  );
}
