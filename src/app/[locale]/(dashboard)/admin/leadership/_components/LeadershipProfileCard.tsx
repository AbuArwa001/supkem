"use client";

import React from "react";
import { Edit2, Trash2, User, CheckCircle2, XCircle } from "lucide-react";
import { LeadershipProfile } from "@/services/leadership-service";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface LeadershipProfileCardProps {
  item: LeadershipProfile;
  index: number;
  onEdit: (item: LeadershipProfile) => void;
  onDelete: (id: string) => void;
}

export function LeadershipProfileCard({ item, index, onEdit, onDelete }: LeadershipProfileCardProps) {
  const t = useTranslations("Dashboard.admin.leadership");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white rounded-[16px] border border-border shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all h-full flex flex-col overflow-hidden"
    >
      <div className="absolute top-6 right-6 z-10">
        {item.is_active ? (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 shadow-sm">
            <CheckCircle2 size={12} /> {t("live")}
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-slate-100 shadow-sm">
            <XCircle size={12} /> {t("hidden")}
          </div>
        )}
      </div>

      <div className="aspect-[4/3] relative overflow-hidden bg-slate-50 border-b border-border p-2">
        <div className="w-full h-full rounded-[24px] overflow-hidden relative">
          {item.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={item.photo} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-primary/10"><User size={80} /></div>
          )}
        </div>
      </div>

      <div className="p-8 flex-1 space-y-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-secondary mb-2">{item.title}</p>
          <h3 className="text-2xl font-black font-outfit text-primary tracking-tight leading-tight group-hover:text-secondary transition-colors">
            {item.name}
          </h3>
        </div>
        {item.bio && <p className="text-sm text-foreground/60 leading-relaxed font-medium line-clamp-3 italic">"{item.bio}"</p>}

        <div className="flex items-center gap-2 pt-4 border-t border-border/50">
          <button
            onClick={() => onEdit(item)}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary/[0.03] text-primary hover:bg-primary hover:text-white rounded-xl font-bold text-sm transition-all active:scale-95 group/btn border border-primary/10"
          >
            <Edit2 size={16} className="transition-transform group-hover/btn:rotate-12" />
            {t("editProfile")}
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="w-12 h-12 flex items-center justify-center text-rose-500 bg-rose-50 hover:bg-rose-500 hover:text-white rounded-xl transition-all active:scale-95 border border-rose-100"
            aria-label="Delete profile"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
