"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Award,
    Search,
    Download,
    Printer,
    ExternalLink,
    Calendar,
    ChevronRight,
    MoreVertical
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import Link from "next/link";

export default function AdminCertificates() {
    const [certificates, setCertificates] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchCerts = async () => {
            try {
                const res = await api.get("/applications/certifications/");
                setCertificates(res.data.results || res.data);
            } catch (err) {
                console.error("Failed to fetch certificates", err);
            }
        };
        fetchCerts();
    }, []);

    const filteredCerts = certificates.filter((cert: any) =>
        cert.organization_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">Certification Registry</h1>
                    <p className="text-foreground/60 font-medium">Tracking all {certificates.length} active and archived digital certificates.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by organization..."
                            className="pl-12 pr-4 py-3 bg-white border border-border focus:border-primary/20 rounded-2xl text-sm transition-all outline-none w-64 shadow-sm"
                        />
                    </div>
                    <button className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover-lift premium-gradient shadow-lg flex items-center gap-2">
                        <Award size={18} /> Issue New
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCerts.map((cert: any, i) => (
                    <motion.div
                        key={cert.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-8 rounded-[40px] bg-white border-2 border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
                    >
                        {/* Premium Background Accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.03] -translate-y-12 translate-x-12 rounded-full group-hover:bg-primary/5 transition-colors" />

                        <div className="flex items-center justify-between mb-8">
                            <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center border border-secondary/20 group-hover:bg-secondary group-hover:text-white transition-all">
                                <Award size={28} />
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2.5 bg-primary/[0.02] border border-border rounded-xl text-foreground/40 hover:text-primary hover:border-primary/20 transition-all">
                                    <Download size={16} />
                                </button>
                                <button className="p-2.5 bg-primary/[0.02] border border-border rounded-xl text-foreground/40 hover:text-primary hover:border-primary/20 transition-all">
                                    <MoreVertical size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-1">Active Certificate</p>
                                <h4 className="text-xl font-bold font-outfit text-primary group-hover:underline cursor-pointer tracking-tight leading-tight">Membership Accreditation 2026</h4>
                                <p className="text-xs font-bold text-foreground/40 mt-1 uppercase tracking-widest">{cert.organization_name}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest">Issued Date</p>
                                    <p className="text-xs font-bold text-primary flex items-center gap-1"><Calendar size={12} /> {new Date(cert.issued_date).toLocaleDateString()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest">Serial Number</p>
                                    <p className="text-xs font-bold text-secondary flex items-center gap-1 font-mono tracking-tighter"><Image src="/logo.svg" alt="Logo" width={12} height={12} /> CERT-{cert.id * 1234}</p>
                                </div>
                            </div>

                            <Link
                                href={`/admin/certificates/${cert.id}`}
                                className="w-full py-4 bg-primary/[0.03] text-primary rounded-2xl font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
                            >
                                View Registry Details <ChevronRight size={16} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
