"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Clock,
    Calendar,
    AlertCircle,
    CheckCircle2,
    Info,
    ChevronRight,
    Loader2,
    ArrowLeft,
    Filter,
    Search,
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import Link from "next/link";

export default function DeadlinesPage() {
    const [deadlines, setDeadlines] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchDeadlines = async () => {
            try {
                const res = await api.get("/dashboard/stats/");
                setDeadlines(res.data.upcoming_deadlines || []);
            } catch (err) {
                console.error("Failed to fetch deadlines", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDeadlines();
    }, []);

    const filteredDeadlines = deadlines.filter((d) => {
        const matchesFilter = filter === "all" || d.type === filter;
        const matchesSearch = d.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 size={40} className="text-indigo-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-10 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
                <div className="space-y-2">
                    <Link
                        href="/admin"
                        className="inline-flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all"
                    >
                        <ArrowLeft size={16} /> Back to Overview
                    </Link>
                    <h1 className="text-4xl font-black font-outfit text-slate-900 tracking-tight">
                        Upcoming Deadlines
                    </h1>
                    <p className="text-slate-500 font-medium">
                        Manage and monitor critical dates, service closings, and maintenance schedules.
                    </p>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-[24px] border border-slate-100 shadow-sm">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search deadlines..."
                        className="w-full bg-slate-50 border-none rounded-2xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-indigo-600/20 transition-all font-medium text-slate-700 font-outfit"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-2 p-1 bg-slate-50 rounded-2xl w-full md:w-auto overflow-x-auto scrollbar-hide">
                    {["all", "danger", "warning", "info"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={cn(
                                "px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap",
                                filter === f
                                    ? "bg-white text-indigo-600 shadow-sm"
                                    : "text-slate-400 hover:text-slate-600"
                            )}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Deadlines List */}
            <div className="grid grid-cols-1 gap-4">
                {filteredDeadlines.length > 0 ? (
                    filteredDeadlines.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="group p-6 bg-white border border-slate-100 rounded-[28px] hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
                        >
                            <div className="flex items-center gap-5">
                                <div className={cn(
                                    "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform",
                                    item.type === "warning" ? "bg-amber-100 text-amber-600" :
                                        item.type === "danger" ? "bg-red-100 text-red-600" :
                                            "bg-blue-100 text-blue-600"
                                )}>
                                    {item.type === "danger" ? <AlertCircle size={24} /> :
                                        item.type === "warning" ? <Clock size={24} /> : <Info size={24} />}
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-black font-outfit text-slate-900 leading-tight">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-3">
                                        <span className={cn(
                                            "px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border",
                                            item.type === "danger" ? "bg-red-50 text-red-600 border-red-100" :
                                                item.type === "warning" ? "bg-amber-50 text-amber-600 border-amber-100" :
                                                    "bg-blue-50 text-blue-600 border-blue-100"
                                        )}>
                                            {item.type === "danger" ? "Urgent" : item.type === "warning" ? "Approaching" : "Scheduled"}
                                        </span>
                                        <p className="text-sm font-bold text-slate-400">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button className="px-6 py-3 bg-slate-50 text-slate-900 rounded-2xl font-bold text-sm hover:bg-slate-100 transition-all">
                                    Details
                                </button>
                                <div className="w-10 h-10 rounded-full flex items-center justify-center text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all">
                                    <ChevronRight size={24} />
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="p-20 text-center bg-slate-50/50 border border-dashed border-slate-200 rounded-[40px] space-y-4">
                        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                            <CheckCircle2 className="text-emerald-500" size={40} />
                        </div>
                        <div className="max-w-sm mx-auto space-y-2">
                            <h3 className="text-2xl font-black font-outfit text-slate-900">No matching deadlines</h3>
                            <p className="text-slate-400 font-medium">Try adjusting your filters or search query to find what you're looking for.</p>
                        </div>
                        <button
                            onClick={() => { setFilter("all"); setSearchQuery(""); }}
                            className="px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold text-sm hover:shadow-lg hover:shadow-indigo-200 transition-all"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
