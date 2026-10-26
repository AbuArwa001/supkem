"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

export interface UserStatCardItem {
  title: string;
  desc: string;
  value: string;
  badge: string;
  badgeColor: string;
  icon: LucideIcon;
  iconBg: string;
  borderAccent: string;
}

interface UserStatCardProps {
  card: UserStatCardItem;
  index: number;
}

export function UserStatCard({ card, index }: UserStatCardProps) {
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      className={`relative overflow-hidden rounded-[2rem] bg-white p-6 md:p-7 border border-slate-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${card.borderAccent}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.iconBg}`}>
          <Icon className="h-6 w-6" />
        </div>
        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${card.badgeColor}`}>
          {card.badge}
        </span>
      </div>

      <div className="mt-5 space-y-1">
        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400">{card.title}</p>
        <h3 className="text-3xl md:text-4xl font-black font-outfit text-slate-900 tracking-tight">{card.value}</h3>
        <p className="text-xs text-slate-500 font-medium pt-1 line-clamp-1">{card.desc}</p>
      </div>
    </motion.div>
  );
}
