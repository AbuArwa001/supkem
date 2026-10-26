"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useHeroSlider } from "../../_hooks/useHeroSlider";

const SLIDES = [
  { url: "/images/slider/olesaudib.jpg", alt: "International Relations" },
  { url: "/images/slider/ole_olesapitb.jpg", alt: "Interfaith Dialogue" },
  { url: "/images/slider/olerezo_nb.jpg", alt: "Community Impact" },
  { url: "/images/slider/image.png", alt: "Leadership Presence" },
];

export const HeroSlider = () => {
  const { index } = useHeroSlider(SLIDES.length);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-slate-950">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.7, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            opacity: { duration: 2, ease: "easeInOut" },
            scale: { duration: 10, ease: "linear" },
          }}
          className="absolute inset-0"
        >
          <Image
            src={SLIDES[index].url}
            alt={SLIDES[index].alt}
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-black/20 z-10" />

      <div
        className="absolute inset-0 opacity-20 z-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 0% 0%, rgba(13, 148, 136, 0.4) 0%, transparent 40%),
            radial-gradient(circle at 100% 100%, rgba(245, 158, 11, 0.3) 0%, transparent 40%)
          `,
        }}
      />
    </div>
  );
};
