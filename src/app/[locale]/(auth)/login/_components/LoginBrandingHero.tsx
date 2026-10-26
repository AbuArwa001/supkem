import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface StatItem {
  label: string;
  val: string;
}

export function LoginBrandingHero() {
  const t = useTranslations("Auth.login");

  const stats: StatItem[] = [
    { label: t("counties"), val: t("countiesVal") },
    { label: t("organizations"), val: t("organizationsVal") },
    { label: t("impact"), val: t("impactVal") },
  ];

  return (
    <div className="hidden lg:flex flex-1 relative bg-primary overflow-hidden items-center justify-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/20 rounded-full blur-[120px] animate-pulse" />
      </div>
      <div className="relative z-10 p-20 text-center space-y-8 max-w-2xl">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="inline-block p-10 rounded-[50px] bg-white/5 border border-white/10 backdrop-blur-xl mb-4">
          <Image src="/logo.svg" alt="SUPKEM Large Logo" width={160} height={160} className="drop-shadow-2xl" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="space-y-6">
          <h2 className="text-5xl font-bold font-outfit text-white leading-tight">
            {t("advancingUmmah")} <br />
            <span className="text-secondary text-6xl">{t("together")}</span>
          </h2>
          <p className="text-xl text-white/70 leading-relaxed font-light tracking-wide">{t("hubDesc")}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="pt-12 grid grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="space-y-1 border-l border-white/10 pl-4 text-left">
              <p className="text-2xl font-bold text-secondary font-outfit">{stat.val}</p>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/30 text-xs font-bold tracking-[0.3em] uppercase">
        {t("branding")}
      </div>
    </div>
  );
}
