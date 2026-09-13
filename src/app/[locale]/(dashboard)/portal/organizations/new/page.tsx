"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  MapPin,
  CheckCircle2,
  Loader2,
  ArrowRight,
  ShieldCheck,
  FileText,
  Compass,
  Phone,
  Mail,
  Globe,
  ChevronDown,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import { useRouter, Link } from "@/i18n/routing";
import { scrollToFirstError } from "@/app/[locale]/(dashboard)/portal/applications/new/_utils/formScrollUtils";
import { FormErrorBanner } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/ui/FormErrorBanner";
import { toast } from "sonner";

async function fetchAllPages(url: string, getter: (u: string) => Promise<any>) {
  let results: any[] = [];
  let next: string | null = url;
  while (next) {
    const res = await getter(next);
    const data = res.data;
    results = results.concat(data.results ?? data);
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

export default function RegisterOrganization() {
  const [loading, setLoading] = useState(false);
  const [regions, setRegions] = useState<any[]>([]);
  const [councils, setCouncils] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    clearFieldError("region");
    clearFieldError("county_council");
    try {
      const all = await fetchAllPages(
        `/locations/county-councils/?region=${regionId}`,
        (url) => api.get(url)
      );
      setCouncils(all);
    } catch (err) {
      console.error("Failed to fetch councils", err);
    }
  };

  const clearFieldError = (field: string) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    clearFieldError(field);
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Institution name is required.";
    if (!formData.reg_number.trim()) newErrors.reg_number = "Government registration number is required.";
    if (!formData.pin_number.trim()) newErrors.pin_number = "KRA PIN is required.";
    if (!formData.region) newErrors.region = "Please select a jurisdiction region.";
    if (!formData.county_council) newErrors.county_council = "Please select a county council.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      scrollToFirstError(newErrors, {
        customMessage: "Please complete all required institution details",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await api.post("/organizations/organizations/", formData);
      toast.success("Institution registration submitted successfully!");
      router.push("/portal/organizations");
    } catch (err: any) {
      console.error("Registration failed", err);
      if (err.response?.data && typeof err.response.data === "object") {
        const serverErrors: Record<string, string> = {};
        Object.keys(err.response.data).forEach((key) => {
          serverErrors[key] = Array.isArray(err.response.data[key])
            ? err.response.data[key][0]
            : String(err.response.data[key]);
        });
        setErrors(serverErrors);
        scrollToFirstError(serverErrors, {
          customMessage: "Server validation error returned",
        });
      } else {
        const msg = err.response?.data?.detail || "Institution registration failed. Please try again.";
        toast.error(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider">
            <ShieldCheck size={14} className="text-secondary" />
            <span>Accreditation Program</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-outfit text-slate-900 tracking-tight">
            Institution Registration
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium">
            Register your Islamic institution, mosque, or educational center under the Supreme Council of Kenya Muslims.
          </p>
        </div>

        <Link
          href="/portal/organizations"
          className="text-slate-500 hover:text-primary font-bold text-sm transition-colors py-2 self-start md:self-auto"
        >
          &larr; Back to Institutions
        </Link>
      </div>

      {/* Error Alert Banner */}
      <FormErrorBanner errors={errors} />

      <form onSubmit={handleSubmit} noValidate className="space-y-8">
        {/* SECTION 1: Institution Identity */}
        <div className="p-8 rounded-[28px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/15 shadow-xs">
              <Building2 size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black font-outfit text-slate-900">
                1. Institutional Identity
              </h3>
              <p className="text-xs text-slate-400 font-medium">Official name and operational category</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div data-error-field="name" id="field-name" className="space-y-2 md:col-span-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                Institution Name <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className="relative group">
                <Building2
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                    errors.name ? "text-rose-400" : "text-slate-400 group-focus-within:text-primary"
                  }`}
                  size={18}
                />
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className={`w-full bg-slate-50/70 border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs ${
                    errors.name ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"
                  }`}
                  placeholder="e.g. Al-Noor Educational Center &amp; Mosque"
                />
              </div>
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1"
                  >
                    <AlertCircle size={13} /> {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-600">
                Institutional Classification
              </label>
              <div className="relative">
                <select
                  required
                  name="type"
                  value={formData.type}
                  onChange={(e) => handleChange("type", e.target.value)}
                  className="w-full bg-slate-50/70 border border-slate-200/90 rounded-2xl py-4 pl-5 pr-10 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none appearance-none cursor-pointer font-semibold text-slate-800 text-sm shadow-xs"
                >
                  <option value="Mosque">Mosque</option>
                  <option value="School/College">School / College</option>
                  <option value="Hospital/Clinic">Hospital / Clinic</option>
                  <option value="NGO/CBO">NGO / CBO</option>
                  <option value="Community Group">Community Group</option>
                  <option value="Other">Other Community Service</option>
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Legal & Tax Verification */}
        <div className="p-8 rounded-[28px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/80 shadow-xs">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black font-outfit text-slate-900">
                2. Legal &amp; Statutory Identification
              </h3>
              <p className="text-xs text-slate-400 font-medium">Government Registrar &amp; Tax records</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div data-error-field="reg_number" id="field-reg_number" className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                Govt Registration Number <span className="text-rose-500 font-bold">*</span>
              </label>
              <input
                required
                name="reg_number"
                value={formData.reg_number}
                onChange={(e) => handleChange("reg_number", e.target.value)}
                className={`w-full bg-slate-50/70 border rounded-2xl py-4 px-5 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs ${
                  errors.reg_number ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"
                }`}
                placeholder="e.g. REG/12345/2020"
              />
              <AnimatePresence>
                {errors.reg_number && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1"
                  >
                    <AlertCircle size={13} /> {errors.reg_number}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div data-error-field="pin_number" id="field-pin_number" className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                KRA PIN Number <span className="text-rose-500 font-bold">*</span>
              </label>
              <input
                required
                name="pin_number"
                value={formData.pin_number}
                onChange={(e) => handleChange("pin_number", e.target.value)}
                className={`w-full bg-slate-50/70 border rounded-2xl py-4 px-5 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs ${
                  errors.pin_number ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"
                }`}
                placeholder="e.g. P051234567Z"
              />
              <AnimatePresence>
                {errors.pin_number && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1"
                  >
                    <AlertCircle size={13} /> {errors.pin_number}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* SECTION 3: Jurisdiction & Council */}
        <div className="p-8 rounded-[28px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100/80 shadow-xs">
              <Compass size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black font-outfit text-slate-900">
                3. SUPKEM Regional Jurisdiction
              </h3>
              <p className="text-xs text-slate-400 font-medium">Select the administrative territory</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div data-error-field="region" id="field-region" className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                Region <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className="relative">
                <MapPin
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                    errors.region ? "text-rose-400" : "text-slate-400"
                  }`}
                  size={18}
                />
                <select
                  required
                  name="region"
                  value={formData.region}
                  onChange={handleRegionChange}
                  className={`w-full bg-slate-50/70 border rounded-2xl py-4 pl-12 pr-10 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none appearance-none cursor-pointer font-semibold text-slate-800 text-sm shadow-xs ${
                    errors.region ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"
                  }`}
                >
                  <option value="">Select Region</option>
                  {regions.map((r: any) => (
                    <option key={r.id} value={r.id}>
                      {r.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
              <AnimatePresence>
                {errors.region && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1"
                  >
                    <AlertCircle size={13} /> {errors.region}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <div data-error-field="county_council" id="field-county_council" className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                County Council <span className="text-rose-500 font-bold">*</span>
              </label>
              <div className="relative">
                <select
                  required
                  name="county_council"
                  disabled={!formData.region}
                  value={formData.county_council}
                  onChange={(e) => handleChange("county_council", e.target.value)}
                  className={`w-full bg-slate-50/70 border rounded-2xl py-4 pl-5 pr-10 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none appearance-none cursor-pointer font-semibold text-slate-800 text-sm shadow-xs disabled:opacity-50 ${
                    errors.county_council ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"
                  }`}
                >
                  <option value="">
                    {formData.region ? "Select County Council" : "Select Region First"}
                  </option>
                  {councils.map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
              <AnimatePresence>
                {errors.county_council && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1"
                  >
                    <AlertCircle size={13} /> {errors.county_council}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* SECTION 4: Contact & Online Presence */}
        <div className="p-8 rounded-[28px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center border border-purple-100/80 shadow-xs">
              <Phone size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black font-outfit text-slate-900">
                4. Contact &amp; Digital Presence
              </h3>
              <p className="text-xs text-slate-400 font-medium">Communication channels (Optional)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-600">
                Phone Number
              </label>
              <div className="relative group">
                <Phone
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                  size={18}
                />
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={(e) => handleChange("phone_number", e.target.value)}
                  className="w-full bg-slate-50/70 border border-slate-200/90 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs"
                  placeholder="+254 700 000 000"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-600">
                Official Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full bg-slate-50/70 border border-slate-200/90 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs"
                  placeholder="info@institution.org"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-600">
                Website URL
              </label>
              <div className="relative group">
                <Globe
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                  size={18}
                />
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  className="w-full bg-slate-50/70 border border-slate-200/90 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs"
                  placeholder="https://www.institution.org"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-wider text-slate-600">
                GPS Coordinates
              </label>
              <div className="relative group">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                  size={18}
                />
                <input
                  name="gps_location"
                  value={formData.gps_location}
                  onChange={(e) => handleChange("gps_location", e.target.value)}
                  className="w-full bg-slate-50/70 border border-slate-200/90 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs"
                  placeholder="-1.286389, 36.817223"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] hover:bg-right text-white rounded-[24px] font-black text-lg sm:text-xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 flex items-center justify-center gap-3 disabled:opacity-50 transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] cursor-pointer font-outfit"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={22} />
                <span>Submitting Registration...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={22} />
                <span>Submit Accreditation Application</span>
                <ArrowRight size={22} />
              </>
            )}
          </button>
          <p className="text-center text-xs text-slate-400 mt-4 font-medium">
            By submitting, you certify that all information is accurate and adheres to the SUPKEM constitutional accreditation standards.
          </p>
        </div>
      </form>
    </div>
  );
}
