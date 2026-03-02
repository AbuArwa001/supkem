"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Users, FileCheck, Award, ArrowRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-6">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-semibold tracking-wide">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Official SUPKEM CMS Portal
          </div>
          <h1 className="text-6xl lg:text-7xl font-bold font-outfit leading-tight text-primary dark:text-white">
            Uniting the <span className="text-secondary">Ummah</span> <br />
            Through Progress
          </h1>
          <p className="text-xl text-foreground/70 leading-relaxed max-w-xl">
            Streamlining organization registration, halal certification, and social welfare management for a more connected and efficient Muslim community in Kenya.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/register"
              className="px-8 py-4 bg-primary text-white rounded-2xl font-bold flex items-center gap-2 hover-lift premium-gradient text-lg shadow-xl shadow-primary/20"
            >
              Start Application <ArrowRight size={20} />
            </Link>
            <Link
              href="/about"
              className="px-8 py-4 border border-primary/20 rounded-2xl font-bold flex items-center gap-2 hover:bg-primary/5 transition-colors text-lg"
            >
              Learn More
            </Link>
          </div>
          <div className="flex items-center gap-6 pt-8 text-sm text-foreground/60">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-secondary" />
              Secure Registration
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-secondary" />
              Official Certification
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative aspect-square w-full max-w-[500px] mx-auto">
            {/* Replace with generate_image later if needed, for now using stylized divs */}
            <div className="absolute inset-0 bg-primary/20 rounded-[40px] rotate-6 scale-95 blur-sm" />
            <div className="absolute inset-0 bg-white dark:bg-card rounded-[40px] shadow-2xl overflow-hidden border border-border flex flex-col items-center justify-center p-12 text-center group transition-transform hover:scale-105 duration-500">
              <Image src="/logo.svg" alt="SUPKEM Logo" width={120} height={120} className="mb-8 group-hover:scale-110 transition-transform" />
              <h3 className="text-3xl font-bold mb-4 font-outfit">Supreme Council</h3>
              <p className="text-foreground/60 italic font-medium tracking-widest uppercase text-sm">Of Kenya Muslims</p>

              {/* Decorative Lines */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rotate-45 translate-x-16 -translate-y-16" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rotate-45 -translate-x-16 translate-y-16" />
            </div>
          </div>
        </motion.div>
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
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold font-outfit text-primary">Key Services</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto text-lg leading-relaxed">
            Empowering the community through digital excellence and transparent governance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="p-10 rounded-3xl bg-white dark:bg-card border border-border hover-lift group"
            >
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors")}>
                <f.icon size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-outfit">{f.title}</h3>
              <p className="text-foreground/60 leading-relaxed text-lg">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />

      {/* Quick CTA section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto rounded-[40px] premium-gradient p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl" />
          <div className="relative z-10 space-y-8">
            <h2 className="text-4xl lg:text-6xl font-bold font-outfit">Ready to grow with us?</h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Register your organization today and join the largest network of Muslim entities in Kenya.
            </p>
            <div className="pt-6">
              <Link
                href="/register"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary rounded-2xl font-bold text-xl hover:bg-secondary hover:text-white transition-all shadow-xl"
              >
                Get Started Now <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
