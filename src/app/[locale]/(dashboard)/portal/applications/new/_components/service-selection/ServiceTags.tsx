import { Award, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

export function ServiceTags({ service, isAr }: { service: Service; isAr: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
      <span className="text-[10px] font-black uppercase tracking-wider text-secondary-foreground bg-secondary/20 px-2.5 py-1 rounded-lg">
        {service.category}
      </span>
      <span
        className={cn(
          "text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border",
          service.target_audience === "Individual"
            ? "bg-blue-50 text-blue-700 border-blue-100"
            : "bg-purple-50 text-purple-700 border-purple-100"
        )}
      >
        {service.target_audience}
      </span>
      {service.document_type === "Letter" ? (
        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border bg-blue-50 text-blue-700 border-blue-200/80 inline-flex items-center gap-1 ml-auto rtl:mr-auto rtl:ml-0">
          <FileText size={11} /> {isAr ? "خطاب رسمي" : "Official Letter"}
        </span>
      ) : service.document_type === "None" ? (
        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border bg-slate-100 text-slate-500 border-slate-200 inline-flex items-center gap-1 ml-auto rtl:mr-auto rtl:ml-0">
          {isAr ? "بدون وثيقة" : "No Document"}
        </span>
      ) : (
        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg border bg-emerald-50 text-emerald-700 border-emerald-200 inline-flex items-center gap-1 ml-auto rtl:mr-auto rtl:ml-0">
          <Award size={11} /> {isAr ? "شهادة رسمية" : "Certificate"}
        </span>
      )}
    </div>
  );
}
