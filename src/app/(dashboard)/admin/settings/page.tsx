"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { User, Mail, Phone, Lock, Save, Loader2, ShieldCheck, UserCircle, Bell } from "lucide-react";
import { motion } from "framer-motion";

export default function ProfileSettings() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    return (
        <div className="space-y-12">
            <div className="space-y-1">
                <h1 className="text-4xl font-bold font-outfit text-primary">Account Settings</h1>
                <p className="text-foreground/60 font-medium tracking-tight">Manage your personal information, security preferences, and notification settings.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-2 space-y-10">
                    {/* Profile Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="p-10 rounded-[48px] bg-white border border-border shadow-sm space-y-10"
                    >
                        <div className="flex items-center gap-4 text-primary">
                            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0">
                                <UserCircle size={28} />
                            </div>
                            <h3 className="text-2xl font-bold font-outfit">Personal Information</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">Full Name</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        defaultValue={user?.full_name}
                                        className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bold text-primary"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">Email Address</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        disabled
                                        defaultValue={user?.email}
                                        className="w-full bg-primary/[0.01] border border-border rounded-2xl py-4 pl-12 pr-4 opacity-50 cursor-not-allowed font-bold text-primary"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">Phone Number</label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
                                    <input
                                        defaultValue={user?.phone || "+254 7XX XXX XXX"}
                                        className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bold text-primary"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button className="px-10 py-4 bg-primary text-white rounded-[24px] font-extrabold text-sm hover-lift premium-gradient shadow-xl shadow-primary/20 flex items-center gap-3">
                                <Save size={18} /> Update Profile
                            </button>
                        </div>
                    </motion.div>

                    {/* Security Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="p-10 rounded-[48px] bg-white border border-border shadow-sm space-y-10"
                    >
                        <div className="flex items-center gap-4 text-primary">
                            <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center shrink-0">
                                <Lock size={28} />
                            </div>
                            <h3 className="text-2xl font-bold font-outfit">Security & Access</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">Current Password</label>
                                <input
                                    type="password"
                                    className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 px-6 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">New Password</label>
                                <input
                                    type="password"
                                    className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 px-6 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="pt-6">
                            <button className="px-10 py-4 border-2 border-primary text-primary rounded-[24px] font-extrabold text-sm hover:bg-primary hover:text-white transition-all flex items-center gap-3">
                                Change Password
                            </button>
                        </div>
                    </motion.div>
                </div>

                <div className="space-y-8">
                    <div className="p-10 rounded-[40px] premium-gradient text-white shadow-2xl shadow-primary/20 space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                        <ShieldCheck size={48} className="text-white relative z-10" />
                        <h3 className="text-2xl font-bold font-outfit relative z-10">Access Verification</h3>
                        <p className="text-sm font-medium text-white/70 relative z-10 leading-relaxed">
                            You are currently signed in as a <span className="text-secondary font-black">{user?.role?.role_name}</span>. Your access includes administrative controls and platform auditing.
                        </p>
                    </div>

                    <div className="p-10 rounded-[40px] bg-white border border-border shadow-sm space-y-8">
                        <div className="flex items-center gap-3 text-primary">
                            <Bell size={24} className="opacity-40" />
                            <h4 className="text-xl font-bold font-outfit">Notifications</h4>
                        </div>
                        <div className="space-y-4">
                            <label className="flex items-center justify-between p-4 rounded-3xl bg-primary/[0.02] border border-primary/5 cursor-pointer group">
                                <span className="text-sm font-bold text-primary opacity-60 group-hover:opacity-100 transition-opacity">Email Updates</span>
                                <input type="checkbox" className="w-5 h-5 accent-primary" defaultChecked />
                            </label>
                            <label className="flex items-center justify-between p-4 rounded-3xl bg-primary/[0.02] border border-primary/5 cursor-pointer group">
                                <span className="text-sm font-bold text-primary opacity-60 group-hover:opacity-100 transition-opacity">SMS Alerts</span>
                                <input type="checkbox" className="w-5 h-5 accent-primary" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
