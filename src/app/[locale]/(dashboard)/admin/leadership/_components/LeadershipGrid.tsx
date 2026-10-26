"use client";

import React from "react";
import { User } from "lucide-react";
import { LeadershipProfile } from "@/services/leadership-service";
import { useTranslations } from "next-intl";
import { LeadershipProfileCard } from "./LeadershipProfileCard";

interface LeadershipGridProps {
  profiles: LeadershipProfile[];
  loading: boolean;
  onEdit: (item: LeadershipProfile) => void;
  onDelete: (id: string) => void;
}

export function LeadershipGrid({ profiles, loading, onEdit, onDelete }: LeadershipGridProps) {
  const t = useTranslations("Dashboard.admin.leadership");

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-96 bg-slate-100 animate-pulse rounded-[16px] border border-slate-200" />
        ))}
      </div>
    );
  }

  if (profiles.length === 0) {
    return (
      <div className="text-center py-24 bg-white rounded-[16px] border border-dashed border-border flex flex-col items-center justify-center space-y-4">
        <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center text-primary/40">
          <User size={40} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-primary">{t("empty")}</h3>
          <p className="text-foreground/50 font-medium">{t("addDesc")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {profiles.map((item, i) => (
        <LeadershipProfileCard
          key={item.id}
          item={item}
          index={i}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
