"use client";

import { useTranslations } from "next-intl";

export const HeroStats = () => {
  const t = useTranslations("Hero");

  return (
    <div className="flex items-center gap-10 pt-10">
      <div className="space-y-1">
        <p className="text-4xl font-black font-outfit text-white">{t("countiesVal")}</p>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
          {t("counties")}
        </p>
      </div>
      <div className="w-px h-10 bg-white/20" />
      <div className="space-y-1">
        <p className="text-4xl font-black font-outfit text-white">{t("organizationsVal")}</p>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
          {t("organizations")}
        </p>
      </div>
    </div>
  );
};
