import React from "react";

export function ForgotPasswordHero() {
  return (
    <div className="hidden lg:flex flex-1 relative bg-primary overflow-hidden items-center justify-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[100px] animate-pulse" />
      </div>
      <div className="relative z-10 p-20 text-center space-y-8 max-w-2xl text-white">
        <div className="inline-block p-8 rounded-[20px] bg-white/5 border border-white/10 backdrop-blur-xl mb-4">
          <svg className="w-20 h-20 text-secondary" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h2 className="text-4xl font-bold font-outfit leading-tight">Secure Account Recovery</h2>
        <p className="text-lg text-white/70 leading-relaxed font-light">
          Follow the steps to regain access to your SUPKEM portal safely. Your data security is our top priority.
        </p>
      </div>
    </div>
  );
}
