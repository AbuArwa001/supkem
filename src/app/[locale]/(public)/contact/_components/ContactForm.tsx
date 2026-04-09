"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { useContactLogic } from "@/app/[locale]/(public)/contact/_components/useContactLogic";
import { useTranslations } from "next-intl";

export function ContactForm() {
    const t = useTranslations("ContactPage.form");
    const { isSubmitting, handleSubmit } = useContactLogic();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
        >
            <div className="absolute inset-0 bg-primary/5 rounded-[60px] blur-3xl -z-10 translate-x-4 translate-y-4" />
            <form onSubmit={handleSubmit} className="bg-white border border-border/60 p-12 lg:p-16 rounded-[24px] shadow-2xl shadow-black/[0.02] space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-primary/40 ml-1">{t("fullName")}</label>
                        <input name="name" required type="text" placeholder="Salim Salim" className="w-full px-6 py-5 bg-primary/[0.02] border border-border rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium" />
                    </div>
                    <div className="space-y-3">
                        <label className="text-xs font-black uppercase tracking-widest text-primary/40 ml-1">{t("emailAddress")}</label>
                        <input name="email" required type="email" placeholder="salim@example.com" className="w-full px-6 py-5 bg-primary/[0.02] border border-border rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium" />
                    </div>
                </div>
                <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-primary/40 ml-1">{t("subject")}</label>
                    <input name="subject" required type="text" placeholder={t("subjectPlaceholder")} className="w-full px-6 py-5 bg-primary/[0.02] border border-border rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium" />
                </div>
                <div className="space-y-3">
                    <label className="text-xs font-black uppercase tracking-widest text-primary/40 ml-1">{t("message")}</label>
                    <textarea name="message" required rows={5} placeholder={t("messagePlaceholder")} className="w-full px-6 py-5 bg-primary/[0.02] border border-border rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium resize-none"></textarea>
                </div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-6 bg-primary text-white rounded-3xl font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 premium-gradient group disabled:opacity-70 disabled:pointer-events-none"
                >
                    {isSubmitting ? t("sending") : t("send")}
                    {!isSubmitting && <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                </button>
            </form>
        </motion.div>
    );
}
