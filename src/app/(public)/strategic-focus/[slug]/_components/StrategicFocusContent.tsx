"use client";

import { motion } from "framer-motion";
import { BookOpen, Shield, Heart, Users, CheckCircle, Globe, Briefcase, FileText } from "lucide-react";
import { StrategicPillar } from "../_data/strategicPillarsData";

// internal components and types
const iconMap: Record<string, React.ElementType> = {
    Heart, Shield, Users, BookOpen, CheckCircle, Globe, Briefcase, FileText
};

interface StrategicFocusContentProps {
    content: StrategicPillar;
}

export default function StrategicFocusContent({ content }: StrategicFocusContentProps) {
    return (
        <section className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <p className="text-xl text-slate-600 max-w-4xl leading-relaxed italic border-l-4 border-secondary pl-6">
                        "{content.description}"
                    </p>
                </div>

                <div className="space-y-20">
                    {content.sections.map((section, idx) => {
                        const IconComponent = iconMap[section.icon] || CheckCircle;

                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6 }}
                                className="bg-white rounded-[20px] p-8 lg:p-14 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col lg:flex-row gap-12"
                            >
                                <div className="lg:w-1/3 space-y-6">
                                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                                        <IconComponent size={32} />
                                    </div>
                                    <h2 className="text-3xl font-black font-outfit text-primary tracking-tight">{section.title}</h2>
                                    <p className="text-lg text-slate-500 leading-relaxed">{section.content}</p>
                                </div>

                                <div className="lg:w-2/3 space-y-10">
                                    {section.strategies.map((strategy, sIdx) => (
                                        <div key={sIdx} className="space-y-6">
                                            <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">
                                                {strategy.name}
                                            </h3>
                                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {strategy.interventions.map((intervention, iIdx) => (
                                                    <li key={iIdx} className="flex gap-4 items-start group">
                                                        <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors">
                                                            <CheckCircle size={14} />
                                                        </div>
                                                        <span className="text-slate-600 leading-relaxed">{intervention}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
