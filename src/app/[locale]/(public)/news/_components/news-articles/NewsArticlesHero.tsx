"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Sparkles, BookOpen, MapPin, Newspaper } from "lucide-react";
import { SocialFollowLinks } from "@/components/SocialFollowLinks";
import { tSafe } from "./newsArticlesHelpers";

interface NewsArticlesHeroProps {
    tHero: any;
    totalArticles: number;
}

export function NewsArticlesHero({ tHero, totalArticles }: NewsArticlesHeroProps) {
    return (
        <section className="relative min-h-[70vh] flex flex-col justify-between overflow-hidden pt-28 pb-20 px-6 bg-gradient-to-br from-slate-950 via-emerald-950/40 to-slate-950 border-b border-emerald-500/20 shadow-2xl">
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=2000"
                    alt="SUPKEM Newsroom"
                    fill
                    className="object-cover opacity-20 scale-105 filter blur-[2px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/90" />
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/60 via-transparent to-amber-950/40" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-emerald-500/15 blur-[160px] rounded-full pointer-events-none" />
            </div>

            <div className="max-w-7xl mx-auto w-full relative z-10 space-y-10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <Link
                        href="/news"
                        className="inline-flex items-center gap-2 text-slate-200 hover:text-emerald-400 transition-all font-semibold text-xs tracking-wider uppercase bg-slate-900/80 hover:bg-slate-800 px-5 py-2.5 rounded-full border border-slate-700/80 backdrop-blur-md shadow-xl"
                    >
                        <ArrowLeft size={14} className="text-emerald-400" /> {tSafe(tHero, "backToNews", "Back to News Hub")}
                    </Link>

                    <div className="flex items-center gap-3">
                        <span className="hidden lg:inline-block text-xs font-bold text-slate-400 uppercase tracking-wider">Follow Us:</span>
                        <SocialFollowLinks variant="icons" />
                    </div>
                </div>

                <div className="max-w-4xl mx-auto text-center space-y-8 p-8 md:p-14 rounded-[40px] bg-slate-900/70 border border-white/10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold tracking-[0.2em] uppercase shadow-lg mx-auto backdrop-blur-md">
                        <Sparkles size={14} className="animate-pulse text-amber-400" />
                        {tSafe(tHero, "badge", "SUPKEM Press & Official Archives")}
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black font-outfit text-white tracking-tight leading-[1.1]">
                        {tSafe(tHero, "title1", "News & Media")}{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-300 to-amber-500 italic">
                            {tSafe(tHero, "title2", "Articles Hub")}
                        </span>
                    </h1>

                    <p className="text-base md:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
                        {tSafe(tHero, "subtitle", "Explore verified press releases, community bulletins, strategic updates, and official statements from the Supreme Council of Kenya Muslims.")}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3">
                            <BookOpen size={20} className="text-emerald-400" />
                            <div className="text-left">
                                <div className="text-xl font-bold font-outfit text-white">{totalArticles}</div>
                                <div className="text-[11px] text-slate-400 font-medium">{tSafe(tHero, "totalArticles", "Published Articles")}</div>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3">
                            <MapPin size={20} className="text-amber-400" />
                            <div className="text-left">
                                <div className="text-xl font-bold font-outfit text-white">47 Counties</div>
                                <div className="text-[11px] text-slate-400 font-medium">{tSafe(tHero, "countiesCovered", "Counties Covered")}</div>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3">
                            <Newspaper size={20} className="text-purple-400" />
                            <div className="text-left">
                                <div className="text-xl font-bold font-outfit text-white">100% Verified</div>
                                <div className="text-[11px] text-slate-400 font-medium">{tSafe(tHero, "pressReleases", "Verified Press Bulletins")}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
