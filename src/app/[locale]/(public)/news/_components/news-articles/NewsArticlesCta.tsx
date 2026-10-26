"use client";

import { Link } from "@/i18n/routing";
import { FileText } from "lucide-react";
import { SocialFollowLinks } from "@/components/SocialFollowLinks";
import { tSafe } from "./newsArticlesHelpers";

interface NewsArticlesCtaProps {
    tHero: any;
}

export function NewsArticlesCta({ tHero }: NewsArticlesCtaProps) {
    return (
        <div className="mt-20 p-8 md:p-12 rounded-[32px] bg-gradient-to-r from-emerald-950/80 via-slate-900 to-amber-950/60 border border-emerald-500/20 backdrop-blur-2xl shadow-2xl relative overflow-hidden space-y-8">
            <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 text-center md:text-left max-w-2xl">
                    <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest">
                        <FileText size={16} /> Press & Media Relations
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold font-outfit text-white">
                        {tSafe(tHero, "pressCtaTitle", "Looking for Media Kits or Official Press Statements?")}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                        {tSafe(tHero, "pressCtaDesc", "Contact the SUPKEM Communications Office for official commentary, press releases, or media inquiries.")}
                    </p>
                </div>

                <Link
                    href="/contact"
                    className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black uppercase tracking-widest text-xs rounded-2xl transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 shrink-0"
                >
                    {tSafe(tHero, "contactMedia", "Contact Communications Secretariat")}
                </Link>
            </div>

            <div className="relative z-10 pt-6 border-t border-slate-800/80">
                <SocialFollowLinks variant="pills" />
            </div>
        </div>
    );
}
