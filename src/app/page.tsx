"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Users,
  FileCheck,
  Award,
  ArrowRight,
  CheckCircle2,
  Heart,
  Shield,
  Globe,
  BookOpen,
  Briefcase,
  MapPin,
  Anchor
} from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden py-24 px-6">
      {/* Premium Mesh Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-[#FCFCFD]">
        <div
          className="absolute inset-0 opacity-[0.4]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 0% 0%, rgba(13, 148, 136, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 100% 0%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 100% 100%, rgba(13, 148, 136, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 0% 100%, rgba(245, 158, 11, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 1) 0%, transparent 100%)
            `
          }}
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] mix-blend-overlay" />

        {/* Animated Gradient Accents */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.15, 0.05],
            x: [0, -50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/15 rounded-full blur-[150px]"
        />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/80 backdrop-blur-md shadow-xl shadow-primary/5 border border-primary/10 text-primary text-sm font-bold tracking-tight">
            <span className="flex h-2.5 w-2.5 rounded-full bg-secondary animate-ping" />
            The Voice of Kenya's Muslim Community
          </div>

          <div className="space-y-6">
            <h1 className="text-7xl lg:text-8xl font-black font-outfit leading-[0.95] text-primary tracking-tighter">
              Uniting the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary italic">Ummah</span>
            </h1>
            <p className="text-2xl text-foreground/60 leading-relaxed max-w-xl font-medium">
              Streamlining registration, certification, and community empowerment through digital excellence and faith-driven service.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 pt-4">
            <Link
              href="/register"
              className="px-10 py-5 bg-primary text-white rounded-[24px] font-bold flex items-center gap-3 hover-lift premium-gradient text-xl shadow-2xl shadow-primary/30 group"
            >
              Start Registration <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-10 py-5 bg-white/50 backdrop-blur-sm border-2 border-primary/5 rounded-[24px] font-bold flex items-center gap-3 hover:bg-primary/5 transition-all text-xl shadow-lg shadow-black/5"
            >
              Explore Mission
            </Link>
          </div>

          <div className="flex items-center gap-10 pt-10">
            <div className="space-y-1">
              <p className="text-3xl font-black font-outfit text-primary">47</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Counties Active</p>
            </div>
            <div className="w-px h-10 bg-border" />
            <div className="space-y-1">
              <p className="text-3xl font-black font-outfit text-primary">10k+</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Organizations</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative lg:block"
        >
          <div className="relative z-10 p-1 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-[60px] backdrop-blur-3xl shadow-2xl">
            <div className="bg-white/90 backdrop-blur-md rounded-[58px] overflow-hidden aspect-[4/5] flex flex-col items-center justify-center p-16 text-center transform hover:rotate-1 transition-transform duration-700">
              <div className="relative mb-12 group">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors animate-pulse" />
                <Image src="/logo.svg" alt="SUPKEM Logo" width={220} height={220} className="relative z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-4xl font-black font-outfit text-primary mb-2">SUPKEM</h3>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-foreground/30 leading-relaxed max-w-[200px] mx-auto">Supreme Council of Kenya Muslims</p>
            </div>
          </div>

          {/* Decorative Floats */}
          <motion.div
            animate={{ y: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-20 -right-20 w-48 h-48 bg-secondary/10 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 30, 0], scale: [1, 0.9, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
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
    <section className="py-24 border-y border-border overflow-hidden bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 mb-16">Our Trusted Global Partners</p>

        <div className="flex flex-wrap justify-between gap-x-12 gap-y-12 items-center">
          {partners.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500 group"
            >
              <div className="relative w-32 h-16 grayscale group-hover:grayscale-0 transition-all duration-500">
                <Image
                  src={p.src}
                  alt={p.name}
                  fill
                  className="object-contain"
                  sizes="(max-w-768px) 100vw, 128px"
                />
              </div>
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
      desc: "Promoting Islamic values, leadership development, and rights awareness to strengthen Muslim organizations in national discourse.",
      icon: Shield,
      color: "from-blue-600 to-blue-400"
    },
    {
      title: "Peacebuilding & Social Cohesion",
      desc: "Fostering interfaith dialogue, conflict resolution, and resilience through P/CVE initiatives for a unified society.",
      icon: Anchor,
      color: "from-green-600 to-green-400"
    },
    {
      title: "Humanitarian Response & Development",
      desc: "Addressing health, education, and emergency needs in underserved regions through targeted disaster relief and projects.",
      icon: Heart,
      color: "from-amber-600 to-amber-400"
    }
  ];

  return (
    <section className="py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="space-y-4">
            <p className="text-xs font-black uppercase tracking-[0.3em] text-secondary">Our Mission</p>
            <h2 className="text-5xl lg:text-7xl font-black font-outfit text-primary tracking-tighter leading-[0.95]">
              Core Programme <br /> Areas
            </h2>
          </div>
          <p className="text-xl text-foreground/50 max-w-md font-medium leading-relaxed italic border-l-4 border-secondary/20 pl-6">
            "Uplifting society to a just future through faith, unity, and service to the Ummah."
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {programs.map((prog, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative h-full"
            >
              <div className={cn(prog.color, "absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-[48px] -z-10 blur-2xl scale-95")} />
              <div className="h-full p-12 rounded-[48px] bg-white border border-border/60 hover:border-primary/20 transition-all duration-500 flex flex-col shadow-xl shadow-black/[0.02]">
                <div className={cn("inline-flex p-5 rounded-3xl bg-primary/5 text-primary mb-10 group-hover:scale-110 transition-transform")}>
                  <prog.icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-3xl font-black font-outfit text-primary mb-6 leading-tight">{prog.title}</h3>
                <p className="text-lg text-foreground/50 leading-relaxed font-medium">{prog.desc}</p>
              </div>
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
    <section className="py-32 px-6 bg-primary/[0.02] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6 mb-24">
          <h2 className="text-5xl lg:text-7xl font-black font-outfit text-primary tracking-tighter">Essential Services</h2>
          <p className="text-foreground/50 max-w-2xl mx-auto text-xl font-medium">
            Dedicated support frameworks designed to facilitate a thriving and organized community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 rounded-[40px] bg-white border border-border/50 hover:border-primary/30 shadow-xl shadow-black/[0.01] hover:shadow-primary/5 transition-all group"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/[0.03] text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                  <s.icon size={28} strokeWidth={1.5} />
                </div>
                <div className="space-y-3 pt-2">
                  <h3 className="text-2xl font-black font-outfit text-primary tracking-tight">{s.title}</h3>
                  <p className="text-foreground/50 font-medium leading-relaxed">{s.desc}</p>
                </div>
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
    <div className="bg-white">
      <Hero />
      <Partners />
      <ProgramAreas />
      <Services />

      {/* Modern High-Impact CTA */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto relative group">
          <div className="absolute inset-0 bg-primary rounded-[60px] translate-x-3 translate-y-3 transition-transform group-hover:translate-x-1 group-hover:translate-y-1 shadow-2xl shadow-primary/20" />
          <div className="relative bg-[#0F172A] rounded-[60px] p-16 lg:p-24 overflow-hidden border border-white/10">
            {/* Animated Glow */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 animate-pulse" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 max-w-4xl space-y-12">
              <h2 className="text-6xl lg:text-8xl font-black font-outfit text-white leading-[0.9] tracking-tighter">
                Lead With <br />
                <span className="text-secondary italic">Excellence</span>
              </h2>
              <p className="text-2xl text-white/50 leading-relaxed font-medium max-w-2xl italic">
                Join the Supreme Council's digital revolution and ensure your organization is officially accredited and connected to the heartbeat of Kenyan Muslims.
              </p>
              <div className="flex flex-wrap gap-8 pt-4">
                <Link
                  href="/register"
                  className="px-12 py-7 bg-primary text-white rounded-[24px] font-black text-2xl hover:bg-white hover:text-primary transition-all shadow-2xl flex items-center gap-4 group"
                >
                  Register Now <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link
                  href="/login"
                  className="px-12 py-7 bg-white/5 border border-white/10 text-white rounded-[24px] font-black text-2xl hover:bg-white/10 transition-all flex items-center gap-4"
                >
                  Portal Access
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
