"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function ServicesCTA() {
    const t = useTranslations("ServicesPage.cta");

    return (
        <section className="max-w-5xl mx-auto px-6">
            <div className="premium-gradient p-12 lg:p-20 rounded-[50px] text-white flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
                <div className="space-y-4 max-w-md">
                    <h2 className="text-4xl font-bold font-outfit">{t("heading")}</h2>
                    <p className="text-white/70 font-medium">{t("desc")}</p>
                </div>
                <Link href="/contact" className="px-10 py-5 bg-white text-primary rounded-2xl font-bold text-lg hover:bg-secondary hover:text-white transition-all shadow-xl whitespace-nowrap">
                    {t("contactSupport")}
                </Link>
            </div>
        </section>
    );
}
