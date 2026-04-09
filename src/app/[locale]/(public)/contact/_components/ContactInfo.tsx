"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const CONTACT_DETAILS = [
    { icon: MapPin, title: "Headquarters", detail: "Islamia House, Njugu Lane, Nairobi, Kenya" },
    { icon: Phone, title: "Phone Support", detail: "+254 (0) 20 2243129 / 224890" },
    { icon: Mail, title: "Email Inquiry", detail: "info@supkem.org" },
    { icon: Clock, title: "Office Hours", detail: "Mon - Fri: 8:00 AM - 5:00 PM" }
];

export function ContactInfo() {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-16"
        >
            <div className="space-y-6">
                <h2 className="text-5xl font-black font-outfit text-primary tracking-tight">Get in Touch</h2>
                <p className="text-xl text-foreground/50 font-medium leading-relaxed">
                    Our team is dedicated to serving the community. Visit us or use the form to send a direct message.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-10">
                {CONTACT_DETAILS.map((item, i) => (
                    <div key={i} className="flex gap-8 group">
                        <div className="w-16 h-16 rounded-3xl bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-sm border border-primary/10">
                            <item.icon size={28} strokeWidth={1.5} />
                        </div>
                        <div className="pt-2">
                            <h4 className="text-lg font-black font-outfit text-primary tracking-tight">{item.title}</h4>
                            <p className="text-lg text-foreground/50 font-medium mt-1">{item.detail}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
