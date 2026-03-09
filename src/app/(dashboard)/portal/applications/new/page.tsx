"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FilePlus,
  Search,
  Building2,
  Layout,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SubmitApplication() {
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    organization: "",
    service: "",
    comments: "",
  });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...formData,
        organization: formData.organization || null,
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
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold font-outfit text-primary">
            New Application
          </h1>
          <p className="text-foreground/60 font-medium">
            Select a service and provide details to start your submission.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Service Selection - Left Side */}
          <div className="lg:col-span-3 space-y-6">
            <div className="flex items-center gap-3 text-primary">
              <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Layout size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold font-outfit">
                  Request Service
                </h3>
                <p className="text-xs text-foreground/30 font-bold uppercase tracking-wider">
                  What would you like to apply for?
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {services.length > 0 ? (
                services.map((service: any) => (
                  <label
                    key={service.id}
                    className={cn(
                      "p-6 rounded-[32px] border-2 cursor-pointer transition-all flex items-start gap-4 group relative overflow-hidden",
                      formData.service === service.id
                        ? "border-primary bg-primary/[0.03] shadow-xl shadow-primary/5"
                        : "border-slate-100 hover:border-primary/20 bg-white shadow-sm",
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
                    <div
                      className={cn(
                        "w-10 h-10 rounded-2xl flex items-center justify-center transition-all bg-slate-50",
                        formData.service === service.id
                          ? "bg-primary text-white shadow-lg shadow-primary/30 rotate-12 scale-110"
                          : "text-slate-400 group-hover:text-primary group-hover:bg-primary/5",
                      )}
                    >
                      {formData.service === service.id ? (
                        <CheckCircle2 size={24} />
                      ) : (
                        <FilePlus size={20} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p
                          className={cn(
                            "font-black text-lg transition-colors",
                            formData.service === service.id
                              ? "text-primary"
                              : "text-slate-700",
                          )}
                        >
                          {service.name}
                        </p>
                        <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black px-3">
                          {service.fee > 0 ? `KES ${service.fee}` : "Free"}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm mt-1 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-secondary bg-secondary/10 px-2 py-0.5 rounded-md">
                          {service.category}
                        </span>
                        <span
                          className={cn(
                            "text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border",
                            service.target_audience === "Individual"
                              ? "bg-blue-50 text-blue-600 border-blue-100"
                              : "bg-purple-50 text-purple-600 border-purple-100",
                          )}
                        >
                          For {service.target_audience}s
                        </span>
                      </div>
                    </div>
                  </label>
                ))
              ) : (
                <div className="p-10 border-2 border-dashed border-slate-100 rounded-[32px] flex flex-col items-center justify-center text-slate-300">
                  <Loader2
                    className="animate-spin mb-4 text-primary opacity-20"
                    size={40}
                  />
                  <p className="font-bold text-slate-400">
                    Fetching available services...
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Organization Selection - Right Side */}
          <div className="lg:col-span-2 space-y-4">
            <div
              className={cn(
                "space-y-6 transition-all duration-500",
                isIndividualService
                  ? "opacity-30 grayscale pointer-events-none"
                  : "opacity-100",
              )}
            >
              <div className="flex items-center gap-3 text-primary">
                <Building2 size={24} className="opacity-50" />
                <h3 className="text-xl font-bold font-outfit">
                  Applying Entity
                </h3>
              </div>
              {isIndividualService ? (
                <div className="p-6 rounded-3xl bg-blue-50 border border-blue-100">
                  <p className="text-sm text-blue-700 font-bold">
                    Individual Application
                  </p>
                  <p className="text-xs text-blue-600/70 mt-1 font-medium italic">
                    This service is intended for individuals. You do not need to
                    select an organization.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-foreground/40 font-medium pb-2">
                    Select an organization for this institutional application.
                  </p>
                  <div className="grid grid-cols-1 gap-3">
                    {organizations.length > 0 ? (
                      organizations.map((org: any) => (
                        <label
                          key={org.id}
                          className={cn(
                            "p-6 rounded-[32px] border-2 cursor-pointer transition-all flex items-center justify-between group",
                            formData.organization === org.id
                              ? "border-primary bg-primary/[0.03] shadow-xl shadow-primary/5"
                              : "border-slate-100 hover:border-primary/20 bg-white shadow-sm",
                          )}
                        >
                          <input
                            type="radio"
                            name="organization"
                            value={org.id}
                            className="hidden"
                            onChange={() =>
                              setFormData({ ...formData, organization: org.id })
                            }
                          />
                          <div className="flex items-center gap-4">
                            <div
                              className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-slate-50",
                                formData.organization === org.id
                                  ? "bg-primary text-white shadow-lg shadow-primary/30"
                                  : "text-slate-400 group-hover:text-primary group-hover:bg-primary/5",
                              )}
                            >
                              <Building2 size={24} />
                            </div>
                            <div>
                              <p
                                className={cn(
                                  "font-black text-base transition-colors",
                                  formData.organization === org.id
                                    ? "text-primary"
                                    : "text-slate-700",
                                )}
                              >
                                {org.name}
                              </p>
                              <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">
                                {org.type}
                              </p>
                            </div>
                          </div>
                        </label>
                      ))
                    ) : (
                      <Link
                        href="/portal/organizations/new"
                        className="p-8 rounded-3xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 text-center text-foreground/40 hover:text-primary hover:border-primary/40 transition-all font-bold"
                      >
                        <FilePlus size={32} />
                        Register an Organization
                      </Link>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Comments Section */}
            <div className="space-y-6 pt-10 border-t border-border mt-10">
              <div className="flex items-center gap-3 text-primary">
                <FilePlus size={24} className="opacity-50" />
                <h3 className="text-xl font-bold font-outfit">
                  Additional Details
                </h3>
              </div>
              <textarea
                rows={4}
                value={formData.comments}
                onChange={(e) =>
                  setFormData({ ...formData, comments: e.target.value })
                }
                className="w-full bg-white border border-border rounded-[32px] p-6 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none shadow-sm text-sm"
                placeholder="Provide any additional details..."
              />
            </div>
          </div>
        </div>

        <div className="pt-10 flex items-center justify-between gap-6">
          <Link
            href="/portal"
            className="text-foreground/40 font-bold hover:text-primary transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={
              loading ||
              !formData.service ||
              (isOrganizationRequired && !formData.organization)
            }
            className="px-12 py-5 bg-primary text-white rounded-[24px] font-bold text-xl hover-lift premium-gradient shadow-2xl shadow-primary/30 flex items-center gap-3 disabled:opacity-30 disabled:pointer-events-none"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                Submit Application <ArrowRight size={22} />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
