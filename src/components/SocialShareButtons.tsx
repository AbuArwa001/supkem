"use client";

import { useState } from "react";
import { Share2, Check, Link as LinkIcon, MessageCircle } from "lucide-react";

interface SocialShareProps {
    title: string;
    url?: string;
    className?: string;
    variant?: "compact" | "full" | "bar";
}

export function SocialShareButtons({ title, url, className = "", variant = "full" }: SocialShareProps) {
    const [copied, setCopied] = useState(false);
    const [showTikTokModal, setShowTikTokModal] = useState(false);
    const [showInstagramModal, setShowInstagramModal] = useState(false);

    // Current page URL fallback
    const shareUrl = typeof window !== "undefined" ? (url || window.location.href) : (url || "");
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedTitle = encodeURIComponent(title);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } catch {
            // Fallback
        }
    };

    const handleNativeShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: title,
                    url: shareUrl,
                });
            } catch {
                // User cancelled or share failed
            }
        }
    };

    const shareLinks = {
        x: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    if (variant === "compact") {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                <button
                    onClick={handleNativeShare}
                    className="p-2 rounded-full bg-slate-800 hover:bg-emerald-500 text-slate-300 hover:text-white transition-all border border-slate-700"
                    title="Share Article"
                >
                    <Share2 size={16} />
                </button>
            </div>
        );
    }

    return (
        <div className={`space-y-3 ${className}`}>
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                <span className="flex items-center gap-2 text-slate-300">
                    <Share2 size={14} className="text-emerald-400" /> Share Announcement:
                </span>
                {copied && (
                    <span className="text-emerald-400 text-xs font-medium flex items-center gap-1">
                        <Check size={12} /> Link Copied!
                    </span>
                )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
                {/* X (Twitter) Button */}
                <a
                    href={shareLinks.x}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-black text-slate-200 hover:text-white border border-slate-700 hover:border-white/30 text-xs font-bold flex items-center gap-2 transition-all shadow-md group"
                    title="Share on X"
                >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>X</span>
                </a>

                {/* Facebook Button */}
                <a
                    href={shareLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 text-xs font-bold flex items-center gap-2 transition-all shadow-md"
                    title="Share on Facebook"
                >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span>Facebook</span>
                </a>

                {/* WhatsApp Button */}
                <a
                    href={shareLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 text-xs font-bold flex items-center gap-2 transition-all shadow-md"
                    title="Share on WhatsApp"
                >
                    <MessageCircle size={14} />
                    <span>WhatsApp</span>
                </a>

                {/* Instagram Button */}
                <button
                    onClick={() => {
                        handleCopy();
                        setShowInstagramModal(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-amber-500/20 hover:from-purple-600 hover:to-pink-600 text-pink-300 hover:text-white border border-pink-500/30 text-xs font-bold flex items-center gap-2 transition-all shadow-md"
                    title="Share to Instagram Stories"
                >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    <span>Instagram</span>
                </button>

                {/* TikTok Button */}
                <button
                    onClick={() => {
                        handleCopy();
                        setShowTikTokModal(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-600 text-cyan-300 hover:text-white border border-cyan-500/30 text-xs font-bold flex items-center gap-2 transition-all shadow-md"
                    title="Share to TikTok"
                >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.02c0 2.45-.82 4.84-2.39 6.64-1.57 1.8-3.8 2.87-6.17 2.98-2.37.11-4.73-.72-6.42-2.34-1.69-1.62-2.58-3.92-2.48-6.3.1-2.38 1.11-4.63 2.86-6.14 1.75-1.51 4.12-2.22 6.44-1.95v4.06c-1.19-.15-2.41.19-3.32.96-.91.77-1.43 1.94-1.41 3.14.02 1.2.58 2.34 1.51 3.08.93.74 2.18 1.01 3.33.72 1.15-.29 2.12-1.12 2.61-2.23.23-.52.34-1.09.34-1.67V.02z" />
                    </svg>
                    <span>TikTok</span>
                </button>

                {/* Copy Link Button */}
                <button
                    onClick={handleCopy}
                    className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
                        copied
                            ? "bg-emerald-500 text-white border-emerald-400"
                            : "bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700"
                    }`}
                >
                    {copied ? <Check size={14} /> : <LinkIcon size={14} />}
                    <span>{copied ? "Copied!" : "Copy Link"}</span>
                </button>
            </div>

            {/* Instagram Instructions Modal */}
            {showInstagramModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center mx-auto text-white shadow-lg">
                            <InstagramIcon />
                        </div>
                        <h4 className="text-lg font-bold font-outfit text-white">Share on Instagram</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            The article link has been copied to your clipboard! Open Instagram and paste it directly into your <strong>Story sticker</strong> or bio link.
                        </p>
                        <button
                            onClick={() => setShowInstagramModal(false)}
                            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
                        >
                            Got It
                        </button>
                    </div>
                </div>
            )}

            {/* TikTok Instructions Modal */}
            {showTikTokModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
                    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-sm w-full space-y-4 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400 shadow-lg">
                            <TikTokIcon />
                        </div>
                        <h4 className="text-lg font-bold font-outfit text-white">Share on TikTok</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">
                            The article link has been copied to your clipboard! You can now paste it into your TikTok video comments, profile bio, or direct messages.
                        </p>
                        <button
                            onClick={() => setShowTikTokModal(false)}
                            className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
                        >
                            Got It
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

// Icons
function InstagramIcon() {
    return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
    );
}

function TikTokIcon() {
    return (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97v7.02c0 2.45-.82 4.84-2.39 6.64-1.57 1.8-3.8 2.87-6.17 2.98-2.37.11-4.73-.72-6.42-2.34-1.69-1.62-2.58-3.92-2.48-6.3.1-2.38 1.11-4.63 2.86-6.14 1.75-1.51 4.12-2.22 6.44-1.95v4.06c-1.19-.15-2.41.19-3.32.96-.91.77-1.43 1.94-1.41 3.14.02 1.2.58 2.34 1.51 3.08.93.74 2.18 1.01 3.33.72 1.15-.29 2.12-1.12 2.61-2.23.23-.52.34-1.09.34-1.67V.02z" />
        </svg>
    );
}
