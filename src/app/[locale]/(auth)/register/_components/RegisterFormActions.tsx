"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

interface RegisterFormActionsProps {
  loading: boolean;
}

export function RegisterFormActions({ loading }: RegisterFormActionsProps) {
  const t = useTranslations("Auth.register");

  return (
    <>
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] hover:bg-right text-white rounded-[24px] font-black text-lg sm:text-xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 flex items-center justify-center gap-3 disabled:opacity-50 transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] cursor-pointer font-outfit"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={22} />
              <span>Creating your account...</span>
            </>
          ) : (
            <>
              <ShieldCheck size={22} />
              <span>{t("completeEnrollment")}</span>
              <ArrowRight size={22} />
            </>
          )}
        </button>
      </div>

      <div className="text-center pt-2 text-slate-400 text-sm font-medium">
        {t("alreadyHaveAccount")}{" "}
        <Link href="/login" className="text-primary font-black hover:underline ml-1">
          {t("loginHere")}
        </Link>
      </div>
    </>
  );
}
