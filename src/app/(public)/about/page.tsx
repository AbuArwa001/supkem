"use client";

import { motion } from "framer-motion";
import { Shield, Target, Heart, Award } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="space-y-24 pb-24">
            {/* Hero Section */}
            <section className="relative py-20 px-6 bg-primary overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="max-w-7xl mx-auto text-center relative z-10 space-y-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="text-5xl lg:text-7xl font-bold font-outfit text-white"
                    >
                        About <span className="text-secondary">SUPKEM</span>
                    </motion.h1>
                    <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed font-medium">
                        The Supreme Council of Kenya Muslims is the primary umbrella body representing all Muslim organizations in Kenya.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    className="space-y-8"
                >
                    <h2 className="text-4xl font-bold font-outfit text-primary">Our Legacy & Mission</h2>
                    <p className="text-lg text-foreground/70 leading-relaxed">
                        Established to foster unity and champion the rights of Muslims in Kenya, SUPKEM has grown into a vital institution that bridges the gap between the community and the state. We provide a platform for collective action in education, welfare, and social justice.
                    </p>
                    <div className="space-y-4">
                        {[
                            { icon: Shield, title: "Advocacy", desc: "Protecting the religious and civil rights of Muslims." },
                            { icon: Target, title: "Unity", desc: "Fostering collaboration among diverse Muslim entities." },
                            { icon: Heart, title: "Welfare", desc: "Supporting the vulnerable through coordinated social programs." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 p-6 rounded-3xl bg-primary/[0.02] border border-primary/10">
                                <item.icon className="text-secondary shrink-0" size={24} />
                                <div>
                                    <h4 className="font-bold text-primary">{item.title}</h4>
                                    <p className="text-sm text-foreground/60">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <div className="relative">
                    <div className="aspect-[4/5] bg-primary/10 rounded-[40px] shadow-2xl relative overflow-hidden flex items-center justify-center border border-primary/20">
                        <Shield size={200} className="text-primary/20" />
                        <div className="absolute inset-x-0 bottom-0 p-10 bg-gradient-to-t from-primary/80 to-transparent text-white">
                            <p className="text-3xl font-bold font-outfit uppercase tracking-tighter">Established 1973</p>
                            <p className="font-medium opacity-80">Serving the Ummah for over 50 years.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Section */}
            <section className="py-24 bg-primary/[0.02] px-6">
                <div className="max-w-7xl mx-auto text-center space-y-4 mb-16">
                    <h2 className="text-4xl font-bold font-outfit text-primary">Our Governance</h2>
                    <p className="text-foreground/60 max-w-xl mx-auto">Led by a committed council dedicated to transparent leadership and community growth.</p>
                </div>
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((v) => (
                        <div key={v} className="text-center space-y-4 p-8 bg-white rounded-3xl border border-border hover-lift">
                            <div className="w-24 h-24 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-secondary/20">
                                <Award size={40} />
                            </div>
                            <div>
                                <h4 className="font-bold text-primary text-xl">Council Member {v}</h4>
                                <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest mt-1">Nairobi Region</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
