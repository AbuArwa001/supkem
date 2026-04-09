"use client";

import { motion } from "framer-motion";
import {
  Heart,
  FileCheck,
  BookOpen,
  Briefcase,
  MapPin,
  Award,
} from "lucide-react";

const SERVICES = [
  {
    title: "Marriage Registration",
    desc: "Coordination of marriage officers under the Islamic faith.",
    icon: Heart,
  },
  {
    title: "Halal Certification",
    desc: "Regulating and issuing Halal accreditation across Kenya.",
    icon: FileCheck,
  },
  {
    title: "Study Abroad Letters",
    desc: "Support letters for students pursuing education abroad.",
    icon: BookOpen,
  },
  {
    title: "Employment Referral",
    desc: "Referral services for local and international employment.",
    icon: Briefcase,
  },
  {
    title: "Pilgrimage Services",
    desc: "Coordinating Hajj and Umrah missions for Kenyan Muslims.",
    icon: MapPin,
  },
  {
    title: "Membership Accreditation",
    desc: "Recognition for organizations under our umbrella body.",
    icon: Award,
  },
];

export const Services = () => {
  return (
    <section className="py-40 px-6 bg-[#0B211B] relative overflow-hidden">
      <div className="absolute inset-0 mesh-gradient opacity-20" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center space-y-8 mb-32">
          <h2 className="text-6xl lg:text-8xl font-black font-outfit text-white tracking-tighter text-glow">
            Digital Services
          </h2>
          <p className="text-teal-100/60 max-w-2xl mx-auto text-2xl font-medium leading-relaxed">
            Comprehensive digital frameworks designed to empower our community
            with efficiency and speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-12 rounded-[24px] bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl hover:bg-white inset-px hover:border-white transition-all duration-500 group relative"
            >
              <div className="flex flex-col gap-8">
                <div className="w-20 h-20 rounded-3xl bg-primary/20 text-secondary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-700 shadow-xl">
                  <s.icon size={36} strokeWidth={1.5} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-black font-outfit text-white group-hover:text-primary tracking-tight transition-colors duration-500">
                    {s.title}
                  </h3>
                  <p className="text-teal-50/50 group-hover:text-slate-600 font-medium leading-relaxed text-lg transition-colors duration-500">
                    {s.desc}
                  </p>
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
