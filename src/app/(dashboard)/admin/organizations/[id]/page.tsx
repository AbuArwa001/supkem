"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Users,
  FileText,
  Award,
  MapPin,
  Globe,
  Mail,
  Phone,
  LayoutDashboard,
  ExternalLink,
  Loader2,
  Calendar,
  ChevronRight,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import Link from "next/link";

export default function OrganizationDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [org, setOrg] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrg = async () => {
      try {
        const res = await api.get(`/organizations/organizations/${id}/`);
        setOrg(res.data);
      } catch (err) {
        console.error("Failed to fetch organization", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrg();
  }, [id]);

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );

  if (!org) return <div>Organization not found</div>;

  return (
    <div className="space-y-12 pb-20">
      <div className="flex items-center gap-6">
        <button
          onClick={() => router.back()}
          className="p-3 bg-white border border-border rounded-2xl hover:bg-primary hover:text-white transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-outfit text-primary">
            {org.name}
          </h1>
          <p className="text-foreground/40 font-medium">
            Organization Registry Profile • ID: #{org.id}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Core Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 rounded-[24px] bg-white border border-border shadow-sm space-y-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="flex items-center gap-6 relative z-10">
              <div className="w-20 h-20 bg-primary/5 text-primary rounded-3xl flex items-center justify-center border border-primary/10 shadow-lg shadow-primary/5">
                <Building2 size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-outfit text-primary mb-1">
                  Entity Details
                </h3>
                <span className="px-3 py-1 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-[10px] font-black uppercase tracking-widest">
                  {org.type}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              <div className="space-y-2 p-6 rounded-3xl bg-primary/[0.02] border border-primary/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">
                  Reg No.
                </p>
                <p
                  className="text-lg font-bold text-primary truncate"
                  title={org.reg_number}
                >
                  {org.reg_number}
                </p>
              </div>
              <div className="space-y-2 p-6 rounded-3xl bg-primary/[0.02] border border-primary/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">
                  PIN No.
                </p>
                <p
                  className="text-lg font-bold text-primary truncate"
                  title={org.pin_number}
                >
                  {org.pin_number}
                </p>
              </div>
              <div className="space-y-2 p-6 rounded-3xl bg-primary/[0.02] border border-primary/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">
                  Location
                </p>
                <p className="text-lg font-bold text-primary flex items-center gap-2 truncate">
                  <MapPin size={16} /> {org.county_council_name}
                </p>
              </div>
              <div className="space-y-2 p-6 rounded-3xl bg-primary/[0.02] border border-primary/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">
                  GPS Location
                </p>
                <p className="text-lg font-bold text-primary truncate">
                  {org.gps_location || "N/A"}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-bold text-primary border-l-4 border-secondary pl-4">
                Digital Presence
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-white hover:border-primary/20 transition-all group">
                  <Globe
                    size={20}
                    className="text-primary/30 group-hover:text-primary"
                  />
                  <span className="text-sm font-semibold text-foreground/60">
                    www.{org.name.toLowerCase().replace(/\s/g, "")}.org
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-white hover:border-primary/20 transition-all group">
                  <Mail
                    size={20}
                    className="text-primary/30 group-hover:text-primary"
                  />
                  <span className="text-sm font-semibold text-foreground/60">
                    contact@{org.name.toLowerCase().replace(/\s/g, "")}.org
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Records Tabs */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-outfit text-primary">
              Associated Records
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-[20px] bg-white border border-border shadow-sm flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                    <FileText size={24} />
                  </div>
                  <span className="font-bold text-primary">
                    05 Pending Apps
                  </span>
                </div>
                <ChevronRight
                  size={20}
                  className="text-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all"
                />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-8 rounded-[20px] bg-white border border-border shadow-sm flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center">
                    <Award size={24} />
                  </div>
                  <span className="font-bold text-primary">
                    02 Active Certs
                  </span>
                </div>
                <ChevronRight
                  size={20}
                  className="text-foreground/20 group-hover:text-primary group-hover:translate-x-1 transition-all"
                />
              </motion.div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="p-8 rounded-[20px] bg-white border border-border shadow-sm space-y-8 overflow-hidden relative">
            <div className="flex items-center gap-3">
              <Users size={20} className="text-primary" />
              <h4 className="font-bold text-primary">Assigned Personnel</h4>
            </div>

            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-primary/[0.02] transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center font-bold text-secondary">
                    {i === 1 ? "A" : "M"}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary">
                      {i === 1 ? "Ahmed Omar" : "Mustafa Ali"}
                    </p>
                    <p className="text-xs text-foreground/40 font-medium">
                      {i === 1 ? "Main Representative" : "Agent"}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full py-4 bg-primary/[0.03] text-primary rounded-2xl font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2">
              Add User Access <User size={16} />
            </button>
          </div>

          <div className="p-8 rounded-[20px] premium-gradient text-white shadow-2xl shadow-primary/20 space-y-6">
            <h4 className="font-bold text-lg flex items-center gap-2">
              <LayoutDashboard size={18} /> Administrative Actions
            </h4>
            <p className="text-sm text-white/70 font-medium">
              Issue manual certification or suspend this entity's access to the
              SUPKEM portal.
            </p>
            <div className="space-y-4 pt-4">
              <button className="w-full py-4 bg-white text-primary rounded-2xl font-bold text-sm hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/10">
                Issue Certificate <Award size={18} />
              </button>
              <button className="w-full py-4 bg-red-600/20 text-white border border-white/20 rounded-2xl font-bold text-sm hover:bg-red-600 hover:border-red-600 transition-all flex items-center justify-center gap-2">
                Suspend Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
