"use client";

import { HelpCircle } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function LetterLoadingState() {
  const t = useTranslations("Dashboard.portal.lettersPage");
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      <p className="text-primary/60 font-medium">{t("loadingLetter")}</p>
    </div>
  );
}

interface LetterErrorStateProps {
  error: string;
}

export function LetterErrorState({ error }: LetterErrorStateProps) {
  const t = useTranslations("Dashboard.portal.lettersPage");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
      <div className="w-24 h-24 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
        <HelpCircle size={48} />
      </div>
      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-black font-outfit text-slate-800">{t("letterNotFound")}</h2>
        <p className="text-slate-500 font-medium">{error || t("letterNotFound")}</p>
      </div>
      <button
        onClick={() => router.push("/portal/letters")}
        className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors cursor-pointer"
      >
        {t("backToLetters")}
      </button>
    </div>
  );
}
