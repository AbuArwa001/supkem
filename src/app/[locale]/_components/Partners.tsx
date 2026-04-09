"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";

const PARTNERS = [
  { name: "Ministry of Hajj and Umrah", src: "/images/partners/hajj.svg" },
  { name: "Ministry of Islamic Affairs (MOIA)", src: "/images/partners/Saudi_Ministry_of_Islamic_daawah_Affairs_Logo.png" },
  { name: "Muslim World League", src: "/images/partners/mwl.svg" },
  { name: "UAE Embassy Nairobi", src: "/images/partners/uae_flag.svg" },
  { name: "Islamic Development Bank (IsDB)", src: "/images/partners/isdb.png" },
  { name: "Royal Embassy of Saudi Arabia", src: "/images/partners/saudi_flag.svg" },
  { name: "AMREF", src: "/AMREF.png" },
  { name: "UKAID", src: "/UKAID.png" },
  { name: "UNICEF", src: "/UNICEF.png" },
  { name: "The Global Fund", src: "/GLOBAL FUND.png" },
  { name: "Kenya Redcross", src: "/KEENYA REDCROSS.png" },
  { name: "USAID", src: "/USAID.png" },
];

export const Partners = () => {
  const t = useTranslations("Home");

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
