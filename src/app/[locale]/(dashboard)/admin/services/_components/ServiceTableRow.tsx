"use client";

import { Edit2, Trash2, Award, FileText, Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import { ServiceItem } from "./types";

interface ServiceTableRowProps {
  service: ServiceItem;
  isAr: boolean;
  t: (key: string) => string;
  onEdit: (item: ServiceItem) => void;
  onDelete: (id: string) => void;
}

export function ServiceTableRow({ service, isAr, t, onEdit, onDelete }: ServiceTableRowProps) {
  const displayName = isAr
    ? service.name_ar || service.name_en || service.name
    : service.name_en || service.name || service.name_ar;
  const displayDesc = isAr
    ? service.description_ar || service.description_en || service.description || t("noDesc")
    : service.description_en || service.description || service.description_ar || t("noDesc");

  return (
    <tr className="hover:bg-primary/[0.01] transition-colors group">
      <td className="px-8 py-6">
        <p className="font-bold text-primary group-hover:underline cursor-pointer">{displayName}</p>
        <p className="text-xs text-foreground/40 line-clamp-1 mt-1">{displayDesc}</p>
      </td>
      <td className="px-8 py-6 hidden md:table-cell">
        <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-[10px] font-black uppercase tracking-widest">
          {service.category}
        </span>
      </td>
      <td className="px-8 py-6 hidden xl:table-cell">
        {service.document_type === "Letter" ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200/80 rounded-full text-xs font-bold">
            <FileText size={13} className="text-blue-500" /> {isAr ? "خطاب رسمي" : "Official Letter"}
          </span>
        ) : service.document_type === "None" ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-bold">
            <Ban size={13} className="text-slate-400" /> {isAr ? "بدون وثيقة" : "No Document"}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/80 rounded-full text-xs font-bold">
            <Award size={13} className="text-emerald-500" /> {isAr ? "شهادة رسمية" : "Certificate"}
          </span>
        )}

        {service.start_date || service.end_date ? (
          <p className="text-[11px] text-foreground/50 mt-1.5 font-medium flex items-center gap-1">
            <span>🗓️</span>
            <span>{service.start_date || "—"} → {service.end_date || service.expiration_date || "—"}</span>
          </p>
        ) : service.document_type === "Certificate" && service.validity_duration && service.validity_duration !== "Indefinite" ? (
          <p className="text-[11px] text-foreground/50 mt-1.5 font-medium flex items-center gap-1">
            <span>⏱️</span><span>{service.validity_duration}</span>
          </p>
        ) : service.document_type === "Certificate" && service.is_indefinite !== false ? (
          <p className="text-[11px] text-emerald-700/70 mt-1.5 font-medium flex items-center gap-1">
            <span>♾️</span><span>{isAr ? "دائمة" : "Indefinite"}</span>
          </p>
        ) : null}
      </td>
      <td className="px-8 py-6 hidden sm:table-cell">
        <p className="font-bold text-primary flex items-center gap-1">
          <span className="text-xs text-foreground/30 font-medium tracking-tight uppercase">KES</span>
          {Number(service.fee).toLocaleString()}
        </p>
      </td>
      <td className="px-8 py-6 hidden lg:table-cell">
        <span className={cn("inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold", service.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700")}>
          <div className={cn("w-1.5 h-1.5 rounded-full", service.is_active ? "bg-green-600" : "bg-red-600")} />
          {service.is_active ? t("active") : t("inactive")}
        </span>
      </td>
      <td className="px-8 py-6 text-end">
        <div className="flex items-center justify-end gap-2">
          <button onClick={() => onEdit(service)} className="p-2 bg-primary/5 text-primary rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm">
            <Edit2 size={16} />
          </button>
          <button onClick={() => onDelete(service.id)} className="p-2 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm">
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}
