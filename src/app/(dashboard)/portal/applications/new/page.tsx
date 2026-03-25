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
  GraduationCap,
  Plane,
  Briefcase,
  Compass,
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
    pilgrim_details: {
      full_name: "",
      passport_number: "",
      nationality: "",
      date_of_birth: "",
      gender: "Male",
      trip_type: "Hajj",
      expected_travel_date: "",
      travel_agent_name: "",
      guidance_requested: false,
    },
    education_details: {
      full_name: "",
      passport_number: "",
      institution_name: "",
      course_of_study: "",
      country: "",
      scholarship_details: "",
    },
    travel_visa_details: {
      full_name: "",
      passport_number: "",
      destination_country: "",
      trip_purpose: "Religious",
      expected_travel_date: "",
    },
    employment_details: {
      full_name: "",
      id_number: "",
      position_applied_for: "",
      employer_name: "",
    }
  });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
  const isHajjUmrahService = selectedService?.category?.toLowerCase().includes("hajj") ||
    selectedService?.name?.toLowerCase().includes("hajj") ||
    selectedService?.category?.toLowerCase().includes("umrah") ||
    selectedService?.name?.toLowerCase().includes("umrah");
  const isEducationService = selectedService?.category?.toLowerCase().includes("education") ||
    selectedService?.name?.toLowerCase().includes("study") ||
    selectedService?.name?.toLowerCase().includes("abroad");
  const isTravelVisaService = selectedService?.category?.toLowerCase().includes("travel") ||
    selectedService?.name?.toLowerCase().includes("visa");
  const isEmploymentService = selectedService?.category?.toLowerCase().includes("employment") ||
    selectedService?.name?.toLowerCase().includes("referral");

  // For Marriage, organization is optional but used as a "Registrar"
  const canSelectOrganization = !isIndividualService || isMarriageService;

  const updateMarriageData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      marriage_details: {
        ...prev.marriage_details,
        [field]: value,
      },
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const updatePilgrimData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      pilgrim_details: {
        ...prev.pilgrim_details,
        [field]: value,
      },
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const updateEducationData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      education_details: {
        ...prev.education_details,
        [field]: value,
      },
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const updateTravelVisaData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      travel_visa_details: {
        ...prev.travel_visa_details,
        [field]: value,
      },
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const updateEmploymentData = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      employment_details: {
        ...prev.employment_details,
        [field]: value,
      },
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.service) newErrors.service = "Please select a service";
      if (isOrganizationRequired && !formData.organization)
        newErrors.organization = "Organization is required for this service";
    }

    if (currentStep === 2) {
      if (isMarriageService) {
        const m = formData.marriage_details;
        if (!m.husband_name) newErrors.husband_name = "Husband's name is required";
        if (!m.husband_id_passport) newErrors.husband_id_passport = "Husband's ID/Passport is required";
        if (!m.husband_age) newErrors.husband_age = "Husband's age is required";
        if (!m.husband_occupation) newErrors.husband_occupation = "Husband's occupation is required";
        if (!m.husband_residence_county) newErrors.husband_residence_county = "County is required";
        if (!m.husband_residence_sub_county) newErrors.husband_residence_sub_county = "Sub-county is required";

        if (!m.wife_name) newErrors.wife_name = "Wife's name is required";
        if (!m.wife_id_passport) newErrors.wife_id_passport = "Wife's ID/Passport is required";
        if (!m.wife_age) newErrors.wife_age = "Wife's age is required";
        if (!m.wife_occupation) newErrors.wife_occupation = "Wife's occupation is required";
        if (!m.wife_residence_county) newErrors.wife_residence_county = "County is required";
        if (!m.wife_residence_sub_county) newErrors.wife_residence_sub_county = "Sub-county is required";
      }

      if (isHajjUmrahService) {
        const p = formData.pilgrim_details;
        if (!p.full_name) newErrors.full_name = "Full name is required";
        if (!p.passport_number) newErrors.passport_number = "Passport number is required";
        if (!p.nationality) newErrors.nationality = "Nationality is required";
        if (!p.date_of_birth) newErrors.date_of_birth = "Date of birth is required";
        if (!p.expected_travel_date) newErrors.expected_travel_date = "Travel date is required";
      }

      if (isEducationService) {
        const e = formData.education_details;
        if (!e.full_name) newErrors.full_name = "Full name is required";
        if (!e.passport_number) newErrors.passport_number = "Passport number is required";
        if (!e.institution_name) newErrors.institution_name = "Institution name is required";
        if (!e.course_of_study) newErrors.course_of_study = "Course is required";
        if (!e.country) newErrors.country = "Country is required";
      }

      if (isTravelVisaService) {
        const t = formData.travel_visa_details;
        if (!t.full_name) newErrors.full_name = "Full name is required";
        if (!t.passport_number) newErrors.passport_number = "Passport number is required";
        if (!t.destination_country) newErrors.destination_country = "Destination is required";
        if (!t.expected_travel_date) newErrors.expected_travel_date = "Travel date is required";
      }

      if (isEmploymentService) {
        const em = formData.employment_details;
        if (!em.full_name) newErrors.full_name = "Full name is required";
        if (!em.id_number) newErrors.id_number = "ID number is required";
        if (!em.position_applied_for) newErrors.position_applied_for = "Position is required";
        if (!em.employer_name) newErrors.employer_name = "Employer name is required";
      }
    }

    if (currentStep === 3 && isMarriageService) {
      const m = formData.marriage_details;
      if (!m.wife_waliyy_name) newErrors.wife_waliyy_name = "Waliyy name is required";
      if (!m.wife_waliyy_relationship) newErrors.wife_waliyy_relationship = "Relationship is required";
      if (!m.agreed_mahr) newErrors.agreed_mahr = "Mahr detail is required";
      if (!m.paid_mahr_and_deferred) newErrors.paid_mahr_and_deferred = "Payment status is required";
      if (!m.date_of_marriage) newErrors.date_of_marriage = "Date is required";
      if (!m.place_of_marriage) newErrors.place_of_marriage = "Place is required";
      if (!m.county_of_marriage) newErrors.county_of_marriage = "County is required";
      if (!m.witness_1_name) newErrors.witness_1_name = "Witness 1 name is required";
      if (!m.witness_1_id) newErrors.witness_1_id = "Witness 1 ID is required";
      if (!m.witness_2_name) newErrors.witness_2_name = "Witness 2 name is required";
      if (!m.witness_2_id) newErrors.witness_2_id = "Witness 2 ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

    setLoading(true);
    try {
      const payload = {
        ...formData,
        organization: formData.organization || null,
        marriage_details: isMarriageService ? formData.marriage_details : null,
        pilgrim_details: isHajjUmrahService ? formData.pilgrim_details : null,
        education_details: isEducationService ? formData.education_details : null,
        travel_visa_details: isTravelVisaService ? formData.travel_visa_details : null,
        employment_details: isEmploymentService ? formData.employment_details : null,
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
        {(isMarriageService || isHajjUmrahService || isEducationService || isTravelVisaService || isEmploymentService) && (
          <div className="flex items-center gap-2 bg-primary/5 p-2 px-4 rounded-2xl border border-primary/10">
            {[1, 2, 3].map((s, idx, arr) => {
              const maxSteps = isMarriageService ? 3 : 2;
              if (idx + 1 > maxSteps) return null;
              return (
                <div
                  key={idx}
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                    step === idx + 1
                      ? "bg-primary text-white scale-110 shadow-lg"
                      : step > idx + 1
                        ? "bg-green-500 text-white"
                        : "bg-white text-slate-400 border border-slate-200",
                  )}
                >
                  {step > idx + 1 ? "✓" : idx + 1}
                </div>
              );
            })}
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
                    {errors.service && (
                      <p className="text-rose-500 text-xs font-bold mt-2 animate-pulse">{errors.service}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service: any) => (
                    <label
                      key={service.id}
                      className={cn(
                        "p-6 rounded-[16px] border-2 cursor-pointer transition-all flex flex-col gap-4 group relative overflow-hidden",
                        formData.service === service.id
                          ? "border-primary bg-primary/[0.03] shadow-2xl shadow-primary/10"
                          : errors.service
                            ? "border-rose-200 bg-rose-50/20 shadow-inner"
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
                          if (errors.service) setErrors(prev => ({ ...prev, service: "" }));
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

            {step === 2 && isHajjUmrahService && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-12"
              >
                <div className="space-y-8">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100 group-hover:scale-110 transition-transform">
                      <Compass size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black font-outfit text-slate-800">Hajj & Umrah Support</h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Pilgrim Particulars</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.full_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.pilgrim_details.full_name}
                        onChange={(e) => updatePilgrimData('full_name', e.target.value)}
                      />
                      {errors.full_name && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.full_name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Passport Number</label>
                      <input
                        type="text"
                        placeholder="Passport No."
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.passport_number ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.pilgrim_details.passport_number}
                        onChange={(e) => updatePilgrimData('passport_number', e.target.value)}
                      />
                      {errors.passport_number && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.passport_number}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Nationality</label>
                      <input
                        type="text"
                        placeholder="Nationality"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.nationality ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.pilgrim_details.nationality}
                        onChange={(e) => updatePilgrimData('nationality', e.target.value)}
                      />
                      {errors.nationality && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.nationality}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Date of Birth</label>
                      <input
                        type="date"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.date_of_birth ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.pilgrim_details.date_of_birth}
                        onChange={(e) => updatePilgrimData('date_of_birth', e.target.value)}
                      />
                      {errors.date_of_birth && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.date_of_birth}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Expected Travel Date</label>
                      <input
                        type="date"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.expected_travel_date ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.pilgrim_details.expected_travel_date}
                        onChange={(e) => updatePilgrimData('expected_travel_date', e.target.value)}
                      />
                      {errors.expected_travel_date && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.expected_travel_date}</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && isEducationService && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-12"
              >
                <div className="space-y-8">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/10">
                      <GraduationCap size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black font-outfit text-slate-800">Educational Endorsement</h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Student Information</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="Student Name"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.full_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.education_details.full_name}
                        onChange={(e) => updateEducationData('full_name', e.target.value)}
                      />
                      {errors.full_name && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.full_name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Passport Number</label>
                      <input
                        type="text"
                        placeholder="Passport No."
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.passport_number ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.education_details.passport_number}
                        onChange={(e) => updateEducationData('passport_number', e.target.value)}
                      />
                      {errors.passport_number && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.passport_number}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Institution Name</label>
                      <input
                        type="text"
                        placeholder="University / College Name"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.institution_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.education_details.institution_name}
                        onChange={(e) => updateEducationData('institution_name', e.target.value)}
                      />
                      {errors.institution_name && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.institution_name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Course of Study</label>
                      <input
                        type="text"
                        placeholder="e.g. Bachelor of Islamic Studies"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.course_of_study ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.education_details.course_of_study}
                        onChange={(e) => updateEducationData('course_of_study', e.target.value)}
                      />
                      {errors.course_of_study && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.course_of_study}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Country</label>
                      <input
                        type="text"
                        placeholder="Destination Country"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.country ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.education_details.country}
                        onChange={(e) => updateEducationData('country', e.target.value)}
                      />
                      {errors.country && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.country}</p>}
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Scholarship Details (Optional)</label>
                      <textarea
                        rows={2}
                        placeholder="Mention any scholarship or specific purpose..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.education_details.scholarship_details}
                        onChange={(e) => updateEducationData('scholarship_details', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && isTravelVisaService && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-12"
              >
                <div className="space-y-8">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/10">
                      <Plane size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black font-outfit text-slate-800">Visa Advisory Support</h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Travel Particulars</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="Traveler Name"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.full_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.travel_visa_details.full_name}
                        onChange={(e) => updateTravelVisaData('full_name', e.target.value)}
                      />
                      {errors.full_name && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.full_name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Passport Number</label>
                      <input
                        type="text"
                        placeholder="Passport No."
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.passport_number ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.travel_visa_details.passport_number}
                        onChange={(e) => updateTravelVisaData('passport_number', e.target.value)}
                      />
                      {errors.passport_number && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.passport_number}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Destination Country</label>
                      <input
                        type="text"
                        placeholder="e.g. Saudi Arabia, Egypt, Turkey"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.destination_country ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.travel_visa_details.destination_country}
                        onChange={(e) => updateTravelVisaData('destination_country', e.target.value)}
                      />
                      {errors.destination_country && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.destination_country}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Trip Purpose</label>
                      <select
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm"
                        value={formData.travel_visa_details.trip_purpose}
                        onChange={(e) => updateTravelVisaData('trip_purpose', e.target.value)}
                      >
                        <option>Religious</option>
                        <option>Educational</option>
                        <option>Business</option>
                        <option>Personal</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Expected Travel Date</label>
                      <input
                        type="date"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.expected_travel_date ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.travel_visa_details.expected_travel_date}
                        onChange={(e) => updateTravelVisaData('expected_travel_date', e.target.value)}
                      />
                      {errors.expected_travel_date && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.expected_travel_date}</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && isEmploymentService && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-12"
              >
                <div className="space-y-8">
                  <div className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/10">
                      <Briefcase size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black font-outfit text-slate-800">Employment Referral</h3>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Candidate Information</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="Full Name"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.full_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.employment_details.full_name}
                        onChange={(e) => updateEmploymentData('full_name', e.target.value)}
                      />
                      {errors.full_name && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.full_name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">ID Number</label>
                      <input
                        type="text"
                        placeholder="ID No."
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.id_number ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.employment_details.id_number}
                        onChange={(e) => updateEmploymentData('id_number', e.target.value)}
                      />
                      {errors.id_number && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.id_number}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Position Applied For</label>
                      <input
                        type="text"
                        placeholder="e.g. Accountant, Teacher"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.position_applied_for ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.employment_details.position_applied_for}
                        onChange={(e) => updateEmploymentData('position_applied_for', e.target.value)}
                      />
                      {errors.position_applied_for && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.position_applied_for}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Potential Employer Name</label>
                      <input
                        type="text"
                        placeholder="Employer Name"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.employer_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.employment_details.employer_name}
                        onChange={(e) => updateEmploymentData('employer_name', e.target.value)}
                      />
                      {errors.employer_name && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.employer_name}</p>}
                    </div>
                  </div>
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
                        placeholder="S"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.husband_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.husband_name}
                        onChange={(e) => updateMarriageData('husband_name', e.target.value)}
                      />
                      {errors.husband_name && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.husband_name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">ID / Passport No.</label>
                      <input
                        type="text"
                        placeholder="ID N.O: 31783475"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.husband_id_passport ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.husband_id_passport}
                        onChange={(e) => updateMarriageData('husband_id_passport', e.target.value)}
                      />
                      {errors.husband_id_passport && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.husband_id_passport}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Age</label>
                      <input
                        type="text"
                        placeholder="27 YEARS OLD"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.husband_age ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.husband_age}
                        onChange={(e) => updateMarriageData('husband_age', e.target.value)}
                      />
                      {errors.husband_age && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.husband_age}</p>}
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
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.husband_occupation ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.husband_occupation}
                        onChange={(e) => updateMarriageData('husband_occupation', e.target.value)}
                      />
                      {errors.husband_occupation && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.husband_occupation}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Residence (County)</label>
                      <input
                        type="text"
                        placeholder="MOMBASA"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.husband_residence_county ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.husband_residence_county}
                        onChange={(e) => updateMarriageData('husband_residence_county', e.target.value)}
                      />
                      {errors.husband_residence_county && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.husband_residence_county}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Residence (Sub-County)</label>
                      <input
                        type="text"
                        placeholder="CHANGAMWE"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.husband_residence_sub_county ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.husband_residence_sub_county}
                        onChange={(e) => updateMarriageData('husband_residence_sub_county', e.target.value)}
                      />
                      {errors.husband_residence_sub_county && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.husband_residence_sub_county}</p>}
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
                        placeholder="Salma Salim"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.wife_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.wife_name}
                        onChange={(e) => updateMarriageData('wife_name', e.target.value)}
                      />
                      {errors.wife_name && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.wife_name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">ID / Passport No.</label>
                      <input
                        type="text"
                        placeholder="ID NO: XXXXXXXX"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.wife_id_passport ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.wife_id_passport}
                        onChange={(e) => updateMarriageData('wife_id_passport', e.target.value)}
                      />
                      {errors.wife_id_passport && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.wife_id_passport}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Age</label>
                      <input
                        type="text"
                        placeholder="29 YEARS OLD"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.wife_age ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.wife_age}
                        onChange={(e) => updateMarriageData('wife_age', e.target.value)}
                      />
                      {errors.wife_age && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.wife_age}</p>}
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
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.wife_occupation ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.wife_occupation}
                        onChange={(e) => updateMarriageData('wife_occupation', e.target.value)}
                      />
                      {errors.wife_occupation && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.wife_occupation}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Residence (County)</label>
                      <input
                        type="text"
                        placeholder="MOMBASA"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.wife_residence_county ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.wife_residence_county}
                        onChange={(e) => updateMarriageData('wife_residence_county', e.target.value)}
                      />
                      {errors.wife_residence_county && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.wife_residence_county}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Residence (Sub-County)</label>
                      <input
                        type="text"
                        placeholder="KISAUNI"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.wife_residence_sub_county ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.wife_residence_sub_county}
                        onChange={(e) => updateMarriageData('wife_residence_sub_county', e.target.value)}
                      />
                      {errors.wife_residence_sub_county && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.wife_residence_sub_county}</p>}
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
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.wife_waliyy_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.wife_waliyy_name}
                        onChange={(e) => updateMarriageData('wife_waliyy_name', e.target.value)}
                      />
                      {errors.wife_waliyy_name && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.wife_waliyy_name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Relationship to Wife</label>
                      <input
                        type="text"
                        placeholder="HER BROTHER"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.wife_waliyy_relationship ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.wife_waliyy_relationship}
                        onChange={(e) => updateMarriageData('wife_waliyy_relationship', e.target.value)}
                      />
                      {errors.wife_waliyy_relationship && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.wife_waliyy_relationship}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Agreed Mahr</label>
                      <input
                        type="text"
                        placeholder="A SET OF GOLD WORTH KSHS. 75,000/="
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.agreed_mahr ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.agreed_mahr}
                        onChange={(e) => updateMarriageData('agreed_mahr', e.target.value)}
                      />
                      {errors.agreed_mahr && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.agreed_mahr}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Paid / Deferred Status</label>
                      <input
                        type="text"
                        placeholder="DEFERRED"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.paid_mahr_and_deferred ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.paid_mahr_and_deferred}
                        onChange={(e) => updateMarriageData('paid_mahr_and_deferred', e.target.value)}
                      />
                      {errors.paid_mahr_and_deferred && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.paid_mahr_and_deferred}</p>}
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
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.date_of_marriage ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.date_of_marriage}
                        onChange={(e) => updateMarriageData('date_of_marriage', e.target.value)}
                      />
                      {errors.date_of_marriage && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.date_of_marriage}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Place of Marriage</label>
                      <input
                        type="text"
                        placeholder="MASJID NOOR, KIDARAJANI, BAMBURI"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.place_of_marriage ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.place_of_marriage}
                        onChange={(e) => updateMarriageData('place_of_marriage', e.target.value)}
                      />
                      {errors.place_of_marriage && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.place_of_marriage}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">County</label>
                      <input
                        type="text"
                        placeholder="MOMBASA"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.county_of_marriage ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.county_of_marriage}
                        onChange={(e) => updateMarriageData('county_of_marriage', e.target.value)}
                      />
                      {errors.county_of_marriage && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.county_of_marriage}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Witness 1 Name</label>
                      <input
                        type="text"
                        placeholder="SEIF MOHAMED MAKUTA"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.witness_1_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.witness_1_name}
                        onChange={(e) => updateMarriageData('witness_1_name', e.target.value)}
                      />
                      {errors.witness_1_name && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.witness_1_name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Witness 1 ID No.</label>
                      <input
                        type="text"
                        placeholder="29653490"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.witness_1_id ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.witness_1_id}
                        onChange={(e) => updateMarriageData('witness_1_id', e.target.value)}
                      />
                      {errors.witness_1_id && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.witness_1_id}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Witness 2 Name</label>
                      <input
                        type="text"
                        placeholder="HAMAD MOHAMMED"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.witness_2_name ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.witness_2_name}
                        onChange={(e) => updateMarriageData('witness_2_name', e.target.value)}
                      />
                      {errors.witness_2_name && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.witness_2_name}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Witness 2 ID No.</label>
                      <input
                        type="text"
                        placeholder="28869113"
                        className={cn(
                          "w-full bg-slate-50 border rounded-2xl px-6 py-4 focus:ring-2 focus:ring-primary focus:bg-white outline-none transition-all font-bold text-slate-700 shadow-sm",
                          errors.witness_2_id ? "border-rose-300 ring-rose-100 ring-4" : "border-slate-200"
                        )}
                        value={formData.marriage_details.witness_2_id}
                        onChange={(e) => updateMarriageData('witness_2_id', e.target.value)}
                      />
                      {errors.witness_2_id && <p className="text-[10px] text-rose-500 font-bold mt-1 ml-1">{errors.witness_2_id}</p>}
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
                  "p-8 rounded-[20px] bg-white border border-border shadow-xl shadow-slate-200/50 space-y-6",
                  !canSelectOrganization && "pointer-events-none opacity-40",
                )}
              >
                <div className="flex items-center gap-3 text-primary">
                  <Building2 size={24} className="opacity-50" />
                  <h3 className="text-xl font-black font-outfit">
                    {isIndividualService ? "Registrar / Mosque" : "Applying Entity"}
                  </h3>
                </div>
                {isIndividualService && !isMarriageService ? (
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex gap-3">
                    <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-700/70 font-bold leading-relaxed">
                      INDIVIDUAL SERVICE<br />
                      This application will be filed under your personal profile.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {organizations.length === 0 ? (
                      <p className="text-xs text-slate-400 font-bold italic p-4 text-center border-2 border-dashed border-slate-100 rounded-2xl">
                        {isIndividualService ? "Searching for accredited Mosques..." : "No organizations found."}
                      </p>
                    ) : (
                      <>
                        {isIndividualService && (
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                            Select a recognized Registrar
                          </p>
                        )}
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
                            </div>
                          </label>
                        ))}
                      </>
                    )}
                    {errors.organization && (
                      <p className="text-rose-500 text-[10px] font-bold mt-2 animate-pulse">{errors.organization}</p>
                    )}
                    {!isIndividualService && organizations.length === 0 && (
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
                  className="mt-6 p-8 rounded-[20px] bg-slate-900 text-white shadow-2xl relative overflow-hidden"
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
                    {isHajjUmrahService && (
                      <div className="pt-2">
                        <p className="text-xs text-white/40 mb-2 font-bold uppercase tracking-widest italic">Sacred Journey</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Visa Support Process
                          </div>
                          <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400" /> Official Endorsement
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
            {(isMarriageService || isHajjUmrahService || isEducationService || isTravelVisaService || isEmploymentService) && step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-8 py-4 bg-white border border-border text-slate-600 rounded-2xl font-bold hover:bg-slate-50 transition-all font-outfit"
              >
                Back
              </button>
            )}

            {((isMarriageService && step < 3) ||
              ((isHajjUmrahService || isEducationService || isTravelVisaService || isEmploymentService) && step < 2)) ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-10 py-4 bg-primary text-white rounded-2xl font-bold hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-3 font-outfit"
              >
                Next Step <ArrowRight size={20} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={loading}
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
