"use client";

import Image from "next/image";

import { motion } from "framer-motion";

export function ContactHero() {
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
                        src="/images/slider/oledarknb.jpg"
                        alt="Contact Us"
                        fill
                        className="object-cover"
                        priority
                    />
                </motion.div>

                {/* Layered Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-10" />
                <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
            </div>

            <div className="max-w-4xl mx-auto relative z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="p-12 lg:p-16 rounded-[60px] bg-white/5 border border-white/10 backdrop-blur-2xl space-y-8 shadow-2xl"
                >
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold tracking-tight shadow-2xl mx-auto backdrop-blur-md transition-transform hover:scale-105 cursor-default">
                        <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
                        We are here for you
                    </div>

                    <div className="space-y-4">
                        <h1 className="text-6xl lg:text-8xl font-black font-outfit text-white tracking-tighter leading-none">
                            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-white to-amber-300 italic">Us</span>
                        </h1>
                        <p className="text-xl lg:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium">
                            Have questions or need assistance? Reach out to the Supreme Council's headquarters.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
