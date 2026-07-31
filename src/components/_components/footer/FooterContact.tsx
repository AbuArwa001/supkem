import { Link } from "@/i18n/routing";
import { MapPin, Phone, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

export const FooterContact = () => {
  const t = useTranslations("Footer");

  return (
    <div className="space-y-4">
      <h4 className="font-bold mb-6 text-lg">{t("contactUs")}</h4>
      <div className="flex items-start gap-3 text-sm text-white/70">
        <MapPin size={18} className="text-secondary shrink-0" />
        <span>{t("address")}</span>
      </div>
      <div className="flex items-center gap-3 text-sm text-white/70">
        <Phone size={18} className="text-secondary shrink-0" />
        <Link href="tel:+254202243109" dir="ltr">
          {t("phoneNumber")}
        </Link>
      </div>
      <div className="flex items-center gap-3 text-sm text-white/70">
        <Mail size={18} className="text-secondary shrink-0" />
        <Link href="mailto:info@supkem.org">info@supkem.org</Link>
      </div>
    </div>
  );
};
