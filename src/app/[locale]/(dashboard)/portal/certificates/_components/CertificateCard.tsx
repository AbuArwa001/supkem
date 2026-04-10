import { Link } from "@/i18n/routing";
import { Award, ShieldCheck, Calendar, Download, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { ICertificate } from "@/app/[locale]/(dashboard)/portal/certificates/_hooks/useCertificatesLogic";

export default function CertificateCard({ cert }: { cert: ICertificate }) {
  const isValid = cert.status === "Valid" || cert.status === "Active";
  const isExpired = cert.status === "Expired";

  const statusColors = isValid
    ? "bg-emerald-50 text-emerald-600 border-emerald-200"
    : isExpired
      ? "bg-red-50 text-red-600 border-red-200"
      : "bg-slate-50 text-slate-600 border-slate-200";

  const statusDotColors = isValid
    ? "bg-emerald-500"
    : isExpired
      ? "bg-red-500"
      : "bg-slate-400";

  return (
    <Link
      href={`/portal/certificates/${cert.id}`}
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
              statusColors
            )}
          >
            <span
              className={cn("w-1.5 h-1.5 rounded-full", statusDotColors)}
            />
            {cert.status || "Valid"}
          </div>
        </div>

        <div className="space-y-1 mt-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary">
            Certificate Number
          </p>
          <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-primary transition-colors font-mono">
            {cert.serial_number || "CERT-PENDING"}
          </h3>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <Calendar size={16} className="text-slate-400 shrink-0" />
            <span className="flex-1">Issued:</span>
            <span className="text-slate-800 font-bold">
              {cert.issued_at
                ? new Date(cert.issued_at).toLocaleDateString()
                : "N/A"}
            </span>
          </div>
          {(cert.expiry_date || cert.expires_at) && (
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              <Calendar size={16} className="text-slate-400 shrink-0" />
              <span className="flex-1">Expires:</span>
              <span className="text-slate-800 font-bold">
                {cert.expires_at ? new Date(cert.expires_at).toLocaleDateString() : cert.expiry_date}
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
  );
}
