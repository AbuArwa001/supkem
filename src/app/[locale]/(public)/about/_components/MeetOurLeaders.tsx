"use client";

import React, { useEffect, useState } from "react";
import { LeadershipService, LeadershipProfile } from "@/services/leadership-service";
import { useTranslations } from "next-intl";
import { LeadershipTree } from "./LeadershipTree";

export function MeetOurLeaders() {
  const t = useTranslations("AboutPage.meetLeaders");
  const [leaders, setLeaders] = useState<LeadershipProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const data = await LeadershipService.getProfiles(true);
        setLeaders(data.filter((l) => l.is_active));
      } catch (err) {
        console.error("Failed to fetch leaders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaders();
  }, []);

  if (loading) {
    return (
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto space-y-12 animate-pulse">
          <div className="h-10 w-64 bg-slate-200 rounded-full mx-auto" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[500px] bg-slate-200 rounded-[32px]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (leaders.length === 0) return null;

  const headLeader = leaders.find((l) => l.order === 1);
  const deputyLeaders = leaders.filter((l) => l.order === 2 || l.order === 3).sort((a, b) => a.order - b.order);
  const execLeaders = leaders.filter((l) => l.order > 3).sort((a, b) => a.order - b.order);

  const displayHead = headLeader || (leaders.length > 0 ? leaders.reduce((prev, curr) => (prev.order < curr.order ? prev : curr)) : null);
  const displayDeputies = deputyLeaders.filter((l) => l.id !== displayHead?.id);
  const displayExecs = execLeaders.filter((l) => l.id !== displayHead?.id);

  return (
    <section className="py-32 px-6 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10 space-y-24">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-400">
            {t("subtitle")}
          </p>
          <h2 className="text-5xl lg:text-7xl font-black font-outfit text-slate-900 tracking-tighter">
            {t("heading")}
          </h2>
          <p className="text-xl text-slate-500 font-medium leading-relaxed">
            {t("desc")}
          </p>
        </div>
        <LeadershipTree displayHead={displayHead} displayDeputies={displayDeputies} displayExecs={displayExecs} />
      </div>
    </section>
  );
}
