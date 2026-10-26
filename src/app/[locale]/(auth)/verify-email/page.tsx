"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { AuthLogoHeader } from "../_components/AuthLogoHeader";
import { VerifyEmailHero } from "./_components/VerifyEmailHero";
import { VerifyEmailLogic } from "./_components/VerifyEmailLogic";

export default function VerifyEmailPage() {
  const t = useTranslations("Auth.verifyEmail");

  return (
    <div className="min-h-screen flex bg-white font-inter">
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 xl:px-32 relative z-10 items-center">
        <div className="w-full max-w-md">
          <AuthLogoHeader size="md" />

          <Suspense fallback={
            <div className="flex flex-col items-center justify-center gap-4">
              <Loader2 className="animate-spin text-primary" size={48} />
              <p className="text-primary font-bold animate-pulse">{t("heading")}...</p>
            </div>
          }>
            <VerifyEmailLogic />
          </Suspense>
        </div>
      </div>

      <VerifyEmailHero />
    </div>
  );
}
