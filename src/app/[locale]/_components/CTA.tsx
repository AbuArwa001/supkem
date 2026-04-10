"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export const CTA = () => {
  const t = useTranslations("Home");

  return (
    <section className="py-32 px-6 bg-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#0B211B] to-transparent -z-10" />
      <div className="max-w-7xl mx-auto relative group">
        <div className="absolute inset-0 bg-primary rounded-[16px] translate-x-3 translate-y-3 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 shadow-[0_40px_80px_-20px_rgba(20,83,45,0.25)]" />
        <div className="relative bg-[#0F172A] rounded-[24px] p-16 lg:p-24 overflow-hidden border border-white/10 shadow-inner">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/15 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <h2 className="text-5xl lg:text-8xl font-black font-outfit text-white leading-[0.9] tracking-tighter">
                {t("cta.heading")} <br />
                <span className="text-secondary italic text-glow tracking-wider">
                  {t("cta.subheading")}
                </span>
              </h2>
              <p className="text-xl text-white/50 leading-relaxed font-medium italic border-l-4 border-primary/40 pl-8 max-w-lg">
                {t("cta.desc")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 lg:justify-end">
              <Link
                href="/register"
                className="px-10 py-6 bg-primary text-white rounded-[12px] font-black text-xl hover:bg-secondary hover:text-primary transition-all flex items-center justify-center gap-3 group shadow-xl shadow-primary/20"
              >
                {t("cta.registerNow")}{" "}
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link
                href="/login"
                className="px-10 py-6 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-[12px] font-black text-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3"
              >
                {t("cta.portalAccess")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
