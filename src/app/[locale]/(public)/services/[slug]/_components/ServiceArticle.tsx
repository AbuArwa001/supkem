"use client";

import { motion } from "framer-motion";
import { ServiceData } from "@/app/(public)/services/[slug]/_data/servicesData";

interface ServiceArticleProps {
    service: ServiceData;
}

export function ServiceArticle({ service }: ServiceArticleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
        >
            <div className="bg-white rounded-[20px] p-10 lg:p-14 shadow-2xl shadow-slate-200/50 border border-slate-100">
                <h2 className="text-3xl font-bold font-outfit text-primary mb-6">Overview</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-10">
                    {service.description}
                </p>
                <div className="w-20 h-1 bg-secondary/20 rounded-full mb-10" />
                <h3 className="text-2xl font-bold font-outfit text-slate-800 mb-6">Service Details</h3>
                <p className="text-lg text-slate-600 leading-relaxed">
                    {service.details}
                </p>
            </div>
        </motion.div>
    );
}
