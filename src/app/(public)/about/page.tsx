"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { Target, Heart, Award, Shield, Globe, Users, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AboutPage() {
    return (
        <div className="bg-white">
            {/* Premium Hero Section with Background Image */}
            <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-32 px-6 bg-slate-950">
                {/* Background Image with Slow Zoom */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.6 }}
                        transition={{
                            scale: { duration: 15, ease: "linear" },
                            opacity: { duration: 2, ease: "easeOut" }
                        }}
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

                    {/* Layered Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-10" />
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
                </div>

                <div className="max-w-7xl mx-auto relative z-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="p-12 lg:p-20 rounded-[60px] bg-white/5 border border-white/10 backdrop-blur-2xl text-center space-y-8 shadow-2xl"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold tracking-tight shadow-2xl mx-auto backdrop-blur-md">
                            <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
                            Over 50 Years of Service
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-6xl lg:text-8xl font-black font-outfit text-white tracking-tighter leading-none">
                                Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-white to-amber-300 italic">Legacy</span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium italic">
                                "Uplifting society to a just future through faith, unity, and service to the Ummah."
                            </p>
                        </div>

                        {/* Stats in Hero */}
                        <div className="pt-8 grid grid-cols-2 lg:grid-cols-4 gap-8 opacity-80">
                            {[
                                { label: "Founded", val: "1973" },
                                { label: "National Reach", val: "47 Counties" },
                                { label: "Faith First", val: "Unity" },
                                { label: "Commitment", val: "Service" }
                            ].map((s, i) => (
                                <div key={i} className="space-y-1">
                                    <p className="text-xl font-bold text-secondary font-outfit tracking-tight">{s.val}</p>
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest leading-none">{s.label}</p>
                                </div>
                            ))}
                        </div>
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
            {/* Impact Gallery Section */}
            <section id="gallery" className="py-40 px-6 bg-slate-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
                <div className="max-w-7xl mx-auto space-y-24">
                    <div className="text-center space-y-6">
                        <p className="text-xs font-black uppercase tracking-[0.4em] text-secondary">A Visual Narrative</p>
                        <h2 className="text-6xl lg:text-8xl font-black font-outfit text-primary tracking-tighter leading-none">
                            Impact <span className="italic">Gallery</span>
                        </h2>
                        <p className="text-xl text-foreground/50 max-w-2xl mx-auto font-medium">
                            Documenting our commitment to the community through leadership, dialogue, and grassroots initiatives.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[300px]">
                        {[
                            { src: "/images/slider/olesaudib.jpg", alt: "Community Leadership", span: "lg:col-span-2 lg:row-span-2" },
                            { src: "/images/slider/ole_olesapitb.jpg", alt: "Interfaith Dialogue", span: "col-span-1" },
                            { src: "/images/slider/olerezo_nb.jpg", alt: "Youth Empowerment", span: "col-span-1" },
                            { src: "https://images.unsplash.com/photo-1541872703-74c5e4001bc2?auto=format&fit=crop&q=80&w=800", alt: "Historical Heritage", span: "col-span-1" },
                            { src: "/images/slider/image.png", alt: "Advocacy Programs", span: "lg:col-span-2" },
                            { src: "/images/slider/oledarknb.jpg", alt: "Faith & Unity", span: "col-span-1" }
                        ].map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={cn("relative rounded-[40px] overflow-hidden group shadow-lg cursor-pointer", img.span)}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10">
                                    <p className="text-white font-black font-outfit text-2xl tracking-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-700">{img.alt}</p>
                                    <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity delay-300">
                                        <ArrowRight size={18} className="text-white" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
