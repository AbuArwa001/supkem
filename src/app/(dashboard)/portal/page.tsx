"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { FilePlus, Search, Download, ExternalLink, Calendar, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function UserPortal() {
    const { user } = useAuth();

    return (
        <div className="space-y-10">
            {/* Welcome Banner */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="premium-gradient p-12 lg:p-16 rounded-[40px] text-white relative overflow-hidden shadow-2xl shadow-primary/20"
            >
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="relative z-10 space-y-4 max-w-2xl">
                    <h1 className="text-4xl lg:text-5xl font-bold font-outfit">Welcome, {user?.full_name ? user.full_name.split(' ')[0] : 'User'}!</h1>
                    <p className="text-lg text-white/80 leading-relaxed font-medium">
                        Track your applications, manage your organization's compliance, and access official SUPKEM certifications all in one place.
                    </p>
                    <div className="pt-4 flex gap-4">
                        <Link
                            href="/portal/applications/new"
                            className="px-8 py-4 bg-white text-primary rounded-2xl font-bold flex items-center gap-2 hover:bg-secondary hover:text-white transition-all shadow-xl shadow-black/10"
                        >
                            <FilePlus size={20} />
                            New Application
                        </Link>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Active Application Status */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold font-outfit text-primary">My Active Applications</h3>
                    <div className="space-y-4">
                        {[1].map((i) => (
                            <div key={i} className="p-8 rounded-[32px] bg-white border border-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover-lift">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center shrink-0">
                                        <Search size={28} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xl font-bold font-outfit text-primary underline decoration-secondary">Halal Certification</h4>
                                        <p className="text-sm text-foreground/40 font-medium">Submitted on Jan 12, 2026 • Ref: #HAL-8291</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <span className="px-4 py-1.5 bg-amber-50 text-amber-700 rounded-full text-xs font-bold flex items-center gap-1 border border-amber-100">
                                        <Calendar size={12} /> Under Review
                                    </span>
                                    <p className="text-xs text-foreground/40 font-medium mr-2">Est. completion in 5 days</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Certificates */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold font-outfit text-primary">Latest Certificates</h3>
                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="p-6 rounded-[32px] bg-white border border-border shadow-sm group hover:border-primary/20 transition-all">
                                <div className="flex items-center justify-between mb-4">
                                    <CheckCircle2 size={24} className="text-green-500" />
                                    <button className="p-2 bg-primary/5 rounded-xl hover:bg-primary hover:text-white transition-all">
                                        <Download size={16} />
                                    </button>
                                </div>
                                <h4 className="font-bold text-primary mb-1">Membership 2025</h4>
                                <p className="text-xs text-foreground/40 font-medium mb-4 italic">Exp: Dec 31, 2025</p>
                                <Link href={`/certificates/${i}`} className="text-sm font-bold text-primary flex items-center gap-2 group-hover:gap-3 transition-all">
                                    View Digital Copy <ExternalLink size={14} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
