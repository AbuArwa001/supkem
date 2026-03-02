"use client";

import { motion } from "framer-motion";
import { FileCheck, Users, Briefcase, GraduationCap, HeartHandshake } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const serviceList = [
    {
        icon: FileCheck,
        title: "Organization Registration",
        desc: "Official recognition and enrollment for mosques, schools, and Muslim NGOs in Kenya.",
        category: "Administrative"
    },
    {
        icon: "LOGO",
        title: "Halal Certification",
        desc: "Rigorous vetting and accreditation for businesses and products to ensure Halal compliance.",
        category: "Certification"
    },
    {
        icon: Briefcase,
        title: "Advocacy & Legal Support",
        desc: "Representing the interest of the Muslim community in legal and governmental affairs.",
        category: "Community"
    },
    {
        icon: GraduationCap,
        title: "Educational Programs",
        desc: "Scholarship coordination and curriculum support for Islamic educational institutions.",
        category: "Education"
    },
    {
        icon: HeartHandshake,
        title: "Social Welfare",
        desc: "Coordinating humanitarian aid and social support during times of need.",
        category: "Welfare"
    },
    {
        icon: Users,
        title: "Conflict Resolution",
        desc: "Mediation services for organizational and community disputes within the Ummah.",
        category: "Legal"
    }
];

export default function ServicesPage() {
    return (
        <div className="space-y-24 pb-24">
            {/* Header */}
            <section className="py-20 px-6 text-center space-y-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                    className="px-4 py-1 bg-secondary/10 text-secondary rounded-full inline-block font-bold text-xs uppercase tracking-widest"
                >
                    How we serve
                </motion.div>
                <h1 className="text-5xl lg:text-7xl font-bold font-outfit text-primary">Core Services</h1>
                <p className="text-xl text-foreground/60 leading-relaxed font-medium">
                    Providing professional, transparent, and efficient services to the Kenyan Muslim community.
                </p>
            </section>

            {/* Services Grid */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {serviceList.map((service, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="p-10 rounded-[40px] bg-white border border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group"
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
                        <Link href="/register" className="text-sm font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                            Apply for this Service <FileCheck size={16} />
                        </Link>
                    </motion.div>
                ))}
            </section>

            {/* CTA Section */}
            <section className="max-w-5xl mx-auto px-6">
                <div className="premium-gradient p-12 lg:p-20 rounded-[50px] text-white flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
                    <div className="space-y-4 max-w-md">
                        <h2 className="text-4xl font-bold font-outfit">Need a custom certification?</h2>
                        <p className="text-white/70 font-medium">Our team is ready to guide you through complex registration and certification requirements.</p>
                    </div>
                    <Link href="/login" className="px-10 py-5 bg-white text-primary rounded-2xl font-bold text-lg hover:bg-secondary hover:text-white transition-all shadow-xl whitespace-nowrap">
                        Contact Support
                    </Link>
                </div>
            </section>
        </div>
    );
}
