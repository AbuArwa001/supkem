"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { BookOpen, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";
import { NewsPaperItem } from "@/app/[locale]/(public)/news/_services/newsService";

interface NewsPaperCardProps {
    paper: NewsPaperItem;
    locale: string;
    issueText: string;
    readText: string;
}

export function NewsPaperCard({ paper, locale, issueText, readText }: NewsPaperCardProps) {
    const imageUrl = paper.cover_image
        ? paper.cover_image.startsWith("http")
            ? paper.cover_image
            : `${API_BASE_URL}${paper.cover_image.startsWith("/") ? "" : "/"}${paper.cover_image}`
        : null;

    const pdfUrl = paper.file
        ? paper.file.startsWith("https")
            ? paper.file
            : `${API_BASE_URL}${paper.file.startsWith("/") ? "" : "/"}${paper.file}`
        : null;

    const formattedDate = new Date(paper.published_date).toLocaleDateString(
        locale === "ar" ? "ar-KE" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
    );

    return (
        <Link
            href={`/news-papers/${paper.id}`}
            className="bg-white border border-border rounded-[24px] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col"
        >
            <div className="aspect-[4/5] relative bg-primary/5 flex items-center justify-center overflow-hidden pointer-events-none">
                {imageUrl ? (
                    <Image src={imageUrl} alt={paper.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                ) : pdfUrl ? (
                    <iframe
                        src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-90 scale-110"
                        title={paper.title}
                    />
                ) : (
                    <BookOpen className="text-primary/20 hover:scale-110 transition-transform duration-500" size={48} />
                )}
                {paper.issue_number && (
                    <div className="absolute top-4 right-4 z-20">
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary text-white shadow-lg">
                            {issueText} {paper.issue_number}
                        </span>
                    </div>
                )}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 z-10" />
            </div>

            <div className="p-6 space-y-3 flex-1 flex flex-col">
                <h3 className="text-lg font-bold font-outfit text-primary line-clamp-2 leading-snug group-hover:text-secondary transition-colors">
                    {paper.title}
                </h3>
                <div className="pt-4 mt-auto border-t border-border/50 flex items-center justify-between text-xs font-bold text-foreground/30 uppercase tracking-widest">
                    <span>{formattedDate}</span>
                    <span className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                        {readText} <ArrowRight size={14} />
                    </span>
                </div>
            </div>
        </Link>
    );
}
