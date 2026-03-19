"use client";

import Link from "next/link";
import { ShieldCheck, Download, ChevronRight, FileText, ExternalLink } from "lucide-react";

interface PortalSidebarProps {
  certificates: any[];
  letters: any[];
}

export default function PortalSidebar({ certificates, letters }: PortalSidebarProps) {
  return (
    <div className="space-y-8">
      {/* Certificates Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-black font-outfit text-slate-900">Certificates</h3>
          <Link href="/portal/certificates" className="text-xs font-bold text-slate-400 hover:text-primary transition-colors">View All</Link>
        </div>
        {certificates.slice(0, 2).map((cert: any, i: number) => (
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
        {letters.slice(0, 2).map((cert: any, i: number) => (
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
  );
}
