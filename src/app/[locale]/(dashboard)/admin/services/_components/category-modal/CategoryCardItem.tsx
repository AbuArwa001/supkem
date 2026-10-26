"use client";

import { Trash2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ServiceCategoryItem } from "../types";

interface CategoryCardItemProps {
  category: ServiceCategoryItem;
  isAr: boolean;
  isDeleting: boolean;
  t: (key: string, values?: any) => string;
  onDelete: (cat: ServiceCategoryItem) => void;
}

export function CategoryCardItem({
  category,
  isAr,
  isDeleting,
  t,
  onDelete,
}: CategoryCardItemProps) {
  const displayName = isAr
    ? category.name_ar || category.name_en || category.name
    : category.name_en || category.name || category.name_ar;
  const displayDesc = isAr
    ? category.description_ar || category.description_en || category.description
    : category.description_en || category.description || category.description_ar;
  const servicesCount = category.services_count ?? 0;

  return (
    <div className="group p-4 rounded-2xl border border-border bg-white hover:border-primary/30 hover:shadow-md transition-all flex flex-col justify-between gap-3">
      <div className="space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-bold text-sm text-primary group-hover:text-primary transition-colors truncate">
            {displayName}
          </h4>
          <span
            className={cn(
              "text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border shrink-0",
              servicesCount > 0
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-slate-50 text-slate-500 border-slate-200"
            )}
          >
            {t("servicesCount", { count: servicesCount })}
          </span>
        </div>
        {displayDesc && (
          <p className="text-xs text-foreground/50 line-clamp-2 leading-relaxed">
            {displayDesc}
          </p>
        )}
      </div>

      <div className="pt-2 border-t border-border/60 flex items-center justify-end">
        <button
          onClick={() => onDelete(category)}
          disabled={isDeleting}
          title={servicesCount > 0 ? "Linked to active services" : "Delete category"}
          className="p-1.5 text-foreground/40 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
        >
          {isDeleting ? (
            <Loader2 size={15} className="animate-spin text-rose-500" />
          ) : (
            <Trash2 size={15} />
          )}
        </button>
      </div>
    </div>
  );
}
