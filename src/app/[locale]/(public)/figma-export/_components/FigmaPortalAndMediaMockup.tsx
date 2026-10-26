import React from "react";
import { Activity, CreditCard, UserPlus } from "lucide-react";

export function FigmaPortalAndMediaMockup() {
    return (
        <div className="space-y-24">
            <section className="space-y-4 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold tracking-tight text-slate-800 border-b pb-4">6. Member Portal (Application Tracking)</h2>
                <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200">
                    <div className="flex h-[600px]">
                        <div className="w-[100px] bg-white border-r border-slate-200 flex flex-col items-center py-8 gap-8 shrink-0">
                            <div className="h-10 w-10 bg-slate-900 rounded-xl mb-4" />
                            <div className="h-12 w-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center"><Activity size={24} /></div>
                            <div className="h-12 w-12 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-50"><CreditCard size={24} /></div>
                        </div>
                        <div className="flex-1 p-10 flex flex-col gap-8 overflow-y-auto">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Applications</h1>
                                    <p className="text-slate-500 font-medium">Track your requested certifications and services.</p>
                                </div>
                                <button className="px-6 py-3 bg-emerald-700 text-white rounded-xl font-bold flex gap-2"><UserPlus size={18} /> New Application</button>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                                <div className="flex items-start justify-between border-b border-slate-100 pb-6 mb-6">
                                    <div className="space-y-1">
                                        <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest rounded-full border border-amber-200">Pending Review</span>
                                        <h3 className="text-2xl font-bold text-slate-900 mt-2">Hajj Certification 2026</h3>
                                    </div>
                                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md">Fully Paid</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="space-y-4 max-w-7xl mx-auto pb-32">
                <h2 className="text-2xl font-bold tracking-tight text-slate-800 border-b pb-4">7. Public News & Media Gallery</h2>
                <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="col-span-1 md:col-span-2 group cursor-pointer">
                            <div className="w-full h-[320px] bg-slate-200 rounded-2xl relative overflow-hidden flex items-end p-8">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                                <div className="relative z-10 space-y-2">
                                    <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest rounded-md">National Assembly</span>
                                    <h3 className="text-2xl font-black text-white leading-tight">SUPKEM Initiates Nationwide Grassroots Verification Exercise.</h3>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="p-4 border border-slate-100 rounded-xl space-y-2">
                                <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Hajj Press Release</span>
                                <h4 className="text-base font-bold text-slate-900">New Payment Portal Launched</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
