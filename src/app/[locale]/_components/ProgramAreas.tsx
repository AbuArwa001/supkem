"use client";

import { Heart, Shield, Users, BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";
import { ProgramCard, ProgramItem } from "./programs/ProgramCard";

const getPrograms = (t: any): ProgramItem[] => [
  {
    title: t("programs.prog1.title"),
    desc: t("programs.prog1.desc"),
    icon: Heart,
    color: "bg-teal-50 text-teal-600",
    accent: "border-teal-200",
    href: "/strategic-focus/programmes",
  },
  {
    title: t("programs.prog2.title"),
    desc: t("programs.prog2.desc"),
    icon: Shield,
    color: "bg-indigo-50 text-indigo-600",
    accent: "border-indigo-200",
    href: "/strategic-focus/institutional-strengthening",
  },
  {
    title: t("programs.prog3.title"),
    desc: t("programs.prog3.desc"),
    icon: Users,
    color: "bg-amber-50 text-amber-600",
    accent: "border-amber-200",
    href: "/strategic-focus/partnership-and-collaboration",
  },
  {
    title: t("programs.prog4.title"),
    desc: t("programs.prog4.desc"),
    icon: BookOpen,
    color: "bg-rose-50 text-rose-600",
    accent: "border-rose-200",
    href: "/strategic-focus/cross-cutting-areas",
  },
];

export const ProgramAreas = () => {
  const t = useTranslations("Home");
  const programs = getPrograms(t);

  return (
    <section id="strategic-focus" className="py-40 px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-50 to-transparent -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <div className="space-y-6">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-secondary">
              {t("programs.subtitle")}
            </p>
            <h2 className="text-6xl lg:text-8xl font-black font-outfit text-primary tracking-tighter leading-[0.9]">
              {t("programs.title")}
            </h2>
          </div>
          <p className="text-2xl text-slate-400 max-w-lg font-medium italic border-l-8 border-secondary/20 pl-8 leading-relaxed">
            &ldquo;{t("programs.quote")}&rdquo;
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {programs.map((prog, i) => (
            <ProgramCard
              key={i}
              program={prog}
              index={i}
              learnMoreText={t("programs.learnMore")}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
