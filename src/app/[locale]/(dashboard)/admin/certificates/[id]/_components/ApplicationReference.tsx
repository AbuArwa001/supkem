import React from "react";
import { Link } from "@/i18n/routing";
import { CheckCircle2 } from "lucide-react";

interface ApplicationReferenceProps {
  applicationId: string | number;
}

/**
 * Linked application reference section.
 */
export function ApplicationReference({
  applicationId,
}: ApplicationReferenceProps) {
  return (
    <div className="max-w-4xl mx-auto flex items-center justify-between p-6 bg-primary/[0.02] rounded-3xl border border-primary/10">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
          <CheckCircle2 size={18} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mb-0.5">
            Linked Application
          </p>
          <p className="text-sm font-bold text-primary">
            Registry ID: {String(applicationId).toUpperCase()}
          </p>
        </div>
      </div>
      <Link
        href={`/admin/applications/${applicationId}`}
        className="px-6 py-3 bg-white border border-primary/20 text-primary rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all shadow-sm"
      >
        Review Source App
      </Link>
    </div>
  );
}
