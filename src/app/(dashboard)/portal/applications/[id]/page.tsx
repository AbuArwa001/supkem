"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Clock,
  Building2,
  FileText,
  CheckCircle2,
  ShieldAlert,
  FileQuestion,
} from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

export default function ApplicationDetail() {
  const params = useParams();
  const router = useRouter();
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await api.get(`/applications/${params.id}/`);
        setApplication(res.data);
      } catch (err: any) {
        console.error("Failed to fetch application", err);
        setError(
          err.response?.data?.detail ||
            "Application not found or you don't have access.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchApplication();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
        <p className="text-primary/60 font-medium">
          Loading Application Details...
        </p>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6 text-center">
        <div className="w-24 h-24 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
          <ShieldAlert size={48} />
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="text-2xl font-black font-outfit text-slate-800">
            Application Error
          </h2>
          <p className="text-slate-500 font-medium">
            {error || "The application could not be loaded."}
          </p>
        </div>
        <button
          onClick={() => router.push("/portal")}
          className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  const isFinalized = ["Approved", "Rejected"].includes(application.status);

  return (
    <div className="space-y-8 pb-20 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-3 bg-white border border-border/50 rounded-2xl hover:bg-slate-50 hover:shadow-sm transition-all group"
        >
          <ArrowLeft
            size={20}
            className="text-slate-600 group-hover:-translate-x-1 transition-transform"
          />
        </button>
        <div>
          <h1 className="text-3xl font-black font-outfit text-primary tracking-tight">
            Application Details
          </h1>
          <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
            <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest text-slate-500">
              #{application.id.substring(0, 8).toUpperCase()}
            </span>
            <span>{new Date(application.submitted_at).toLocaleString()}</span>
          </p>
        </div>
      </div>

      {/* Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "relative overflow-hidden rounded-[32px] p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8",
          application.status === "Approved"
            ? "bg-emerald-600"
            : application.status === "Rejected"
              ? "bg-red-600"
              : application.status === "Under Review"
                ? "bg-amber-600"
                : "bg-blue-600",
        )}
      >
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />

        <div className="relative z-10 space-y-2 text-center md:text-left">
          <p className="text-white/80 text-xs font-black uppercase tracking-[0.2em]">
            Current Status
          </p>
          <h2 className="text-4xl md:text-5xl font-black font-outfit tracking-tight">
            {application.status}
          </h2>
          {application.status === "Approved" && application.certification && (
            <p className="text-emerald-100 font-medium">
              Certificate ID: {application.certification.serial_number}
            </p>
          )}
        </div>

        <div className="relative z-10 w-24 h-24 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm shrink-0">
          {application.status === "Approved" ? (
            <CheckCircle2 size={40} />
          ) : application.status === "Rejected" ? (
            <ShieldAlert size={40} />
          ) : application.status === "Under Review" ? (
            <FileQuestion size={40} />
          ) : (
            <Clock size={40} />
          )}
        </div>
      </motion.div>

      {/* Application Data Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-8 bg-white border border-border/50 rounded-[32px] shadow-sm space-y-6"
        >
          <div className="flex items-center gap-4 border-b border-border/50 pb-6">
            <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center shrink-0">
              <FileText size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Requested Service
              </p>
              <h3 className="text-xl font-bold text-slate-800">
                {application.service_name}
              </h3>
            </div>
          </div>

          <div className="space-y-4 pt-2 text-sm text-slate-600 font-medium">
            <div className="flex justify-between items-center py-2 border-b border-dashed border-border/50">
              <span className="text-slate-400">Submission Date</span>
              <span className="text-slate-800 font-bold">
                {new Date(application.submitted_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-dashed border-border/50">
              <span className="text-slate-400">Last Updated</span>
              <span className="text-slate-800 font-bold">
                {new Date(application.updated_at).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-dashed border-border/50">
              <span className="text-slate-400">Application ID</span>
              <span className="text-slate-800 font-mono text-xs">
                {application.id}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 bg-white border border-border/50 rounded-[32px] shadow-sm space-y-6"
        >
          <div className="flex items-center gap-4 border-b border-border/50 pb-6">
            <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center shrink-0">
              <Building2 size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Entity Details
              </p>
              <h3 className="text-xl font-bold text-slate-800">
                {application.organization_name}
              </h3>
            </div>
          </div>

          <div className="space-y-4 pt-2 text-sm text-slate-600 font-medium">
            <div className="flex justify-between items-center py-2 border-b border-dashed border-border/50">
              <span className="text-slate-400">Applicant Name</span>
              <span className="text-slate-800 font-bold">
                {application.user_name}
              </span>
            </div>
            {/* More organization details could be added here if the API provides them */}
          </div>
        </motion.div>
      </div>

      {application.status === "Approved" && application.certification && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-8 bg-emerald-50 border border-emerald-100 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-xl font-black font-outfit text-emerald-800 tracking-tight">
              Certificate Ready
            </h3>
            <p className="text-sm font-medium text-emerald-600/80 mt-1">
              This application has been approved and a certificate generated.
            </p>
          </div>
          <Link
            href={`/portal/certificates/${application.certification.id}`}
            className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm text-center uppercase tracking-widest hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
          >
            View Official Certificate
          </Link>
        </motion.div>
      )}
    </div>
  );
}
