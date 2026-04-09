"use client";

import { motion } from "framer-motion";
import { Shield, Heart, Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const ICONS = [Shield, Heart, Scale];
const ITEM_KEYS = ["item1", "item2", "item3"] as const;
const COLORS = ["text-blue-600 bg-blue-50", "text-red-600 bg-red-50", "text-emerald-600 bg-emerald-50"];

export function LeadershipSection() {
  const t = useTranslations("AboutPage.leadership");

  const items = ITEM_KEYS.map((key, i) => ({
    icon: ICONS[i],
    title: t(`${key}.title`),
    desc: t(`${key}.desc`),
    color: COLORS[i],
  }));

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <p className="text-sm font-black uppercase tracking-[0.4em] text-secondary">
            {t("subtitle")}
          </p>
          <h2 className="text-5xl lg:text-7xl font-black font-outfit text-primary tracking-tighter">
            {t("heading")}
          </h2>
          <p className="text-xl text-foreground/60 font-medium">
            {t("desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.2 }}
              className="p-10 rounded-[20px] border border-border/60 bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all group"
            >
              <div className={cn("inline-flex p-5 rounded-3xl mb-8 group-hover:scale-110 transition-transform", item.color)}>
                <item.icon size={32} />
              </div>
              <h3 className="text-2xl font-black font-outfit text-primary mb-4">{item.title}</h3>
              <p className="text-foreground/60 leading-relaxed font-medium">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
