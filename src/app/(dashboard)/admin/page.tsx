"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users,
  FileText,
  Award,
  Building2,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  BarChart3,
  Activity,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import Link from "next/link";

const StatCard = ({ icon: Icon, label, value, trend, color, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5, ease: "easeOut" }}
    className="p-8 rounded-[32px] bg-white border border-slate-100 hover:shadow-2xl hover:shadow-slate-200/50 transition-all group relative overflow-hidden"
  >
    <div className="flex items-start justify-between relative z-10">
      <div>
        <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">
          {label}
        </p>
        <div className="flex items-end gap-3 mt-1">
          <h3 className="text-4xl font-black font-outfit text-slate-900 tracking-tight">
            {value}
          </h3>
        </div>
      </div>
      <div
        className={cn(
          "inline-flex p-4 rounded-2xl group-hover:scale-110 transition-transform shadow-inner",
          color,
        )}
      >
        <Icon size={24} className="text-white" />
      </div>
    </div>

    {trend && (
      <div className="mt-6 flex items-center gap-2 relative z-10">
        <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
          <TrendingUp size={12} /> {trend}
        </span>
        <span className="text-xs font-semibold text-slate-400">
          vs last month
        </span>
      </div>
    )}

    {/* Decorative Background Elements */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 -translate-y-16 translate-x-16 rounded-full group-hover:bg-slate-100/50 transition-colors duration-500" />
    <div className="absolute bottom-0 right-10 w-16 h-16 bg-slate-50 translate-y-8 rounded-full group-hover:bg-slate-100/50 transition-colors duration-500 delay-75" />
  </motion.div>
);

export default function AdminOverview() {
  const [data, setData] = useState<{ stats: any[], recent_applications: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get("/dashboard/stats/");
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 size={40} className="text-indigo-600" />
        </motion.div>
      </div>
    );
  }

  const stats = data?.stats || [];
  const recentApplications = data?.recent_applications || [];

  return (
    <div className="space-y-8 md:space-y-12">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-[10px] font-black tracking-widest uppercase"
          >
            <Activity size={10} /> Live Dashboard
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-black font-outfit text-slate-900 tracking-tight leading-none">
            System Overview
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-lg max-w-xl leading-relaxed">
            Monitor digital operations, application pipelines, and community
            growth metrics.
          </p>
        </div>
        <button className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-[20px] font-bold hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/20 transition-all flex items-center justify-center gap-3">
          <BarChart3 size={20} /> Generate Report
        </button>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        {stats.map((s, i) => (
          <StatCard key={i} icon={
            s.label === "Organizations" ? Building2 :
              s.label === "Total Users" ? Users :
                s.label === "Applications" ? FileText : Award
          } {...s} delay={i * 0.1} />
        ))}
      </div>

      {/* Main Content Areas */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 md:gap-12">
        {/* Recent Applications Table */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl md:text-2xl font-black font-outfit text-slate-900">
              Recent Applications
            </h3>
            <Link href="/admin/applications" className="text-xs md:text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group whitespace-nowrap">
              View Pipeline{" "}
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </Link>
          </div>

          <div className="bg-white border border-slate-100 rounded-[28px] md:rounded-[32px] overflow-hidden shadow-lg shadow-slate-200/40">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <th className="px-6 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      Application ID
                    </th>
                    <th className="px-6 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      Organization Detail
                    </th>
                    <th className="px-6 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                      Current Status
                    </th>
                    <th className="px-6 md:px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">
                      Activity
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentApplications.map((app) => (
                    <tr
                      key={app.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 md:px-8 py-5 md:py-6">
                        <Link href={`/admin/applications/${app.id}`} className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {app.id.slice(0, 8)}...
                        </Link>
                      </td>
                      <td className="px-6 md:px-8 py-5 md:py-6">
                        <p className="font-bold text-sm md:text-base text-slate-900">
                          {app.organization_name}
                        </p>
                        <p className="text-[10px] md:text-xs font-semibold text-slate-500 mt-1">
                          {app.service_name}
                        </p>
                      </td>
                      <td className="px-6 md:px-8 py-5 md:py-6">
                        <span
                          className={cn(
                            "px-3 md:px-3.5 py-1 md:py-1.5 rounded-full text-[10px] md:text-[11px] font-bold inline-flex items-center gap-1.5 border",
                            app.status === "Approved"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                              : app.status === "Rejected"
                                ? "bg-red-50 text-red-700 border-red-100"
                                : "bg-amber-50 text-amber-700 border-amber-100",
                          )}
                        >
                          {app.status === "Approved" ? (
                            <CheckCircle2 size={12} />
                          ) : app.status === "Rejected" ? (
                            <AlertCircle size={12} />
                          ) : (
                            <Clock size={12} />
                          )}
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 md:px-8 py-5 md:py-6 text-xs md:text-sm font-semibold text-slate-500 text-right">
                        {new Date(app.submitted_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {recentApplications.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-8 py-10 text-center text-slate-400 font-medium">
                        No recent applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Cards */}
        <div className="space-y-8">
          {/* Action Items */}
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-black font-outfit text-slate-900">
              Upcoming Deadlines
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
              {[
                {
                  title: "Membership Renewal",
                  desc: "Due in 3 days • Coastal Region",
                  type: "warning",
                },
                {
                  title: "Audit Report Submission",
                  desc: "Due next week • Finance Dept",
                  type: "danger",
                },
                {
                  title: "System Maintenance",
                  desc: "Scheduled tomorrow at 2 AM",
                  type: "info",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 rounded-[24px] bg-white border border-slate-100 flex items-start gap-4 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all cursor-pointer group"
                >
                  <div
                    className={cn(
                      "w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform",
                      item.type === "warning"
                        ? "bg-amber-100 text-amber-600"
                        : item.type === "danger"
                          ? "bg-red-100 text-red-600"
                          : "bg-blue-100 text-blue-600",
                    )}
                  >
                    <Clock size={18} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-sm md:text-base text-slate-900 leading-none">
                      {item.title}
                    </p>
                    <p className="text-[10px] md:text-xs font-semibold text-slate-500">
                      {item.desc}
                    </p>
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
