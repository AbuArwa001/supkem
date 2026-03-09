"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    FileText,
    Search,
    Filter,
    CheckCircle2,
    Clock,
    AlertCircle,
    ChevronRight,
    MoreVertical,
    Download
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import Link from "next/link";

export default function AdminApplications() {
    const [applications, setApplications] = useState([]);
    const [filter, setFilter] = useState("all");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const res = await api.get("/applications/applications/");
                setApplications(res.data.results || res.data);
            } catch (err) {
                console.error("Failed to fetch applications", err);
            }
        };
        fetchApplications();
    }, []);

    const filteredApps = (applications || []).filter((app: any) => {
        const matchesFilter = filter === "all" || app.status?.toLowerCase() === filter.toLowerCase();

        const searchLower = searchTerm.toLowerCase();
        const matchesSearch =
            (app.organization_name?.toLowerCase() || "").includes(searchLower) ||
            (app.display_id?.toLowerCase() || "").includes(searchLower) ||
            app.id?.toString().includes(searchTerm);

        return matchesFilter && matchesSearch;
    });

    return (
        <div className="space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold font-outfit text-primary">Applications Board</h1>
                    <p className="text-foreground/60 font-medium">Review and process submissions from across the country.</p>
                </div>

                <div className="flex items-center gap-4 bg-white p-2 border border-border rounded-3xl shadow-sm">
                    <div className="relative group pl-2">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search ID or Org..."
                            className="pl-12 pr-4 py-3 bg-primary/[0.02] border border-transparent focus:border-primary/20 focus:bg-white rounded-2xl text-sm transition-all outline-none w-64"
                        />
                    </div>
                    <div className="flex items-center gap-1 pr-2">
                        {["all", "pending", "approved", "rejected"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={cn(
                                    "px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-xl transition-all",
                                    filter === f ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-foreground/40 hover:bg-primary/5 hover:text-primary"
                                )}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {filteredApps.map((app: any, i) => (
                    <motion.div
                        key={app.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group p-6 rounded-[32px] bg-white border border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col md:flex-row items-center justify-between gap-8"
                    >
                        <div className="flex items-center gap-8 w-full md:w-auto">
                            <div className="w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                                <FileText size={28} />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <h4 className="text-xl font-bold font-outfit text-primary group-hover:underline cursor-pointer">{app.display_id} - {app.service_name}</h4>
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] inline-flex items-center gap-1.5 border",
                                        app.status === "Approved" ? "bg-green-50 text-green-700 border-green-100" :
                                            app.status === "Rejected" ? "bg-red-50 text-red-700 border-red-100" : "bg-amber-50 text-amber-700 border-amber-100"
                                    )}>
                                        {app.status === "Approved" ? <CheckCircle2 size={10} /> :
                                            app.status === "Rejected" ? <AlertCircle size={10} /> : <Clock size={10} />}
                                        {app.status}
                                    </span>
                                </div>
                                <p className="text-sm font-semibold text-foreground/40 flex items-center gap-2">
                                    <span className="text-secondary font-bold underline underline-offset-4 decoration-2 decoration-secondary/30">
                                        {app.organization_name || "Individual Application"}
                                    </span>
                                    • Submitted on {app.submitted_at ? new Date(app.submitted_at).toLocaleDateString() : "Pending"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 w-full md:w-auto md:border-l border-border/50 md:pl-8">
                            <div className="hidden lg:block text-right pr-4">
                                <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest leading-none mb-1">Last Action</p>
                                <p className="text-sm font-bold text-primary">Admin Review</p>
                            </div>
                            <Link
                                href={`/admin/applications/${app.id}`}
                                className="flex-1 md:flex-none px-6 py-3 bg-primary/[0.03] text-primary rounded-2xl font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                Review Details <ChevronRight size={16} />
                            </Link>
                            <button className="p-3 bg-white border border-border rounded-xl text-foreground/40 hover:text-primary hover:border-primary/20 transition-all">
                                <MoreVertical size={18} />
                            </button>
                        </div>
                    </motion.div>
                ))}

                {filteredApps.length === 0 && (
                    <div className="py-20 text-center space-y-4 rounded-[40px] border-2 border-dashed border-border bg-primary/[0.01]">
                        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto text-primary/20">
                            <Search size={40} />
                        </div>
                        <h3 className="text-2xl font-bold font-outfit text-primary/40">No applications found</h3>
                        <p className="text-foreground/30 font-medium">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
