"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Linkedin, Twitter, Mail } from "lucide-react";
import {
  LeadershipService,
  LeadershipProfile,
} from "@/services/leadership-service";
import Image from "next/image";

export function MeetOurLeaders() {
  const [leaders, setLeaders] = useState<LeadershipProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const data = await LeadershipService.getProfiles();
        setLeaders(data);
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
              <div key={i} className="h-[500px] bg-slate-200 rounded-[20px]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (leaders.length === 0) return null;

  return (
    <section className="py-32 px-6 bg-slate-50 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/[0.03] rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/[0.03] rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl" />

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <p className="text-sm font-black uppercase tracking-[0.4em] text-secondary">
            Governance
          </p>
          <h2 className="text-5xl lg:text-7xl font-black font-outfit text-primary tracking-tighter">
            Meet Our Leaders
          </h2>
          <p className="text-xl text-foreground/60 font-medium leading-relaxed">
            Leading with integrity and dedication, the SUPKEM leadership is
            committed to representing the interests of the Muslim community in
            Kenya.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {leaders.map((leader, i) => (
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative"
            >
              <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden bg-white shadow-2xl transition-all duration-700 group-hover:-translate-y-4 group-hover:shadow-primary/20 border border-border/50">
                {leader.photo ? (
                  <Image
                    src={leader.photo}
                    alt={leader.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary/10">
                    <User size={120} />
                  </div>
                )}

                {/* Overlay content */}
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-400 mb-1">
                        {leader.title}
                      </p>
                      <h3 className="text-3xl font-black font-outfit text-white tracking-tight">
                        {leader.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity delay-200 duration-500">
                      <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                        <Linkedin size={18} />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                        <Twitter size={18} />
                      </button>
                      <button className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
                        <Mail size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio snippet */}
              {leader.bio && (
                <div className="mt-8 px-4">
                  <p className="text-sm text-foreground/50 font-medium leading-relaxed italic border-l-2 border-primary/20 pl-4 py-2">
                    {leader.bio}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="pt-12 text-center">
          <div className="inline-block p-1 rounded-[24px] bg-white shadow-xl shadow-primary/5 border border-border overflow-hidden">
            <div className="px-8 py-5 rounded-[20px] bg-primary/[0.02] border border-primary/5 text-sm font-bold text-primary flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              Transparent & Accountable Governance
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
