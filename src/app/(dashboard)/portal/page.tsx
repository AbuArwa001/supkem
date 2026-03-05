"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { FilePlus, Search, Download, ExternalLink, Calendar, CheckCircle2, ShieldCheck, Clock, FileText, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const StatCard = ({ icon: Icon, label, value, color, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        className="p-6 rounded-[32px] bg-white border border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
    >
        <div className="flex items-center gap-5 relative z-10">
            <div className={cn("inline-flex p-4 rounded-2xl shrink-0 group-hover:scale-110 transition-transform", color)}>
                <Icon size={24} className="text-white" />
            </div>
            <div>
                <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] mb-1">{label}</p>
                <h3 className="text-2xl font-black font-outfit text-primary">{value}</h3>
            </div>
        </div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/[0.02] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/[0.04] transition-colors" />
    </motion.div>
);

export default function UserPortal() {
    const { user } = useAuth();

    const metrics = [
        { icon: FileText, label: "Active Applications", value: "01", color: "bg-gradient-to-br from-amber-500 to-amber-600", delay: 0.1 },
        { icon: ShieldCheck, label: "Valid Certificates", value: "02", color: "bg-gradient-to-br from-primary to-primary/80", delay: 0.2 },
        { icon: Clock, label: "Pending Actions", value: "00", color: "bg-gradient-to-br from-slate-600 to-slate-800", delay: 0.3 },
    ];

    return (
        <div className="space-y-12 pb-20">
            {/* Premium Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative min-h-[340px] rounded-[48px] overflow-hidden bg-slate-950 p-10 lg:p-16 flex items-center shadow-2xl"
            >
                {/* Background Decor */}
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
                </div>

                <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center w-full">
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                                Portal Access Alpha
                            </motion.div>
                            <h1 className="text-5xl lg:text-6xl font-black font-outfit text-white tracking-tight leading-none">
                                Salam, <span className="text-secondary">{user?.full_name ? user.full_name.split(' ')[0] : 'Member'}</span>
                            </h1>
                            <p className="text-lg text-white/50 font-medium max-w-md leading-relaxed">
                                Manage your community certifications and institutional compliance in one unified digital space.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="/portal/applications/new"
                                className="px-8 py-4 bg-white text-primary rounded-2xl font-black text-sm flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20"
                            >
                                <FilePlus size={18} />
                                Start New Application
                            </Link>
                        </div>
                    </div>

                    <div className="hidden lg:block relative">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="bg-white/5 border border-white/10 backdrop-blur-3xl p-8 rounded-[40px] shadow-2xl relative z-10"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-white/40 uppercase tracking-widest">Compliance Status</p>
                                    <p className="text-xl font-black text-white">Trust Verified</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[85%] bg-secondary rounded-full" />
                                </div>
                                <p className="text-[10px] font-bold text-white/30 text-right">85% Profile Completion</p>
                            </div>
                        </motion.div>
                        {/* Decorative background ring */}
                        <div className="absolute inset-0 border border-white/5 rounded-[60px] scale-110 -z-10" />
                    </div>
                </div>
            </motion.div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {metrics.map((m, i) => <StatCard key={i} {...m} />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Active Application Status */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black font-outfit text-primary tracking-tight">Active Applications</h3>
                        <Link href="/portal/applications" className="text-sm font-bold text-primary/40 hover:text-primary transition-colors flex items-center gap-1 group">
                            View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {[1].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                                className="p-8 rounded-[40px] bg-white border border-border/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-pointer"
                            >
                                <div className="flex items-center gap-6">
                                    <div className="w-20 h-20 bg-primary/[0.03] text-primary rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        <Search size={32} strokeWidth={1.5} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-2xl font-black font-outfit text-primary tracking-tight">Halal Certification</h4>
                                        <div className="flex items-center gap-3 text-sm text-foreground/40 font-medium">
                                            <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest text-slate-500">#HAL-8291</span>
                                            <span>•</span>
                                            <span>Jan 12, 2026</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-3">
                                    <span className="px-5 py-2 bg-amber-50 text-amber-700 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 border border-amber-100">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                        In Progress
                                    </span>
                                    <p className="text-xs text-foreground/30 font-bold mr-1">Estimated. Dec 17</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Recent Certificates Sidebar */}
                <div className="space-y-8">
                    <h3 className="text-2xl font-black font-outfit text-primary tracking-tight">Recent Certificates</h3>
                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                                className="p-6 rounded-[32px] bg-slate-50 border border-transparent hover:bg-white hover:border-border/60 hover:shadow-xl hover:shadow-primary/5 transition-all group"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm border border-border/40 group-hover:bg-primary group-hover:text-white transition-colors">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <button className="p-3 bg-white rounded-2xl text-primary/40 hover:text-primary hover:bg-white transition-all shadow-sm border border-border/20 active:scale-90">
                                        <Download size={18} />
                                    </button>
                                </div>
                                <h4 className="text-lg font-black font-outfit text-primary mb-1">Membership 2025</h4>
                                <p className="text-xs text-foreground/30 font-bold mb-6 italic">Validated until Dec 2025</p>
                                <Link href={`/certificates/${i}`} className="text-xs font-black text-primary flex items-center gap-2 group-hover:gap-3 transition-all uppercase tracking-widest bg-white w-fit px-4 py-2 rounded-xl shadow-sm border border-border/20">
                                    View Document <ExternalLink size={12} />
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Quick Support Card */}
                    <div className="p-8 rounded-[40px] bg-primary text-white space-y-4 relative overflow-hidden group shadow-2xl">
                        <div className="relative z-10">
                            <h4 className="text-xl font-bold font-outfit">Need Help?</h4>
                            <p className="text-white/60 text-sm font-medium leading-relaxed">Our support team is available during working hours to assist with your portal needs.</p>
                            <button className="mt-4 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-xs font-black uppercase tracking-widest transition-all">Support Center</button>
                        </div>
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                    </div>
                </div>
            </div>
        </div>
    );
}
