import Image from "next/image";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { useTranslations } from "next-intl";

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
      <div className="flex gap-4">
        <Facebook className="w-5 h-5 cursor-pointer hover:text-secondary transition-colors" />
        <Twitter className="w-5 h-5 cursor-pointer hover:text-secondary transition-colors" />
        <Instagram className="w-5 h-5 cursor-pointer hover:text-secondary transition-colors" />
      </div>
    </div>
  );
};
