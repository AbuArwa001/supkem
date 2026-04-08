// External libraries
import { Loader2 } from "lucide-react";

export function InitiatingStep() {
  return (
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
  );
}
