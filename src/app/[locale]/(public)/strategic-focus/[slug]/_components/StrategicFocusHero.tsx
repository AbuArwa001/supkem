"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { StrategicPillar } from "../_data/strategicPillarsData";

interface StrategicFocusHeroProps {
    content: StrategicPillar;
}

export default function StrategicFocusHero({ content }: StrategicFocusHeroProps) {
    const t = useTranslations("StrategicFocus.hero");
    return (
        <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
            <Image
                src={content.heroImage}
                alt={content.title}
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-transparent" />
            <div className="absolute inset-0 bg-black/30" />

            <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
                <Link href="/#strategic-focus" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium tracking-wide">{t("back")}</span>
                </Link>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl space-y-6"
                >
                    <p className="text-sm font-black uppercase tracking-[0.4em] text-secondary">{t("badge")}</p>
                    <h1 className="text-5xl lg:text-7xl font-black font-outfit text-white leading-[1.1] tracking-tight text-glow">
                        {content.title}
                    </h1>
                    <p className="text-2xl text-white/90 font-medium leading-relaxed drop-shadow-md">
                        {content.subtitle}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
