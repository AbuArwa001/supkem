"use client";

import Image from "next/image";

import { motion } from "framer-motion";

export function HistorySection() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  return (
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
  );
}
