"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import {
  FilePlus,
  Search,
  Download,
  ExternalLink,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Clock,
  FileText,
  ChevronRight,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

const StatCard = ({ icon: Icon, label, value, color, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="p-6 rounded-[32px] bg-white border border-border/50 hover:shadow-xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
  >
    <div className="flex items-center gap-5 relative z-10">
      <div
        className={cn(
          "inline-flex p-4 rounded-2xl shrink-0 group-hover:scale-110 transition-transform",
          color,
        )}
      >
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <p className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.2em] mb-1">
          {label}
        </p>
        <h3 className="text-2xl font-black font-outfit text-primary">
          {value}
        </h3>
      </div>
    </div>
    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/[0.02] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/[0.04] transition-colors" />
  </motion.div>
);

export default function UserPortal() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch from DRF backend endpoints
        const [appsRes, certsRes] = await Promise.all([
          api.get("/applications/applications/"),
          api.get("/applications/certifications/"),
        ]);

        // Adjust for DRF pagination (.results) if present, ensure array
        const appsData = Array.isArray(appsRes?.data)
          ? appsRes.data
          : appsRes?.data?.results && Array.isArray(appsRes.data.results)
            ? appsRes.data.results
            : [];

        const certsData = Array.isArray(certsRes?.data)
          ? certsRes.data
          : certsRes?.data?.results && Array.isArray(certsRes.data.results)
            ? certsRes.data.results
            : [];

        setApplications(appsData);
        setCertificates(certsData);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const LETTER_KEYWORDS = ["hajj", "umrah", "study", "abroad", "visa", "travel"];

  const lettersDocs = (certificates || []).filter((c: any) => {
    const s = c?.application_detail?.service_name?.toLowerCase() || "";
    return LETTER_KEYWORDS.some((kw) => s.includes(kw));
  });

  const certsDocs = (certificates || []).filter((c: any) => {
    const s = c?.application_detail?.service_name?.toLowerCase() || "";
    return !LETTER_KEYWORDS.some((kw) => s.includes(kw));
  });

  const activeApps = (applications || []).filter(
    (app) => app && !["Approved", "Rejected"].includes(app.status),
  );

  const metrics = [
    {
      icon: FileText,
      label: "Active Applications",
      value:
        (applications?.length || 0) > 0
          ? (activeApps?.length || 0).toString().padStart(2, "0")
          : "00",
      color: "bg-gradient-to-br from-amber-500 to-amber-600",
      delay: 0.1,
    },
    {
      icon: ShieldCheck,
      label: "Certificates",
      value:
        (certsDocs?.length || 0) > 0
          ? (certsDocs?.length || 0).toString().padStart(2, "0")
          : "00",
      color: "bg-gradient-to-br from-primary to-primary/80",
      delay: 0.2,
    },
    {
      icon: Clock,
      label: "Letters Issued",
      value:
        (lettersDocs?.length || 0) > 0
          ? (lettersDocs?.length || 0).toString().padStart(2, "0")
          : "00",
      color: "bg-gradient-to-br from-blue-500 to-blue-700",
      delay: 0.3,
    },
  ];

  return (
    <div className="space-y-8 md:space-y-12 pb-20">
      {/* Premium Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative min-h-[300px] md:min-h-[400px] rounded-[32px] md:rounded-[24px] overflow-hidden bg-slate-950 p-6 md:p-10 lg:p-14 flex items-center shadow-2xl"
      >
        {/* Background Decor */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/20 rounded-full blur-[80px] md:blur-[120px] -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-secondary/10 rounded-full blur-[60px] md:blur-[100px] translate-y-1/2 -translate-x-1/4" />
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-12 items-center w-full">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                Portal Access Alpha
              </motion.div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-outfit text-white tracking-tight leading-none">
                Salam,{" "}
                <span className="text-secondary">
                  {user?.full_name
                    ? String(user.full_name).split(" ")[0]
                    : "Member"}
                </span>
              </h1>
              <p className="text-sm md:text-lg text-white/50 font-medium max-w-md leading-relaxed">
                Manage your community certifications and institutional
                compliance in one unified digital space.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/portal/applications/new"
                className="w-full sm:w-auto px-8 py-4 bg-white text-primary rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-black/20"
              >
                <FilePlus size={18} />
                New Application
              </Link>
              <Link
                href="/portal/organizations/new"
                className="w-full sm:w-auto px-8 py-4 bg-primary/20 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-primary/30 transition-all"
              >
                <Plus size={18} />
                Register Institution
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="bg-white/5 border border-white/10 backdrop-blur-3xl p-8 rounded-[20px] shadow-2xl relative z-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-widest">
                    Compliance Status
                  </p>
                  <p className="text-xl font-black text-white">
                    Trust Verified
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-secondary rounded-full" />
                </div>
                <p className="text-[10px] font-bold text-white/30 text-right">
                  85% Profile Completion
                </p>
              </div>
            </motion.div>
            {/* Decorative background ring */}
            <div className="absolute inset-0 border border-white/5 rounded-[60px] scale-110 -z-10" />
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {metrics.map((m, i) => (
          <StatCard key={i} {...m} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        {/* Active Application Status */}
        <div className="lg:col-span-2 space-y-6 md:space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl md:text-2xl font-black font-outfit text-primary tracking-tight">
              Active Applications
            </h3>
            <Link
              href="/portal/applications"
              className="text-xs md:text-sm font-bold text-primary/40 hover:text-primary transition-colors flex items-center gap-1 group"
            >
              View All{" "}
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="p-8 text-center text-primary/40 animate-pulse">
                Loading applications...
              </div>
            ) : activeApps.length === 0 ? (
              <div className="p-8 text-center text-foreground/40 text-sm font-medium border border-border/60 border-dashed rounded-[32px] md:rounded-[20px] bg-slate-50/50">
                No active applications found.
              </div>
            ) : (
              activeApps.map((app, i) => (
                <Link
                  href={app?.id ? `/portal/applications/${app.id}` : "#"}
                  key={app?.id || i}
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 md:p-8 rounded-[32px] md:rounded-[20px] bg-white border border-border/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:shadow-primary/5 transition-all group cursor-pointer mb-4"
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="w-14 h-14 md:w-20 md:h-20 bg-primary/[0.03] text-primary rounded-2xl md:rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <Search
                          className="w-6 h-6 md:w-8 md:h-8"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl md:text-2xl font-black font-outfit text-primary tracking-tight leading-tight">
                          {app?.service_name || "Application"}
                        </h4>
                        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[10px] md:text-sm text-foreground/40 font-medium">
                          <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-md text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">
                            #
                            {app?.id
                              ? String(app.id).substring(0, 8).toUpperCase()
                              : "APP"}
                          </span>
                          <span className="hidden md:inline">•</span>
                          <span className="truncate max-w-[150px] md:max-w-none">
                            {app?.organization_name || "Organization"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3">
                      <span
                        className={cn(
                          "px-4 md:px-5 py-1.5 md:py-2 rounded-xl md:rounded-2xl text-[10px] md:text-xs font-black uppercase tracking-widest flex items-center gap-2 border",
                          app?.status === "Under Review"
                            ? "bg-amber-50 text-amber-700 border-amber-100"
                            : app?.status === "Submitted"
                              ? "bg-blue-50 text-blue-700 border-blue-100"
                              : "bg-slate-50 text-slate-700 border-slate-100",
                        )}
                      >
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full animate-pulse",
                            app?.status === "Under Review"
                              ? "bg-amber-500"
                              : app?.status === "Submitted"
                                ? "bg-blue-500"
                                : "bg-slate-500",
                          )}
                        />
                        {app?.status || "In Progress"}
                      </span>
                      <p className="text-[10px] md:text-xs text-foreground/30 font-bold md:mr-1">
                        {app?.submitted_at
                          ? new Date(app.submitted_at).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Certificates & Letters Sidebar */}
        <div className="space-y-8">
          {/* Certificates */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl md:text-2xl font-black font-outfit text-primary tracking-tight">
                Certificates
              </h3>
              <Link
                href="/portal/certificates"
                className="text-xs font-bold text-primary/40 hover:text-primary transition-colors flex items-center gap-1 group"
              >
                View All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {loading ? (
                <div className="p-6 text-center text-primary/40 animate-pulse">Loading...</div>
              ) : certsDocs.length === 0 ? (
                <div className="p-8 text-center text-foreground/40 text-sm font-medium border border-border/60 border-dashed rounded-[32px] bg-slate-50/50">
                  No certificates found.
                </div>
              ) : (
                certsDocs.slice(0, 2).map((cert: any, i: number) => (
                  <motion.div
                    key={cert?.id || i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="p-6 rounded-[32px] bg-gradient-to-br from-emerald-50/50 to-white border border-emerald-100/50 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/5 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
                    
                    <div className="flex items-center justify-between mb-6 relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner border border-emerald-200 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500">
                        <ShieldCheck size={22} />
                      </div>
                      <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm active:scale-90">
                        <Download size={16} />
                      </button>
                    </div>

                    <div className="space-y-1 relative z-10">
                      <p className="text-[10px] font-black text-emerald-600/60 uppercase tracking-[0.2em]">Verified Document</p>
                      <h4 className="text-lg font-black font-outfit text-primary mb-1 leading-tight group-hover:text-emerald-700 transition-colors">
                        {cert?.application_detail?.service_name || cert?.serial_number || "Certification"}
                      </h4>
                      <p className="text-[10px] text-foreground/30 font-bold mb-6 flex items-center gap-1.5">
                        <Calendar size={12} className="text-emerald-500/50" />
                        Issued: {cert?.issued_at ? new Date(cert.issued_at).toLocaleDateString() : "N/A"}
                      </p>
                    </div>

                    <Link
                      href={cert?.id ? `/portal/certificates/${cert.id}` : "#"}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-xl border border-emerald-100 shadow-sm hover:bg-emerald-50 hover:gap-3 transition-all relative z-10"
                    >
                      Registry Details <ChevronRight size={14} />
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Letters */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl md:text-2xl font-black font-outfit text-primary tracking-tight">
                Letters
              </h3>
              <Link
                href="/portal/letters"
                className="text-xs font-bold text-primary/40 hover:text-primary transition-colors flex items-center gap-1 group"
              >
                View All <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {loading ? (
                <div className="p-6 text-center text-primary/40 animate-pulse">Loading...</div>
              ) : lettersDocs.length === 0 ? (
                <div className="p-8 text-center text-foreground/40 text-sm font-medium border border-border/60 border-dashed rounded-[32px] bg-slate-50/50">
                  No letters found.
                </div>
              ) : (
                lettersDocs.slice(0, 2).map((cert: any, i: number) => (
                  <motion.div
                    key={cert?.id || i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="p-6 rounded-[14px] md:rounded-[32px] bg-blue-50/50 border border-transparent hover:bg-white hover:border-blue-200/60 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm border border-border/40 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <FileText size={20} />
                      </div>
                      <button className="p-2.5 md:p-3 bg-white rounded-xl md:rounded-2xl text-primary/40 hover:text-primary hover:bg-white transition-all shadow-sm border border-border/20 active:scale-90">
                        <Download size={16} />
                      </button>
                    </div>
                    <h4 className="text-base md:text-lg font-black font-outfit text-primary mb-1 leading-tight">
                      {cert?.application_detail?.service_name || cert?.serial_number || "Official Letter"}
                    </h4>
                    <p className="text-[10px] md:text-xs text-foreground/30 font-bold mb-6 italic">
                      Issued: {cert?.issued_at ? new Date(cert.issued_at).toLocaleDateString() : "N/A"}
                    </p>
                    <Link
                      href={cert?.id ? `/portal/letters/${cert.id}` : "#"}
                      className="text-[10px] md:text-xs font-black text-blue-600 flex items-center gap-2 group-hover:gap-3 transition-all uppercase tracking-widest bg-white w-fit px-4 py-2 rounded-xl shadow-sm border border-border/20"
                    >
                      View <ExternalLink size={10} />
                    </Link>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Quick Support Card */}
          <div className="p-8 rounded-[20px] bg-primary text-white space-y-4 relative overflow-hidden group shadow-2xl">
            <div className="relative z-10">
              <h4 className="text-xl font-bold font-outfit">Need Help?</h4>
              <p className="text-white/60 text-sm font-medium leading-relaxed">
                Our support team is available during working hours to assist
                with your portal needs.
              </p>
              <button className="mt-4 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-2xl text-xs font-black uppercase tracking-widest transition-all">
                Support Center
              </button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
          </div>
        </div>
      </div>
    </div>
  );
}
