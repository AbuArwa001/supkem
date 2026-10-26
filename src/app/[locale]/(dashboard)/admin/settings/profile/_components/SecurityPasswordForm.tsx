import React from "react";
import { Lock } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { useTranslations } from "next-intl";

export function SecurityPasswordForm() {
  const t = useTranslations("Dashboard.admin.settings.profile");

  return (
    <div className="p-10 rounded-[24px] bg-white border border-border shadow-sm space-y-10">
      <div className="flex items-center gap-4 text-primary">
        <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center shrink-0">
          <Lock size={28} />
        </div>
        <h3 className="text-2xl font-bold font-outfit">{t("security")}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">
            {t("currentPassword")}
          </label>
          <PasswordInput className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 px-6 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" />
        </div>
        <div className="space-y-3">
          <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">
            {t("newPassword")}
          </label>
          <PasswordInput className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 px-6 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" />
        </div>
      </div>

      <div className="pt-6">
        <button
          type="button"
          className="px-10 py-4 border-2 border-primary text-primary rounded-[24px] font-extrabold text-sm hover:bg-primary hover:text-white transition-all flex items-center gap-3 cursor-pointer"
        >
          {t("changePassword")}
        </button>
      </div>
    </div>
  );
}
