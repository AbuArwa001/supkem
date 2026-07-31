"use client";

import React from "react";

export interface SocialFollowLinksProps {
    className?: string;
    variant?: "pills" | "icons" | "card";
}

export function SocialFollowLinks({ className = "", variant = "pills" }: SocialFollowLinksProps) {
    const socialChannels = [
        {
            name: "X (Twitter)",
            handle: "@SUPKEM_Official",
            url: "https://x.com/SUPKEM_Official",
            color: "bg-slate-900 border-slate-700 hover:border-white text-white",
            icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
        },
        {
            name: "Facebook",
            handle: "SUPKEM Official",
            url: "https://facebook.com/SUPKEM.Official",
            color: "bg-blue-600/20 border-blue-500/30 hover:bg-blue-600 text-blue-300 hover:text-white",
            icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
            ),
        },
        {
            name: "Instagram",
            handle: "@supkem_official",
            url: "https://instagram.com/supkem_official",
            color: "bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-amber-500/20 border-pink-500/30 text-pink-300 hover:from-purple-600 hover:to-pink-600 hover:text-white",
            icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
            ),
        },
        {
            name: "TikTok",
            handle: "@supkem_official",
            url: "https://tiktok.com/@supkem_official",
            color: "bg-cyan-500/20 border-cyan-500/30 hover:bg-cyan-600 text-cyan-300 hover:text-white",
            icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.02c0 2.45-.82 4.84-2.39 6.64-1.57 1.8-3.8 2.87-6.17 2.98-2.37.11-4.73-.72-6.42-2.34-1.69-1.62-2.58-3.92-2.48-6.3.1-2.38 1.11-4.63 2.86-6.14 1.75-1.51 4.12-2.22 6.44-1.95v4.06c-1.19-.15-2.41.19-3.32.96-.91.77-1.43 1.94-1.41 3.14.02 1.2.58 2.34 1.51 3.08.93.74 2.18 1.01 3.33.72 1.15-.29 2.12-1.12 2.61-2.23.23-.52.34-1.09.34-1.67V.02z" />
                </svg>
            ),
        },
        {
            name: "YouTube",
            handle: "SUPKEM Kenya",
            url: "https://youtube.com/@SUPKEM",
            color: "bg-red-600/20 border-red-500/30 hover:bg-red-600 text-red-300 hover:text-white",
            icon: (
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
            ),
        },
    ];

    if (variant === "icons") {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                {socialChannels.map((item) => (
                    <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 rounded-xl border transition-all hover:scale-110 shadow-lg ${item.color}`}
                        title={`Follow SUPKEM on ${item.name}`}
                    >
                        {item.icon}
                    </a>
                ))}
            </div>
        );
    }

    return (
        <div className={`space-y-4 ${className}`}>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Follow SUPKEM Official Channels:
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
                {socialChannels.map((item) => (
                    <a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all shadow-lg hover:scale-105 ${item.color}`}
                    >
                        {item.icon}
                        <span>{item.name}</span>
                    </a>
                ))}
            </div>
        </div>
    );
}
