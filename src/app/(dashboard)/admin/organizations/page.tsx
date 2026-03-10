"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Building2,
    Search,
    Filter,
    MapPin,
    ChevronRight,
    MoreVertical,
    Grid,
    List
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import Link from "next/link";

export default function AdminOrganizations() {
    const [organizations, setOrganizations] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState("grid");
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {
        const fetchOrgs = async () => {
            try {
                const res = await api.get("/organizations/organizations/");
                setOrganizations(res.data.results || res.data);
            } catch (err) {
                console.error("Failed to fetch organizations", err);
            }
        };
        fetchOrgs();
    }, []);

    const filteredOrgs = organizations.filter((org: any) => {
        const matchesSearch = org.name?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || org.accreditation_status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">Organization Audit</h1>
                    <p className="text-foreground/60 font-medium">Monitoring all {organizations.length} registered entities.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search organizations..."
                            className="pl-12 pr-4 py-3 bg-white border border-border focus:border-primary/20 rounded-2xl text-sm transition-all outline-none w-64 shadow-sm"
                        />
                    </div>

                    <div className="flex bg-white border border-border rounded-2xl p-1 shadow-sm">
                        <button
                            onClick={() => setViewMode("grid")}
                            className={cn("p-2 px-4 rounded-xl transition-all", viewMode === "grid" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-foreground/40 hover:bg-primary/5")}
                        >
                            <Grid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode("list")}
                            className={cn("p-2 px-4 rounded-xl transition-all", viewMode === "list" ? "bg-primary text-white shadow-md shadow-primary/20" : "text-foreground/40 hover:bg-primary/5")}
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex bg-slate-100 p-1 rounded-2xl w-fit">
                {["All", "Pending", "Accredited", "Suspended"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setStatusFilter(status)}
                        className={cn(
                            "px-6 py-2 rounded-xl text-sm font-bold transition-all",
                            statusFilter === status
                                ? "bg-white text-primary shadow-sm"
                                : "text-slate-500 hover:text-slate-700 hover:bg-white/50"
                        )}
                    >
                        {status}
                    </button>
                ))}
            </div>

            <div className={cn(
                "grid gap-6",
                viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
            )}>
                {filteredOrgs.map((org: any, i) => (
                    <motion.div
                        key={org.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={cn(
                            "p-8 rounded-[20px] bg-white border border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group relative",
                            viewMode === "list" && "flex items-center justify-between"
                        )}
                    >
                        <div className={cn("flex items-start gap-6", viewMode === "list" && "flex-1")}>
                            <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all border border-primary/10 group-hover:border-primary">
                                <Building2 size={32} />
                            </div>
                            <div className="space-y-4 flex-1">
                                <div>
                                    <div className="flex items-start justify-between gap-4">
                                        <h4 className="text-xl font-bold font-outfit text-primary group-hover:underline cursor-pointer leading-tight">{org.name}</h4>
                                        <span className={cn(
                                            "px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full shrink-0 border",
                                            org.accreditation_status === "Accredited" ? "bg-green-50 text-green-600 border-green-200" :
                                                org.accreditation_status === "Pending" ? "bg-amber-50 text-amber-600 border-amber-200" :
                                                    "bg-red-50 text-red-600 border-red-200"
                                        )}>
                                            {org.accreditation_status || "Pending"}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-secondary">{org.type}</span>
                                        <span className="text-foreground/20">•</span>
                                        <p className="text-xs font-bold text-foreground/40 flex items-center gap-1"><MapPin size={10} /> Nairobi, Kenya</p>
                                    </div>
                                </div>

                                {viewMode === "grid" && (
                                    <div className="flex gap-4 pt-2 border-t border-border/50">
                                        <div className="text-center bg-primary/[0.02] p-3 rounded-2xl flex-1 border border-primary/5 hover:bg-primary/5 transition-colors">
                                            <p className="text-lg font-black text-primary">05</p>
                                            <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest leading-none">Apps</p>
                                        </div>
                                        <div className="text-center bg-secondary/[0.02] p-3 rounded-2xl flex-1 border border-secondary/5 hover:bg-secondary/5 transition-colors">
                                            <p className="text-lg font-black text-secondary">02</p>
                                            <p className="text-[10px] uppercase font-bold text-foreground/40 tracking-widest leading-none">Certs</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={cn("flex items-center gap-4", viewMode === "grid" ? "mt-8 pt-6 border-t border-border/50" : "ml-8 border-l border-border/50 pl-8")}>
                            <Link
                                href={`/admin/organizations/${org.id}`}
                                className="flex-1 px-6 py-4 bg-primary/[0.03] text-primary rounded-2xl font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                View Registry <ChevronRight size={16} />
                            </Link>
                            <button className="p-4 bg-white border border-border rounded-2xl text-foreground/40 hover:text-primary hover:border-primary/20 transition-all">
                                <MoreVertical size={20} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div >
    );
}
