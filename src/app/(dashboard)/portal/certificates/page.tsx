"use client";

import useSWR from "swr";
import Link from "next/link";
import {
  Award,
  Calendar,
  ChevronRight,
  AlertCircle,
  ShieldCheck,
  Download,
} from "lucide-react";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function CertificatesPage() {
  const { data, error, isLoading } = useSWR("/certifications/", fetcher);
  // DRF may return an array directly or { results: [] }
  const certificates = Array.isArray(data) ? data : data?.results || [];

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* Header section */}
      <div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-primary font-outfit leading-tight">
          My Certificates
        </h2>
        <p className="text-slate-500 font-medium mt-2 text-sm max-w-md">
          Access and download your official Halal certificates.
        </p>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
          <AlertCircle size={20} />
          <span className="font-semibold text-sm">
            Failed to load certificates. Please try refreshing the page.
          </span>
        </div>
      )}

      {/* Content Display */}
      <div className="bg-white border border-border/50 shadow-sm rounded-[32px] overflow-hidden">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
            {[1, 2, 3].map((skeleton) => (
              <div
                key={skeleton}
                className="border border-border/50 rounded-2xl p-6 h-48 animate-pulse bg-slate-50/50"
              >
                <div className="w-12 h-12 bg-slate-200 rounded-xl mb-4" />
                <div className="space-y-3">
                  <div className="h-5 w-3/4 bg-slate-200 rounded-lg" />
                  <div className="h-4 w-1/2 bg-slate-100 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : certificates.length === 0 ? (
          <div className="p-16 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
                <Award size={40} />
              </div>
              <h3 className="text-xl font-black text-slate-800 font-outfit">
                No Certificates Found
              </h3>
              <p className="text-slate-500 font-medium text-sm max-w-sm">
                You do not have any official Halal certificates issued yet.
                Submit an application first.
              </p>
              <Link
                href="/portal/applications"
                className="mt-4 px-6 py-3 bg-primary/10 text-primary rounded-xl font-bold hover:bg-primary/20 transition-colors"
              >
                View Applications
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {certificates.map((cert: any) => (
              <Link
                href={`/portal/certificates/${cert.id}`}
                key={cert.id}
                className="flex flex-col border border-border/50 hover:border-primary/30 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/5 transition-all group relative bg-white"
              >
                {/* Decorative gold accent */}
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 pointer-events-none">
                  <Award size={100} />
                </div>

                <div className="p-6 relative z-10 flex flex-col h-full border-b border-border/30">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center text-amber-600 shrink-0 shadow-inner border border-amber-200 group-hover:scale-110 transition-transform">
                      <ShieldCheck size={28} />
                    </div>
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm",
                        cert.status === "Valid" || cert.status === "Active"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : cert.status === "Expired"
                            ? "bg-red-50 text-red-600 border-red-200"
                            : "bg-slate-50 text-slate-600 border-slate-200",
                      )}
                    >
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          cert.status === "Valid" || cert.status === "Active"
                            ? "bg-emerald-500"
                            : cert.status === "Expired"
                              ? "bg-red-500"
                              : "bg-slate-400",
                        )}
                      />
                      {cert.status || "Valid"}
                    </div>
                  </div>

                  <div className="space-y-1 mt-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
                      Certificate Number
                    </p>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-primary transition-colors font-mono">
                      {cert.certificate_number}
                    </h3>
                  </div>

                  <div className="mt-6 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <Calendar size={16} className="text-slate-400 shrink-0" />
                      <span className="flex-1">Issued:</span>
                      <span className="text-slate-800 font-bold">
                        {new Date(
                          cert.issue_date || cert.created_at,
                        ).toLocaleDateString()}
                      </span>
                    </div>
                    {cert.expiry_date && (
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                        <Calendar
                          size={16}
                          className="text-slate-400 shrink-0"
                        />
                        <span className="flex-1">Valid Until:</span>
                        <span className="text-slate-800 font-bold">
                          {new Date(cert.expiry_date).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 bg-slate-50/50 flex items-center justify-between text-sm font-bold text-slate-500 group-hover:text-primary transition-colors">
                  <span className="flex items-center gap-2">
                    <Download size={16} />
                    View & Download
                  </span>
                  <ChevronRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
