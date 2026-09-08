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
        <a
          href="https://www.facebook.com/p/Supreme-Council-of-Kenya-Muslims-100079747610399/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="SUPKEM Facebook"
          className="text-white/80 hover:text-secondary transition-colors"
        >
          <Facebook className="w-5 h-5" />
        </a>
        <a
          href="https://x.com/SUPKEM1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="SUPKEM X (Twitter)"
          className="text-white/80 hover:text-secondary transition-colors"
        >
          <Twitter className="w-5 h-5" />
        </a>
        <a
          href="https://www.instagram.com/supkem_kenya/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="SUPKEM Instagram"
          className="text-white/80 hover:text-secondary transition-colors"
        >
          <Instagram className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};
