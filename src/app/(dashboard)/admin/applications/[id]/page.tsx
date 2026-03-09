"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Building2,
    User,
    FileCheck,
    Clock,
    MessageSquare,
    CheckCircle2,
    AlertCircle,
    Loader2,
    ThumbsUp,
    ThumbsDown
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

export default function ApplicationDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [app, setApp] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchApp = async () => {
            try {
                const res = await api.get(`/applications/applications/${id}/`);
                setApp(res.data);
            } catch (err) {
                console.error("Failed to fetch application", err);
            } finally {
                setLoading(false);
            }
        };
        fetchApp();
    }, [id]);

    const handleAction = async (status: string) => {
        setSubmitting(true);
        try {
            await api.post(`/applications/applications/${id}/update_status/`, { status });
            router.push("/admin/applications");
        } catch (err) {
            console.error("Action failed", err);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="h-96 flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={40} />
        </div>
    );

    if (!app) return <div>Application not found</div>;

    return (
        <div className="space-y-12 pb-20">
            <div className="flex items-center gap-6">
                <button onClick={() => router.back()} className="p-3 bg-white border border-border rounded-2xl hover:bg-primary hover:text-white transition-all">
                    <ArrowLeft size={20} />
                </button>
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold font-outfit text-primary">Review Application {app.display_id}</h1>
                    <p className="text-foreground/40 font-medium">Submitted by {app.organization_name} on {new Date(app.created_at).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    {/* Organization Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="p-10 rounded-[40px] bg-white border border-border shadow-sm space-y-8"
                    >
                        <div className="flex items-center gap-4 text-primary">
                            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0">
                                <Building2 size={24} />
                            </div>
                            <h3 className="text-2xl font-bold font-outfit">Organization Profile</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Full Name</p>
                                <p className="text-lg font-bold text-primary">{app.organization_name}</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Type</p>
                                <p className="text-lg font-bold text-secondary">Registered Entity</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Region</p>
                                <p className="text-lg font-bold text-primary">Nairobi Metropolitan</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Council</p>
                                <p className="text-lg font-bold text-primary">Nairobi City Office</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Service Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="p-10 rounded-[40px] bg-white border border-border shadow-sm space-y-8"
                    >
                        <div className="flex items-center gap-4 text-primary">
                            <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center shrink-0">
                                <Image src="/logo.svg" alt="Logo" width={24} height={24} />
                            </div>
                            <h3 className="text-2xl font-bold font-outfit">Service Details</h3>
                        </div>

                        <div className="p-8 rounded-[32px] bg-primary/[0.02] border border-primary/10 flex items-center justify-between">
                            <div>
                                <h4 className="text-2xl font-bold text-primary font-outfit mb-1">{app.service_name}</h4>
                                <p className="text-sm font-bold text-secondary uppercase tracking-widest">Ref: SER-00{app.service}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-primary">KES 5,000</p>
                                <p className="text-xs font-bold text-foreground/40 tracking-widest uppercase mt-1">Standard Processing Fee</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Applicant Comments</p>
                            <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-100 text-foreground/80 leading-relaxed font-medium italic">
                                "{app.comments || "No comments provided by the applicant."}"
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Action Sidebar */}
                <div className="space-y-8">
                    <div className="p-8 rounded-[40px] bg-primary text-white shadow-2xl shadow-primary/20 space-y-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                        <div className="space-y-4 relative z-10">
                            <p className="text-xs font-bold text-white/50 uppercase tracking-widest">Current Status</p>
                            <div className="flex items-center gap-3">
                                <span className={cn(
                                    "w-4 h-4 rounded-full animate-pulse",
                                    app.status === "Approved" ? "bg-green-400" :
                                        app.status === "Rejected" ? "bg-red-400" : "bg-amber-400"
                                )} />
                                <h3 className="text-3xl font-bold font-outfit">{app.status}</h3>
                            </div>
                        </div>

                        <div className="space-y-4 relative z-10">
                            <button
                                onClick={() => handleAction("Approved")}
                                disabled={submitting}
                                className="w-full py-5 bg-white text-primary rounded-[24px] font-bold text-lg hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10"
                            >
                                <ThumbsUp size={20} /> Approve Entry
                            </button>
                            <button
                                onClick={() => handleAction("Rejected")}
                                disabled={submitting}
                                className="w-full py-5 bg-primary-foreground/10 text-white border border-white/20 rounded-[24px] font-bold text-lg hover:bg-red-600 hover:border-red-600 transition-all flex items-center justify-center gap-2"
                            >
                                <ThumbsDown size={20} /> Reject Submission
                            </button>
                        </div>
                    </div>

                    <div className="p-8 rounded-[40px] bg-white border border-border shadow-sm space-y-6">
                        <h4 className="font-bold text-primary flex items-center gap-2">
                            <Clock size={18} /> Timeline Status
                        </h4>
                        <div className="space-y-6">
                            <div className="flex gap-4 relative">
                                <div className="absolute left-[9px] top-6 bottom-[-24px] w-0.5 bg-primary/10" />
                                <div className="w-5 h-5 rounded-full border-4 border-primary bg-white shrink-0 z-10" />
                                <div>
                                    <p className="text-sm font-bold text-primary">Application Submitted</p>
                                    <p className="text-xs text-foreground/40 font-medium">By {app.organization_name}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-5 h-5 rounded-full border-4 border-amber-400 bg-white shrink-0 z-10" />
                                <div>
                                    <p className="text-sm font-bold text-primary">Under Administrative Review</p>
                                    <p className="text-xs text-foreground/40 font-medium">Assigned to you</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
