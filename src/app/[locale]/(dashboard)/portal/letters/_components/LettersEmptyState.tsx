"use client";

import { Link } from "@/i18n/routing";
import { Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export function LettersEmptyState() {
  const t = useTranslations("Dashboard.portal.lettersPage");

  return (
    <div className="bg-white border border-border/50 shadow-sm rounded-[16px] overflow-hidden p-16 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
          <Mail size={40} />
        </div>
        <h3 className="text-xl font-black text-slate-800 font-outfit">{t("noLetters")}</h3>
        <p className="text-slate-500 font-medium text-sm max-w-sm">{t("noLettersDesc")}</p>
        <Link
          href="/portal/applications/new"
          className="mt-4 px-6 py-3 bg-primary/10 text-primary rounded-xl font-bold hover:bg-primary/20 transition-colors"
        >
          {t("newApp")}
        </Link>
      </div>
    </div>
  );
}

export function LettersSkeleton() {
  return (
    <div className="bg-white border border-border/50 shadow-sm rounded-[16px] overflow-hidden p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((skeleton) => (
          <div key={skeleton} className="border border-border/50 rounded-2xl p-6 h-48 animate-pulse bg-slate-50/50">
            <div className="w-12 h-12 bg-slate-200 rounded-xl mb-4" />
            <div className="space-y-3">
              <div className="h-5 w-3/4 bg-slate-200 rounded-lg" />
              <div className="h-4 w-1/2 bg-slate-100 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
