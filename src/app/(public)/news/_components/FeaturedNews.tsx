import Image from "next/image";
import Link from "next/link";

import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";

import { API_BASE_URL } from "@/lib/api";

import { NewsItem } from "@/app/(public)/news/_services/newsService";

interface FeaturedNewsProps {
    newsItems: NewsItem[];
}

const extractFirstImage = (content: string) => {
    const match = content.match(/!\[.*?\]\((.*?)\)/);
    return match ? match[1] : null;
};

export function FeaturedNews({ newsItems }: FeaturedNewsProps) {
    return (
        <section className="max-w-7xl mx-auto px-6 space-y-12">
            <div className="flex items-center gap-4">
                <div className="p-4 bg-primary/5 rounded-2xl">
                    <BookOpen className="text-primary" size={28} />
                </div>
                <div>
                    <h2 className="text-3xl font-black font-outfit text-primary tracking-tight">Latest News Articles</h2>
                    <p className="text-foreground/60 font-medium">Read our recent publications and stories.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {newsItems.length > 0 ? (
                    <>
                        {/* Large Feature (First Item) */}
                        {(() => {
                            const item = newsItems[0];
                            const extractedImg = extractFirstImage(item.content);
                            const imageSource = item.featured_image
                                ? (item.featured_image.startsWith('http') ? item.featured_image : `${API_BASE_URL}${item.featured_image.startsWith('/') ? '' : '/'}${item.featured_image}`)
                                : (extractedImg || "https://images.unsplash.com/photo-1541872703-74c5e4001bc2?auto=format&fit=crop&q=80&w=800");

                            return (
                                <div className="p-8 rounded-[24px] bg-white border border-border overflow-hidden flex flex-col group hover:shadow-2xl transition-all h-fit shadow-lg shadow-primary/5">
                                    <Link href={`/news/${item.slug}`} className="block">
                                        <div className="aspect-video bg-primary/5 rounded-[32px] overflow-hidden mb-8 relative">
                                            <Image
                                                src={imageSource}
                                                alt={item.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-6 text-xs font-bold text-foreground/30 uppercase tracking-widest">
                                                <span className="flex items-center gap-1.5"><Calendar size={14} className="text-secondary" /> {new Date(item.created_at).toLocaleDateString()}</span>
                                                <span className="flex items-center gap-1.5"><User size={14} className="text-secondary" /> SUPKEM Press</span>
                                            </div>
                                            <h2 className="text-3xl font-bold font-outfit text-primary group-hover:text-secondary transition-colors underline decoration-primary/10 underline-offset-8">
                                                {item.title}
                                            </h2>
                                            <p className="text-lg text-foreground/70 leading-relaxed font-medium line-clamp-3">
                                                {item.content.replace(/[#*`_~>\[\]\(\)]/g, '').replace(/\n+/g, ' ').substring(0, 150)}...
                                            </p>
                                            <button className="pt-4 text-primary font-black uppercase tracking-[0.2em] text-xs flex items-center gap-2 group-hover:gap-4 transition-all">
                                                Read Full Story <ArrowRight size={14} />
                                            </button>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })()}

                        <div className="space-y-8 flex flex-col">
                            {newsItems.slice(1).map((item, i) => {
                                const extractedImg = extractFirstImage(item.content);
                                const imageSource = item.featured_image
                                    ? (item.featured_image.startsWith('http') ? item.featured_image : `${API_BASE_URL}${item.featured_image.startsWith('/') ? '' : '/'}${item.featured_image}`)
                                    : (extractedImg || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800");

                                return (
                                    <Link href={`/news/${item.slug}`} key={i} className="block group/item">
                                        <div className="p-6 rounded-[20px] bg-white border border-border flex flex-col sm:flex-row gap-8 hover-lift hover:border-primary/20 shadow-sm shadow-primary/5">
                                            <div className="w-full sm:w-48 h-48 bg-primary/5 rounded-[32px] overflow-hidden shrink-0 relative">
                                                <Image
                                                    src={imageSource}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover group-hover/item:scale-110 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="space-y-3 py-2 flex-1 flex flex-col justify-center">
                                                <div className="flex items-center gap-4 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
                                                    <span className="flex items-center gap-1.5"><Calendar size={12} className="text-secondary" /> {new Date(item.created_at).toLocaleDateString()}</span>
                                                </div>
                                                <h3 className="text-xl font-bold font-outfit text-primary leading-tight group-hover/item:text-secondary transition-colors line-clamp-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-foreground/60 leading-relaxed font-medium line-clamp-2">
                                                    {item.content.replace(/[#*`_~>\[\]\(\)]/g, '').replace(/\n+/g, ' ').substring(0, 100)}...
                                                </p>
                                                <span className="pt-2 text-primary font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 group-hover/item:gap-3 transition-all">
                                                    Details <ArrowRight size={12} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                            {newsItems.length <= 1 && (
                                <div className="p-8 rounded-[20px] bg-secondary/10 border border-secondary/20 flex flex-col items-center justify-center text-center gap-4 h-full min-h-[300px]">
                                    <BookOpen size={40} className="text-secondary" />
                                    <h4 className="text-xl font-bold font-outfit">More News Coming Soon</h4>
                                    <p className="text-sm font-medium opacity-60">Check back later for more updates.</p>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="col-span-1 lg:col-span-2 py-32 text-center space-y-6">
                        <div className="w-24 h-24 bg-primary/5 rounded-full flex items-center justify-center mx-auto">
                            <BookOpen size={40} className="text-primary/40" />
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-3xl font-bold font-outfit text-primary">No published news found</h2>
                            <p className="text-foreground/60">Check back soon for latest announcements from SUPKEM.</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
