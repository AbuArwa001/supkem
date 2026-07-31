import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export const FooterQuickLinks = () => {
  const t = useTranslations("Footer");

  return (
    <div>
      <h4 className="font-bold mb-6 text-lg">{t("quickLinks")}</h4>
      <ul className="space-y-4 text-white/70 text-sm">
        <li>
          <Link href="/about" className="hover:text-white transition-colors">
            {t("aboutUs")}
          </Link>
        </li>
        <li>
          <Link href="/services" className="hover:text-white transition-colors">
            {t("ourServices")}
          </Link>
        </li>
        <li>
          <Link href="/#strategic-focus" className="hover:text-white transition-colors">
            {t("strategicFocus")}
          </Link>
        </li>
        <li>
          <Link href="/news" className="hover:text-white transition-colors">
            {t("latestNews")}
          </Link>
        </li>
      </ul>
    </div>
  );
};
