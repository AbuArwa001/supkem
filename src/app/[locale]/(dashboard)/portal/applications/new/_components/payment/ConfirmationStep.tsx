// External libraries
import { FileText, ChevronRight } from "lucide-react";

interface ConfirmationStepProps {
  serviceName: string;
  serviceFee: number;
  onProceed: () => void;
}

export function ConfirmationStep({ serviceName, serviceFee, onProceed }: ConfirmationStepProps) {
  return (
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
        onClick={onProceed}
        className="w-full bg-[#0b4a2d] text-white py-4 px-6 rounded-2xl font-bold text-lg shadow-xl shadow-[#0b4a2d]/20 hover:scale-[1.02] transition-all flex justify-center items-center gap-2 group"
      >
        Proceed to Pay <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
