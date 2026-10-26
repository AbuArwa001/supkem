"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/api";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryItem {
    id: string;
    image: string;
    caption: string | null;
}

interface NewsGalleryLightboxProps {
    items: GalleryItem[];
    selectedIndex: number | null;
    mounted: boolean;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
    closeLabel: string;
    prevLabel: string;
    nextLabel: string;
}

export function NewsGalleryLightbox({
    items, selectedIndex, mounted, onClose, onNext, onPrev, closeLabel, prevLabel, nextLabel,
}: NewsGalleryLightboxProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onNext();
            if (e.key === "ArrowLeft") onPrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, onClose, onNext, onPrev]);

    if (selectedIndex === null || !mounted || !items[selectedIndex]) return null;

    const current = items[selectedIndex];
    const src = current.image.startsWith("http")
        ? current.image
        : `${API_BASE_URL}${current.image.startsWith("/") ? "" : "/"}${current.image}`;

    const content = (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/95 backdrop-blur-sm">
            <button onClick={onClose} className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all z-[100010]" aria-label={closeLabel}>
                <X size={24} />
            </button>
            {items.length > 1 && (
                <>
                    <button onClick={onPrev} className="absolute left-4 p-3 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all z-[100010] flex items-center justify-center group" aria-label={prevLabel}>
                        <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <button onClick={onNext} className="absolute right-4 p-3 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all z-[100010] flex items-center justify-center group" aria-label={nextLabel}>
                        <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </>
            )}
            <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-12">
                <div className="relative w-full max-w-5xl aspect-auto max-h-[85vh] flex-1">
                    <Image src={src} alt={current.caption || "Gallery image fullscreen"} fill className="object-contain" sizes="100vw" priority />
                </div>
                <div className="mt-4 text-center max-w-3xl">
                    {current.caption && <p className="text-white text-lg font-medium">{current.caption}</p>}
                    <p className="text-white/40 text-sm mt-1 font-semibold tracking-wider">{selectedIndex + 1} / {items.length}</p>
                </div>
            </div>
        </div>
    );

    return createPortal(content, document.body);
}
