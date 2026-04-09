"use client";

import { motion } from "framer-motion";
import { FileText, Award, ChevronRight } from "lucide-react";

export function OrganizationRecords() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-[24px] bg-white border border-border shadow-sm flex flex-col justify-between group h-40 relative overflow-hidden"
            >
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
                <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center relative z-10 mb-2">
                    <FileText size={24} />
                </div>
                <div className="flex items-end justify-between relative z-10">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Records</p>
                        <span className="text-2xl font-black font-outfit text-slate-800">Pending Apps</span>
                    </div>
                    <ChevronRight size={20} className="text-amber-500/50 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                </div>
            </motion.div>

            <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-[24px] bg-white border border-border shadow-sm flex flex-col justify-between group h-40 relative overflow-hidden"
            >
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center relative z-10 mb-2">
                    <Award size={24} />
                </div>
                <div className="flex items-end justify-between relative z-10">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Records</p>
                        <span className="text-2xl font-black font-outfit text-slate-800">Active Certs</span>
                    </div>
                    <ChevronRight size={20} className="text-green-500/50 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                </div>
            </motion.div>
        </div>
    );
}
