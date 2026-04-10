"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export const HomeGallery = () => {
  const t = useTranslations("Home");

  const GALLERY_IMAGES = [
    { src: "/images/slider/olesaudib.jpg", alt: t("gallery.img1"), span: "col-span-1 row-span-2" },
    { src: "/images/slider/ole_olesapitb.jpg", alt: t("gallery.img2"), span: "col-span-1" },
    { src: "/images/slider/olerezo_nb.jpg", alt: t("gallery.img3"), span: "col-span-1" },
    { src: "/images/slider/image.png", alt: t("gallery.img4"), span: "col-span-2" },
  ];

  return (
    <section className="py-40 px-6 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white to-transparent -z-10" />
      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-baseline justify-between gap-8">
          <div className="space-y-6">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-primary">
              {t("gallery.subtitle")}
            </p>
            <h2 className="text-6xl lg:text-8xl font-black font-outfit text-primary tracking-tighter leading-[0.9]">
              {t("gallery.title")}
            </h2>
          </div>
          <Link
            href="/about#gallery"
            className="group flex items-center gap-4 text-xl font-bold text-primary/60 hover:text-primary transition-colors"
          >
            {t("gallery.viewGallery")}{" "}
            <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
              <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform" />
            </div>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px] lg:auto-rows-[300px]">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={cn("relative rounded-[16px] overflow-hidden group cursor-pointer shadow-lg", img.span)}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <p className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {img.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
