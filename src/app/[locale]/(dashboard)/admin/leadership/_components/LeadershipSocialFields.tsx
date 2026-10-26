"use client";

import { Linkedin, Twitter, Facebook } from "lucide-react";
import { useTranslations } from "next-intl";

interface LeadershipSocialFieldsProps {
  linkedinUrl: string;
  twitterUrl: string;
  facebookUrl: string;
  onChange: (field: string, val: string) => void;
}

export function LeadershipSocialFields({
  linkedinUrl,
  twitterUrl,
  facebookUrl,
  onChange,
}: LeadershipSocialFieldsProps) {
  const t = useTranslations("Dashboard.admin.leadership");

  return (
    <div className="space-y-6 pt-6 border-t border-border/50">
      <p className="text-[11px] font-black text-primary/40 uppercase tracking-[0.3em]">{t("socialLabel")}</p>

      <div className="grid grid-cols-1 gap-4">
        <div className="relative">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            <Linkedin size={18} />
          </div>
          <input
            value={linkedinUrl}
            onChange={(e) => onChange("linkedin_url", e.target.value)}
            placeholder={t("linkedinPlaceholder")}
            className="w-full ltr:pl-14 rtl:pr-14 ltr:pr-6 rtl:pl-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all text-sm"
          />
        </div>

        <div className="relative">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            <Twitter size={18} />
          </div>
          <input
            value={twitterUrl}
            onChange={(e) => onChange("twitter_url", e.target.value)}
            placeholder={t("twitterPlaceholder")}
            className="w-full ltr:pl-14 rtl:pr-14 ltr:pr-6 rtl:pl-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all text-sm"
          />
        </div>

        <div className="relative">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">
            <Facebook size={18} />
          </div>
          <input
            value={facebookUrl}
            onChange={(e) => onChange("facebook_url", e.target.value)}
            placeholder={t("facebookPlaceholder")}
            className="w-full ltr:pl-14 rtl:pr-14 ltr:pr-6 rtl:pl-6 py-4 bg-primary/[0.02] border border-border focus:border-primary/20 rounded-2xl outline-none font-medium text-primary transition-all text-sm"
          />
        </div>
      </div>
    </div>
  );
}
