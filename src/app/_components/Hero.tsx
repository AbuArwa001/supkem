"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useHeroSlider } from "@/app/_hooks/useHeroSlider";

const SLIDES = [
  { url: "/images/slider/olesaudib.jpg", alt: "International Relations" },
  { url: "/images/slider/ole_olesapitb.jpg", alt: "Interfaith Dialogue" },
  { url: "/images/slider/olerezo_nb.jpg", alt: "Community Impact" },
  { url: "/images/slider/image.png", alt: "Leadership Presence" },
];

const HeroSlider = () => {
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

export const Hero = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden py-24 px-6">
      <HeroSlider />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-20">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white text-sm font-bold tracking-tight shadow-2xl">
            <span className="flex h-2.5 w-2.5 rounded-full bg-secondary animate-ping" />
            The Voice of Kenya's Muslim Community
          </div>

          <div className="space-y-6">
            <h1 className="text-7xl lg:text-9xl font-black font-outfit leading-[0.85] text-white tracking-tighter drop-shadow-2xl">
              Uniting the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-white to-amber-300 italic text-glow">
                Ummah
              </span>
            </h1>
            <p className="text-2xl lg:text-3xl text-white/90 leading-relaxed max-w-xl font-medium drop-shadow-md">
              Streamlining registration, certification, and community
              empowerment through digital excellence.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 pt-4">
            <Link
              href="/register"
              className="px-10 py-5 bg-primary text-white rounded-[24px] font-bold flex items-center gap-3 hover:scale-105 hover:shadow-primary/50 transition-all text-xl shadow-2xl shadow-primary/30 group"
            >
              Start Registration{" "}
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-10 py-5 bg-white/10 backdrop-blur-md border-2 border-white/20 text-white rounded-[24px] font-bold flex items-center gap-3 hover:bg-white/20 transition-all text-xl"
            >
              Explore Mission
            </Link>
          </div>

          <div className="flex items-center gap-10 pt-10">
            <div className="space-y-1">
              <p className="text-4xl font-black font-outfit text-white">47</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                Counties Active
              </p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="space-y-1">
              <p className="text-4xl font-black font-outfit text-white">10k+</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
                Organizations
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 p-1.5 bg-gradient-to-br from-white/30 to-transparent rounded-[64px] backdrop-blur-xl shadow-2xl">
            <div className="bg-white/90 backdrop-blur-sm rounded-[60px] overflow-hidden aspect-[4/5] flex flex-col items-center justify-center p-16 text-center shadow-inner relative group/card">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-secondary/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
              <div className="relative mb-12 group">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors animate-pulse" />
                <Image
                  src="/logo.svg"
                  alt="SUPKEM Logo"
                  width={240}
                  height={240}
                  className="relative z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
              <h3 className="text-5xl font-black font-outfit text-primary mb-2 tracking-tight">
                SUPKEM
              </h3>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 leading-relaxed max-w-[220px] mx-auto">
                Supreme Council of Kenya Muslims
              </p>
            </div>
          </div>

          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180, 270, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] -z-10"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2], x: [0, 50, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] -z-10"
          />
        </motion.div>
      </div>
    </section>
  );
};
