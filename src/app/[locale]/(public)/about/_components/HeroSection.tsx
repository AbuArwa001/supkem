"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export function HeroSection() {
  const t = useTranslations("About");

  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-32 px-6 bg-slate-950">
      <div className="absolute inset-0 z-0">
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.4 }}
          transition={{ duration: 15, ease: "linear" }}
          className="relative w-full h-full"
        >
          <Image
            src="/images/slider/olerezo_nb.jpg"
            alt="SUPKEM Heritage"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80 z-10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold tracking-tight backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
            {t("impact")}
          </div>
          <h1 className="text-6xl lg:text-9xl font-black font-outfit text-white tracking-tighter leading-none">
            {t("voice")} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-white to-amber-300 italic">
              {t("cohesion")}
            </span>
          </h1>
          <p className="text-xl lg:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium italic">
            &ldquo;{t("description")}&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
