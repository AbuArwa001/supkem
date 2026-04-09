"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

const GALLERY_IMAGES = [
  { src: "/images/slider/olesaudib.jpg", alt: "Community Leadership", span: "lg:col-span-2 lg:row-span-2" },
  { src: "/images/slider/ole_olesapitb.jpg", alt: "Interfaith Dialogue", span: "col-span-1" },
  { src: "/images/slider/olerezo_nb.jpg", alt: "Youth Empowerment", span: "col-span-1" },
  { src: "/images/slide31602.jpg", alt: "Historical Heritage", span: "col-span-1" },
  { src: "/images/slider/image.png", alt: "Advocacy Programs", span: "lg:col-span-2" },
  { src: "/images/slider/oledarknb.jpg", alt: "Faith & Unity", span: "col-span-1" },
];

export function GallerySection() {
  const t = useTranslations("AboutPage.gallery");

  return (
    <section id="gallery" className="py-40 px-6">
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="space-y-6">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-secondary">
              {t("subtitle")}
            </p>
            <h2 className="text-6xl lg:text-8xl font-black font-outfit text-primary tracking-tighter leading-none">
              {t("heading1")} <span className="italic">{t("heading2")}</span>
            </h2>
          </div>
          <p className="text-xl text-foreground/50 max-w-md font-medium">
            {t("desc")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[350px]">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={cn("relative rounded-[16px] overflow-hidden group shadow-xl cursor-pointer bg-slate-100", img.span)}
            >
              <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-10">
                <p className="text-white font-black font-outfit text-2xl tracking-tight translate-y-4 group-hover:translate-y-0 transition-transform duration-700">
                  {img.alt}
                </p>
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity delay-300 border border-white/20">
                  <ArrowRight size={18} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
