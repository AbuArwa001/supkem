// External libraries
import { Loader2 } from "lucide-react";

interface WaitingStepProps {
  phoneNumber: string;
  onCancel: () => void;
}

export function WaitingStep({ phoneNumber, onCancel }: WaitingStepProps) {
  return (
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
      <button
        onClick={onCancel}
        className="text-sm font-bold text-red-500 hover:text-red-700 underline pt-4 transition-colors"
      >
        Cancel Transaction
      </button>
    </div>
  );
}
