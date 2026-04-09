"use client";

import Image from "next/image";

import { motion } from "framer-motion";

export function ServicesHero() {
    return (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-32 px-6 bg-slate-950">
            {/* Background Image with Slow Zoom */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.5 }}
                    transition={{
                        scale: { duration: 15, ease: "linear" },
                        opacity: { duration: 2, ease: "easeOut" }
                    }}
                    className="relative w-full h-full"
                >
                    <Image
                        src="/images/slider/ole_olesapitb.jpg"
                        alt="Professional Services"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                {/* Layered Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-10" />
                <div className="absolute inset-0 bg-secondary/10 mix-blend-overlay z-10" />
            </div>

            <div className="max-w-4xl mx-auto relative z-20 text-center space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="p-12 lg:p-16 rounded-[60px] bg-white/5 border border-white/10 backdrop-blur-2xl space-y-6 shadow-2xl"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                        className="px-5 py-2 bg-secondary/10 text-secondary border border-secondary/20 rounded-full inline-block font-bold text-xs uppercase tracking-widest backdrop-blur-md"
                    >
                        Facilitating Excellence
                    </motion.div>
                    <h1 className="text-5xl lg:text-7xl font-black font-outfit text-white tracking-tighter">
                        Core <span className="text-secondary italic">Services</span>
                    </h1>
                    <p className="text-lg lg:text-xl text-white/70 leading-relaxed font-medium max-w-2xl mx-auto">
                        Providing professional, transparent, and efficient digital services to the Kenyan Muslim community.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
