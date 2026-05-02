import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export const FooterServices = () => {
  const t = useTranslations("Footer");

  return (
    <div>
      <h4 className="font-bold mb-6 text-lg">{t("servicesTitle")}</h4>
      <ul className="space-y-4 text-white/70 text-sm">
        <li>
          <Link
            href="/services/halal-certification"
            className="hover:text-white transition-colors"
          >
            {t("halalCert")}
          </Link>
        </li>
        <li>
          <Link
            href="/services/organization-registration"
            className="hover:text-white transition-colors"
          >
            {t("orgReg")}
          </Link>
        </li>
        <li>
          <Link
            href="/services/educational-programs"
            className="hover:text-white transition-colors"
          >
            {t("eduPrograms")}
          </Link>
        </li>
        <li>
          <Link
            href="/services/social-welfare"
            className="hover:text-white transition-colors"
          >
            {t("socialWelfare")}
          </Link>
        </li>
      </ul>
    </div>
  );
};
