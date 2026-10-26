"use client";

import React from "react";
import { motion } from "framer-motion";
import { User, Linkedin, Twitter, Facebook } from "lucide-react";
import { LeadershipProfile } from "@/services/leadership-service";
import Image from "next/image";

interface LeaderCardProps {
  leader: LeadershipProfile;
  isHead?: boolean;
}

export function LeaderCard({ leader, isHead = false }: LeaderCardProps) {
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
        
        <div className="absolute top-4 end-4 flex flex-col gap-2 translate-x-12 rtl:-translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
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
          <p className={`mt-5 text-sm font-medium leading-relaxed italic border-s-2 ps-4 ${isHead ? "text-slate-400 border-slate-700" : "text-slate-500 border-slate-100"} line-clamp-3 group-hover:line-clamp-none transition-all duration-500`}>
            {leader.bio}
          </p>
        )}
      </div>
    </motion.div>
  );
}
