"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";

export const HeroEmblemCard = () => {
  const t = useTranslations("Hero");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="relative hidden lg:block"
    >
      <div className="relative z-10 p-1.5 bg-gradient-to-br from-white/30 to-transparent rounded-[64px] backdrop-blur-xl shadow-2xl">
        <div className="bg-white/90 backdrop-blur-sm rounded-[60px] overflow-hidden aspect-[4/5] flex flex-col items-center justify-center p-16 text-center shadow-inner relative group/card">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
          <div className="relative mb-12 group">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors animate-pulse" />
            <Image
              src="/logo.svg"
              alt="SUPKEM Logo"
              width={240}
              height={240}
              className="relative z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-700 ease-out"
            />
          </div>
          <h3 className="text-5xl font-black font-outfit text-primary mb-2 tracking-tight">
            SUPKEM
          </h3>
          <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 leading-relaxed max-w-[220px] mx-auto">
            {t("council")}
          </p>
          <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100/90 border border-slate-200/90 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
              Apex Muslim Leadership
            </span>
          </div>
        </div>
      </div>

      <motion.div
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -z-10"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], x: [0, 50, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] -z-10"
      />
    </motion.div>
  );
};
