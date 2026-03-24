"use client";

import { motion } from "framer-motion";
import { Shield, Heart, Scale } from "lucide-react";

import { cn } from "@/lib/utils";

const LEADERSHIP_ITEMS = [
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
];

export function LeadershipSection() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 },
  };

  return (
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
          {LEADERSHIP_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.2 }}
              className="p-10 rounded-[20px] border border-border/60 bg-white hover:shadow-2xl hover:shadow-primary/5 transition-all group"
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
  );
}
