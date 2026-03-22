import React from "react";
import { HelpCircle } from "lucide-react";

interface CertificateErrorProps {
  error: string;
  onReturn: () => void;
}

/**
 * Error state component for the certificate detail page.
 */
export function CertificateError({ error, onReturn }: CertificateErrorProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
      <div className="w-24 h-24 rounded-lgbg-red-50 text-red-500 flex items-center justify-center">
        <HelpCircle size={48} />
      </div>
      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-black font-outfit text-slate-800">
          Certificate Record Not Found
        </h2>
        <p className="text-slate-500 font-medium">
          {error ||
            "The requested certificate registry record could not be retrieved."}
        </p>
      </div>
      <button
        onClick={onReturn}
        className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors"
      >
        Return to Registry
      </button>
    </div>
  );
}
