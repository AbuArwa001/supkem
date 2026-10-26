import React from "react";

export function FigmaLandingAndAuthMockup() {
    return (
        <div className="space-y-24">
            <section className="space-y-4 max-w-7xl mx-auto">
                <h2 className="text-2xl font-bold tracking-tight text-slate-800 border-b pb-4">4. Public Landing Page (Hero)</h2>
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-200">
                    <header className="h-[80px] bg-white border-b border-slate-100 flex items-center justify-between px-10">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 bg-emerald-700 rounded-lg" />
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
                    <div className="relative bg-slate-50 px-10 py-32 flex flex-col items-center text-center overflow-hidden">
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

            <section className="space-y-4 max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold tracking-tight text-slate-800 border-b pb-4">5. Authentication (Login View)</h2>
                <div className="flex h-[600px] bg-white rounded-3xl overflow-hidden shadow-2xl shadow-slate-200 border border-slate-200">
                    <div className="w-1/2 bg-slate-900 p-12 flex flex-col justify-between relative overflow-hidden">
                        <div className="relative z-10 flex gap-3 items-center">
                            <div className="h-10 w-10 bg-emerald-500 rounded-lg" />
                            <span className="font-black text-xl tracking-widest text-white">SUPKEM</span>
                        </div>
                        <div className="relative z-10 space-y-4 mt-auto">
                            <h2 className="text-4xl font-black text-white leading-tight">Welcome Back to the Portal</h2>
                            <p className="text-emerald-100/70 font-medium">Securely access your membership registry and administrative tools.</p>
                        </div>
                    </div>
                    <div className="w-1/2 p-16 flex flex-col justify-center">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-600">Email Address</label>
                                <input type="email" placeholder="name@supkem.org" className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-slate-50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-600">Password</label>
                                <input type="password" value="password123" readOnly className="w-full h-12 px-4 rounded-xl border border-slate-300 bg-slate-50" />
                            </div>
                            <button className="w-full h-12 bg-slate-900 text-white rounded-xl font-bold mt-4 shadow-lg">Secure Login</button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
