"use client";

import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

const newsItems = [
    {
        title: "SUPKEM Hosts National Unity Conference in Nairobi",
        date: "March 15, 2026",
        author: "Council Press",
        image: "https://images.unsplash.com/photo-1541872703-74c5e4001bc2?auto=format&fit=crop&q=80&w=800",
        excerpt: "Leaders from across the 47 counties gathered to discuss social cohesion and economic empowerment programs."
    },
    {
        title: "New Digital Halal Certification System Launched",
        date: "Feb 28, 2026",
        author: "IT Division",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
        excerpt: "A major step in modernizing Islamic business practices with blockchain-backed certification tracking."
    },
    {
        title: "Scholarship Applications Open for Higher Education",
        date: "Feb 10, 2026",
        author: "Education Dept",
        image: "https://images.unsplash.com/photo-1523050853064-8521a30ad001?auto=format&fit=crop&q=80&w=800",
        excerpt: "Muslim youth are encouraged to apply for the annual educational support program covering local and international universities."
    }
];

export default function NewsPage() {
    return (
        <div className="space-y-24 pb-24">
            {/* Header */}
            <section className="py-20 px-6 text-center space-y-6 max-w-4xl mx-auto">
                <h1 className="text-5xl lg:text-7xl font-bold font-outfit text-primary">News & Press</h1>
                <p className="text-xl text-foreground/60 leading-relaxed font-medium">
                    Stay updated with the latest announcements, events, and reports from the Supreme Council.
                </p>
            </section>

            {/* Featured News Grid */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Large Feature */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    className="p-8 rounded-[48px] bg-white border border-border overflow-hidden group hover:shadow-2xl transition-all"
                >
                    <div className="aspect-video bg-primary/5 rounded-[32px] overflow-hidden mb-8">
                        <img src={newsItems[0].image} alt="News" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-6 text-xs font-bold text-foreground/30 uppercase tracking-widest">
                            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-secondary" /> {newsItems[0].date}</span>
                            <span className="flex items-center gap-1.5"><User size={14} className="text-secondary" /> {newsItems[0].author}</span>
                        </div>
                        <h2 className="text-3xl font-bold font-outfit text-primary group-hover:text-secondary transition-colors underline decoration-primary/10 underline-offset-8">
                            {newsItems[0].title}
                        </h2>
                        <p className="text-lg text-foreground/70 leading-relaxed font-medium">
                            {newsItems[0].excerpt}
                        </p>
                        <button className="pt-4 text-primary font-black uppercase tracking-[0.2em] text-xs flex items-center gap-2 group-hover:gap-4 transition-all">
                            Read Full Story <ArrowRight size={14} />
                        </button>
                    </div>
                </motion.div>

                <div className="space-y-8">
                    {newsItems.slice(1).map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2 }}
                            className="p-6 rounded-[40px] bg-white border border-border flex flex-col sm:flex-row gap-8 hover-lift"
                        >
                            <div className="w-full sm:w-48 h-48 bg-primary/5 rounded-[32px] overflow-hidden shrink-0">
                                <img src={item.image} alt="News" className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-3 py-2">
                                <div className="flex items-center gap-4 text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5"><Calendar size={12} className="text-secondary" /> {item.date}</span>
                                </div>
                                <h3 className="text-xl font-bold font-outfit text-primary leading-tight hover:text-secondary transition-colors cursor-pointer">
                                    {item.title}
                                </h3>
                                <p className="text-sm text-foreground/60 leading-relaxed font-medium line-clamp-2">
                                    {item.excerpt}
                                </p>
                                <Link href="#" className="pt-2 text-primary font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 hover:gap-3 transition-all">
                                    Details <ArrowRight size={12} />
                                </Link>
                            </div>
                        </motion.div>
                    ))}

                    <div className="p-8 rounded-[40px] bg-secondary/10 border border-secondary/20 flex flex-col items-center justify-center text-center gap-4 group cursor-pointer hover:bg-secondary hover:text-white transition-all">
                        <BookOpen size={40} className="text-secondary group-hover:text-white" />
                        <h4 className="text-xl font-bold font-outfit">Access Press Archive</h4>
                        <p className="text-sm font-medium opacity-60">View all historical records and press releases.</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
