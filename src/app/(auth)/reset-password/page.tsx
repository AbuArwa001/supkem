"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Lock, Loader2, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [token, setToken] = useState("");
    const [uid, setUid] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const t = searchParams.get("token");
        const u = searchParams.get("uid");
        if (t && u) {
            setToken(t);
            setUid(u);
        } else {
            setError("Invalid or missing reset link parameters.");
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await api.post("/users/reset_password/", {
                uid,
                token,
                new_password: password,
                confirm_password: confirmPassword,
            });
            setSuccess(true);
            setTimeout(() => {
                router.push("/login");
            }, 3000);
        } catch (err: any) {
            console.error("Reset password error:", err);
            setError(err.response?.data?.detail || "Failed to reset password. The link may have expired.");
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-6"
            >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-green-600" />
                </div>
                <h1 className="text-3xl font-bold text-primary font-outfit">Password Reset!</h1>
                <p className="text-foreground/60">Your password has been successfully updated. Redirecting you to login...</p>
                <div className="pt-4">
                    <Loader2 className="animate-spin text-primary mx-auto" />
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md w-full mx-auto py-12 flex flex-col items-center text-center"
        >
            {/* Branding */}
            <div className="flex flex-col items-center space-y-4 mb-12">
                <Link href="/" className="group transition-transform hover:scale-110 duration-500">
                    <div className="relative w-20 h-20 mb-2">
                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
                        <Image src="/logo.svg" alt="SUPKEM Logo" fill className="relative z-10 drop-shadow-2xl object-contain" />
                    </div>
                </Link>
                <div className="space-y-1">
                    <h2 className="text-xl font-black font-outfit text-primary tracking-tighter uppercase">SUPKEM</h2>
                    <div className="h-1 w-8 bg-secondary rounded-full mx-auto" />
                </div>
            </div>

            <div className="space-y-2 mb-8 w-full text-center">
                <h1 className="text-3xl font-bold font-outfit text-primary tracking-tight">Set New Password</h1>
                <p className="text-foreground/60">Choose a strong, secure password for your account.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 w-full text-left">
                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100 flex items-center gap-3"
                    >
                        <AlertCircle size={18} className="shrink-0" />
                        <span>{error}</span>
                    </motion.div>
                )}

                <div className="space-y-2">
                    <label className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] ml-1">New Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            type="password"
                            required
                            min={8}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-medium"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] ml-1">Confirm Password</label>
                    <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
                        <input
                            type="password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-medium"
                            placeholder="••••••••"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !token}
                    className="w-full py-5 bg-primary text-white rounded-[24px] font-bold text-lg hover-lift premium-gradient shadow-xl shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100 transition-all mt-4"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <>Reset Password <CheckCircle2 size={20} /></>}
                </button>
            </form>
        </motion.div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen flex bg-white font-inter">
            {/* Left Side: Form */}
            <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 xl:px-32 relative z-10">
                <Suspense fallback={
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Loader2 className="animate-spin text-primary" size={48} />
                        <p className="text-primary font-bold animate-pulse">Loading Reset Form...</p>
                    </div>
                }>
                    <ResetPasswordForm />
                </Suspense>
            </div>

            {/* Right Side: Visual Section */}
            <div className="hidden lg:flex flex-1 relative bg-primary overflow-hidden items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[80px]" />
                </div>

                <div className="relative z-10 p-20 text-center space-y-8 max-w-2xl text-white">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="inline-block p-10 rounded-[60px] bg-white/10 border border-white/20 backdrop-blur-3xl"
                    >
                        <Lock size={80} className="text-secondary" />
                    </motion.div>
                    <h2 className="text-5xl font-bold font-outfit leading-tight">Identity Secured</h2>
                    <p className="text-xl text-white/70 leading-relaxed font-light">
                        Passwords are the first line of defense. By updating your credentials, you ensure your workspace remains protected under SUPKEM standards.
                    </p>
                </div>
            </div>
        </div>
    );
}
