"use client";

import { motion } from "framer-motion";
import { FileText, Award, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/routing";

interface OrganizationRecordsProps {
    appsCount?: number;
    certsCount?: number;
    applicationsHref?: string;
    certificatesHref?: string;
}

export function OrganizationRecords({
    appsCount = 0,
    certsCount = 0,
    applicationsHref = "/admin/applications",
    certificatesHref = "/admin/certificates"
}: OrganizationRecordsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href={applicationsHref} className="block">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-7 rounded-[24px] bg-white border border-border hover:border-amber-400/50 shadow-sm hover:shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between group h-44 relative overflow-hidden transition-all cursor-pointer"
                >
                    <div className="absolute -right-6 -top-6 w-28 h-28 bg-amber-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
                    
                    <div className="flex items-center justify-between relative z-10">
                        <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center shadow-xs">
                            <FileText size={24} />
                        </div>
                        <span className="text-3xl font-black font-outfit text-amber-900 group-hover:scale-110 transition-transform">
                            {appsCount}
                        </span>
                    </div>

                    <div className="flex items-end justify-between relative z-10">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Applications Registry</p>
                            <span className="text-xl font-black font-outfit text-slate-800">
                                {appsCount === 1 ? "1 Application" : `${appsCount} Applications`}
                            </span>
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-amber-50 group-hover:bg-amber-100 flex items-center justify-center transition-colors">
                            <ChevronRight size={18} className="text-amber-600 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </div>
                </motion.div>
            </Link>

            <Link href={certificatesHref} className="block">
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-7 rounded-[24px] bg-white border border-border hover:border-emerald-400/50 shadow-sm hover:shadow-xl hover:shadow-emerald-500/10 flex flex-col justify-between group h-44 relative overflow-hidden transition-all cursor-pointer"
                >
                    <div className="absolute -right-6 -top-6 w-28 h-28 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
                    
                    <div className="flex items-center justify-between relative z-10">
                        <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center shadow-xs">
                            <Award size={24} />
                        </div>
                        <span className="text-3xl font-black font-outfit text-emerald-900 group-hover:scale-110 transition-transform">
                            {certsCount}
                        </span>
                    </div>

                    <div className="flex items-end justify-between relative z-10">
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Official Credentials</p>
                            <span className="text-xl font-black font-outfit text-slate-800">
                                {certsCount === 1 ? "1 Active Credential" : `${certsCount} Active Credentials`}
                            </span>
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 group-hover:bg-emerald-100 flex items-center justify-center transition-colors">
                            <ChevronRight size={18} className="text-emerald-600 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </div>
                </motion.div>
            </Link>
        </div>
    );
}

