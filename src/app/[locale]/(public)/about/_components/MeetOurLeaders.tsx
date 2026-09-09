"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Linkedin, Twitter, Facebook } from "lucide-react";
import { LeadershipService, LeadershipProfile } from "@/services/leadership-service";
import Image from "next/image";
import { useTranslations } from "next-intl";

function LeaderCard({ leader, isHead = false }: { leader: LeadershipProfile; isHead?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`group relative overflow-hidden rounded-[32px] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.12)] transition-all duration-500 ease-out hover:-translate-y-1 ${
        isHead ? "w-full max-w-[400px]" : "w-full max-w-[320px]"
      } mx-auto`}
    >
      <div className={`relative aspect-square w-full overflow-hidden ${isHead ? "bg-slate-900" : "bg-slate-50"}`}>
        {leader.photo ? (
          <Image
            src={leader.photo}
            alt={leader.name}
            fill
            className="object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300">
            <User size={80} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Socials overlaid on image */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          {leader.linkedin_url && (
            <a href={leader.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-slate-900 flex items-center justify-center transition-colors shadow-lg">
              <Linkedin size={16} />
            </a>
          )}
          {leader.twitter_url && (
            <a href={leader.twitter_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-slate-900 flex items-center justify-center transition-colors shadow-lg">
              <Twitter size={16} />
            </a>
          )}
          {leader.facebook_url && (
            <a href={leader.facebook_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md hover:bg-white text-white hover:text-slate-900 flex items-center justify-center transition-colors shadow-lg">
              <Facebook size={16} />
            </a>
          )}
        </div>
      </div>

      <div className={`p-8 ${isHead ? "bg-slate-900 text-white" : "bg-white text-slate-900"}`}>
        <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${isHead ? "text-amber-400" : "text-slate-400"}`}>
          {leader.title}
        </p>
        <h3 className={`text-2xl font-black font-outfit tracking-tight ${isHead ? "text-white" : "text-slate-900"}`}>
          {leader.name}
        </h3>
        {leader.bio && (
          <p className={`mt-5 text-sm font-medium leading-relaxed italic border-l-2 pl-4 ${isHead ? "text-slate-400 border-slate-700" : "text-slate-500 border-slate-100"} line-clamp-3 group-hover:line-clamp-none transition-all duration-500`}>
            {leader.bio}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function MeetOurLeaders() {
  const t = useTranslations("AboutPage.meetLeaders");
  const [leaders, setLeaders] = useState<LeadershipProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const data = await LeadershipService.getProfiles(true);
        const activeData = data.filter(l => l.is_active);
        setLeaders(activeData);
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

  const headLeader = leaders.find(l => l.order === 1);
  const deputyLeaders = leaders.filter(l => l.order === 2 || l.order === 3).sort((a, b) => a.order - b.order);
  const execLeaders = leaders.filter(l => l.order > 3).sort((a, b) => a.order - b.order);

  const displayHead = headLeader || (leaders.length > 0 ? leaders.reduce((prev, curr) => prev.order < curr.order ? prev : curr) : null);
  const displayDeputies = deputyLeaders.filter(l => l.id !== displayHead?.id);
  const displayExecs = execLeaders.filter(l => l.id !== displayHead?.id);

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

        <div className="w-full flex flex-col items-center relative">
          
          {displayHead && (
            <div className="flex flex-col items-center w-full relative z-20">
              <LeaderCard leader={displayHead} isHead />
              {(displayDeputies.length > 0 || displayExecs.length > 0) && (
                <div className="hidden lg:block w-px h-16 bg-slate-300" />
              )}
            </div>
          )}

          {displayDeputies.length > 0 && (
            <div className="flex flex-col items-center w-full relative z-10 mt-16 lg:mt-0">
              <div className="flex justify-center w-full flex-wrap lg:flex-nowrap gap-12 lg:gap-0">
                {displayDeputies.map((leader, i) => (
                  <div key={leader.id} className="relative flex flex-col items-center px-4 lg:px-12 w-full md:w-1/2 lg:w-auto">
                    {displayDeputies.length > 1 && (
                      <div className={`hidden lg:block absolute top-0 h-px bg-slate-300 ${
                        i === 0 ? "left-[50%] right-0" :
                        i === displayDeputies.length - 1 ? "left-0 right-[50%]" :
                        "left-0 right-0"
                      }`} />
                    )}
                    <div className="hidden lg:block w-px h-12 bg-slate-300" />
                    <LeaderCard leader={leader} />
                  </div>
                ))}
              </div>
              
              {displayExecs.length > 0 && (
                <div className="hidden lg:block w-px h-16 bg-slate-300" />
              )}
            </div>
          )}

          {displayExecs.length > 0 && (
            <div className="w-full mt-16 lg:mt-0 relative">
              <div className="hidden lg:block absolute top-0 left-1/4 right-1/4 h-px bg-slate-300" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12 lg:pt-12 relative z-10">
                {displayExecs.map((leader) => (
                  <div key={leader.id} className="relative flex flex-col items-center">
                    <div className="hidden lg:block absolute -top-12 left-1/2 w-px h-12 bg-slate-300" />
                    <LeaderCard leader={leader} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
