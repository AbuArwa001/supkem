"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
    return (
        <div className="bg-white">
            {/* Premium Hero Section with Background Image */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-32 px-6 bg-slate-950">
                {/* Background Image with Slow Zoom */}
                <div className="absolute inset-0 z-0">
                    <motion.div
                        initial={{ scale: 1.2, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.5 }}
                        transition={{
                            scale: { duration: 15, ease: "linear" },
                            opacity: { duration: 2, ease: "easeOut" }
                        }}
                        className="relative w-full h-full"
                    >
                        <Image
                            src="/images/slider/oledarknb.jpg"
                            alt="Contact Us"
                            fill
                            className="object-cover"
                            priority
                        />
                    </motion.div>

                    {/* Layered Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80 z-10" />
                    <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
                </div>

                <div className="max-w-4xl mx-auto relative z-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="p-12 lg:p-16 rounded-[60px] bg-white/5 border border-white/10 backdrop-blur-2xl space-y-8 shadow-2xl"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold tracking-tight shadow-2xl mx-auto backdrop-blur-md transition-transform hover:scale-105 cursor-default">
                            <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
                            We are here for you
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-6xl lg:text-8xl font-black font-outfit text-white tracking-tighter leading-none">
                                Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-white to-amber-300 italic">Us</span>
                            </h1>
                            <p className="text-xl lg:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed font-medium">
                                Have questions or need assistance? Reach out to the Supreme Council's headquarters.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Contact Content */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    {/* Information Column */}
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
                            {[
                                { icon: MapPin, title: "Headquarters", detail: "Islamia House, Njugu Lane, Nairobi, Kenya" },
                                { icon: Phone, title: "Phone Support", detail: "+254 (0) 20 2243129 / 224890" },
                                { icon: Mail, title: "Email Inquiry", detail: "info@supkem.org" },
                                { icon: Clock, title: "Office Hours", detail: "Mon - Fri: 8:00 AM - 5:00 PM" }
                            ].map((item, i) => (
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

                    {/* Form Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-primary/5 rounded-[60px] blur-3xl -z-10 translate-x-4 translate-y-4" />
                        <div className="bg-white border border-border/60 p-12 lg:p-16 rounded-[24px] shadow-2xl shadow-black/[0.02] space-y-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-widest text-primary/40 ml-1">Full Name</label>
                                    <input type="text" placeholder="John Doe" className="w-full px-6 py-5 bg-primary/[0.02] border border-border rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-black uppercase tracking-widest text-primary/40 ml-1">Email Address</label>
                                    <input type="email" placeholder="john@example.com" className="w-full px-6 py-5 bg-primary/[0.02] border border-border rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black uppercase tracking-widest text-primary/40 ml-1">Subject</label>
                                <input type="text" placeholder="How can we help?" className="w-full px-6 py-5 bg-primary/[0.02] border border-border rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black uppercase tracking-widest text-primary/40 ml-1">Message</label>
                                <textarea rows={5} placeholder="Tell us more about your inquiry..." className="w-full px-6 py-5 bg-primary/[0.02] border border-border rounded-2xl focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all font-medium resize-none"></textarea>
                            </div>
                            <button className="w-full py-6 bg-primary text-white rounded-3xl font-black text-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-3 premium-gradient group">
                                Send Message
                                <Send size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
