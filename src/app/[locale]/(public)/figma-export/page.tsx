"use client";

import React from 'react';
import { Search, ChevronDown, Bell, Users, Activity, CreditCard, UserPlus, Filter, MoreHorizontal } from 'lucide-react';

export default function FigmaExportPage() {
    return (
        <div className="bg-slate-100 min-h-screen p-16 space-y-32 font-sans text-slate-900">
            {/* Header / Instructions */}
            <div className="mb-10 max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">SUPKEM Figma Export Interface</h1>
                <p className="text-slate-500 text-lg">Use your HTML-to-Figma plugin on this page to ingest the fully semantic UI layouts.</p>
            </div>

            {/* 1. THE COMPONENT LIBRARY */}
            <section className="space-y-12 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold tracking-tight text-slate-800 border-b pb-4">1. The Component Library</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Buttons */}
                    <div className="bg-white p-8 rounded-xl border border-slate-200 space-y-6 shadow-sm">
                        <h3 className="font-semibold text-slate-500 uppercase tracking-wider text-sm">Buttons</h3>
                        <div className="space-y-4 flex flex-col items-start w-full">
                            <button className="w-full px-4 py-2 bg-emerald-700 text-white font-medium rounded-lg shadow-sm">Primary Default</button>
                            <button className="w-full px-4 py-2 bg-emerald-800 text-white font-medium rounded-lg shadow-sm">Primary Hover</button>
                            <button className="w-full px-4 py-2 bg-slate-100 text-slate-400 font-medium rounded-lg cursor-not-allowed">Primary Disabled</button>
                            
                            <button className="w-full px-4 py-2 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg shadow-sm">Outline Default</button>
                            <button className="w-full px-4 py-2 bg-slate-50 border border-slate-300 text-slate-900 font-medium rounded-lg shadow-sm">Outline Hover</button>
                        </div>
                    </div>

                    {/* Inputs */}
                    <div className="bg-white p-8 rounded-xl border border-slate-200 space-y-6 shadow-sm">
                        <h3 className="font-semibold text-slate-500 uppercase tracking-wider text-sm">Inputs (Shadcn Config)</h3>
                        <div className="space-y-6 flex flex-col items-start w-full">
                            <div className="w-full space-y-1">
                                <label className="text-sm font-medium text-slate-700">Default Input</label>
                                <input type="text" placeholder="Enter name..." className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-sm text-slate-900 placeholder-slate-400" />
                            </div>
                            <div className="w-full space-y-1">
                                <label className="text-sm font-medium text-slate-700">Focused Input</label>
                                <input type="text" value="Active Typing" readOnly className="w-full h-10 px-3 rounded-md border border-emerald-600 ring-2 ring-emerald-600/20 bg-white text-sm text-slate-900 relative" />
                            </div>
                            <div className="w-full space-y-1">
                                <label className="text-sm font-medium text-slate-500">Disabled Input</label>
                                <input type="text" placeholder="Not allowed" disabled className="w-full h-10 px-3 rounded-md border border-slate-200 bg-slate-50 text-sm text-slate-400 placeholder-slate-300 cursor-not-allowed" />
                            </div>
                        </div>
                    </div>

                    {/* Badges & Avatars */}
                    <div className="bg-white p-8 rounded-xl border border-slate-200 space-y-6 shadow-sm">
                        <h3 className="font-semibold text-slate-500 uppercase tracking-wider text-sm">Badges & Context</h3>
                        <div className="flex flex-wrap gap-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">Active Status</span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">Pending Review</span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">Suspended</span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">Archived Record</span>
                        </div>
                        <div className="flex gap-4 pt-4 border-t border-slate-100">
                            <div className="h-12 w-12 rounded-full bg-emerald-700 flex items-center justify-center text-white font-bold text-sm">AK</div>
                            <div className="h-12 w-12 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold text-sm">MH</div>
                            <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-sm">JS</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. ADMIN DASHBOARD LAYOUT */}
            <section className="space-y-4 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold tracking-tight text-slate-800 border-b pb-4">2. Admin Dashboard Foundation</h2>
                <div className="flex h-[800px] w-full bg-slate-50 border border-slate-200 rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50">
                    
                    {/* Sidebar */}
                    <div className="w-[280px] bg-slate-900 text-white flex flex-col shrink-0">
                        <div className="h-[80px] flex items-center px-6 border-b border-white/10">
                            <div className="font-bold text-xl tracking-widest text-emerald-400">SUPKEM ADMIN</div>
                        </div>
                        <nav className="flex-1 px-4 py-8 space-y-3">
                            <div className="flex items-center gap-4 px-4 py-3 bg-white/10 rounded-xl text-emerald-400 font-medium">
                                <Activity size={20} /> <span className="font-semibold">Platform Overview</span>
                            </div>
                            <div className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:bg-white/5 rounded-xl transition-colors font-medium cursor-pointer">
                                <Users size={20} /> <span className="font-medium">Membership Base</span>
                            </div>
                            <div className="flex items-center gap-4 px-4 py-3 text-slate-400 hover:bg-white/5 rounded-xl transition-colors font-medium cursor-pointer">
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

                    {/* Main Content Area */}
                    <div className="flex-1 flex flex-col bg-[#f8fafc]">
                        {/* Header */}
                        <header className="h-[80px] bg-white/70 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-10 shrink-0 shadow-sm z-10 relative">
                            <div className="relative w-[320px]">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input type="text" placeholder="Global system search..." className="w-full h-11 pl-11 pr-4 rounded-full border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all" />
                            </div>
                            <div className="flex items-center gap-8">
                                <div className="relative cursor-pointer">
                                    <Bell size={22} className="text-slate-500" />
                                    <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-rose-500 border border-white"></span>
                                </div>
                                <div className="flex items-center gap-3 border-l border-slate-200 pl-8 cursor-pointer">
                                    <div className="h-9 w-9 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">AK</div>
                                    <span className="text-sm font-semibold text-slate-700">Administrator</span>
                                    <ChevronDown size={16} className="text-slate-400" />
                                </div>
                            </div>
                        </header>

                        {/* Page Content */}
                        <main className="flex-1 p-10 space-y-8 overflow-y-auto">
                            <div className="flex justify-between items-center">
                                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Ecosystem Metrics</h1>
                                <button className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 transition-colors text-white rounded-xl text-sm font-semibold flex items-center gap-2 shadow-sm shadow-emerald-700/20">
                                    <UserPlus size={18} /> Register Member
                                </button>
                            </div>

                            {/* Metric Cards */}
                            <div className="grid grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-slate-500">Verified Members</span>
                                        <Users size={20} className="text-emerald-600" />
                                    </div>
                                    <span className="text-[40px] font-black text-slate-900 tracking-tighter">45,231</span>
                                    <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full w-max border border-emerald-100">+12.4% MONTH OVER MONTH</span>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-slate-500">Active Subscriptions</span>
                                        <Activity size={20} className="text-emerald-600" />
                                    </div>
                                    <span className="text-[40px] font-black text-slate-900 tracking-tighter">18,409</span>
                                    <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full w-max border border-emerald-100">+4.1% MONTH OVER MONTH</span>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-bold text-slate-500">Fiscal Revenue MTD</span>
                                        <CreditCard size={20} className="text-emerald-600" />
                                    </div>
                                    <span className="text-[40px] font-black text-slate-900 tracking-tighter">KES 4.2M</span>
                                    <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full w-max border border-emerald-100">+21.0% MONTH OVER MONTH</span>
                                </div>
                            </div>
                            
                            {/* Activity Feed placeholder */}
                            <div className="bg-white flex-1 rounded-2xl border border-slate-200 shadow-sm p-8">
                                <h3 className="font-bold text-slate-900 mb-6 text-lg tracking-tight">Recent Platform Activity</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
                                        <div className="h-10 w-10 shrink-0 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mt-1"><UserPlus size={18}/></div>
                                        <div className="flex flex-col flex-1 gap-1">
                                            <span className="text-base font-semibold text-slate-900">New Registration Pipeline: Aisha Mohammed</span>
                                            <span className="text-sm text-slate-500 font-medium">Nairobi Regional Branch HQ</span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">2 min ago</span>
                                    </div>
                                    <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
                                        <div className="h-10 w-10 shrink-0 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mt-1"><CreditCard size={18}/></div>
                                        <div className="flex flex-col flex-1 gap-1">
                                            <span className="text-base font-semibold text-slate-900">M-PESA Validation Pending</span>
                                            <span className="text-sm text-slate-500 font-medium">KES 1,000 via Paybill / Trans ID: QWE123RTY</span>
                                        </div>
                                        <span className="text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">15 min ago</span>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>

            {/* 3. MEMBER DIRECTORY DATATABLE */}
            <section className="space-y-4 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold tracking-tight text-slate-800 border-b pb-4">3. Shadcn Directory / DataTables</h2>
                <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-200 overflow-hidden w-full">
                    
                    {/* Table Toolbar */}
                    <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-white">
                        <div className="relative w-80">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input type="text" placeholder="Filter platform citizens..." className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
                        </div>
                        <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors">
                            <Filter size={16} /> Column Configuration
                        </button>
                    </div>

                    {/* Table Schema */}
                    <div className="w-full overflow-x-auto">
                        <table className="w-full text-left text-sm whitespace-nowrap">
                            <thead className="bg-[#f8fafc] text-slate-500 border-b border-slate-200">
                                <tr>
                                    <th className="px-8 py-5 font-bold uppercase tracking-wider text-[11px]">Primary Citizen Identity</th>
                                    <th className="px-8 py-5 font-bold uppercase tracking-wider text-[11px]">Regional Vector</th>
                                    <th className="px-8 py-5 font-bold uppercase tracking-wider text-[11px]">Verification Logic</th>
                                    <th className="px-8 py-5 font-bold uppercase tracking-wider text-[11px]">Lifecycle Date</th>
                                    <th className="px-8 py-5 font-bold uppercase tracking-wider text-[11px] text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-slate-700 bg-white">
                                <tr className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm">AH</div>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="font-bold text-slate-900 text-sm">Ahmed Hassan</span>
                                                <span className="text-slate-500 text-xs font-medium">ahmed.h@email.com</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-slate-600 font-medium">Mombasa District Grid</td>
                                    <td className="px-8 py-5">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">Verified Citizen</span>
                                    </td>
                                    <td className="px-8 py-5 text-slate-500 font-medium">October 24, 2025</td>
                                    <td className="px-8 py-5 text-right">
                                        <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"><MoreHorizontal size={18} /></button>
                                    </td>
                                </tr>
                                <tr className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500 text-sm">FY</div>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="font-bold text-slate-900 text-sm">Fatima Yusuf</span>
                                                <span className="text-slate-500 text-xs font-medium">f.yusuf@email.com</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-slate-600 font-medium">Garissa Central Grid</td>
                                    <td className="px-8 py-5">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">Pending Background Check</span>
                                    </td>
                                    <td className="px-8 py-5 text-slate-500 font-medium">November 02, 2025</td>
                                    <td className="px-8 py-5 text-right">
                                        <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"><MoreHorizontal size={18} /></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Table Footer */}
                    <div className="p-6 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-white">
                        <span className="font-medium">Showing <strong className="text-slate-900">1</strong> to <strong className="text-slate-900">2</strong> of 45,231 members</span>
                        <div className="flex gap-2">
                            <button className="px-4 py-2 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 disabled:opacity-50 font-semibold cursor-not-allowed">Previous Page</button>
                            <button className="px-4 py-2 border border-slate-300 rounded-lg bg-white hover:bg-slate-50 font-semibold shadow-sm text-slate-900">Next Page</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. PUBLIC LANDING PAGE (HERO & SERVICES) */}
            <section className="space-y-4 max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold tracking-tight text-slate-800 border-b pb-4">4. Public Landing Page (Hero)</h2>
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-200">
                    {/* Header Nav */}
                    <header className="h-[80px] bg-white border-b border-slate-100 flex items-center justify-between px-10">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-emerald-700 rounded-lg"></div>
                            <span className="font-black text-xl tracking-tight text-slate-900">SUPKEM</span>
                        </div>
                        <nav className="flex gap-8 text-sm font-semibold text-slate-600">
                            <span className="text-emerald-700">Home</span>
                            <span>About Us</span>
                            <span>Services</span>
                            <span>News</span>
                            <span>Contact</span>
                        </nav>
                        <button className="px-6 py-2.5 bg-slate-900 text-white rounded-full font-bold text-sm">Portal Login</button>
                    </header>
                    {/* Hero Area */}
                    <div className="relative bg-slate-50 px-10 py-32 flex flex-col items-center text-center overflow-hidden">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] -mt-32 -mr-32"></div>
                        <span className="text-sm font-black text-emerald-700 uppercase tracking-widest bg-emerald-100 px-4 py-1.5 rounded-full mb-6 border border-emerald-200 relative z-10">National Membership Assembly</span>
                        <h1 className="text-6xl font-black text-slate-900 tracking-tighter leading-[1.1] max-w-4xl relative z-10 mb-8">Uniting Communities Through Structured Digital Excellence.</h1>
                        <p className="text-xl text-slate-500 max-w-2xl font-medium relative z-10 mb-10">Access your membership benefits, apply for Hajj certifications, and connect with national leadership in one unified digital platform.</p>
                        <div className="flex gap-4 relative z-10">
                            <button className="px-8 py-4 bg-emerald-700 text-white rounded-xl font-bold hover:bg-emerald-800 shadow-xl shadow-emerald-700/20">Create Free Account</button>
                            <button className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50 shadow-sm">Explore Services</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. AUTHENTICATION (LOGIN) */}
            <section className="space-y-4 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold tracking-tight text-slate-800 border-b pb-4">5. Authentication (Login View)</h2>
                <div className="flex h-[600px] bg-white rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-200">
                    <div className="w-1/2 bg-slate-900 p-12 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute inset-0 bg-emerald-900/20"></div>
                        <div className="relative z-10 flex gap-3 items-center">
                            <div className="h-10 w-10 bg-emerald-500 rounded-lg"></div>
                            <span className="font-black text-xl tracking-widest text-white">SUPKEM</span>
                        </div>
                        <div className="relative z-10 space-y-4 mt-auto">
                            <h2 className="text-4xl font-black text-white leading-tight">Welcome Back to the Portal</h2>
                            <p className="text-emerald-100/70 font-medium">Securely access your membership registry and administrative tools.</p>
                        </div>
                    </div>
                    <div className="w-1/2 p-16 flex flex-col justify-center">
                        <div className="space-y-2 mb-8">
                            <h3 className="text-2xl font-bold text-slate-900">Sign In</h3>
                            <p className="text-slate-500 text-sm">Enter your credentials below to access your account.</p>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-600">Email Address</label>
                                <input type="email" placeholder="name@supkem.org" className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-600 flex justify-between">
                                    Password <span className="text-emerald-700 capitalize tracking-normal underline">Forgot?</span>
                                </label>
                                <input type="password" value="password123" readOnly className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20" />
                            </div>
                            <button className="w-full h-12 bg-slate-900 text-white rounded-xl font-bold mt-4 shadow-lg shadow-slate-900/20">Secure Login</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. NORMAL USER PORTAL (APPLICATIONS) */}
            <section className="space-y-4 max-w-6xl mx-auto">
                <h2 className="text-2xl font-bold tracking-tight text-slate-800 border-b pb-4">6. Member Portal (Application Tracking)</h2>
                <div className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200">
                    <div className="flex h-[700px]">
                        {/* Thin Sidebar */}
                        <div className="w-[100px] bg-white border-r border-slate-200 flex flex-col items-center py-8 gap-8 shrink-0">
                            <div className="flex flex-col items-center gap-1">
                                <div className="h-10 w-10 bg-slate-900 rounded-xl mb-4"></div>
                            </div>
                            <div className="h-12 w-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center"><Activity size={24} /></div>
                            <div className="h-12 w-12 text-slate-400 rounded-xl flex items-center justify-center hover:bg-slate-50"><CreditCard size={24} /></div>
                        </div>
                        {/* Main portal grid */}
                        <div className="flex-1 p-10 flex flex-col gap-8 overflow-y-auto">
                            <div className="flex justify-between items-end">
                                <div>
                                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Applications</h1>
                                    <p className="text-slate-500 font-medium">Track your requested certifications and services.</p>
                                </div>
                                <button className="px-6 py-3 bg-emerald-700 text-white rounded-xl font-bold flex gap-2"><UserPlus size={18}/> New Application</button>
                            </div>

                            <div className="grid grid-cols-[2fr_1fr] gap-8">
                                {/* Details Card */}
                                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm h-max col-span-2">
                                    <div className="flex items-start justify-between border-b border-slate-100 pb-6 mb-6">
                                        <div className="space-y-1">
                                            <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-widest rounded-full border border-amber-200">Pending Review</span>
                                            <h3 className="text-2xl font-bold text-slate-900 mt-2">Hajj Certification 2026</h3>
                                            <p className="text-sm font-medium text-slate-500">Ref: APP-0982-HJJ</p>
                                        </div>
                                        <div className="text-right space-y-1">
                                            <p className="text-sm font-bold text-slate-900">KES 15,000</p>
                                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-md">Fully Paid</span>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Application Timeline Tracker</h4>
                                        <div className="relative pl-6 space-y-8 before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-emerald-500 before:via-slate-200 before:to-slate-200">
                                            <div className="relative flex items-center justify-between z-10">
                                                <div className="absolute left-[-26px] top-1 h-5 w-5 rounded-full bg-emerald-500 border-4 border-emerald-100 shrink-0 shadow-sm"></div>
                                                <div className="flex flex-col ml-6">
                                                    <span className="text-sm font-bold text-slate-900">Application Submitted</span>
                                                    <span className="text-xs text-slate-500">October 24, 2025</span>
                                                </div>
                                            </div>
                                            <div className="relative flex items-center justify-between z-10">
                                                <div className="absolute left-[-26px] top-1 h-5 w-5 rounded-full bg-emerald-500 border-4 border-emerald-100 shrink-0 shadow-sm"></div>
                                                <div className="flex flex-col ml-6">
                                                    <span className="text-sm font-bold text-slate-900">Payment Verified</span>
                                                    <span className="text-xs text-slate-500">October 25, 2025</span>
                                                </div>
                                            </div>
                                            <div className="relative flex items-center justify-between opacity-50 z-10">
                                                <div className="absolute left-[-26px] top-1 h-5 w-5 rounded-full bg-slate-200 border-4 border-white shrink-0 shadow-sm"></div>
                                                <div className="flex flex-col ml-6">
                                                    <span className="text-sm font-bold text-slate-900">HQ Final Review</span>
                                                    <span className="text-xs text-slate-500">Pending Process</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. NEWS & MULTIMEDIA (BLOG GRID) */}
            <section className="space-y-4 max-w-7xl mx-auto pb-32">
                <h2 className="text-2xl font-bold tracking-tight text-slate-800 border-b pb-4">7. Public News & Media Gallery</h2>
                <div className="bg-white p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Featured Post Card */}
                        <div className="col-span-1 md:col-span-2 group cursor-pointer">
                            <div className="w-full h-[400px] bg-slate-200 rounded-2xl mb-6 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8 space-y-3">
                                    <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold uppercase tracking-widest rounded-md">National Assembly</span>
                                    <h3 className="text-3xl font-black text-white leading-tight">SUPKEM Initiates Nationwide Grassroots Verification Exercise for 2026.</h3>
                                    <div className="flex items-center gap-4 text-emerald-100 text-sm font-medium">
                                        <span>October 25, 2025</span>
                                        <div className="w-1 h-1 rounded-full bg-emerald-100"></div>
                                        <span>4 min read</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Smaller Standard Cards */}
                        <div className="flex flex-col gap-8">
                            <div className="group cursor-pointer space-y-4 rounded-xl border border-slate-100 p-4 transition-colors hover:bg-slate-50">
                                <div className="w-full h-32 bg-slate-200 rounded-xl overflow-hidden"></div>
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-600">Hajj Press Release</span>
                                    <h4 className="text-base font-bold text-slate-900 leading-snug">New Payment Portal Launched for Mombasa Residents</h4>
                                    <p className="text-sm font-medium text-slate-500">October 24, 2025</p>
                                </div>
                            </div>
                            <div className="group cursor-pointer space-y-4 rounded-xl border border-slate-100 p-4 transition-colors hover:bg-slate-50">
                                <div className="w-full h-32 bg-slate-200 rounded-xl overflow-hidden"></div>
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-600">Leadership Update</span>
                                    <h4 className="text-base font-bold text-slate-900 leading-snug">Meeting with Regional Imams concludes in Nairobi</h4>
                                    <p className="text-sm font-medium text-slate-500">October 22, 2025</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
