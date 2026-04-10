"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { FilePlus, Plus, ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

interface PortalWelcomeBannerProps {
  user: any;
}

export default function PortalWelcomeBanner({ user }: PortalWelcomeBannerProps) {
  const t = useTranslations("Dashboard.portal.welcome");

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative min-h-[300px] md:min-h-[400px] rounded-[16px] overflow-hidden bg-slate-950 p-6 md:p-14 flex items-center shadow-2xl"
    >
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      </div>

      <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center w-full">
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-bold text-[10px] uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              {t("badge")}
            </div>
            <h1 className="text-4xl md:text-6xl font-black font-outfit text-white tracking-tight leading-none">
              {t("salam")}, <span className="text-secondary">{user?.full_name?.split(" ")[0] || t("member")}</span>
            </h1>
            <p className="text-sm md:text-lg text-slate-300 font-medium max-w-md leading-relaxed">
              {t("desc")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/portal/applications/new" className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl">
              <FilePlus size={18} /> {t("newApp")}
            </Link>
            <Link href="/portal/organizations/new" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
              <Plus size={18} /> {t("regInst")}
            </Link>
          </div>
        </div>

        <div className="hidden lg:block relative">
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="bg-white/5 border border-white/10 backdrop-blur-3xl p-8 rounded-[24px] shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-white/60 uppercase tracking-widest">{t("compliance")}</p>
                <p className="text-xl font-black text-white">{t("trustVerified")}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-secondary rounded-full" />
              </div>
              <p className="text-[10px] font-bold text-white/40 text-right">85% {t("completion")}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
