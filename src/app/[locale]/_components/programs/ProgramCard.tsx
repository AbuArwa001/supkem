"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { LucideIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProgramItem {
  title: string;
  desc: string;
  icon: LucideIcon;
  color: string;
  accent: string;
  href: string;
}

interface ProgramCardProps {
  program: ProgramItem;
  index: number;
  learnMoreText: string;
}

export function ProgramCard({ program, index, learnMoreText }: ProgramCardProps) {
  const Icon = program.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -15 }}
      className={cn(
        "p-14 rounded-[14px] bg-slate-50/30 border border-slate-100 hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-700 relative group overflow-hidden",
        program.accent,
      )}
    >
      <div className="absolute top-0 left-0 w-2 h-0 bg-primary group-hover:h-full transition-all duration-500" />
      <div className={cn("inline-flex p-6 rounded-[2rem] mb-12 shadow-inner", program.color)}>
        <Icon size={42} strokeWidth={1.5} />
      </div>
      <h3 className="text-3xl font-black font-outfit text-primary mb-8 tracking-tight">
        {program.title}
      </h3>
      <p className="text-xl text-slate-500 leading-relaxed font-medium mb-8">
        {program.desc}
      </p>
      <Link
        href={program.href}
        className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all uppercase tracking-widest text-xs"
      >
        {learnMoreText} <ArrowRight size={16} />
      </Link>
    </motion.div>
  );
}
