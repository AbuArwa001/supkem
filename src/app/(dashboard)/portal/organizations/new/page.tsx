"use client";

async function fetchAllPages(url: string, getter: (u: string) => Promise<any>) {
  let results: any[] = [];
  let next: string | null = url;
  while (next) {
    const res = await getter(next);
    const data = res.data;
    results = results.concat(data.results ?? data);
    // DRF's `next` is an absolute URL that already includes the /api/v1 prefix.
    // Passing it directly would double up the axios baseURL prefix.
    // Instead, grab only the query string and graft it onto the original
    // relative path so axios resolves it correctly against its baseURL.
    if (data.next) {
      try {
        const nextSearch = new URL(data.next).search;
        const basePath: string = next.split("?")[0];
        next = basePath + nextSearch;
      } catch {
        next = null;
      }
    } else {
      next = null;
    }
  }
  return results;
}

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  MapPin,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterOrganization() {
  const [loading, setLoading] = useState(false);
  const [regions, setRegions] = useState<any[]>([]);
  const [councils, setCouncils] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    type: "Mosque",
    reg_number: "",
    pin_number: "",
    gps_location: "",
    phone_number: "",
    website: "",
    email: "",
    county_council: "",
    region: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await api.get("/locations/regions/");
        setRegions(res.data.results || res.data);
      } catch (err) {
        console.error("Failed to fetch regions", err);
      }
    };
    fetchLocations();
  }, []);

  const handleRegionChange = async (e: any) => {
    const regionId = e.target.value;
    setFormData((prev) => ({ ...prev, region: regionId, county_council: "" }));
    try {
      const all = await fetchAllPages(
        `/locations/county-councils/?region=${regionId}`,
        (url) => api.get(url),
      );
      setCouncils(all);
    } catch (err) {
      console.error("Failed to fetch councils", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post("/organizations/organizations/", formData);
      router.push("/portal/organizations");
    } catch (err) {
      console.error("Registration failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      <div className="space-y-1">
        <h1 className="text-4xl font-bold font-outfit text-primary">
          Institution Registration
        </h1>
        <p className="text-foreground/60 font-medium">
          Apply for SUPKEM accreditation for your Islamic institution.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-10 rounded-[20px] bg-white border border-border shadow-2xl shadow-primary/5 space-y-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2 space-y-3">
            <label className="text-sm font-bold text-primary/60 ml-1 uppercase tracking-widest">
              Institution Name
            </label>
            <div className="relative group">
              <Building2
                className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors"
                size={20}
              />
              <input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                placeholder="e.g. Al-Noor Educational Center"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-primary/60 ml-1 uppercase tracking-widest">
              Institutional Type
            </label>
            <select
              required
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
              className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 px-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
            >
              <option value="Mosque">Mosque</option>
              <option value="School/College">School/College</option>
              <option value="Hospital/Clinic">Hospital/Clinic</option>
              <option value="NGO/CBO">NGO/CBO</option>
              <option value="Community Group">Community Group</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-primary/60 ml-1 uppercase tracking-widest">
              Registration Number
            </label>
            <input
              required
              value={formData.reg_number}
              onChange={(e) =>
                setFormData({ ...formData, reg_number: e.target.value })
              }
              className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 px-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              placeholder="Govt Reg No."
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-primary/60 ml-1 uppercase tracking-widest">
              KRA PIN Number
            </label>
            <input
              required
              value={formData.pin_number}
              onChange={(e) =>
                setFormData({ ...formData, pin_number: e.target.value })
              }
              className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 px-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              placeholder="PIN NO."
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-primary/60 ml-1 uppercase tracking-widest">
              GPS Location (Optional)
            </label>
            <div className="relative group">
              <MapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors"
                size={20}
              />
              <input
                value={formData.gps_location}
                onChange={(e) =>
                  setFormData({ ...formData, gps_location: e.target.value })
                }
                className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                placeholder="-1.2345, 36.7890"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-primary/60 ml-1 uppercase tracking-widest">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 px-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              placeholder="+254700000000"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-primary/60 ml-1 uppercase tracking-widest">
              Email Address (Optional)
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 px-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              placeholder="contact@institution.org"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-primary/60 ml-1 uppercase tracking-widest">
              Website URL (Optional)
            </label>
            <input
              type="url"
              value={formData.website}
              onChange={(e) =>
                setFormData({ ...formData, website: e.target.value })
              }
              className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 px-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
              placeholder="https://www.institution.org"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-primary/60 ml-1 uppercase tracking-widest">
              Region
            </label>
            <div className="relative group">
              <MapPin
                className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors"
                size={20}
              />
              <select
                required
                value={formData.region}
                onChange={handleRegionChange}
                className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
              >
                <option value="">Select Region</option>
                {regions.map((r: any) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold text-primary/60 ml-1 uppercase tracking-widest">
              County Council
            </label>
            <select
              required
              disabled={!formData.region}
              value={formData.county_council}
              onChange={(e) =>
                setFormData({ ...formData, county_council: e.target.value })
              }
              className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 px-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none cursor-pointer disabled:opacity-50"
            >
              <option value="">Select Council</option>
              {councils.map((c: any) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-primary text-white rounded-[24px] font-bold text-xl hover-lift premium-gradient shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Submit Application <ArrowRight size={22} />
              </>
            )}
          </button>
          <p className="text-center text-xs text-foreground/40 mt-4 font-medium italic">
            By submitting, you agree to the SUPKEM accreditation guidelines and
            ethics.
          </p>
        </div>
      </form>
    </div>
  );
}
