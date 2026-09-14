import React, { Suspense } from "react";
import { VerificationContent } from "./_components/VerificationContent";

export const metadata = {
  title: "Document Verification | Supreme Council of Kenya Muslims (SUPKEM)",
  description: "Verify the official authenticity and validity of certificates and letters issued by the Supreme Council of Kenya Muslims.",
};

export default function VerifyPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-8 h-8 border-4 border-emerald-700/20 border-t-emerald-700 rounded-full animate-spin" />
      </div>
    }>
      <VerificationContent />
    </Suspense>
  );
}
