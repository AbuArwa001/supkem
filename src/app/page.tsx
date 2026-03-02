"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Users, FileCheck, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden py-24 px-6">
      {/* Dynamic Background */}
      <div className="absolute inset-0 -z-10 bg-white">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[150px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-10"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white shadow-xl shadow-primary/5 border border-primary/10 text-primary text-sm font-bold tracking-tight">
            <span className="flex h-2.5 w-2.5 rounded-full bg-secondary animate-pulse" />
            Empowering Kenya's Muslim Community
          </div>

          <div className="space-y-6">
            <h1 className="text-7xl lg:text-8xl font-black font-outfit leading-[0.95] text-primary tracking-tighter">
              Advancing <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary/80 to-secondary">The Ummah</span>
            </h1>
            <p className="text-2xl text-foreground/60 leading-relaxed max-w-xl font-medium">
              The official Digital Hub for SUPKEM. Streamlining registration, certification, and community welfare across the nation.
            </p>
          </div>

          <div className="flex flex-wrap gap-5 pt-4">
            <Link
              href="/register"
              className="px-10 py-5 bg-primary text-white rounded-[24px] font-bold flex items-center gap-3 hover-lift premium-gradient text-xl shadow-2xl shadow-primary/30 group"
            >
              Get Started <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="px-10 py-5 bg-white border-2 border-primary/5 rounded-[24px] font-bold flex items-center gap-3 hover:bg-primary/5 transition-all text-xl shadow-lg shadow-black/5"
            >
              Explore Impact
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
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40">Registered Orgs</p>
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
            <div className="bg-white rounded-[58px] overflow-hidden aspect-[4/5] flex flex-col items-center justify-center p-16 text-center transform hover:rotate-1 transition-transform duration-700">
              <div className="relative mb-12">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                <Image src="/logo.svg" alt="SUPKEM Logo" width={200} height={200} className="relative z-10 drop-shadow-2xl hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="text-4xl font-black font-outfit text-primary mb-2">SUPKEM <span className="text-secondary">CMS</span></h3>
              <p className="text-xs font-black uppercase tracking-[0.4em] text-foreground/30">Official Portal</p>
            </div>
          </div>

          {/* Decorative Floats */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-24 h-24 bg-secondary/10 rounded-3xl blur-xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

const Partners = () => {
  const partners = [
    "Ministry of Interior", "Red Cross Kenya", "Islamic Relief",
    "World Bank", "UNDP Kenya", "Equity Bank", "Safaricom"
  ];

  return (
    <section className="py-24 border-y border-border overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 mb-12">Trusted Partners & Collaborators</p>

        <div className="flex flex-wrap justify-center gap-x-16 gap-y-12 items-center opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map((p, i) => (
            <div key={i} className="text-2xl font-black font-outfit text-primary/80 whitespace-nowrap hover:text-primary transition-colors cursor-default">
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  return (
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="space-y-8">
          <h2 className="text-5xl font-black font-outfit text-primary leading-tight">
            Our Nation-Wide <br />
            <span className="text-secondary">Digital Impact</span>
          </h2>
          <p className="text-xl text-foreground/60 leading-relaxed font-medium">
            We are revolutionizing how the Council manages its extensive network, ensuring every mosque, school, and organization is accounted for and supported.
          </p>

          <div className="grid grid-cols-2 gap-8 pt-6">
            {[
              { label: "Active Regions", val: "8" },
              { label: "Certificates Issued", val: "50k+" },
              { label: "Community Projects", val: "200+" },
              { label: "Years of Service", val: "50+" }
            ].map((s, i) => (
              <div key={i} className="space-y-2">
                <p className="text-4xl font-black font-outfit text-primary">{s.val}</p>
                <p className="text-xs font-black uppercase tracking-widest text-foreground/30">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 scale-95 lg:scale-100">
          <div className="space-y-6 pt-12">
            <div className="h-64 rounded-[40px] bg-primary overflow-hidden relative">
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm m-4 rounded-[32px] flex items-center justify-center p-6 text-white font-bold text-center">
                Digital Transparency
              </div>
            </div>
            <div className="h-80 rounded-[40px] bg-secondary/20 border border-secondary/20 overflow-hidden" />
          </div>
          <div className="space-y-6">
            <div className="h-80 rounded-[40px] bg-primary/10 border border-primary/20 overflow-hidden" />
            <div className="h-64 rounded-[40px] bg-primary/5 border border-primary/10 overflow-hidden" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Organization Hub",
      desc: "Centralized management for all Muslim organizations across the 47 counties.",
      color: "bg-blue-500"
    },
    {
      icon: FileCheck,
      title: "Halal Certification",
      desc: "Streamlined process for halal accreditation with transparent status tracking.",
      color: "bg-green-500"
    },
    {
      icon: Award,
      title: "Education & Welfare",
      desc: "Connecting communities with educational resources and social support systems.",
      color: "bg-amber-500"
    }
  ];

  return (
    <section className="py-32 px-6 bg-primary/[0.02]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-6 mb-24">
          <h2 className="text-5xl lg:text-6xl font-black font-outfit text-primary">Core Ecosystem</h2>
          <p className="text-foreground/50 max-w-2xl mx-auto text-xl font-medium">
            Building a robust digital infrastructure to serve the needs of millions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-12 rounded-[48px] bg-white border border-border/50 hover:border-primary/20 shadow-xl shadow-black/[0.02] hover:shadow-primary/10 transition-all group"
            >
              <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center mb-10 bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 group-hover:rotate-6")}>
                <f.icon size={40} strokeWidth={1.5} />
              </div>
              <h3 className="text-3xl font-black mb-6 font-outfit text-primary">{f.title}</h3>
              <p className="text-foreground/50 leading-relaxed text-lg font-medium">{f.desc}</p>
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
      <StatsSection />
      <Features />

      {/* Modern CTA */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto relative group">
          <div className="absolute inset-0 bg-primary rounded-[60px] translate-x-3 translate-y-3 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          <div className="relative bg-[#0F172A] rounded-[60px] p-16 lg:p-24 overflow-hidden border border-white/10">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 max-w-3xl space-y-10">
              <h2 className="text-5xl lg:text-7xl font-black font-outfit text-white leading-[0.95]">
                Digital Transformation <br />
                <span className="text-secondary italic">Starts Here</span>
              </h2>
              <p className="text-2xl text-white/50 leading-relaxed font-medium">
                Join thousands of organizations already part of the SUPKEM digital ecosystem. Secure your registration today.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link
                  href="/register"
                  className="px-12 py-6 bg-primary text-white rounded-[24px] font-black text-xl hover:bg-white hover:text-primary transition-all shadow-2xl flex items-center gap-4"
                >
                  Register Now <ArrowRight size={24} />
                </Link>
                <Link
                  href="/portal"
                  className="px-12 py-6 bg-white/5 border border-white/10 text-white rounded-[24px] font-black text-xl hover:bg-white/10 transition-all flex items-center gap-4"
                >
                  Portal Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
