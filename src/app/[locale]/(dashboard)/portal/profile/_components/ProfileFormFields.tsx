"use client";

import { User, Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProfileFormFieldsProps {
  formData: {
    first_name: string;
    middle_name: string;
    last_name: string;
    phone_number: string;
  };
  email?: string;
  onChange: (field: string, value: string) => void;
}

export function ProfileFormFields({ formData, email, onChange }: ProfileFormFieldsProps) {
  const t = useTranslations("Dashboard.portal.profilePage");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-3">
        <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">{t("firstName")}</label>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
          <input
            value={formData.first_name}
            onChange={(e) => onChange("first_name", e.target.value)}
            className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bold text-primary"
            placeholder={t("firstName")}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">{t("middleName")}</label>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
          <input
            value={formData.middle_name}
            onChange={(e) => onChange("middle_name", e.target.value)}
            className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bold text-primary"
            placeholder={t("middleName")}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">{t("lastName")}</label>
        <div className="relative group">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
          <input
            value={formData.last_name}
            onChange={(e) => onChange("last_name", e.target.value)}
            className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bold text-primary"
            placeholder={t("lastName")}
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">{t("email")}</label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
          <input disabled value={email || ""} className="w-full bg-primary/[0.01] border border-border rounded-2xl py-4 pl-12 pr-4 opacity-50 cursor-not-allowed font-bold text-primary" />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">{t("phone")}</label>
        <div className="relative group">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
          <input
            value={formData.phone_number}
            onChange={(e) => onChange("phone_number", e.target.value)}
            className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bold text-primary"
            placeholder="+254 7XX XXX XXX"
          />
        </div>
      </div>
    </div>
  );
}
