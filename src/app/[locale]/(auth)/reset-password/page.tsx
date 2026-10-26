"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { ResetPasswordForm } from "./_components/ResetPasswordForm";
import { ResetPasswordHero } from "./_components/ResetPasswordHero";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex bg-white font-inter">
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 xl:px-32 relative z-10">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-primary" size={48} />
            <p className="text-primary font-bold animate-pulse">Loading Reset Form...</p>
          </div>
        }>
          <ResetPasswordForm />
        </Suspense>
      </div>

      <ResetPasswordHero />
    </div>
  );
}
