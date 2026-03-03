"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { login, loading } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        const res = await login(email, password);
        if (!res.success) {
            setError(res.error || "An error occurred");
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-inter">
            {/* Left Side: Login Form */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 xl:px-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-md w-full mx-auto py-12 flex flex-col items-center text-center"
                >
                    {/* Premium Vertical Branding */}
                    <div className="flex flex-col items-center space-y-4 mb-16">
                        <Link href="/" className="group transition-transform hover:scale-110 duration-500">
                            <div className="relative w-32 h-32 mb-2">
                                <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors animate-pulse" />
                                <Image src="/logo.svg" alt="SUPKEM Logo" fill className="relative z-10 drop-shadow-2xl object-contain" />
                            </div>
                        </Link>
                        <div className="space-y-1">
                            <h2 className="text-3xl font-black font-outfit text-primary tracking-tighter uppercase">SUPKEM</h2>
                            <div className="h-1 w-12 bg-secondary rounded-full mx-auto" />
                        </div>
                    </div>

                    <div className="space-y-2 mb-10 w-full">
                        <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">Portal Login</h1>
                        <p className="text-foreground/60 text-lg">Enter your credentials to access the Portal.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6 w-full text-left">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100"
                            >
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-medium"
                                    placeholder="name@organization.org"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-xs font-black text-primary/40 uppercase tracking-[0.2em]">Password</label>
                                <Link href="/forgot-password" title="Forgot password?" className="text-xs font-bold text-primary/60 hover:text-primary transition-colors">Forgot password?</Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-primary text-white rounded-[24px] font-bold text-lg hover-lift premium-gradient shadow-xl shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100 transition-all"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
                        </button>

                        <div className="text-center pt-6 text-foreground/40 text-sm font-medium">
                            Don&apos;t have an account? <Link href="/register" className="text-primary font-bold hover:underline">Apply for Membership</Link>
                        </div>
                    </form>
                </motion.div>
            </div>

            {/* Right Side: Visual/Branding Section */}
            <div className="hidden lg:flex flex-1 relative bg-primary overflow-hidden items-center justify-center">
                {/* Decorative Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/20 rounded-full blur-[120px] animate-pulse" />
                </div>

                <div className="relative z-10 p-20 text-center space-y-8 max-w-2xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="inline-block p-10 rounded-[50px] bg-white/5 border border-white/10 backdrop-blur-xl mb-4"
                    >
                        <Image src="/logo.svg" alt="SUPKEM Large Logo" width={160} height={160} className="drop-shadow-2xl" />
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <h2 className="text-5xl font-bold font-outfit text-white leading-tight">
                            Advancing the Ummah <br />
                            <span className="text-secondary text-6xl">Together</span>
                        </h2>
                        <p className="text-xl text-white/70 leading-relaxed font-light tracking-wide">
                            The Supreme Council of Kenya Muslims (SUPKEM) Digital Hub. Fostering unity, transparency, and community progress across the nation.
                        </p>
                    </motion.div>

                    {/* Quick Stats or Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="pt-12 grid grid-cols-3 gap-8"
                    >
                        {[
                            { label: "Counties", val: "47" },
                            { label: "Organizations", val: "10k+" },
                            { label: "Impact", val: "Nationwide" }
                        ].map((stat, i) => (
                            <div key={i} className="space-y-1 border-l border-white/10 pl-4 text-left">
                                <p className="text-2xl font-bold text-secondary font-outfit">{stat.val}</p>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{stat.label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom Branding */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/30 text-xs font-bold tracking-[0.3em] uppercase">
                    Supreme Council of Kenya Muslims
                </div>
            </div>
        </div>
    );
}
