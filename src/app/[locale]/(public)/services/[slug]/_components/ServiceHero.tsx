"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

import { ServiceData } from "@/app/[locale]/(public)/services/[slug]/_data/servicesData";

interface ServiceHeroProps {
    service: ServiceData;
    IconComponent: React.ElementType;
}

export function ServiceHero({ service, IconComponent }: ServiceHeroProps) {
    const t = useTranslations(`ServicesPage.grid.${service.tKey}`);
    const th = useTranslations("ServicesPage.hero");

    return (
        <section className="relative h-[55vh] flex items-center justify-center overflow-hidden">
            <Image
                src={service.heroImage}
                alt={t("title")}
                fill
                className="object-cover"
                priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B211B]/95 via-[#0B211B]/80 to-[#0B211B]/40" />
            <div className="absolute inset-0 bg-black/20" />

            {/* Animated Mesh Overlay */}
            <div className="absolute inset-0 opacity-30 mix-blend-overlay mesh-gradient" />

            <div className="max-w-7xl mx-auto w-full px-6 relative z-10">
                <Link href="/services" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium tracking-wide text-sm">
                        {th("backToServices")}
                    </span>
                </Link>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl space-y-6"
                >
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                        <IconComponent size={14} className="text-secondary" />
                        {t("category")}
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-black font-outfit text-white leading-[1.1] tracking-tight drop-shadow-lg">
                        {t("title")}
                    </h1>
                    <p className="text-xl lg:text-3xl text-white/80 font-medium leading-relaxed drop-shadow-md">
                        {t("subtitle")}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}

