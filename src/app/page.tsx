"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  FileCheck,
  Award,
  ArrowRight,
  Heart,
  Shield,
  BookOpen,
  Briefcase,
  MapPin,
  Anchor
} from "lucide-react";
import { cn } from "@/lib/utils";

const SLIDES = [
  { url: "/images/slider/olesaudib.jpg", alt: "International Relations" },
  { url: "/images/slider/ole_olesapitb.jpg", alt: "Interfaith Dialogue" },
  { url: "/images/slider/olerezo_nb.jpg", alt: "Community Impact" },
  { url: "/images/slider/image.png", alt: "Leadership Presence" }
];

const HeroSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDES.length);
    }, 8000); // 8 seconds is usually the sweet spot for hero sliders
    return () => clearInterval(timer);
  }, []);

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
            scale: { duration: 10, ease: "linear" }
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

      {/* Layered Overlays for maximum text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-black/20 z-10" />

      {/* Subtle Brand Accents */}
      <div
        className="absolute inset-0 opacity-20 z-10"
        style={{
          backgroundImage: `
            radial-gradient(circle at 0% 0%, rgba(13, 148, 136, 0.4) 0%, transparent 40%),
            radial-gradient(circle at 100% 100%, rgba(245, 158, 11, 0.3) 0%, transparent 40%)
          `
        }}
      />
    </div>
  );
};

