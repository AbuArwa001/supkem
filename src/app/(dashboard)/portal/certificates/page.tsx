"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Award,
    Download,
    Printer,
    ExternalLink,
    Calendar,
    CheckCircle2,
    AlertCircle,
    FileBadge
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import Link from "next/link";

export default function UserCertificates() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCerts = async () => {
            try {
                const res = await api.get("/applications/certifications/");
                setCertificates(res.data.results || res.data);
            } catch (err) {
                console.error("Failed to fetch certificates", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCerts();
    }, []);

    return (
        <div className="space-y-12">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-border">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold font-outfit text-primary">My Certificates</h1>
                    <p className="text-foreground/60 font-medium tracking-tight">Access and download your official SUPKEM certifications and membership documents.</p>
                </div>
                <div className="bg-primary/5 px-6 py-4 rounded-3xl border border-primary/10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
                        <FileBadge size={28} />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 leading-none">Total Issued</p>
                        <p className="text-2xl font-black text-primary leading-tight">{certificates.length}</p>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="py-20 flex justify-center">
                    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
            ) : certificates.length === 0 ? (
                <div className="py-20 text-center space-y-6 rounded-[40px] border-2 border-dashed border-border bg-primary/[0.01]">
                    <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto text-primary/20">
                        <Award size={48} />
                    </div>
                    <div className="space-y-2">
                        <h3 className="text-2xl font-bold font-outfit text-primary">No Certificates Yet</h3>
                        <p className="text-foreground/40 font-medium max-w-sm mx-auto">
                            Once your applications are approved and processed, your official certificates will appear here.
                        </p>
                    </div>
                    <Link href="/portal/applications/new" className="inline-flex px-8 py-4 bg-primary text-white rounded-2xl font-bold hover-lift shadow-xl shadow-primary/20 transition-all">
                        Apply for Certification
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {certificates.map((cert: any, i) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="group p-8 rounded-[48px] bg-white border-2 border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all text-center relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 -translate-y-16 translate-x-16 rounded-full group-hover:bg-secondary/10 transition-colors" />

                            <div className="w-20 h-20 bg-secondary/10 text-secondary rounded-[32px] flex items-center justify-center mx-auto mb-8 border border-secondary/20 group-hover:bg-secondary group-hover:text-white group-hover:rotate-12 transition-all">
                                <Award size={40} />
                            </div>

                            <div className="space-y-2 mb-8">
                                <h4 className="text-2xl font-bold font-outfit text-primary tracking-tight leading-tight">Membership Accreditation 2026</h4>
                                <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest">{cert.organization_name}</p>
                            </div>

                            <div className="flex items-center justify-between p-4 rounded-3xl bg-primary/[0.02] border border-primary/5 mb-8">
                                <div className="text-left space-y-1">
                                    <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest leading-none">Issued On</p>
                                    <p className="text-sm font-bold text-primary">{new Date(cert.issued_date).toLocaleDateString()}</p>
                                </div>
                                <div className="text-right space-y-1">
                                    <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest leading-none">Serial No.</p>
                                    <p className="text-sm font-bold text-secondary font-mono">SUP-0{cert.id}</p>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button className="flex-1 py-4 bg-primary text-white rounded-[24px] font-bold text-sm flex items-center justify-center gap-2 hover-lift premium-gradient shadow-xl shadow-primary/20">
                                    <Download size={18} /> Download
                                </button>
                                <button className="p-4 bg-white border border-border rounded-[24px] text-foreground/40 hover:text-primary hover:border-primary/20 transition-all">
                                    <Printer size={18} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
