"use client";

import { Award } from "lucide-react";
import { useTranslations } from "next-intl";

interface CertificateEmptyStateProps {
  onIssueNew: () => void;
}

export function CertificateEmptyState({ onIssueNew }: CertificateEmptyStateProps) {
  const t = useTranslations("Dashboard.admin.certificates");

  return (
    <div className="bg-white border border-border/80 rounded-3xl p-16 text-center max-w-2xl mx-auto shadow-sm">
      <div className="w-20 h-20 bg-amber-500/10 text-amber-600 rounded-3xl flex items-center justify-center mx-auto mb-6">
        <Award size={40} />
      </div>
      <h3 className="text-2xl font-black font-outfit text-slate-800 tracking-tight mb-2">No Certificates Issued Yet</h3>
      <p className="text-slate-500 text-sm max-w-md mx-auto mb-8 leading-relaxed">
        Certificates issued for approved applications will appear here organized by service. Click below to issue your first certificate.
      </p>
      <button onClick={onIssueNew} className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover-lift premium-gradient shadow-lg inline-flex items-center gap-2">
        <Award size={18} /> {t("issueNew")}
      </button>
    </div>
  );
}
