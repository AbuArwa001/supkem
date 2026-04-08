// External libraries
import { XCircle } from "lucide-react";

interface PhoneEntryStepProps {
  phoneNumber: string;
  serviceFee: number;
  errorMsg: string;
  onPhoneChange: (value: string) => void;
  onBack: () => void;
  onPay: () => void;
}

export function PhoneEntryStep({
  phoneNumber,
  serviceFee,
  errorMsg,
  onPhoneChange,
  onBack,
  onPay,
}: PhoneEntryStepProps) {
  return (
    <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
      <p className="text-slate-600 font-medium text-center">
        Enter your M-Pesa registered number to receive the payment prompt on your phone.
      </p>
      <div className="bg-white p-6 rounded-2xl border border-border/50 shadow-sm space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            M-Pesa Phone Number
          </label>
          <input
            type="text"
            placeholder="e.g. 0712345678"
            value={phoneNumber}
            onChange={(e) => onPhoneChange(e.target.value)}
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
          onClick={onBack}
          className="px-6 py-4 bg-white border border-border text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onPay}
          className="flex-1 bg-[#25D366] text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl shadow-[#25D366]/30 hover:scale-[1.02] transition-all"
        >
          Pay KES {serviceFee.toLocaleString()}
        </button>
      </div>
    </div>
  );
}
