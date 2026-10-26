import React from "react";
import Image from "next/image";
import { ChevronLeft, Calendar } from "lucide-react";
import { Link } from "@/i18n/routing";

interface PaperHeroProps {
  title: string;
  coverImage: string;
  publishedDate: string;
  issueNumber?: string | null;
  locale: string;
  backText: string;
  issueLabel: string;
}

export function PaperHero({
  title, coverImage, publishedDate, issueNumber, locale, backText, issueLabel,
}: PaperHeroProps) {
  const formattedDate = new Date(publishedDate).toLocaleDateString(
    locale === "ar" ? "ar-KE" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  return (
    <header className="relative h-[60vh] min-h-[480px] flex items-end overflow-hidden">
      <div className="absolute inset-0">
        <Image src={coverImage} alt={title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24 w-full relative z-10">
        <div className="max-w-4xl space-y-6">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs bg-black/20 px-4 py-2 rounded-full backdrop-blur-md"
          >
            <ChevronLeft size={14} /> {backText}
          </Link>

          <h1 className="text-4xl lg:text-6xl font-black font-outfit text-white leading-tight tracking-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm font-bold text-white/60 uppercase tracking-widest">
            <span className="flex items-center gap-2">
              <Calendar size={14} className="text-amber-400" />
              {formattedDate}
            </span>
            {issueNumber && (
              <span className="text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                {issueLabel} {issueNumber}
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
