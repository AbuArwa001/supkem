"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
    FileCheck, Users, Briefcase, GraduationCap, 
    HeartHandshake, Heart, Plane, FileText, BookOpen 
} from "lucide-react";
import { useTranslations } from "next-intl";

const ICONS = [FileCheck, "LOGO", Briefcase, GraduationCap, HeartHandshake, Users, Heart, Plane, FileText, BookOpen];
const SVC_KEYS = ["svc1","svc2","svc3","svc4","svc5","svc6","svc7","svc8","svc9","svc10"] as const;
const HREFS = [
    "/services/organization-registration",
    "/services/halal-certification",
    "/services/advocacy-legal-support",
    "/services/educational-programs",
    "/services/social-welfare",
    "/services/conflict-resolution",
    "/services/marriage-certificates",
    "/services/hajj-umrah",
    "/services/visa-advisory",
    "/services/study-abroad",
];

export function ServicesGrid() {
    const t = useTranslations("ServicesPage.grid");

    const services = SVC_KEYS.map((key, i) => ({
        icon: ICONS[i],
        title: t(`${key}.title`),
        desc: t(`${key}.desc`),
        category: t(`${key}.category`),
        href: HREFS[i],
    }));

    return (
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-10 rounded-[20px] bg-white border border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group"
                >
                    <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white group-hover:rotate-12 transition-all">
                        {service.icon === "LOGO" ? (
                            <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                        ) : (
                            // @ts-ignore
                            <service.icon size={32} />
                        )}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2">{service.category}</p>
                    <h3 className="text-2xl font-bold font-outfit text-primary mb-4">{service.title}</h3>
                    <p className="text-foreground/60 leading-relaxed font-medium mb-8">{service.desc}</p>
                    <Link href={service.href} className="text-sm font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                        {t("viewDetails")} <FileCheck size={16} />
                    </Link>
                </motion.div>
            ))}
        </section>
    );
}
