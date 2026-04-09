"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageSquare, Handshake, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS = [MessageSquare, Handshake, Zap];
const ITEM_KEYS = ["item1", "item2", "item3"] as const;

export function ApproachesSection() {
  const t = useTranslations("AboutPage.approaches");

  const approaches = ITEM_KEYS.map((key, i) => ({
    icon: ICONS[i],
    title: t(`${key}.title`),
    desc: t(`${key}.desc`),
  }));

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  return (
    <section className="py-32 px-6 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform translate-x-1/2" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div {...fadeIn} className="space-y-12">
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-7xl font-black font-outfit tracking-tighter italic">
                {t("heading1")} <br />
                {t("heading2")}
              </h2>
              <p className="text-xl text-white/70 leading-relaxed">
                {t("desc")}
              </p>
            </div>
            <div className="space-y-8">
              {approaches.map((item, i) => (
                <div key={i} className="flex gap-8 group">
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-secondary group-hover:border-secondary transition-all duration-500">
                    <item.icon size={24} className="text-white" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold font-outfit">{item.title}</h4>
                    <p className="text-white/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-12 lg:p-20 rounded-[80px] bg-white/10 border border-white/20 backdrop-blur-3xl space-y-8"
          >
            <h3 className="text-4xl font-black font-outfit leading-tight text-secondary">
              {t("commitHeading")}
            </h3>
            <p className="text-xl text-white/80 leading-relaxed italic font-medium">
              &ldquo;{t("commitBody")}&rdquo;
            </p>
            <div className="pt-8 border-t border-white/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary">
                <Image src="/logo.svg" alt="SUPKEM" width={48} height={48} />
              </div>
              <div>
                <p className="font-bold">{t("council")}</p>
                <p className="text-sm text-white/40 uppercase tracking-widest font-bold">
                  {t("ofKenya")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
