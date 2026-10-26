"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { API_BASE_URL } from "@/lib/api";
import { useTranslations } from "next-intl";
import { NewsGalleryLightbox, GalleryItem } from "./NewsGalleryLightbox";

export function NewsGallery({ items }: { items: GalleryItem[] }) {
    const t = useTranslations("NewsPage.gallery");
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const showNext = useCallback(() => {
        setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % items.length));
    }, [items.length]);

    const showPrev = useCallback(() => {
        setSelectedIndex((prev) => (prev === null ? null : (prev - 1 + items.length) % items.length));
    }, [items.length]);

    if (!items || items.length === 0) return null;

    return (
        <div className="mt-12 bg-white rounded-[20px] p-8 lg:p-12 shadow-2xl shadow-black/10 border border-slate-100">
            <h2 className="text-2xl font-black font-outfit text-primary mb-8 border-b border-border pb-4">
                {t("title")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, index) => {
                    const imageUrl = item.image.startsWith("http")
                        ? item.image
                        : `${API_BASE_URL}${item.image.startsWith("/") ? "" : "/"}${item.image}`;

                    return (
                        <div
                            key={item.id}
                            className="relative aspect-square rounded-2xl overflow-hidden group shadow-lg cursor-pointer"
                            onClick={() => setSelectedIndex(index)}
                        >
                            <Image
                                src={imageUrl}
                                alt={item.caption || "Gallery image"}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                <p className="text-white text-sm font-medium line-clamp-2">
                                    {item.caption || t("clickToView")}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <NewsGalleryLightbox
                items={items}
                selectedIndex={selectedIndex}
                mounted={mounted}
                onClose={() => setSelectedIndex(null)}
                onNext={showNext}
                onPrev={showPrev}
                closeLabel={t("close")}
                prevLabel={t("prev")}
                nextLabel={t("next")}
            />
        </div>
    );
}
