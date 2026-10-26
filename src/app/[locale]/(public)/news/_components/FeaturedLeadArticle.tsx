"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Calendar, User, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import { NewsItem } from "@/app/[locale]/(public)/news/_services/newsService";

interface FeaturedLeadArticleProps {
  item: NewsItem;
  locale: string;
  pressText: string;
  readMoreText: string;
}

export function FeaturedLeadArticle({ item, locale, pressText, readMoreText }: FeaturedLeadArticleProps) {
  const match = item.content.match(/!\[.*?\]\((.*?)\)/);
  const extractedImg = match ? match[1] : null;
  const imageSource = item.featured_image
    ? item.featured_image.startsWith("http")
      ? item.featured_image
      : `${API_BASE_URL}${item.featured_image.startsWith("/") ? "" : "/"}${item.featured_image}`
    : extractedImg || "https://images.unsplash.com/photo-1541872703-74c5e4001bc2?auto=format&fit=crop&q=80&w=800";

  const formattedDate = new Date(item.created_at).toLocaleDateString(
    locale === "ar" ? "ar-KE" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const cleanExcerpt = item.content
    .replace(/[#*`_~>\[\]\(\)]/g, "")
    .replace(/\n+/g, " ")
    .substring(0, 150);

  return (
    <div className="p-8 rounded-[24px] bg-white border border-border overflow-hidden flex flex-col group hover:shadow-2xl transition-all h-full shadow-lg shadow-primary/5">
      <Link href={`/news/${item.slug}`} className="block h-full flex flex-col">
        <div className="aspect-video bg-primary/5 rounded-[16px] overflow-hidden mb-8 relative shrink-0">
          <Image src={imageSource} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <div className="space-y-4 flex flex-col flex-1">
          <div className="flex items-center gap-6 text-xs font-bold text-foreground/30 uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-secondary" /> {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <User size={14} className="text-secondary" /> {pressText}
            </span>
          </div>
          <h2 className="text-3xl font-bold font-outfit text-primary group-hover:text-secondary transition-colors underline decoration-primary/10 underline-offset-8">
            {item.title}
          </h2>
          <p className="text-lg text-foreground/70 leading-relaxed font-medium line-clamp-3">
            {cleanExcerpt}...
          </p>
          <div className="mt-auto pt-4">
            <span className="text-primary font-black uppercase tracking-[0.2em] text-xs flex items-center gap-2 group-hover:gap-4 transition-all">
              {readMoreText} <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
