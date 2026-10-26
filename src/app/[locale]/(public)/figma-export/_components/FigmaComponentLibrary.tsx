import React from "react";

export function FigmaComponentLibrary() {
    return (
        <section className="space-y-12 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 border-b pb-4">1. The Component Library</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
    );
}
