"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import {
  FilePlus,
  Search,
  Download,
  ExternalLink,
  Calendar,
  ShieldCheck,
  Clock,
  FileText,
  ChevronRight,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import api from "@/lib/api";

// --- Sub-components ---

const StatCard = ({ icon: Icon, label, value, color, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="p-6 rounded-[32px] bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden"
  >
    <div className="flex items-center gap-5 relative z-10">
      <div className={cn("inline-flex p-4 rounded-2xl shrink-0 group-hover:scale-110 transition-transform shadow-md", color)}>
        <Icon size={24} className="text-white" />
      </div>
      <div>
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-1">
          {label}
        </p>
        <h3 className="text-3xl font-black font-outfit text-slate-900">
          {value}
        </h3>
      </div>
    </div>
    <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-slate-100 transition-colors" />
  </motion.div>
);

// --- Main Component ---

export default function UserPortal() {
  const { user } = useAuth();
  const [applications, setApplications] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsRes, certsRes] = await Promise.all([
          api.get("/applications/applications/"),
          api.get("/applications/certifications/"),
        ]);

        // Helper to normalize DRF data
        const normalize = (res: any) =>
          Array.isArray(res?.data) ? res.data : (res?.data?.results || []);

        setApplications(normalize(appsRes));
        setCertificates(normalize(certsRes));
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- Logic & Filtering ---

  const { lettersDocs, certsDocs, activeApps } = useMemo(() => {
    const keywords = ["hajj", "umrah", "study", "abroad", "visa", "travel"];

    const letters = (certificates || []).filter((c: any) => {
      const s = c?.application_detail?.service_name?.toLowerCase() || "";
      return keywords.some((kw) => s.includes(kw));
    });

    const certs = (certificates || []).filter((c: any) => {
      const s = c?.application_detail?.service_name?.toLowerCase() || "";
      return !keywords.some((kw) => s.includes(kw));
    });

    const active = (applications || []).filter(
      (app) => app && !["Approved", "Rejected"].includes(app.status)
    );

    return { lettersDocs: letters, certsDocs: certs, activeApps: active };
  }, [applications, certificates]);

  const metrics = [
    {
      icon: FileText,
      label: "Active Applications",
      value: activeApps.length.toString().padStart(2, "0"),
      color: "bg-gradient-to-br from-amber-600 to-amber-700",
      delay: 0.1,
    },
    {
      icon: ShieldCheck,
      label: "Certificates",
      value: certsDocs.length.toString().padStart(2, "0"),
      color: "bg-gradient-to-br from-indigo-600 to-indigo-700",
      delay: 0.2,
    },
    {
      icon: Clock,
      label: "Letters Issued",
      value: lettersDocs.length.toString().padStart(2, "0"),
      color: "bg-gradient-to-br from-blue-600 to-blue-700",
      delay: 0.3,
    },
  ];

  return (
    <div className="space-y-8 md:space-y-12 pb-20 p-6 sm:p-10 bg-slate-50 min-h-screen">

      {/* Premium Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative min-h-[300px] md:min-h-[400px] rounded-[32px] overflow-hidden bg-slate-950 p-6 md:p-14 flex items-center shadow-2xl"
      >
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
        </div>

        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-bold text-[10px] uppercase tracking-widest">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                Portal Access Alpha
              </div>
              <h1 className="text-4xl md:text-6xl font-black font-outfit text-white tracking-tight leading-none">
                Salam, <span className="text-secondary">{user?.full_name?.split(" ")[0] || "Member"}</span>
              </h1>
              <p className="text-sm md:text-lg text-slate-300 font-medium max-w-md leading-relaxed">
                Manage your community certifications and institutional compliance in one unified digital space.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/portal/applications/new" className="px-8 py-4 bg-white text-slate-950 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-xl">
                <FilePlus size={18} /> New Application
              </Link>
              <Link href="/portal/organizations/new" className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
                <Plus size={18} /> Register Institution
              </Link>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="bg-white/5 border border-white/10 backdrop-blur-3xl p-8 rounded-[24px] shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-secondary/20 flex items-center justify-center text-secondary">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-white/60 uppercase tracking-widest">Compliance Status</p>
                  <p className="text-xl font-black text-white">Trust Verified</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-secondary rounded-full" />
                </div>
                <p className="text-[10px] font-bold text-white/40 text-right">85% Profile Completion</p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((m, i) => (
          <StatCard key={i} {...m} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Active Application Status */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black font-outfit text-slate-900 tracking-tight">Active Applications</h3>
            <Link href="/portal/applications" className="text-sm font-bold text-slate-400 hover:text-primary transition-colors flex items-center gap-1 group">
              View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="p-12 text-center text-slate-400 animate-pulse font-bold uppercase tracking-widest">Loading...</div>
            ) : activeApps.length === 0 ? (
              <div className="p-12 text-center text-slate-500 font-medium border-2 border-slate-200 border-dashed rounded-[32px] bg-white">
                No active applications found.
              </div>
            ) : (
              activeApps.map((app, i) => (
                <Link href={`/portal/applications/${app.id}`} key={app.id || i}>
                  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="p-6 md:p-8 rounded-[32px] bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:border-primary/20 transition-all group mb-4">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                        <Search className="w-8 h-8" strokeWidth={1.5} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xl md:text-2xl font-black font-outfit text-slate-900 leading-tight">{app?.service_name || "Application"}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                          <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] text-slate-600">#{String(app.id).substring(0, 8).toUpperCase()}</span>
                          <span>•</span>
                          <span className="truncate max-w-[200px]">{app?.organization_name || "Organization"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-3">
                      <span className={cn("px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border shadow-sm",
                        app?.status === "Under Review" ? "bg-amber-50 text-amber-700 border-amber-200" :
                          app?.status === "Submitted" ? "bg-blue-50 text-blue-700 border-blue-200" :
                            "bg-slate-50 text-slate-700 border-slate-200")}>
                        <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", app?.status === "Under Review" ? "bg-amber-500" : "bg-blue-500")} />
                        {app?.status || "In Progress"}
                      </span>
                      <p className="text-xs text-slate-400 font-bold">{app?.submitted_at ? new Date(app.submitted_at).toLocaleDateString() : "N/A"}</p>
                    </div>
                  </motion.div>
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">

          {/* Certificates Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black font-outfit text-slate-900">Certificates</h3>
              <Link href="/portal/certificates" className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">View All</Link>
            </div>
            {certsDocs.slice(0, 2).map((cert: any, i: number) => (
              <div key={cert.id || i} className="p-6 rounded-[24px] bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100"><ShieldCheck size={20} /></div>
                  <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors"><Download size={16} /></button>
                </div>
                <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest mb-1">Verified Document</p>
                <h4 className="text-lg font-bold text-slate-900 leading-tight mb-4">{cert?.application_detail?.service_name || "Certification"}</h4>
                <Link href={`/portal/certificates/${cert.id}`} className="text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-widest flex items-center gap-1">
                  Registry Details <ChevronRight size={14} />
                </Link>
              </div>
            ))}
          </div>

          {/* Letters Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black font-outfit text-slate-900">Letters</h3>
              <Link href="/portal/letters" className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">View All</Link>
            </div>
            {lettersDocs.slice(0, 2).map((cert: any, i: number) => (
              <div key={cert.id || i} className="p-6 rounded-[24px] bg-blue-50/50 border border-blue-100 hover:bg-white hover:shadow-md transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white text-blue-600 flex items-center justify-center shadow-sm border border-blue-100"><FileText size={20} /></div>
                  <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Download size={16} /></button>
                </div>
                <h4 className="text-lg font-bold text-slate-900 leading-tight mb-4">{cert?.application_detail?.service_name || "Official Letter"}</h4>
                <Link href={`/portal/letters/${cert.id}`} className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-[10px] font-black text-blue-600 uppercase tracking-widest border border-blue-100 shadow-sm">
                  View Letter <ExternalLink size={12} />
                </Link>
              </div>
            ))}
          </div>

          {/* Help Card */}
          <div className="p-8 rounded-[24px] bg-slate-900 text-white space-y-4 relative overflow-hidden group shadow-xl">
            <div className="relative z-10">
              <h4 className="text-xl font-bold font-outfit">Need Help?</h4>
              <p className="text-slate-400 text-sm font-medium leading-relaxed">Our support team is ready to assist with your compliance needs.</p>
              <button className="mt-4 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Support Center</button>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}
