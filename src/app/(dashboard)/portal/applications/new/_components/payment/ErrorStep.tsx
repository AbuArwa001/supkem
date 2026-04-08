// External libraries
import { XCircle } from "lucide-react";

interface ErrorStepProps {
  errorMsg: string;
  onRetry: () => void;
}

export function ErrorStep({ errorMsg, onRetry }: ErrorStepProps) {
  return (
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
        onClick={onRetry}
        className="mt-4 bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 py-3 px-8 rounded-xl font-bold transition-all w-full"
      >
        Try Again
      </button>
    </div>
  );
}
