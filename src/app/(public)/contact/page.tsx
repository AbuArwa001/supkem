"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="bg-white">
            {/* Premium Mesh Gradient Hero */}
            <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden py-24 px-6">
                <div className="absolute inset-0 -z-10 bg-[#FCFCFD]">
                    <div
                        className="absolute inset-0 opacity-[0.4]"
                        style={{
                            backgroundImage: `
                                radial-gradient(circle at 100% 0%, rgba(13, 148, 136, 0.1) 0%, transparent 50%),
                                radial-gradient(circle at 0% 100%, rgba(245, 158, 11, 0.08) 0%, transparent 50%),
                                radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 1) 0%, transparent 100%)
                            `
                        }}
                    />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] mix-blend-overlay" />

                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                            opacity: [0.05, 0.1, 0.05],
                            x: [0, -30, 0],
                            y: [0, 20, 0]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[120px]"
                    />
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-10 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-xl shadow-primary/5 border border-primary/10 text-primary text-sm font-bold tracking-tight mx-auto transition-transform hover:scale-105 cursor-default">
                            <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
                            We are here for you
                        </div>
                        <h1 className="text-6xl lg:text-8xl font-black font-outfit text-primary tracking-tighter leading-[0.95]">
                            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary italic">Us</span>
                        </h1>
                        <p className="text-2xl text-foreground/60 max-w-2xl mx-auto leading-relaxed font-medium">
                            Have questions or need assistance? Reach out to the Supreme Council's headquarters.
                        </p>
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
                        <div className="bg-white border border-border/60 p-12 lg:p-16 rounded-[48px] shadow-2xl shadow-black/[0.02] space-y-10">
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
