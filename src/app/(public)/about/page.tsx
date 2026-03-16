"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Target,
  Heart,
  Award,
  Shield,
  Globe,
  Users,
  ArrowRight,
  BookOpen,
  Handshake,
  MessageSquare,
  Scale,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  return (
    <div className="bg-white">
      {/* Premium Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden py-32 px-6 bg-slate-950">
        <div className="absolute inset-0 z-0">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 15, ease: "linear" }}
            className="relative w-full h-full"
          >
            <Image
              src="/images/slider/olerezo_nb.jpg"
              alt="SUPKEM Heritage"
              fill
              className="object-cover"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-black/80 z-10" />
        </div>

        <div className="max-w-7xl mx-auto relative z-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white text-sm font-bold tracking-tight backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-secondary animate-pulse" />
              Since 1973: Over 50 Years of Impact
            </div>
            <h1 className="text-6xl lg:text-9xl font-black font-outfit text-white tracking-tighter leading-none">
              The Voice of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-white to-amber-300 italic">
                Cohesion
              </span>
            </h1>
            <p className="text-xl lg:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed font-medium italic">
              "The umbrella body of all Muslim organizations, societies, Mosque
              committees and groups in Kenya."
            </p>
          </motion.div>
        </div>
      </section>

      {/* Who We Are - History Section */}
      <section className="py-32 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div {...fadeIn} className="space-y-10">
            <div className="space-y-6">
              <h2 className="text-5xl font-black font-outfit text-primary leading-tight tracking-tight">
                Our Origin Story
              </h2>
              <p className="text-xl text-foreground/70 leading-relaxed font-medium">
                The Supreme Council of Kenya Muslims (SUPKEM) was established in{" "}
                <strong>1973</strong> during a landmark General Conference held
                at <strong>Qur’an House</strong> on Mfangano Street in Nairobi.
              </p>
              <p className="text-lg text-foreground/60 leading-relaxed">
                It was born out of a collective need to unify and coordinate the
                efforts of Kenya’s diverse Muslim organizations, mosques,
                societies and community groups under one umbrella body. At a
                time when the Muslim community faced marginalization and lacked
                a structured platform for representation, SUPKEM emerged and
                continues to act as a voice of leadership, advocacy, and social
                development.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 py-6">
              <div className="p-8 bg-white rounded-3xl shadow-sm border border-border/50">
                <p className="text-4xl font-black text-primary font-outfit mb-1">
                  1973
                </p>
                <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest">
                  Established
                </p>
              </div>
              <div className="p-8 bg-white rounded-3xl shadow-sm border border-border/50">
                <p className="text-4xl font-black text-secondary font-outfit mb-1">
                  47
                </p>
                <p className="text-sm font-bold text-foreground/40 uppercase tracking-widest">
                  Counties Represented
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square relative rounded-[60px] overflow-hidden shadow-2xl">
              <Image
                src="/images/slide31602.jpg"
                alt="SUPKEM Heritage"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-primary/20 mix-blend-multiply" />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Strategic Leadership & Mandate */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <p className="text-sm font-black uppercase tracking-[0.4em] text-secondary">
              Our Purpose
            </p>
            <h2 className="text-5xl lg:text-7xl font-black font-outfit text-primary tracking-tighter">
              Strategic Leadership
            </h2>
            <p className="text-xl text-foreground/60 font-medium">
              Mandated by its constitution, SUPKEM is structured to represent
              the interests of Muslims nationally, promote Islamic values, and
              support the aspirations of its member organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "National Representation",
                desc: "Acting as the primary structured platform for Muslim representation to the Government and international partners.",
                color: "text-blue-600 bg-blue-50",
              },
              {
                icon: Heart,
                title: "Social Development",
                desc: "Actively involved in humanitarian response, health initiatives, and civic education across all 47 counties.",
                color: "text-red-600 bg-red-50",
              },
              {
                icon: Scale,
                title: "Justice & Advocacy",
                desc: "Advocating for the rights of the Muslim community while promoting interfaith harmony and peaceful coexistence.",
                color: "text-emerald-600 bg-emerald-50",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.2 }}
                className="p-10 rounded-[40px] border border-border/60 bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all group"
              >
                <div
                  className={cn(
                    "inline-flex p-5 rounded-3xl mb-8 group-hover:scale-110 transition-transform",
                    item.color,
                  )}
                >
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-black font-outfit text-primary mb-4">
                  {item.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approaches - How We Work */}
      <section className="py-32 px-6 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 transform translate-x-1/2" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div {...fadeIn} className="space-y-12">
              <div className="space-y-6">
                <h2 className="text-5xl lg:text-7xl font-black font-outfit tracking-tighter italic">
                  Strategic <br />
                  Engagement
                </h2>
                <p className="text-xl text-white/70 leading-relaxed">
                  We engage stakeholders through dialogue, partnerships,
                  advocacy, empowerment, and collaboration to advance justice,
                  peace, and development.
                </p>
              </div>
              <div className="space-y-8">
                {[
                  {
                    icon: MessageSquare,
                    title: "Faith-Centered Dialogue",
                    desc: "Open, inclusive approaches to promote mutual understanding and resolve conflicts within and beyond the community.",
                  },
                  {
                    icon: Handshake,
                    title: "Strategic Partnerships",
                    desc: "Building alliances to mobilize resources, unify efforts, and co-create solutions for humanity.",
                  },
                  {
                    icon: Zap,
                    title: "Community Empowerment",
                    desc: "Influencing policy actions through education and capacity building to drive positive change.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-secondary group-hover:border-secondary transition-all duration-500">
                      <item.icon size={24} className="text-white" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xl font-bold font-outfit">
                        {item.title}
                      </h4>
                      <p className="text-white/60 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-12 lg:p-20 rounded-[80px] bg-white/10 border border-white/20 backdrop-blur-3xl space-y-8"
            >
              <h3 className="text-4xl font-black font-outfit leading-tight text-secondary">
                Commitment to Unity
              </h3>
              <p className="text-xl text-white/80 leading-relaxed italic italic font-medium">
                "Through its enduring commitment to unity, justice and service,
                SUPKEM continues to provide moral and spiritual leadership while
                empowering communities across Kenya to confront challenges and
                pursue meaningful change for posterity."
              </p>
              <div className="pt-8 border-t border-white/10 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary">
                  <Image src="/logo.svg" alt="SUPKEM" width={48} height={48} />
                </div>
                <div>
                  <p className="font-bold">The Supreme Council</p>
                  <p className="text-sm text-white/40 uppercase tracking-widest font-bold">
                    Of Kenya Muslims
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Visual Narrative - Impact Gallery */}
      <section id="gallery" className="py-40 px-6">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="space-y-6">
              <p className="text-xs font-black uppercase tracking-[0.4em] text-secondary">
                A Legacy of Service
              </p>
              <h2 className="text-6xl lg:text-8xl font-black font-outfit text-primary tracking-tighter leading-none">
                Impact <span className="italic">Visuals</span>
              </h2>
            </div>
            <p className="text-xl text-foreground/50 max-w-md font-medium">
              Documenting our commitment to the community through leadership,
              dialogue, and grassroots initiatives across decades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[350px]">
            {[
              {
                src: "/images/slider/olesaudib.jpg",
                alt: "Community Leadership",
                span: "lg:col-span-2 lg:row-span-2",
              },
              {
                src: "/images/slider/ole_olesapitb.jpg",
                alt: "Interfaith Dialogue",
                span: "col-span-1",
              },
              {
                src: "/images/slider/olerezo_nb.jpg",
                alt: "Youth Empowerment",
                span: "col-span-1",
              },
              {
                src: "/images/slide31602.jpg",
                alt: "Historical Heritage",
                span: "col-span-1",
              },
              {
                src: "/images/slider/image.png",
                alt: "Advocacy Programs",
                span: "lg:col-span-2",
              },
              {
                src: "/images/slider/oledarknb.jpg",
                alt: "Faith & Unity",
                span: "col-span-1",
              },
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "relative rounded-[32px] overflow-hidden group shadow-xl cursor-pointer bg-slate-100",
                  img.span,
                )}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
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
    </div>
  );
}
