"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";
import { 
    FileCheck, Users, Briefcase, GraduationCap, 
    HeartHandshake, Heart, Plane, FileText, BookOpen 
} from "lucide-react";

export const SERVICE_LIST = [
    {
        icon: FileCheck,
        title: "Organization Registration",
        desc: "Official recognition and enrollment for mosques, schools, and Muslim NGOs in Kenya.",
        category: "Administrative",
        href: "/services/organization-registration"
    },
    {
        icon: "LOGO",
        title: "Halal Certification",
        desc: "Rigorous vetting and accreditation for businesses and products to ensure Halal compliance.",
        category: "Certification",
        href: "/services/halal-certification"
    },
    {
        icon: Briefcase,
        title: "Advocacy & Legal Support",
        desc: "Representing the interest of the Muslim community in legal and governmental affairs.",
        category: "Community",
        href: "/services/advocacy-legal-support"
    },
    {
        icon: GraduationCap,
        title: "Educational Programs",
        desc: "Scholarship coordination and curriculum support for Islamic educational institutions.",
        category: "Education",
        href: "/services/educational-programs"
    },
    {
        icon: HeartHandshake,
        title: "Social Welfare",
        desc: "Coordinating humanitarian aid and social support during times of need.",
        category: "Welfare",
        href: "/services/social-welfare"
    },
    {
        icon: Users,
        title: "Conflict Resolution",
        desc: "Mediation services for organizational and community disputes within the Ummah.",
        category: "Legal",
        href: "/services/conflict-resolution"
    },
    {
        icon: Heart,
        title: "Marriage Certificates",
        desc: "Islamic marriage certification for Muslim couples, legally recognized under Kenyan law.",
        category: "Individuals",
        href: "/services/marriage-certificates"
    },
    {
        icon: Plane,
        title: "Hajj & Umrah Facilitation",
        desc: "Official support letters and logistical guidance for sacred pilgrimages.",
        category: "Individuals",
        href: "/services/hajj-umrah"
    },
    {
        icon: FileText,
        title: "Travel Visa Advisory",
        desc: "Visa advisory services and official letters of support for religious and educational travel abroad.",
        category: "Individuals",
        href: "/services/visa-advisory"
    },
    {
        icon: BookOpen,
        title: "Study Abroad Letters",
        desc: "Official recommendation letters to support Muslim students applying for scholarships and universities abroad.",
        category: "Individuals",
        href: "/services/study-abroad"
    }
];

export function ServicesGrid() {
    return (
        <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICE_LIST.map((service, i) => (
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
                            <service.icon size={32} />
                        )}
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-secondary mb-2">{service.category}</p>
                    <h3 className="text-2xl font-bold font-outfit text-primary mb-4">{service.title}</h3>
                    <p className="text-foreground/60 leading-relaxed font-medium mb-8">
                        {service.desc}
                    </p>
                    <Link href={service.href} className="text-sm font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                        View Service Details <FileCheck size={16} />
                    </Link>
                </motion.div>
            ))}
        </section>
    );
}
