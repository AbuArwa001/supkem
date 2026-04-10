"use client";

import useSWR from "swr";
import {
  Building2,
  MapPin,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  FileText,
  Plus,
} from "lucide-react";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/routing";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function OrganizationsPage() {
  const { data, error, isLoading } = useSWR(
    "/organizations/organizations/",
    fetcher,
  );
  // DRF may return an array directly or { results: [] }
  const organizations = Array.isArray(data) ? data : data?.results || [];

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-primary font-outfit leading-tight">
            My Organizations
          </h2>
          <p className="text-slate-500 font-medium mt-2 text-sm max-w-md">
            Manage and view the organizations associated with your portal
            account.
          </p>
        </div>
        <Link
          href="/portal/organizations/new"
          className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all hover-lift"
        >
          <Plus size={20} />
          <span>Register New Institution</span>
        </Link>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
          <AlertCircle size={20} />
          <span className="font-semibold text-sm">
            Failed to load organizations. Please try refreshing the page.
          </span>
        </div>
      )}

      {/* Content Display */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((skeleton) => (
            <div
              key={skeleton}
              className="bg-white border border-border/50 rounded-[16px] p-6 h-64 animate-pulse"
            >
              <div className="w-16 h-16 bg-slate-100 rounded-2xl mb-4" />
              <div className="h-6 w-3/4 bg-slate-100 rounded-lg mb-4" />
              <div className="space-y-3">
                <div className="h-4 w-full bg-slate-50 rounded-lg" />
                <div className="h-4 w-5/6 bg-slate-50 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : organizations.length === 0 ? (
        <div className="bg-white border border-border/50 rounded-[16px] p-16 text-center">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
              <Building2 size={40} />
            </div>
            <h3 className="text-xl font-black text-slate-800 font-outfit">
              No Organizations Found
            </h3>
            <p className="text-slate-500 font-medium text-sm max-w-sm">
              You are not currently associated with any registered organizations
              in the system.
            </p>
            <Link
              href="/portal/organizations/new"
              className="mt-6 px-10 py-4 bg-primary text-white rounded-[20px] font-bold shadow-xl shadow-primary/10 hover-lift flex items-center gap-2"
            >
              <Plus size={18} /> Register My First Institution
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {organizations.map((org: any) => (
            <Link
              href={`/portal/organizations/${org.id}`}
              key={org.id}
              className="block bg-white border border-border/50 overflow-hidden hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all group rounded-[16px] relative"
            >
              {/* Card Header & Decorative elements */}
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 pointer-events-none">
                <Building2 size={120} />
              </div>

              <div className="p-8 relative z-10 flex flex-col h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary shrink-0 shadow-inner border border-primary/10">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-800 leading-tight tracking-tight group-hover:text-primary transition-colors">
                      {org.name}
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mt-1">
                      {org.type}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 flex-1">
                  {org.registration_number && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                        <FileText
                          size={14}
                          className="lucide-react lucide-file-text"
                        />
                        {/* Fallback above to using standard icons available in earlier lucide versions */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="16" x2="8" y1="13" y2="13" />
                          <line x1="16" x2="8" y1="17" y2="17" />
                          <line x1="10" x2="8" y1="9" y2="9" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          Reg No.
                        </p>
                        <p className="text-sm font-semibold text-slate-700">
                          {org.reg_number}
                        </p>
                      </div>
                    </div>
                  )}

                  {org.county && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                        <MapPin size={14} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          Location
                        </p>
                        <p className="text-sm font-semibold text-slate-700">
                          {org.county_council_name}
                        </p>
                      </div>
                    </div>
                  )}

                  {(org.email || org.phone) && (
                    <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                      {org.email && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                          <Mail size={14} className="text-slate-400" />
                          {org.email}
                        </div>
                      )}
                      {org.phone && (
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                          <Phone size={14} className="text-slate-400" />
                          {org.phone}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-border/50 flex items-center justify-between text-[11px] font-bold text-slate-400">
                  <div className="flex items-center gap-1.5 uppercase tracking-widest">
                    <Calendar size={12} />
                    Joined{" "}
                    {new Date(
                      org.created_at || Date.now(),
                    ).toLocaleDateString()}
                  </div>
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-[9px] uppercase tracking-widest border",
                      org.accreditation_status === "Accredited"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : org.accreditation_status === "Pending"
                          ? "bg-amber-50 text-amber-600 border-amber-100"
                          : "bg-red-50 text-red-600 border-red-100",
                    )}
                  >
                    {org.accreditation_status || "Pending"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