const Hero = () => {
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-white to-amber-300 italic text-glow">Ummah</span>
            </h1>
            <p className="text-2xl lg:text-3xl text-white/90 leading-relaxed max-w-xl font-medium drop-shadow-md">
              Streamlining registration, certification, and community empowerment through digital excellence.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 pt-4">
            <Link
              href="/register"
              className="px-10 py-5 bg-primary text-white rounded-[24px] font-bold flex items-center gap-3 hover:scale-105 hover:shadow-primary/50 transition-all text-xl shadow-2xl shadow-primary/30 group"
            >
              Start Registration <ArrowRight className="group-hover:translate-x-1 transition-transform" />
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
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Counties Active</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div className="space-y-1">
              <p className="text-4xl font-black font-outfit text-white">10k+</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Organizations</p>
            </div>
          </div>
        </motion.div>

        {/* Brand Identity Card */}
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
                <Image src="/logo.svg" alt="SUPKEM Logo" width={240} height={240} className="relative z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-700 ease-out" />
              </div>
              <h3 className="text-5xl font-black font-outfit text-primary mb-2 tracking-tight">SUPKEM</h3>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-slate-500 leading-relaxed max-w-[220px] mx-auto">Supreme Council of Kenya Muslims</p>
            </div>
          </div>

          {/* Decorative Elements */}
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


const Partners = () => {
  const partners = [
    { name: "AMREF", src: "/AMREF.png" },
    { name: "UKAID", src: "/UKAID.png" },
    { name: "UNICEF", src: "/UNICEF.png" },
    { name: "The Global Fund", src: "/GLOBAL FUND.png" },
    { name: "Kenya Redcross", src: "/KEENYA REDCROSS.png" },
    { name: "USAID", src: "/USAID.png" }
  ];

  return (
    <section className="py-24 border-y border-slate-100 bg-[#F8FAFC] grainy-bg">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <p className="text-center text-[11px] font-black uppercase tracking-[0.5em] text-primary/40 mb-16">Strategic Alliances & Global Stakeholders</p>
        <div className="flex flex-wrap justify-center lg:justify-between gap-16 items-center">
          {partners.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 0.6, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ opacity: 1, scale: 1.1, filter: "grayscale(0%)" }}
              className="relative w-40 h-20 grayscale brightness-110 contrast-125 transition-all duration-500"
            >
              <Image src={p.src} alt={p.name} fill className="object-contain" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const ProgramAreas = () => {
  const programs = [
    {
      title: "Policy Advocacy & Community Empowerment",
      desc: "Promoting Islamic values, leadership development, and rights awareness to strengthen Muslim organizations.",
      icon: Shield,
      color: "bg-teal-50 text-teal-600",
      accent: "border-teal-200"
    },
    {
      title: "Peacebuilding & Social Cohesion",
      desc: "Fostering interfaith dialogue, conflict resolution, and resilience through P/CVE initiatives.",
      icon: Anchor,
      color: "bg-indigo-50 text-indigo-600",
      accent: "border-indigo-200"
    },
    {
      title: "Humanitarian Response & Development",
      desc: "Addressing health, education, and emergency needs in underserved regions through relief projects.",
      icon: Heart,
      color: "bg-rose-50 text-rose-600",
      accent: "border-rose-200"
    }
  ];

  return (
    <section className="py-40 px-6 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-slate-50 to-transparent -z-10" />
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-24">
          <div className="space-y-6">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-secondary">Operational Pillars</p>
            <h2 className="text-6xl lg:text-8xl font-black font-outfit text-primary tracking-tighter leading-[0.9]">
              Strategic Focus
            </h2>
          </div>
          <p className="text-2xl text-slate-400 max-w-lg font-medium italic border-l-8 border-secondary/20 pl-8 leading-relaxed">
            "Uplifting society through faith, unity, and unwavering service to the Ummah."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {programs.map((prog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -15 }}
              className={cn(
                "p-14 rounded-[56px] bg-slate-50/30 border border-slate-100 hover:bg-white hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-700 relative group overflow-hidden",
                prog.accent
              )}
            >
              <div className="absolute top-0 left-0 w-2 h-0 bg-primary group-hover:h-full transition-all duration-500" />
              <div className={cn("inline-flex p-6 rounded-[2rem] mb-12 shadow-inner", prog.color)}>
                <prog.icon size={42} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-black font-outfit text-primary mb-8 tracking-tight">{prog.title}</h3>
              <p className="text-xl text-slate-500 leading-relaxed font-medium mb-8">{prog.desc}</p>
              <Link href="/programs" className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all uppercase tracking-widest text-xs">
                Learn More <ArrowRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const Services = () => {
  const services = [
    { title: "Marriage Registration", desc: "Coordination of marriage officers under the Islamic faith.", icon: Heart },
    { title: "Halal Certification", desc: "Regulating and issuing Halal accreditation across Kenya.", icon: FileCheck },
    { title: "Study Abroad Letters", desc: "Support letters for students pursuing education abroad.", icon: BookOpen },
    { title: "Employment Referral", desc: "Referral services for local and international employment.", icon: Briefcase },
    { title: "Pilgrimage Services", desc: "Coordinating Hajj and Umrah missions for Kenyan Muslims.", icon: MapPin },
    { title: "Membership Accreditation", desc: "Recognition for organizations under our umbrella body.", icon: Award }
  ];

  return (
    <section className="py-40 px-6 bg-[#0B211B] relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-8 mb-32">
          <h2 className="text-6xl lg:text-8xl font-black font-outfit text-white tracking-tighter text-glow">
            Digital Services
          </h2>
          <p className="text-teal-100/60 max-w-2xl mx-auto text-2xl font-medium leading-relaxed">
            Comprehensive digital frameworks designed to empower our community with efficiency and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-12 rounded-[48px] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-white inset-px hover:border-white transition-all duration-500 group relative"
            >
              <div className="flex flex-col gap-8">
                <div className="w-20 h-20 rounded-3xl bg-primary/20 text-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-xl">
                  <s.icon size={36} strokeWidth={1.5} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black font-outfit text-white group-hover:text-primary tracking-tight transition-colors duration-500">{s.title}</h3>
                  <p className="text-teal-50/50 group-hover:text-slate-600 font-medium leading-relaxed text-lg transition-colors duration-500">{s.desc}</p>
                </div>
              </div>
              <div className="absolute top-8 right-8 text-white/5 group-hover:text-primary/5 transition-colors">
                <s.icon size={120} strokeWidth={1} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


const HomeGallery = () => {
  const images = [
    { src: "/images/slider/olesaudib.jpg", alt: "Community Leadership", span: "col-span-1 row-span-2" },
    { src: "/images/slider/ole_olesapitb.jpg", alt: "Interfaith Engagement", span: "col-span-1" },
    { src: "/images/slider/olerezo_nb.jpg", alt: "Strategic Planning", span: "col-span-1" },
    { src: "/images/slider/image.png", alt: "Impact Initiatives", span: "col-span-2" }
  ];

  return (
    <section className="py-40 px-6 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-white to-transparent -z-10" />
      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        <div className="flex flex-col lg:flex-row items-baseline justify-between gap-8">
          <div className="space-y-6">
            <p className="text-xs font-black uppercase tracking-[0.4em] text-primary">Community Impact</p>
            <h2 className="text-6xl lg:text-8xl font-black font-outfit text-primary tracking-tighter leading-[0.9]">
              Visual Legacy
            </h2>
          </div>
          <Link href="/about#gallery" className="group flex items-center gap-4 text-xl font-bold text-primary/60 hover:text-primary transition-colors">
            Explore Full Gallery <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all"><ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform" /></div>
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px] lg:auto-rows-[300px]">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={cn("relative rounded-[32px] overflow-hidden group cursor-pointer shadow-lg", img.span)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <p className="text-white font-bold text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.alt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <Partners />
      <ProgramAreas />
      <Services />
      <HomeGallery />

      <section className="py-32 px-6 bg-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-[#0B211B] to-transparent -z-10" />
        <div className="max-w-7xl mx-auto relative group">
          <div className="absolute inset-0 bg-primary rounded-[32px] translate-x-3 translate-y-3 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5 shadow-[0_40px_80px_-20px_rgba(20,83,45,0.25)]" />
          <div className="relative bg-[#0F172A] rounded-[32px] p-16 lg:p-24 overflow-hidden border border-white/10 shadow-inner">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/15 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-10">
                <h2 className="text-5xl lg:text-8xl font-black font-outfit text-white leading-[0.9] tracking-tighter">
                  Start Your <br />
                  <span className="text-secondary italic text-glow">Journey</span>
                </h2>
                <p className="text-xl text-white/50 leading-relaxed font-medium italic border-l-4 border-primary/40 pl-8 max-w-lg">
                  Step into the future of community management. Secure, efficient, and faith-aligned.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6 lg:justify-end">
                <Link href="/register" className="px-10 py-6 bg-primary text-white rounded-[12px] font-black text-xl hover:bg-secondary hover:text-primary transition-all flex items-center justify-center gap-3 group shadow-xl shadow-primary/20">
                  Register Now <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/login" className="px-10 py-6 bg-white/5 backdrop-blur-xl border border-white/10 text-white rounded-[12px] font-black text-xl hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                  Portal Access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}