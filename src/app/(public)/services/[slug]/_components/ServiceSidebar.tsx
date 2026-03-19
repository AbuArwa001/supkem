"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, FileCheck, ArrowRight } from "lucide-react";

interface ServiceSidebarProps {
    features: string[];
    IconComponent: React.ElementType;
}

export function ServiceSidebar({ features, IconComponent }: ServiceSidebarProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
        >
            {/* Features Card */}
            <div className="bg-primary rounded-[32px] p-10 text-white shadow-xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full flex items-start justify-end p-6">
                    <IconComponent size={48} className="text-white/20 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold font-outfit mb-8 relative z-10">What's Included</h3>
                <ul className="space-y-5 relative z-10">
                    {features.map((feature, idx) => (
                        <li key={idx} className="flex gap-4">
                            <CheckCircle2 size={24} className="text-secondary shrink-0" />
                            <span className="text-white/90 leading-snug">{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Action Card */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-200 shadow-lg text-center space-y-6">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <FileCheck size={32} />
                </div>
                <div>
                    <h4 className="text-xl font-bold text-slate-800 mb-2">Ready to Apply?</h4>
                    <p className="text-slate-500 text-sm">Start your application process digitally through our portal.</p>
                </div>
                <Link
                    href="/register"
                    className="w-full py-4 bg-primary text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-secondary hover:text-primary transition-all shadow-lg hover:shadow-xl group"
                >
                    Start Application <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </motion.div>
    );
}
