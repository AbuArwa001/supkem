"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Target, Heart, Award, Shield, Globe, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Premium Mesh Gradient Hero */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-24 px-6">
                <div className="absolute inset-0 -z-10 bg-[#FCFCFD]">
                    <div
                        className="absolute inset-0 opacity-[0.4]"
                        style={{
                            backgroundImage: `
                                radial-gradient(circle at 0% 0%, rgba(13, 148, 136, 0.1) 0%, transparent 50%),
                                radial-gradient(circle at 100% 0%, rgba(245, 158, 11, 0.08) 0%, transparent 50%),
                                radial-gradient(circle at 100% 100%, rgba(13, 148, 136, 0.1) 0%, transparent 50%),
                                radial-gradient(circle at 0% 100%, rgba(245, 158, 11, 0.08) 0%, transparent 50%),
                                radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 1) 0%, transparent 100%)
                            `
                        }}
                    />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] mix-blend-overlay" />

                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.05, 0.1, 0.05],
                            x: [0, 30, 0],
                            y: [0, -20, 0]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px]"
                    />
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-xl shadow-primary/5 border border-primary/10 text-primary text-sm font-bold tracking-tight mx-auto">
                            <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
                            Over 50 Years of Service
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-black font-outfit text-primary tracking-tighter leading-[0.95]">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary italic">Legacy</span>
                        </h1>
                        <p className="text-2xl text-foreground/60 max-w-3xl mx-auto leading-relaxed font-medium italic">
                            "Uplifting society to a just future through faith, unity, and service to the Ummah."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Legacy & Mission Section */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-12"
                    >
                        <div className="space-y-6">
                            <h2 className="text-5xl font-black font-outfit text-primary leading-tight tracking-tight">Protecting Faith, <br />Empowering People</h2>
                            <p className="text-xl text-foreground/50 leading-relaxed font-medium">
                                Founded in 1973, the Supreme Council of Kenya Muslims (SUPKEM) serves as the primary umbrella body representing all Muslim organizations in Kenya. We bridge the gap between the community and the state, fostering unity and social justice.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {[
                                { icon: Shield, title: "Policy Advocacy", desc: "Strengthening the capacity of Muslim organizations to participate in national discourse.", color: "bg-blue-50" },
                                { icon: Globe, title: "Peacebuilding", desc: "Promoting social cohesion through interfaith dialogue and conflict resolution.", color: "bg-green-50" },
                                { icon: Heart, title: "Humanitarian Response", desc: "Addressing health, education, and emergency needs in underserved regions.", color: "bg-red-50" }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 p-8 rounded-[32px] bg-white border border-border/60 hover:border-primary/20 transition-all group shadow-sm hover:shadow-xl hover:shadow-primary/5">
                                    <div className={cn("inline-flex p-4 rounded-2xl text-primary mb-10 group-hover:scale-110 transition-transform bg-primary/5")}>
                                        <item.icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <div className="pt-1">
                                        <h4 className="text-xl font-black font-outfit text-primary mb-2">{item.title}</h4>
                                        <p className="text-foreground/50 font-medium leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="relative">
                        <div className="aspect-[4/5] p-2 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-[60px] backdrop-blur-3xl shadow-2xl relative overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 bg-white/40 backdrop-blur-xl m-1 rounded-[58px]" />
                            <div className="relative z-10 flex flex-col items-center">
                                <Image src="/logo.svg" alt="SUPKEM Logo" width={220} height={220} className="drop-shadow-2xl mb-8 group-hover:scale-105 transition-transform" />
                                <div className="text-center px-10">
                                    <p className="text-4xl font-black font-outfit text-primary uppercase tracking-tighter">1973</p>
                                    <p className="text-xs font-black uppercase tracking-[0.4em] text-foreground/30 mt-2">Foundation Year</p>
                                </div>
                            </div>
                        </div>
                        {/* Decorative Accents */}
                        <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -z-10" />
                    </div>
                </div>
            </section>

            {/* Our Partners Brief - Reusing context */}
            <section className="py-24 bg-primary/[0.02] px-6">
                <div className="max-w-7xl mx-auto text-center space-y-12">
                    <p className="text-xs font-black uppercase tracking-[0.4em] text-foreground/30">Global Collaboration</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center opacity-40 grayscale">
                        {[
                            { name: "AMREF", src: "/AMREF.png" },
                            { name: "UKAID", src: "/UKAID.png" },
                            { name: "UNICEF", src: "/UNICEF.png" },
                            { name: "The Global Fund", src: "/GLOBAL FUND.png" },
                            { name: "Kenya Redcross", src: "/KEENYA REDCROSS.png" },
                            { name: "USAID", src: "/USAID.png" }
                        ].map((p, i) => (
                            <div key={i} className="relative h-12 w-full">
                                <Image
                                    src={p.src}
                                    alt={p.name}
                                    fill
                                    className="object-contain"
                                    sizes="(max-w-768px) 50vw, 150px"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
