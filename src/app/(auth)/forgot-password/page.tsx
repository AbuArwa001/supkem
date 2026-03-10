"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Mail, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { AnimatePresence } from "framer-motion";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic client-side validation
        if (!email || !email.includes('@')) {
            setError("Please enter a valid email address.");
            return;
        }

        setLoading(true);
        setError("");
        setMessage("");

        console.log("Submitting password reset for:", email);

        try {
            const res = await api.post("/users/request_password_reset/", { email });
            console.log("Reset request response:", res.data);
            setMessage(res.data.detail || "If an account exists with this email, a reset link will be sent.");
        } catch (err: any) {
            console.error("Forgot password error:", err);
            const errorDetail = err.response?.data?.detail || "An error occurred. Please try again.";
            setError(errorDetail);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-inter">
            {/* Left Side: Form */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 xl:px-32 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-md w-full mx-auto py-12 flex flex-col items-center text-center"
                >
                    {/* Branding */}
                    <div className="flex flex-col items-center space-y-4 mb-16">
                        <Link href="/" className="group transition-transform hover:scale-110 duration-500">
                            <div className="relative w-24 h-24 mb-2">
                                <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl" />
                                <Image src="/logo.svg" alt="SUPKEM Logo" fill className="relative z-10 drop-shadow-2xl object-contain" />
                            </div>
                        </Link>
                        <div className="space-y-1">
                            <h2 className="text-2xl font-black font-outfit text-primary tracking-tighter uppercase">SUPKEM</h2>
                            <div className="h-1 w-10 bg-secondary rounded-full mx-auto" />
                        </div>
                    </div>

                    <div className="space-y-2 mb-10 w-full">
                        <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">Forgot Password?</h1>
                        <p className="text-foreground/60 text-lg">Enter your email address and we&apos;ll send you a link to reset your password.</p>
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

                        {message && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                className="p-4 bg-green-50 text-green-600 rounded-2xl text-sm font-medium border border-green-100"
                            >
                                {message}
                            </motion.div>
                        )}

                        {!message && (
                            <>
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

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-5 bg-primary text-white rounded-[24px] font-bold text-lg hover-lift premium-gradient shadow-xl shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100 transition-all"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <>Send Reset Link <ArrowRight size={20} /></>}
                                </button>
                            </>
                        )}

                        <div className="text-center pt-6">
                            <Link href="/login" className="inline-flex items-center gap-2 text-primary font-bold hover:underline group">
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Back to Login
                            </Link>
                        </div>
                    </form>
                </motion.div>
            </div>

            {/* Right Side: Visual Section */}
            <div className="hidden lg:flex flex-1 relative bg-primary overflow-hidden items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] animate-pulse" />
                </div>

                <div className="relative z-10 p-20 text-center space-y-8 max-w-2xl text-white">
                    <div className="inline-block p-8 rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-xl mb-4">
                        <Lock className="w-20 h-20 text-secondary" />
                    </div>
                    <h2 className="text-4xl font-bold font-outfit leading-tight">Secure Account Recovery</h2>
                    <p className="text-lg text-white/70 leading-relaxed font-light">
                        Follow the steps to regain access to your SUPKEM portal safely. Your data security is our top priority.
                    </p>
                </div>
            </div>
        </div>
    );
}

// Simple Lock icon since Lucide is used
function Lock(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    );
}
