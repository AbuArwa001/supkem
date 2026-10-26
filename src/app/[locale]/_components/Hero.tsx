"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { HeroSocialBadge } from "./HeroSocialBadge";
import { HeroSlider } from "./hero/HeroSlider";
import { HeroStats } from "./hero/HeroStats";
import { HeroEmblemCard } from "./hero/HeroEmblemCard";

export const Hero = () => {
  const t = useTranslations("Hero");

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden pt-28 pb-20 px-6">
      <HeroSlider />

      <div className="hidden md:block absolute top-28 right-8 rtl:right-auto rtl:left-8 lg:right-14 rtl:lg:left-14 z-30">
        <HeroSocialBadge />
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8 sm:space-y-10"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4 w-full">
            <div className="inline-flex items-center gap-2.5 sm:gap-3 px-4 sm:px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-xs sm:text-sm font-bold tracking-tight shadow-2xl">
              <span className="flex h-2.5 w-2.5 rounded-full bg-secondary animate-ping" />
              {t("badge")}
            </div>
            <div className="md:hidden">
              <HeroSocialBadge />
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-7xl lg:text-9xl font-black font-outfit leading-[0.85] text-white tracking-tighter drop-shadow-2xl">
              {t("heading1")} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-white to-amber-300 italic text-glow">
                {t("heading2")}
              </span>
            </h1>
            <p className="text-2xl lg:text-3xl text-white/90 leading-relaxed max-w-xl font-medium drop-shadow-md">
              {t("desc")}
            </p>
          </div>

          <div className="flex flex-wrap gap-5 pt-4">
            <Link
              href="/register"
              className="px-10 py-5 bg-primary text-white rounded-[24px] font-bold flex items-center gap-3 hover:scale-105 hover:shadow-primary/50 transition-all text-xl shadow-2xl shadow-primary/30 group"
            >
              {t("startReg")}{" "}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white rounded-[24px] font-bold flex items-center gap-3 hover:bg-white/20 transition-all text-xl"
            >
              {t("exploreMission")}
            </Link>
          </div>

          <HeroStats />
        </motion.div>

        <HeroEmblemCard />
      </div>
    </section>
  );
};
