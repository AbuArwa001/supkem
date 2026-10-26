import React from "react";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { useTranslations } from "next-intl";

export function ResetPasswordHero() {
  const t = useTranslations("Auth.resetPassword");

  return (
    <div className="hidden lg:flex flex-1 relative bg-primary overflow-hidden items-center justify-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] animate-pulse" />
      </div>

      <div className="relative z-10 p-20 text-center space-y-8 max-w-2xl text-white">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="inline-block p-10 rounded-[60px] bg-white/10 border border-white/20 backdrop-blur-3xl">
          <Lock size={80} className="text-secondary" />
        </motion.div>
        <h2 className="text-5xl font-bold font-outfit leading-tight">{t("identitySecured")}</h2>
        <p className="text-xl text-white/70 leading-relaxed font-light">{t("identityDesc")}</p>
      </div>
    </div>
  );
}
