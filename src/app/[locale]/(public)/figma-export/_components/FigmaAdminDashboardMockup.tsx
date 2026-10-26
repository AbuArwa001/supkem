import React from "react";
import { Search, ChevronDown, Bell, Users, Activity, CreditCard, UserPlus } from "lucide-react";

export function FigmaAdminDashboardMockup() {
    return (
        <section className="space-y-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 border-b pb-4">2. Admin Dashboard Foundation</h2>
            <div className="flex h-[800px] w-full bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
                <div className="w-[280px] bg-slate-900 text-white flex flex-col shrink-0">
                    <div className="h-[80px] flex items-center px-6 border-b border-white/10">
                        <div className="font-bold text-xl tracking-widest text-emerald-400">SUPKEM ADMIN</div>
                    </div>
                    <nav className="flex-1 px-4 py-8 space-y-3">
                        <div className="flex items-center gap-4 px-4 py-3 bg-white/10 rounded-xl text-emerald-400 font-medium">
                            <Activity size={20} /> <span className="font-semibold">Platform Overview</span>
                        </div>
                        <div className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:bg-white/5 rounded-xl font-medium cursor-pointer">
                            <Users size={20} /> <span className="font-medium">Membership Base</span>
                        </div>
                        <div className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:bg-white/5 rounded-xl font-medium cursor-pointer">
                            <CreditCard size={20} /> <span className="font-medium">Financial Pipeline</span>
                        </div>
                    </nav>
                    <div className="p-6 border-t border-white/10 bg-black/20">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-emerald-600 flex items-center justify-center text-sm font-bold shadow-lg">AK</div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-white">System Admin</span>
                                <span className="text-xs text-slate-400">admin@supkem.org</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex flex-col bg-[#f8fafc]">
                    <header className="h-[80px] bg-white/70 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 shrink-0 shadow-sm z-10 relative">
                        <div className="relative w-[320px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input type="text" placeholder="Global system search..." className="w-full h-11 pl-11 pr-4 rounded-full border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
                        </div>
                        <div className="flex items-center gap-8">
                            <div className="relative cursor-pointer">
                                <Bell size={22} className="text-slate-500" />
                                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-rose-500 border border-white" />
                            </div>
                            <div className="flex items-center gap-3 border-l border-slate-200 pl-8 cursor-pointer">
                                <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">AK</div>
                                <span className="text-sm font-semibold text-slate-700">Administrator</span>
                                <ChevronDown size={16} className="text-slate-400" />
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 p-10 space-y-8 overflow-y-auto">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Ecosystem Metrics</h1>
                            <button className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm shadow-emerald-700/20">
                                <UserPlus size={18} /> Register Member
                            </button>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
                                <span className="text-sm font-bold text-slate-500">Verified Members</span>
                                <span className="text-[40px] font-black text-slate-900 tracking-tighter">45,231</span>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
                                <span className="text-sm font-bold text-slate-500">Active Subscriptions</span>
                                <span className="text-[40px] font-black text-slate-900 tracking-tighter">18,409</span>
                            </div>
                            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
                                <span className="text-sm font-bold text-slate-500">Fiscal Revenue MTD</span>
                                <span className="text-[40px] font-black text-slate-900 tracking-tighter">KES 4.2M</span>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </section>
    );
}
