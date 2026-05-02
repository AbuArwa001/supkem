import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export const FooterBottom = () => {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
      <p>
        © {currentYear} SUPKEM. {t("rightsReserved")}
      </p>
      <div className="flex gap-6 uppercase tracking-widest">
        <Link href="/privacy-policy" className="hover:text-white">
          {t("privacyPolicy")}
        </Link>
        <Link href="/terms-of-service" className="hover:text-white">
          {t("termsOfService")}
        </Link>
      </div>
    </div>
  );
};
