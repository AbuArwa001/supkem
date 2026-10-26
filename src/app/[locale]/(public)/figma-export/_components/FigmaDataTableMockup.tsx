import React from "react";
import { Search, Filter, MoreHorizontal } from "lucide-react";

export function FigmaDataTableMockup() {
    return (
        <section className="space-y-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 border-b pb-4">3. Shadcn Directory / DataTables</h2>
            <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-200 overflow-hidden w-full">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-white">
                    <div className="relative w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <input type="text" placeholder="Filter platform citizens..." className="w-full h-10 pl-10 pr-4 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
                    </div>
                    <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg text-sm font-semibold flex items-center gap-2 shadow-sm transition-colors">
                        <Filter size={16} /> Column Configuration
                    </button>
                </div>

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
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-100">Pending Check</span>
                                </td>
                                <td className="px-8 py-5 text-slate-500 font-medium">November 02, 2025</td>
                                <td className="px-8 py-5 text-right">
                                    <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"><MoreHorizontal size={18} /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="p-6 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-white">
                    <span className="font-medium">Showing <strong className="text-slate-900">1</strong> to <strong className="text-slate-900">2</strong> of 45,231 members</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-slate-300 rounded-lg bg-white font-semibold cursor-not-allowed">Previous Page</button>
                        <button className="px-4 py-2 border border-slate-300 rounded-lg bg-white font-semibold shadow-sm text-slate-900">Next Page</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
