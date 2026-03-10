"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, MessageSquare } from "lucide-react";
import Image from "next/image";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 opacity-20">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/30 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="max-w-2xl w-full relative z-10 text-center space-y-12">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative"
                >
                    {/* Large Glassmorphism 404 */}
                    <div className="relative inline-block">
                        <h1 className="text-[150px] md:text-[220px] font-black font-outfit leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/40 to-transparent opacity-20 select-none">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                animate={{
                                    y: [0, -10, 0],
                                    rotate: [0, 5, -5, 0]
                                }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                className="w-32 h-32 md:w-48 md:h-48 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[20px] shadow-2xl flex items-center justify-center relative group"
                            >
                                <div className="absolute inset-0 bg-primary/10 rounded-[20px] animate-pulse" />
                                <Search size={64} className="text-secondary group-hover:scale-110 transition-transform duration-500" strokeWidth={1.5} />
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="space-y-6"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-outfit text-white tracking-tight">
                        Lost in the <span className="text-secondary italic">Digital Ummah?</span>
                    </h2>
                    <p className="text-xl text-white/50 max-w-lg mx-auto font-medium">
                        The page you are looking for has either been moved, deleted, or never existed in the first place.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-6"
                >
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-10 py-5 bg-primary text-white rounded-[24px] font-bold flex items-center justify-center gap-3 hover:scale-105 hover:shadow-primary/50 transition-all text-lg shadow-2xl shadow-primary/30 group"
                    >
                        <Home size={20} /> Return Home
                    </Link>
                    <Link
                        href="/contact"
                        className="w-full sm:w-auto px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-[24px] font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all text-lg group"
                    >
                        <MessageSquare size={20} className="text-secondary" /> Contact Support
                    </Link>
                </motion.div>

                {/* Footer Brand */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="pt-12 flex items-center justify-center gap-3 opacity-30"
                >
                    <Image src="/logo.svg" alt="SUPKEM" width={24} height={24} />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Supreme Council of Kenya Muslims</p>
                </motion.div>
            </div>
        </main>
    );
}
