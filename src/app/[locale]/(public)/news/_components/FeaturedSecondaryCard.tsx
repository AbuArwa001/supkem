"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { Calendar, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import { NewsItem } from "@/app/[locale]/(public)/news/_services/newsService";

interface FeaturedSecondaryCardProps {
  item: NewsItem;
  locale: string;
  detailsText: string;
}

export function FeaturedSecondaryCard({ item, locale, detailsText }: FeaturedSecondaryCardProps) {
  const match = item.content.match(/!\[.*?\]\((.*?)\)/);
  const extractedImg = match ? match[1] : null;
  const imageSource = item.featured_image
    ? item.featured_image.startsWith("http")
      ? item.featured_image
      : `${API_BASE_URL}${item.featured_image.startsWith("/") ? "" : "/"}${item.featured_image}`
    : extractedImg || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800";

  const formattedDate = new Date(item.created_at).toLocaleDateString(
    locale === "ar" ? "ar-KE" : "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  );

  const cleanExcerpt = item.content
    .replace(/[#*`_~>\[\]\(\)]/g, "")
    .replace(/\n+/g, " ")
    .substring(0, 100);

  return (
    <Link href={`/news/${item.slug}`} className="group/item flex-1 flex flex-col">
      <div className="p-6 rounded-[20px] bg-white border border-border flex flex-col sm:flex-row gap-8 hover-lift hover:border-primary/20 shadow-sm shadow-primary/5 h-full">
        <div className="w-full sm:w-48 h-48 bg-primary/5 rounded-[16px] overflow-hidden shrink-0 relative">
          <Image src={imageSource} alt={item.title} fill className="object-cover group-hover/item:scale-110 transition-transform duration-500" />
        </div>
        <div className="space-y-3 py-2 flex-1 flex flex-col justify-center">
          <div className="flex items-center gap-4 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-secondary" /> {formattedDate}
            </span>
          </div>
          <h3 className="text-xl font-bold font-outfit text-primary leading-tight group-hover/item:text-secondary transition-colors line-clamp-2">
            {item.title}
          </h3>
          <p className="text-sm text-foreground/60 leading-relaxed font-medium line-clamp-2">
            {cleanExcerpt}...
          </p>
          <span className="pt-2 text-primary font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 group-hover/item:gap-3 transition-all">
            {detailsText} <ArrowRight size={12} />
          </span>
        </div>
      </div>
    </Link>
  );
}
