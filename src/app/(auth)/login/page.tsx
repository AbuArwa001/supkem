"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
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
        <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-primary/[0.02] relative overflow-hidden">
            {/* Decorative Circles */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md space-y-8"
            >
                <div className="text-center space-y-2">
                    <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-border rounded-2xl shadow-sm hover-lift mb-8">
                        <Shield className="text-primary w-6 h-6" />
                        <span className="font-bold text-primary font-outfit">SUPKEM CMS</span>
                    </Link>
                    <h2 className="text-4xl font-bold font-outfit text-primary">Welcome Back</h2>
                    <p className="text-foreground/60">Log in to manage your SUPKEM dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="p-10 rounded-[40px] glass shadow-2xl space-y-6">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100"
                        >
                            {error}
                        </motion.div>
                    )}

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-primary/80 ml-1">Email Address</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-white/50 border border-border rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                placeholder="name@organization.org"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-primary/80 ml-1">Password</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-white/50 border border-border rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-primary text-white rounded-[24px] font-bold text-lg hover-lift premium-gradient shadow-xl shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>Sign In <ArrowRight size={20} /></>}
                    </button>

                    <div className="flex items-center justify-between pt-4 text-sm">
                        <Link href="/forgot-password" size={20} className="text-primary/60 hover:text-primary underline">Forgot password?</Link>
                        <span className="text-foreground/40">Don&apos;t have an account? <Link href="/register" className="text-primary font-bold hover:underline">Apply Now</Link></span>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
