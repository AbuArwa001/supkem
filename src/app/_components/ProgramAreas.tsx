"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, Shield, Users, BookOpen, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const PROGRAMS = [
  {
    title: "Programmes",
    desc: "Implementing interventions in education, economic empowerment, health, peace building, and climate change.",
    icon: Heart,
    color: "bg-teal-50 text-teal-600",
    accent: "border-teal-200",
    href: "/strategic-focus/programmes",
  },
  {
    title: "Institutional Strengthening",
    desc: "Building solid internal structures through robust governance, resource mobilization, and HR development.",
    icon: Shield,
    color: "bg-indigo-50 text-indigo-600",
    accent: "border-indigo-200",
    href: "/strategic-focus/institutional-strengthening",
  },
  {
    title: "Partnership & Collaboration",
    desc: "Fostering strategic engagement with government, non-state actors, and faith-based institutions.",
    icon: Users,
    color: "bg-amber-50 text-amber-600",
    accent: "border-amber-200",
    href: "/strategic-focus/partnership-and-collaboration",
  },
  {
    title: "Cross Cutting Areas",
    desc: "Ensuring effective delivery through comprehensive research, monitoring, evaluation, and strategic communication.",
    icon: BookOpen,
    color: "bg-rose-50 text-rose-600",
    accent: "border-rose-200",
    href: "/strategic-focus/cross-cutting-areas",
  },
];

export const ProgramAreas = () => {
  return (
    <section
      id="strategic-focus"
      className="py-40 px-6 bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-50 to-transparent -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <div className="space-y-6">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-secondary">
              Operational Pillars
            </p>
            <h2 className="text-6xl lg:text-8xl font-black font-outfit text-primary tracking-tighter leading-[0.9]">
              Strategic Focus
            </h2>
          </div>
          <p className="text-2xl text-slate-400 max-w-lg font-medium italic border-l-8 border-secondary/20 pl-8 leading-relaxed">
            "Guided by four core pillars to deliver programmatic and
            institutional growth for the Ummah."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PROGRAMS.map((prog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -15 }}
              className={cn(
                "p-14 rounded-[14px] bg-slate-50/30 border border-slate-100 hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-700 relative group overflow-hidden",
                prog.accent,
              )}
            >
              <div className="absolute top-0 left-0 w-2 h-0 bg-primary group-hover:h-full transition-all duration-500" />
              <div
                className={cn(
                  "inline-flex p-6 rounded-[2rem] mb-12 shadow-inner",
                  prog.color,
                )}
              >
                <prog.icon size={42} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-black font-outfit text-primary mb-8 tracking-tight">
                {prog.title}
              </h3>
              <p className="text-xl text-slate-500 leading-relaxed font-medium mb-8">
                {prog.desc}
              </p>
              <Link
                href={prog.href}
                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all uppercase tracking-widest text-xs"
              >
                Learn More <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
