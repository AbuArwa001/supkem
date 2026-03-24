"use client";

import useSWR from "swr";
import Link from "next/link";
import {
  FileText,
  Calendar,
  Building2,
  ChevronRight,
  AlertCircle,
  Clock,
  CheckCircle2,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function ApplicationsPage() {
  const { data, error, isLoading } = useSWR(
    "/applications/applications/",
    fetcher,
  );
  // DRF may return an array directly or { results: [] }
  const applications = Array.isArray(data) ? data : data?.results || [];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "Rejected":
        return "bg-red-50 text-red-600 border-red-100";
      case "Under Review":
        return "bg-amber-50 text-amber-600 border-amber-100";
      default:
        return "bg-slate-50 text-slate-500 border-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <CheckCircle2 size={14} />;
      case "Rejected":
        return <ShieldAlert size={14} />;
      case "Under Review":
        return <HelpCircle size={14} />;
      default:
        return <Clock size={14} />;
    }
  };

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-primary font-outfit leading-tight">
            My Applications
          </h2>
          <p className="text-slate-500 font-medium mt-2 text-sm max-w-md">
            Track and manage all your Halal certification applications.
          </p>
        </div>

        <Link
          href="/portal/applications/new"
          className="px-6 py-4 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all font-bold border border-primary/20 items-center justify-center flex hidden"
        >
          {/* Hiding Apply button for now if not implemented, left for future extension */}
          New Application
        </Link>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
          <AlertCircle size={20} />
          <span className="font-semibold text-sm">
            Failed to load applications. Please try refreshing the page.
          </span>
        </div>
      )}

      {/* Content Display */}
      <div className="bg-white border border-border/50 shadow-sm rounded-[16px] overflow-hidden">
        {isLoading ? (
          <div className="divide-y divide-border/30">
            {[1, 2, 3].map((skeleton) => (
              <div
                key={skeleton}
                className="p-6 md:p-8 animate-pulse flex items-center gap-6"
              >
                <div className="w-16 h-16 bg-slate-100 rounded-2xl shrink-0" />
                <div className="space-y-3 flex-1">
                  <div className="h-5 w-1/3 bg-slate-100 rounded-lg" />
                  <div className="h-4 w-1/4 bg-slate-50 rounded-lg" />
                </div>
                <div className="h-8 w-24 bg-slate-50 rounded-full shrink-0" />
              </div>
            ))}
          </div>
        ) : applications.length === 0 ? (
          <div className="p-16 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                <FileText size={40} />
              </div>
              <h3 className="text-xl font-black text-slate-800 font-outfit">
                No Applications Found
              </h3>
              <p className="text-slate-500 font-medium text-sm max-w-sm">
                You haven't submitted any Halal certification applications yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {applications.map((app: any) => (
              <Link
                href={`/portal/applications/${app.id}`}
                key={app.id}
                className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8 hover:bg-slate-50/50 transition-colors group relative"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary shrink-0 shadow-inner border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all">
                  <FileText size={28} />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-primary transition-colors">
                      {app.service_name || "Halal Certification"}
                    </h3>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                        getStatusStyles(app.status),
                      )}
                    >
                      {getStatusIcon(app.status)}
                      {app.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Building2 size={16} className="text-slate-400" />
                      {app.organization_name || "Personal/Individual"}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={16} className="text-slate-400" />
                      Submitted{" "}
                      {app.submitted_at
                        ? new Date(app.submitted_at).toLocaleDateString()
                        : "N/A"}
                    </div>
                    {app.id && (
                      <div className="flex items-center gap-1.5 font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                        Ref: #{String(app.id).substring(0, 8).toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>

                <div className="shrink-0 md:ml-auto w-full md:w-auto flex justify-end">
                  <div className="w-10 h-10 rounded-full bg-white border border-border/80 flex items-center justify-center text-slate-400 group-hover:border-primary/30 group-hover:text-primary group-hover:bg-primary/5 transition-all shadow-sm">
                    <ChevronRight
                      size={20}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
