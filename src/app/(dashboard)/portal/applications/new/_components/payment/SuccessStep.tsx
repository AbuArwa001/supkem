// External libraries
import { CheckCircle2, Loader2 } from "lucide-react";

export function SuccessStep() {
  return (
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
  );
}
