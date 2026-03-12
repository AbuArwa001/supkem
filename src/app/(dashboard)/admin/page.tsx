"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
  FileDown,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import Link from "next/link";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// --- Report Diagrams ---

const BarChart = ({ data }: { data: any[] }) => {
  const max = Math.max(...data.map(d => d.count), 1);
  return (
    <div className="flex items-end gap-2 h-40 w-full pt-6">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-2 group relative">
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${(d.count / max) * 100}%` }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-lg group-hover:from-indigo-500 group-hover:to-indigo-300 transition-all shadow-lg shadow-indigo-200"
          />
          <span className="text-[10px] font-bold text-slate-400 truncate w-full text-center">
            {d.type || d.status}
          </span>
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
            {d.count} Units
          </div>
        </div>
      ))}
    </div>
  );
};

const AreaChart = ({ data }: { data: any[] }) => {
  if (!data || data.length === 0) return <div className="h-40 flex items-center justify-center text-slate-300 italic">No trend data</div>;

  const max = Math.max(...data.map(d => d.count), 1);
  const width = 800;
  const height = 200;

  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * width,
    y: height - (d.count / max) * height
  }));

  const pathData = `M ${points[0].x} ${points[0].y} ` +
    points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ') +
    ` L ${width} ${height} L 0 ${height} Z`;

  const strokeData = `M ${points[0].x} ${points[0].y} ` +
    points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');

  return (
    <div className="w-full aspect-[4/1] relative">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d={pathData}
          fill="url(#gradient)"
        />
        <motion.path
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          d={strokeData}
          fill="none"
          stroke="#6366f1"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((p, i) => (
          <motion.circle
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1 + i * 0.05 }}
            cx={p.x}
            cy={p.y}
            r="6"
            fill="white"
            stroke="#6366f1"
            strokeWidth="3"
            className="cursor-pointer hover:r-8 transition-all"
          />
        ))}
      </svg>
    </div>
  );
};

const ReportModal = ({ isOpen, onClose, data }: { isOpen: boolean, onClose: () => void, data: any }) => {
  const downloadReport = async () => {
    const reportElement = document.getElementById("report-content");
    if (!reportElement) return;

    const canvas = await html2canvas(reportElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff"
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    // Use canvas dimensions directly to avoid type error with getImageProperties
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`SUPKEM_Analytical_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-[20px] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="p-8 border-b border-slate-100 flex items-center justify-between shrink-0 bg-slate-50/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-indigo-600">
                  <BarChart3 size={20} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Analytical Systems</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black font-outfit text-slate-900">Data Insights Report</h2>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={downloadReport}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                >
                  <FileDown size={18} /> Export PDF
                </button>
                <button onClick={onClose} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-slate-900 hover:border-slate-900 transition-all">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div id="report-content" className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Section 1: Growth Trend */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold font-outfit text-slate-900 flex items-center gap-2">
                      <TrendingUp className="text-indigo-600" size={20} /> Application Growth Trend
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">Last 30 Days</span>
                  </div>
                  <div className="p-8 bg-slate-50 border border-slate-100 rounded-[32px]">
                    <AreaChart data={data?.growth_trend || []} />
                  </div>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">
                    Growth analysis shows consistent submission patterns with a <span className="text-indigo-600 font-bold">18% increase</span> compared to the previous cycle.
                  </p>
                </div>

                {/* Section 2: Distribution by Status */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold font-outfit text-slate-900 flex items-center gap-2">
                      <Layers className="text-amber-500" size={20} /> Workflow Distribution
                    </h3>
                  </div>
                  <div className="p-8 bg-slate-50 border border-slate-100 rounded-[32px]">
                    <BarChart data={data?.status_distribution || []} />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {data?.status_distribution?.map((s: any, i: number) => (
                      <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl text-center">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{s.status}</p>
                        <p className="text-2xl font-black text-slate-900">{s.count}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Section 3: Organization Types */}
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold font-outfit text-slate-900 flex items-center gap-2">
                    <Building2 className="text-emerald-500" size={20} /> Impact by Organization Sector
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {data?.organization_types?.map((ot: any, i: number) => {
                    const icons = [Building2, Users, FileText, Award];
                    const colors = ["bg-indigo-50 text-indigo-600", "bg-emerald-50 text-emerald-600", "bg-amber-50 text-amber-600", "bg-blue-50 text-blue-600"];
                    const Icon = icons[i % icons.length];
                    const color = colors[i % colors.length];
                    return (
                      <div key={i} className="p-6 bg-white border border-slate-100 rounded-[14px] hover:shadow-xl hover:shadow-slate-200/50 transition-all group">
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform", color)}>
                          <Icon size={24} />
                        </div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{ot.type}</p>
                        <div className="flex items-end justify-between">
                          <p className="text-2xl font-black text-slate-900">{ot.count}</p>
                          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+4%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

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
  const [data, setData] = useState<{
    stats: any[],
    recent_applications: any[],
    report_data: any,
    upcoming_deadlines: any[]
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReportOpen, setIsReportOpen] = useState(false);

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
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        data={data?.report_data}
      />

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
        <button
          onClick={() => setIsReportOpen(true)}
          className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-[20px] font-bold hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/20 transition-all flex items-center justify-center gap-3"
        >
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

          <div className="bg-white border border-slate-100 rounded-[14px] md:rounded-[32px] overflow-hidden shadow-lg shadow-slate-200/40">
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
                  {recentApplications.map((app: any) => (
                    <tr
                      key={app.id}
                      className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 md:px-8 py-5 md:py-6">
                        <Link href={`/admin/applications/${app.id}`} className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                          {app.display_id}
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
            <div className="flex items-center justify-between">
              <h3 className="text-xl md:text-2xl font-black font-outfit text-slate-900">
                Upcoming Deadlines
              </h3>
              <Link href="/admin/deadlines" className="text-xs md:text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group whitespace-nowrap">
                View All{" "}
                <ArrowUpRight
                  size={16}
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
              {data?.upcoming_deadlines && data.upcoming_deadlines.length > 0 ? (
                data.upcoming_deadlines.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
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
                  </motion.div>
                ))
              ) : (
                <div className="p-10 text-center bg-slate-50/50 border border-dashed border-slate-200 rounded-[32px] space-y-3">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="text-emerald-500" size={24} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900">All Clear!</p>
                    <p className="text-xs text-slate-400 font-medium">No urgent deadlines or delayed applications found.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
