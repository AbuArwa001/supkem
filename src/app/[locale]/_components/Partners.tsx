"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const Partners = () => {
  const t = useTranslations("Home");

  const PARTNERS = [
    { name: t("partners.hajj"), src: "/images/partners/hajj.svg" },
    { name: t("partners.moia"), src: "/images/partners/Saudi_Ministry_of_Islamic_daawah_Affairs_Logo.png" },
    { name: t("partners.mwl"), src: "/images/partners/mwl.svg" },
    { name: t("partners.uae"), src: "/images/partners/uae_flag.svg" },
    { name: t("partners.isdb"), src: "/images/partners/isdb.png" },
    { name: t("partners.saudi"), src: "/images/partners/saudi_flag.svg" },
    { name: t("partners.amref"), src: "/AMREF.png" },
    { name: t("partners.ukaid"), src: "/UKAID.png" },
    { name: t("partners.unicef"), src: "/UNICEF.png" },
    { name: t("partners.globalfund"), src: "/GLOBAL FUND.png" },
    { name: t("partners.redcross"), src: "/KEENYA REDCROSS.png" },
    { name: t("partners.usaid"), src: "/USAID.png" },
  ];

  return (
    <section className="py-24 border-y border-slate-100 bg-[#F8FAFC] grainy-bg">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <p className="text-center text-[11px] font-black uppercase tracking-[0.5em] text-primary/40 mb-16">
          {t("partners.subtitle")}
        </p>
        <div className="flex flex-wrap justify-center lg:justify-between gap-16 items-center">
          {PARTNERS.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ opacity: 1, scale: 1.1, filter: "grayscale(0%)" }}
              className="relative w-40 h-20 grayscale brightness-110 contrast-125 transition-all duration-500"
            >
              <Image src={p.src} alt={p.name} fill className="object-contain" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
