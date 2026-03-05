"use client";

import { motion } from "framer-motion";
import { Users, FileText, Award, Building2, TrendingUp, Clock, CheckCircle2, AlertCircle, ArrowUpRight, BarChart3, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const StatCard = ({ icon: Icon, label, value, trend, color, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5, ease: "easeOut" }}
        className="p-8 rounded-[32px] bg-white border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden"
    >
        <div className="flex items-start justify-between relative z-10">
            <div>
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{label}</p>
                <div className="flex items-end gap-3 mt-1">
                    <h3 className="text-4xl font-black font-outfit text-slate-900 tracking-tight">{value}</h3>
                </div>
            </div>
            <div className={cn("inline-flex p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-inner", color)}>
                <Icon size={24} className="text-white" />
            </div>
        </div>

        {trend && (
            <div className="mt-6 flex items-center gap-2 relative z-10">
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                    <TrendingUp size={12} /> {trend}
                </span>
                <span className="text-xs font-semibold text-slate-400">vs last month</span>
            </div>
        )}

        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 -translate-y-16 translate-x-16 rounded-full group-hover:bg-slate-100/50 transition-colors duration-500" />
        <div className="absolute bottom-0 right-10 w-16 h-16 bg-slate-50 translate-y-8 rounded-full group-hover:bg-slate-100/50 transition-colors duration-500 delay-75" />
    </motion.div>
);

export default function AdminOverview() {
    const stats = [
        { icon: Building2, label: "Organizations", value: "254", trend: "+12.5%", color: "bg-gradient-to-br from-indigo-500 to-indigo-700", delay: 0 },
        { icon: Users, label: "Total Users", value: "1,240", trend: "+5.2%", color: "bg-gradient-to-br from-emerald-500 to-emerald-700", delay: 0.1 },
        { icon: FileText, label: "Applications", value: "86", trend: "+18.0%", color: "bg-gradient-to-br from-amber-500 to-amber-700", delay: 0.2 },
        { icon: Award, label: "Certificates", value: "42", trend: "+8.4%", color: "bg-gradient-to-br from-blue-500 to-blue-700", delay: 0.3 },
    ];

    const recentApplications = [
        { id: "APP-001", org: "Al-Iman Mosque", type: "Halal Certification", status: "Pending", time: "2 hours ago" },
        { id: "APP-002", org: "Muslim Welfare Soc", type: "Organization Reg", status: "Approved", time: "5 hours ago" },
        { id: "APP-003", org: "Nairobi Bilal School", type: "Social Welfare", status: "Rejected", time: "Yesterday" },
        { id: "APP-004", org: "Coastal Islamic Center", type: "Zakat Application", status: "Pending", time: "Yesterday" },
    ];

    return (
        <div className="space-y-12">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
                <div className="space-y-2">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold tracking-widest uppercase mb-2"
                    >
                        <Activity size={12} /> Live Dashboard
                    </motion.div>
                    <h1 className="text-4xl font-black font-outfit text-slate-900 tracking-tight">System Overview</h1>
                    <p className="text-slate-500 font-medium text-lg max-w-xl">Monitor digital operations, application pipelines, and community growth metrics.</p>
                </div>
                <button className="px-8 py-4 bg-slate-900 text-white rounded-[20px] font-bold hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/20 transition-all flex items-center gap-3">
                    <BarChart3 size={20} /> Generate Report
                </button>
            </div>

            {/* Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {stats.map((s, i) => <StatCard key={i} {...s} />)}
            </div>

            {/* Main Content Areas */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Recent Applications Table */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black font-outfit text-slate-900">Recent Applications</h3>
                        <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group">
                            View Pipeline <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-lg shadow-slate-200/40">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/50">
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Application ID</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Organization Detail</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Current Status</th>
                                        <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Activity</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {recentApplications.map((app) => (
                                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                                            <td className="px-8 py-6">
                                                <span className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{app.id}</span>
                                            </td>
                                            <td className="px-8 py-6">
                                                <p className="font-bold text-slate-900">{app.org}</p>
                                                <p className="text-xs font-semibold text-slate-500 mt-1">{app.type}</p>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={cn(
                                                    "px-3.5 py-1.5 rounded-full text-[11px] font-bold inline-flex items-center gap-1.5 border",
                                                    app.status === "Approved" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                                                        app.status === "Rejected" ? "bg-red-50 text-red-700 border-red-100" : "bg-amber-50 text-amber-700 border-amber-100"
                                                )}>
                                                    {app.status === "Approved" ? <CheckCircle2 size={12} /> :
                                                        app.status === "Rejected" ? <AlertCircle size={12} /> : <Clock size={12} />}
                                                    {app.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-sm font-semibold text-slate-500 text-right">{app.time}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Sidebar Cards */}
                <div className="space-y-8">
                    {/* Action Items */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-black font-outfit text-slate-900">Upcoming Deadlines</h3>
                        <div className="space-y-4">
                            {[
                                { title: "Membership Renewal", desc: "Due in 3 days • Coastal Region", type: "warning" },
                                { title: "Audit Report Submission", desc: "Due next week • Finance Dept", type: "danger" },
                                { title: "System Maintenance", desc: "Scheduled tomorrow at 2 AM", type: "info" }
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-[24px] bg-white border border-slate-100 flex items-start gap-5 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all cursor-pointer group">
                                    <div className={cn(
                                        "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform",
                                        item.type === "warning" ? "bg-amber-100 text-amber-600" :
                                            item.type === "danger" ? "bg-red-100 text-red-600" :
                                                "bg-blue-100 text-blue-600"
                                    )}>
                                        <Clock size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="font-bold text-slate-900">{item.title}</p>
                                        <p className="text-xs font-semibold text-slate-500">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
