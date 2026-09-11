import { Link } from "@/i18n/routing";
import { Award } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EmptyCertificates() {
  const t = useTranslations("Dashboard.portal.certificatesPage");

  return (
    <div className="bg-white border border-border/50 shadow-sm rounded-[16px] overflow-hidden p-16 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
          <Award size={40} />
        </div>
        <h3 className="text-xl font-black text-slate-800 font-outfit">
          {t("noCerts")}
        </h3>
        <p className="text-slate-500 font-medium text-sm max-w-sm">
          {t("noCertsDesc")}{" "}
          <Link
            href="/portal/letters"
            className="text-primary font-bold hover:underline"
          >
            {t("myLetters")}
          </Link>.
        </p>
        <Link
          href="/portal/applications"
          className="mt-4 px-6 py-3 bg-primary/10 text-primary rounded-xl font-bold hover:bg-primary/20 transition-colors"
        >
          {t("viewApplications")}
        </Link>
      </div>
    </div>
  );
}
