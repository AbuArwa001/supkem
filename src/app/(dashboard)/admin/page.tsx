"use client";

import { motion } from "framer-motion";
import { Users, FileText, Award, Building2, TrendingUp, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const StatCard = ({ icon: Icon, label, value, trend, color }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="p-6 rounded-[32px] bg-white border border-border hover-lift group relative overflow-hidden"
    >
        <div className={cn("inline-flex p-3 rounded-2xl mb-4 group-hover:scale-110 transition-transform", color)}>
            <Icon size={24} className="text-white" />
        </div>
        <p className="text-sm font-semibold text-foreground/40 uppercase tracking-widest">{label}</p>
        <div className="flex items-end gap-3 mt-1">
            <h3 className="text-3xl font-bold font-outfit text-primary">{value}</h3>
            {trend && <span className="text-xs font-bold text-green-500 mb-1 flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full"><TrendingUp size={12} /> {trend}</span>}
        </div>

        {/* Background Decorative */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/[0.02] -translate-y-12 translate-x-12 rounded-full" />
    </motion.div>
);

export default function AdminOverview() {
    const stats = [
        { icon: Building2, label: "Organizations", value: "254", trend: "+12%", color: "bg-blue-600" },
        { icon: Users, label: "Total Users", value: "1,240", trend: "+5%", color: "bg-purple-600" },
        { icon: FileText, label: "Applications", value: "86", trend: "+18%", color: "bg-amber-600" },
        { icon: Award, label: "Certificates", value: "42", trend: "+8%", color: "bg-green-600" },
    ];

    const recentApplications = [
        { id: "APP-001", org: "Al-Iman Mosque", type: "Halal Certification", status: "Pending", time: "2 hours ago" },
        { id: "APP-002", org: "Muslim Welfare Soc", type: "Organization Reg", status: "Approved", time: "5 hours ago" },
        { id: "APP-003", org: "Nairobi Bilal School", type: "Social Welfare", status: "Rejected", time: "Yesterday" },
    ];

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold font-outfit text-primary">System Overview</h1>
                    <p className="text-foreground/60 font-medium">Monitoring the pulse of SUPKEM digital operations.</p>
                </div>
                <button className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover-lift premium-gradient shadow-lg">Generate Report</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((s, i) => <StatCard key={i} {...s} />)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold font-outfit text-primary">Recent Applications</h3>
                        <button className="text-sm font-bold text-primary hover:underline">View All</button>
                    </div>

                    <div className="bg-white border border-border rounded-[32px] overflow-hidden shadow-sm">
                        <table className="w-full text-left">
                            <thead className="bg-primary/[0.02] border-b border-border">
                                <tr className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
                                    <th className="px-8 py-4">ID</th>
                                    <th className="px-8 py-4">Organization</th>
                                    <th className="px-8 py-4">Status</th>
                                    <th className="px-8 py-4">Submission</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/50">
                                {recentApplications.map((app) => (
                                    <tr key={app.id} className="hover:bg-primary/[0.01] transition-colors group">
                                        <td className="px-8 py-6 font-bold text-primary group-hover:underline cursor-pointer">{app.id}</td>
                                        <td className="px-8 py-6">
                                            <p className="font-semibold">{app.org}</p>
                                            <p className="text-xs text-foreground/40">{app.type}</p>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={cn(
                                                "px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1",
                                                app.status === "Approved" ? "bg-green-100 text-green-700" :
                                                    app.status === "Rejected" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
                                            )}>
                                                {app.status === "Approved" ? <CheckCircle2 size={12} /> :
                                                    app.status === "Rejected" ? <AlertCircle size={12} /> : <Clock size={12} />}
                                                {app.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-sm text-foreground/40 font-medium">{app.time}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-6">
                    <h3 className="text-xl font-bold font-outfit text-primary">Upcoming Deadlines</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="p-5 rounded-3xl bg-white border border-border flex items-start gap-4 hover-lift">
                                <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center shrink-0">
                                    <Clock size={20} />
                                </div>
                                <div className="space-y-1">
                                    <p className="font-bold text-primary">Membership Renewal</p>
                                    <p className="text-xs text-foreground/40 font-medium">Due in 3 days • Coastal Region</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
