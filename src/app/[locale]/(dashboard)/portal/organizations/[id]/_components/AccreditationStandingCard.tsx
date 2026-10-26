"use client";

import { ShieldCheck, Clock, Ban, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";

interface AccreditationStandingCardProps {
  status: string;
}

export function AccreditationStandingCard({ status }: AccreditationStandingCardProps) {
  const isAccredited = status === "Accredited";
  const isPending = status === "Pending";

  return (
    <div className="p-8 rounded-[24px] bg-gradient-to-br from-slate-900 via-primary to-slate-950 text-white shadow-2xl shadow-primary/20 space-y-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-44 h-44 bg-secondary/15 rounded-full blur-3xl" />

      <div className="flex items-center gap-3 relative z-10">
        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
          {isAccredited ? (
            <ShieldCheck size={20} className="text-secondary" />
          ) : isPending ? (
            <Clock size={20} className="text-amber-400" />
          ) : (
            <Ban size={20} className="text-rose-400" />
          )}
        </div>
        <div>
          <h4 className="font-bold text-lg font-outfit">Accreditation Standing</h4>
          <p className="text-[10px] uppercase font-black tracking-widest text-white/60">
            Status: {status}
          </p>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed relative z-10">
        {isAccredited
          ? "Your institution is fully accredited with SUPKEM. You are authorized to submit certification applications, education credentials, and official letter requests."
          : isPending
          ? "Your institution's statutory credentials (KRA PIN, Reg No) are currently being reviewed by SUPKEM compliance officers."
          : "Access for this organization is currently suspended. Please contact the SUPKEM Secretariat for assistance and compliance requirements."}
      </p>

      <div className="pt-2 relative z-10">
        {isAccredited ? (
          <Link
            href="/portal/applications/new"
            className="w-full py-4 bg-white hover:bg-secondary text-primary hover:text-white rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
          >
            <Sparkles size={16} />
            Submit New Application
            <ArrowRight size={16} />
          </Link>
        ) : (
          <Link
            href="/portal/applications"
            className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer"
          >
            View Applications
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  );
}
