"use client";

import Link from "next/link";
import Image from "next/image";
import { BookOpen, ArrowRight } from "lucide-react";
import useSWR from "swr";
import api, { API_BASE_URL } from "@/lib/api";
import { NewsPaperItem } from "@/app/(public)/news/_services/newsService";

interface NewsPapersSectionProps {
    newsPapers: NewsPaperItem[];
}

export function NewsPapersSection({ newsPapers: initialNewsPapers }: NewsPapersSectionProps) {
    const { data: newsPapers } = useSWR('/news/news_papers/', url => api.get(url).then(res => {
        const data = res.data.results || res.data;
        return Array.isArray(data) ? data.filter((item: any) => item.is_published) : [];
    }), {
        fallbackData: initialNewsPapers,
        refreshInterval: 10000
    });

    if (!newsPapers || newsPapers.length === 0) return null;

    return (
        <section className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="flex items-center gap-4">
                <div className="p-4 bg-primary/5 rounded-2xl">
                    <BookOpen className="text-primary" size={28} />
                </div>
                <div>
                    <h2 className="text-3xl font-black font-outfit text-primary tracking-tight">The Muslim Newspaper</h2>
                    <p className="text-foreground/60 font-medium">Read our latest and archived newspaper issues.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
                {newsPapers.map((paper, i) => {
                    const imageUrl = paper.cover_image
                        ? paper.cover_image.startsWith('http')
                            ? paper.cover_image
                            : `${API_BASE_URL}${paper.cover_image.startsWith('/') ? '' : '/'}${paper.cover_image}`
                        : null;

                    const pdfUrl = paper.file
                        ? paper.file.startsWith("https")
                            ? paper.file
                            : `${API_BASE_URL}${paper.file.startsWith("/") ? "" : "/"}${paper.file}`
                        : null;

                    return (
                        <Link
                            key={i}
                            href={`/news-papers/${paper.id}`}
                            className="bg-white border border-border rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all group flex flex-col"
                        >
                            <div className="aspect-[4/5] relative bg-primary/5 flex items-center justify-center overflow-hidden pointer-events-none">
                                {imageUrl ? (
                                    <Image
                                        src={imageUrl}
                                        alt={paper.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                ) : pdfUrl ? (
                                    <object
                                        data={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                        type="application/pdf"
                                        className="w-full h-[120%] -mt-10 group-hover:scale-105 transition-transform duration-700 opacity-90"
                                    />
                                ) : (
                                    <BookOpen className="text-primary/20 hover:scale-110 transition-transform duration-500" size={48} />
                                )}
                                <div className="absolute top-4 right-4 z-20">
                                    {paper.issue_number && (
                                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-primary text-white shadow-lg">
                                            Issue {paper.issue_number}
                                        </span>
                                    )}
                                </div>
                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 z-10" />
                            </div>

                            <div className="p-6 space-y-3 flex-1 flex flex-col">
                                <h3 className="text-lg font-bold font-outfit text-primary line-clamp-2 leading-snug group-hover:text-secondary transition-colors">
                                    {paper.title}
                                </h3>
                                <div className="pt-4 mt-auto border-t border-border/50 flex items-center justify-between text-xs font-bold text-foreground/30 uppercase tracking-widest">
                                    <span>{new Date(paper.published_date).toLocaleDateString()}</span>
                                    <span className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0">
                                        Read <ArrowRight size={14} />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
