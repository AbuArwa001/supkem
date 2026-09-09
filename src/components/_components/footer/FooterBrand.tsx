import Image from "next/image";
import { useTranslations } from "next-intl";
import { FooterSocialLinks } from "./FooterSocialLinks";

export const FooterBrand = () => {
  const t = useTranslations("Footer");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" alt="SUPKEM Logo" width={32} height={32} />
        <span className="text-2xl font-bold tracking-tight">SUPKEM</span>
      </div>
      <p className="text-white/70 text-sm leading-relaxed">
        {t("description")}
      </p>
      <FooterSocialLinks />
    </div>
  );
};
