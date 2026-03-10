"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FilePlus,
  Search,
  Building2,
  Layout,
  CheckCircle2,
  Loader2,
  ArrowRight,
  User,
  MapPin,
  Calendar,
  Heart,
  Users,
  Info,
  Gift,
} from "lucide-react";

export default function SubmitApplication() {
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    organization: "",
    service: "",
    comments: "",
    marriage_details: {
      date_of_marriage: "",
      husband_name: "",
      husband_id_passport: "",
      husband_age: "",
      husband_marital_status: "First Marriage",
      husband_occupation: "",
      husband_residence_county: "",
      husband_residence_sub_county: "",
      wife_name: "",
      wife_id_passport: "",
      wife_age: "",
      wife_marital_status: "Virgin",
      wife_occupation: "",
      wife_residence_county: "",
      wife_residence_sub_county: "",
      wife_waliyy_name: "",
      wife_waliyy_relationship: "",
      agreed_mahr: "",
      paid_mahr_and_deferred: "",
      particulars_of_gifts: "",
      place_of_marriage: "",
      county_of_marriage: "",
      witness_1_name: "",
      witness_1_id: "",
      witness_2_name: "",
      witness_2_id: "",
    },
  });
  const [step, setStep] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [orgRes, servRes] = await Promise.all([
          api.get("/organizations/organizations/"),
          api.get("/services/services/"),
        ]);
        setOrganizations(orgRes.data.results || orgRes.data);
        setServices(servRes.data.results || servRes.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
  }, []);

  const selectedService = services.find(
    (s: any) => s.id === formData.service,
  ) as any;
  const isOrganizationRequired =
    selectedService?.target_audience === "Organization";
  const isIndividualService = selectedService?.target_audience === "Individual";
  const isMarriageService = selectedService?.category === "Marriage";

  const updateMarriageData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      marriage_details: {
        ...prev.marriage_details,
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        organization: formData.organization || null,
        marriage_details: isMarriageService ? formData.marriage_details : null,
      };
      await api.post("/applications/applications/", payload);
      router.push("/portal");
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
        <div className="space-y-2">
          <h1 className="text-4xl font-black font-outfit text-primary tracking-tight">
            New Application
          </h1>
          <p className="text-foreground/50 font-medium">
            Select a service and provide details to start your submission.
          </p>
        </div>
        {isMarriageService && (
          <div className="flex items-center gap-2 bg-primary/5 p-2 px-4 rounded-2xl border border-primary/10">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  step === s
                    ? "bg-primary text-white scale-110 shadow-lg"
                    : step > s
                      ? "bg-green-500 text-white"
                      : "bg-white text-slate-400 border border-slate-200",
                )}
              >
                {step > s ? "✓" : s}
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-10">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
              >
                <div className="flex items-center gap-3 text-primary">
                  <div className="w-12 h-12 rounded-[22px] bg-primary/10 flex items-center justify-center border border-primary/10">
                    <Layout size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black font-outfit">
                      Select Service
                    </h3>
                    <p className="text-xs text-foreground/30 font-bold uppercase tracking-widest">
                      What would you like to apply for?
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service: any) => (
                    <label
                      key={service.id}
                      className={cn(
                        "p-6 rounded-[32px] border-2 cursor-pointer transition-all flex flex-col gap-4 group relative overflow-hidden",
                        formData.service === service.id
                          ? "border-primary bg-primary/[0.03] shadow-2xl shadow-primary/10"
                          : "border-slate-100 hover:border-primary/20 bg-white",
                      )}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={service.id}
                        className="hidden"
                        onChange={() => {
                          setFormData({
                            ...formData,
                            service: service.id,
                            organization:
                              service.target_audience === "Individual"
                                ? ""
                                : formData.organization,
                          });
                        }}
                      />
                      <div className="flex items-center justify-between">
                        <div
                          className={cn(
                            "w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-slate-50",
                            formData.service === service.id
                              ? "bg-primary text-white shadow-lg shadow-primary/30 rotate-6"
                              : "text-slate-400 group-hover:text-primary group-hover:bg-primary/5",
                          )}
                        >
                          <FilePlus size={24} />
                        </div>
                        <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black px-4 shadow-sm border border-emerald-100">
                          {service.fee > 0 ? `KES ${Number(service.fee).toLocaleString()}` : "FREE"}
                        </span>
                      </div>
                      <div>
                        <p
                          className={cn(
                            "font-black text-xl transition-colors",
                            formData.service === service.id
                              ? "text-primary"
                              : "text-slate-700",
                          )}
                        >
                          {service.name}
                        </p>
                        <p className="text-slate-400 text-sm mt-2 font-medium line-clamp-2 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-lg">
                          {service.category}
                        </span>
                        <span
                          className={cn(
                            "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border",
                            service.target_audience === "Individual"
                              ? "bg-blue-50 text-blue-600 border-blue-100"
                              : "bg-purple-50 text-purple-600 border-purple-100",
                          )}
                        >
                          {service.target_audience}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && isMarriageService && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-12"
              >
                {/* Husband Section */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform">
                      <User size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black font-outfit text-slate-800">Husband's Particulars</h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Details of the Groom</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="Khalfani Athman"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.husband_name}
                        onChange={(e) => updateMarriageData('husband_name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">ID / Passport No.</label>
                      <input
                        type="text"
                        placeholder="ID N.O: 31783475"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.husband_id_passport}
                        onChange={(e) => updateMarriageData('husband_id_passport', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Age</label>
                      <input
                        type="text"
                        placeholder="27 YEARS OLD"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.husband_age}
                        onChange={(e) => updateMarriageData('husband_age', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Marital Status</label>
                      <select
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.husband_marital_status}
                        onChange={(e) => updateMarriageData('husband_marital_status', e.target.value)}
                      >
                        <option>First Marriage</option>
                        <option>Divorced</option>
                        <option>Widower</option>
                        <option>Polygamous</option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Occupation</label>
                      <input
                        type="text"
                        placeholder="ICT OFFICER, MINISTRY OF AGRICULTURE"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.husband_occupation}
                        onChange={(e) => updateMarriageData('husband_occupation', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Residence (County)</label>
                      <input
                        type="text"
                        placeholder="MOMBASA"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.husband_residence_county}
                        onChange={(e) => updateMarriageData('husband_residence_county', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Residence (Sub-County)</label>
                      <input
                        type="text"
                        placeholder="CHANGAMWE"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.husband_residence_sub_county}
                        onChange={(e) => updateMarriageData('husband_residence_sub_county', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Wife Section */}
                <div className="space-y-8 pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 group-hover:scale-110 transition-transform">
                      <Heart size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black font-outfit text-slate-800">Wife's Particulars</h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Details of the Bride</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="Riziki Mohamed"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.wife_name}
                        onChange={(e) => updateMarriageData('wife_name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">ID / Passport No.</label>
                      <input
                        type="text"
                        placeholder="ID NO: 32288080"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.wife_id_passport}
                        onChange={(e) => updateMarriageData('wife_id_passport', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Age</label>
                      <input
                        type="text"
                        placeholder="29 YEARS OLD"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.wife_age}
                        onChange={(e) => updateMarriageData('wife_age', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Marital Status</label>
                      <select
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.wife_marital_status}
                        onChange={(e) => updateMarriageData('wife_marital_status', e.target.value)}
                      >
                        <option>Virgin</option>
                        <option>Divorced</option>
                        <option>Widow</option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Occupation</label>
                      <input
                        type="text"
                        placeholder="A CAKE BAKER"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.wife_occupation}
                        onChange={(e) => updateMarriageData('wife_occupation', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Residence (County)</label>
                      <input
                        type="text"
                        placeholder="MOMBASA"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.wife_residence_county}
                        onChange={(e) => updateMarriageData('wife_residence_county', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Residence (Sub-County)</label>
                      <input
                        type="text"
                        placeholder="KISAUNI"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.wife_residence_sub_county}
                        onChange={(e) => updateMarriageData('wife_residence_sub_county', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && isMarriageService && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-12"
              >
                {/* Waliyy & Mahr Section */}
                <div className="space-y-8">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
                      <Gift size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black font-outfit text-slate-800">Financials & Guardianship</h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Waliyy and Mahr Information</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Waliyy Name</label>
                      <input
                        type="text"
                        placeholder="HASSAN MOHAMED GAMUMU"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.wife_waliyy_name}
                        onChange={(e) => updateMarriageData('wife_waliyy_name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Relationship to Wife</label>
                      <input
                        type="text"
                        placeholder="HER BROTHER"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.wife_waliyy_relationship}
                        onChange={(e) => updateMarriageData('wife_waliyy_relationship', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Agreed Mahr</label>
                      <input
                        type="text"
                        placeholder="A SET OF GOLD WORTH KSHS. 75,000/="
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.agreed_mahr}
                        onChange={(e) => updateMarriageData('agreed_mahr', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Paid / Deferred Status</label>
                      <input
                        type="text"
                        placeholder="DEFERRED"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.paid_mahr_and_deferred}
                        onChange={(e) => updateMarriageData('paid_mahr_and_deferred', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Particulars of Gifts (if any)</label>
                      <textarea
                        rows={2}
                        placeholder="KSHS. 20,000/= PAID"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.particulars_of_gifts}
                        onChange={(e) => updateMarriageData('particulars_of_gifts', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Event & Witnesses Section */}
                <div className="space-y-8 pt-8 border-t border-slate-100">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black font-outfit text-slate-800">Contract Location & Witnesses</h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Where and who witnessed</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Date of Marriage</label>
                      <input
                        type="date"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.date_of_marriage}
                        onChange={(e) => updateMarriageData('date_of_marriage', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Place of Marriage</label>
                      <input
                        type="text"
                        placeholder="MASJID NOOR, KIDARAJANI, BAMBURI"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.place_of_marriage}
                        onChange={(e) => updateMarriageData('place_of_marriage', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">County</label>
                      <input
                        type="text"
                        placeholder="MOMBASA"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.county_of_marriage}
                        onChange={(e) => updateMarriageData('county_of_marriage', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Witness 1 Name</label>
                      <input
                        type="text"
                        placeholder="SEIF MOHAMED MAKUTA"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.witness_1_name}
                        onChange={(e) => updateMarriageData('witness_1_name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Witness 1 ID No.</label>
                      <input
                        type="text"
                        placeholder="29653490"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.witness_1_id}
                        onChange={(e) => updateMarriageData('witness_1_id', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Witness 2 Name</label>
                      <input
                        type="text"
                        placeholder="HAMAD MOHAMMED"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.witness_2_name}
                        onChange={(e) => updateMarriageData('witness_2_name', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Witness 2 ID No.</label>
                      <input
                        type="text"
                        placeholder="28869113"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.marriage_details.witness_2_id}
                        onChange={(e) => updateMarriageData('witness_2_id', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Selection Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-6">
              <div
                className={cn(
                  "p-8 rounded-[40px] bg-white border border-border shadow-xl shadow-slate-200/50 space-y-6",
                  isIndividualService && "pointer-events-none opacity-40",
                )}
              >
                <div className="flex items-center gap-3 text-primary">
                  <Building2 size={24} className="opacity-50" />
                  <h3 className="text-xl font-black font-outfit">Applying Entity</h3>
                </div>
                {isIndividualService ? (
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex gap-3">
                    <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-700/70 font-bold leading-relaxed">
                      INDIVIDUAL SERVICE<br />
                      This application will be filed under your personal profile.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {organizations.map((org: any) => (
                      <label
                        key={org.id}
                        className={cn(
                          "p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between group",
                          formData.organization === org.id
                            ? "border-primary bg-primary/[0.03] shadow-lg shadow-primary/5"
                            : "border-slate-50 hover:border-primary/20 bg-slate-50 border-transparent",
                        )}
                      >
                        <input
                          type="radio"
                          name="organization"
                          value={org.id}
                          className="hidden"
                          onChange={() => setFormData({ ...formData, organization: org.id })}
                        />
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center transition-all bg-white",
                            formData.organization === org.id ? "bg-primary text-white" : "text-slate-400"
                          )}>
                            <Building2 size={20} />
                          </div>
                          <div>
                            <p className={cn(
                              "font-bold text-sm transition-colors",
                              formData.organization === org.id ? "text-primary" : "text-slate-700"
                            )}>{org.name}</p>
                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{org.type}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                    {organizations.length === 0 && (
                      <Link
                        href="/portal/organizations/new"
                        className="p-8 rounded-3xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-3 text-center text-foreground/40 hover:text-primary hover:border-primary/40 transition-all font-bold bg-slate-50/30"
                      >
                        <FilePlus size={24} />
                        <span className="text-xs">Register Organization</span>
                      </Link>
                    )}
                  </div>
                )}
              </div>

              {/* Summary Card */}
              {selectedService && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-8 rounded-[40px] bg-slate-900 text-white shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                  <h4 className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">Application Summary</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-white/10 pb-4">
                      <div>
                        <p className="text-xs text-white/40 mb-1 font-bold">Service</p>
                        <p className="font-black font-outfit text-lg">{selectedService.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/40 mb-1 font-bold">Fee</p>
                        <p className="font-black text-amber-400">
                          {selectedService.fee > 0 ? `KES ${Number(selectedService.fee).toLocaleString()}` : "FREE"}
                        </p>
                      </div>
                    </div>
                    {isMarriageService && (
                      <div className="pt-2">
                        <p className="text-xs text-white/40 mb-2 font-bold uppercase tracking-widest italic">Compliance Check</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Shariah Valid Profile
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Kenyan Law Registry
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-10 flex items-center justify-between gap-6 border-t border-border">
          <Link
            href="/portal"
            className="text-slate-400 font-bold hover:text-primary transition-colors flex items-center gap-2"
          >
            Cancel Application
          </Link>
          <div className="flex items-center gap-4">
            {isMarriageService && step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-8 py-4 bg-white border border-border text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all font-outfit"
              >
                Back
              </button>
            )}

            {(isMarriageService && step < 3) ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-10 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-3 font-outfit"
              >
                Next Step <ArrowRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={
                  loading ||
                  !formData.service ||
                  (isOrganizationRequired && !formData.organization)
                }
                className="px-12 py-5 bg-primary text-white rounded-[28px] font-black text-xl shadow-2xl shadow-primary/30 flex items-center gap-3 disabled:opacity-30 disabled:pointer-events-none hover:scale-105 transition-all font-outfit"
              >
                {loading ? <Loader2 className="animate-spin" /> : <>Complete Submission <ArrowRight size={22} /></>}
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
