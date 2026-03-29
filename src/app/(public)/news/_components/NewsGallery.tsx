"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/api";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryItem {
    id: string;
    image: string;
    caption: string | null;
}

export function NewsGallery({ items }: { items: GalleryItem[] }) {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const openLightbox = (index: number) => {
        setSelectedIndex(index);
    };

    const closeLightbox = () => {
        setSelectedIndex(null);
    };

    const showNext = useCallback(() => {
        setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % items.length));
    }, [items.length]);

    const showPrev = useCallback(() => {
        setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + items.length) % items.length));
    }, [items.length]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (selectedIndex === null) return;
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") showNext();
            if (e.key === "ArrowLeft") showPrev();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedIndex, showNext, showPrev]);

    if (!items || items.length === 0) return null;

    return (
        <div className="mt-12 bg-white rounded-[20px] p-8 lg:p-12 shadow-2xl shadow-black/10 border border-slate-100">
            <h2 className="text-2xl font-black font-outfit text-primary mb-8 border-b border-border pb-4">
                Image Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, index) => {
                    const imageUrl = item.image.startsWith('http')
                        ? item.image
                        : `${API_BASE_URL}${item.image.startsWith('/') ? '' : '/'}${item.image}`;

                    return (
                        <div
                            key={item.id}
                            className="relative aspect-square rounded-2xl overflow-hidden group shadow-lg cursor-pointer"
                            onClick={() => openLightbox(index)}
                        >
                            <Image
                                src={imageUrl}
                                alt={item.caption || "Gallery image"}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            {/* Hover Overlay */}
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white text-sm font-medium line-clamp-2">
                                    {item.caption || "Click to view"}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Lightbox Modal */}
            {selectedIndex !== null && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm">
                    {/* Close Button */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all z-[10000]"
                        aria-label="Close lightbox"
                    >
                        <X size={24} />
                    </button>

                    {/* Navigation Buttons (only show if more than 1 image) */}
                    {items.length > 1 && (
                        <>
                            <button
                                onClick={showPrev}
                                className="absolute left-4 p-3 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all z-50 flex items-center justify-center group"
                                aria-label="Previous image"
                            >
                                <ChevronLeft size={32} className="group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={showNext}
                                className="absolute right-4 p-3 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all z-50 flex items-center justify-center group"
                                aria-label="Next image"
                            >
                                <ChevronRight size={32} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </>
                    )}

                    {/* Main Image */}
                    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-12">
                        <div className="relative w-full max-w-5xl aspect-auto max-h-[85vh] flex-1">
                            <Image
                                src={
                                    items[selectedIndex].image.startsWith('http')
                                        ? items[selectedIndex].image
                                        : `${API_BASE_URL}${items[selectedIndex].image.startsWith('/') ? '' : '/'}${items[selectedIndex].image}`
                                }
                                alt={items[selectedIndex].caption || "Gallery image fullscreen"}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                priority
                            />
                        </div>

                        {/* Caption Container */}
                        <div className="mt-4 text-center max-w-3xl">
                            {items[selectedIndex].caption && (
                                <p className="text-white text-lg font-medium">
                                    {items[selectedIndex].caption}
                                </p>
                            )}
                            <p className="text-white/40 text-sm mt-1 font-semibold tracking-wider">
                                {selectedIndex + 1} / {items.length}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
