"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FilePlus, Search, Building2, Layout, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/applications/applications/", formData);
            router.push("/portal");
        } catch (err) {
            console.error("Submission failed", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border">
                <div className="space-y-2">
                    <h1 className="text-4xl font-bold font-outfit text-primary">New Application</h1>
                    <p className="text-foreground/60 font-medium">Select a service and provide details to start your submission.</p>
                </div>
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="w-3 h-3 rounded-full bg-primary/20" />
                    <div className="w-3 h-3 rounded-full bg-primary/20" />
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Organization Selection */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <Building2 size={24} className="opacity-50" />
                            <h3 className="text-xl font-bold font-outfit">Applying Entity</h3>
                        </div>
                        <p className="text-sm text-foreground/40 font-medium pb-2">Select the organization you are representing for this application.</p>
                        <div className="grid grid-cols-1 gap-4">
                            {organizations.map((org: any) => (
                                <label
                                    key={org.id}
                                    className={cn(
                                        "p-6 rounded-3xl border-2 cursor-pointer transition-all flex items-center justify-between group",
                                        formData.organization === org.id
                                            ? "border-primary bg-primary/5 shadow-lg shadow-primary/5"
                                            : "border-border hover:border-primary/20 bg-white"
                                    )}
                                >
                                    <input
                                        type="radio"
                                        name="organization"
                                        value={org.id}
                                        className="hidden"
                                        onChange={() => setFormData({ ...formData, organization: org.id })}
                                    />
                                    <div>
                                        <p className="font-bold text-lg group-hover:text-primary transition-colors">{org.name}</p>
                                        <p className="text-xs text-foreground/40 uppercase font-bold tracking-widest mt-1">{org.type}</p>
                                    </div>
                                    <div className={cn(
                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                        formData.organization === org.id ? "border-primary bg-primary text-white" : "border-border"
                                    )}>
                                        {formData.organization === org.id && <CheckCircle2 size={14} />}
                                    </div>
                                </label>
                            ))}
                            {organizations.length === 0 && (
                                <Link href="/portal/organizations/new" className="p-8 rounded-3xl border-2 border-dashed border-border flex flex-col items-center justify-center gap-4 text-foreground/40 hover:text-primary hover:border-primary/40 transition-all">
                                    <FilePlus size={32} />
                                    <p className="font-bold">Register an Organization First</p>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Service Selection */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <Layout size={24} className="opacity-50" />
                            <h3 className="text-xl font-bold font-outfit">Selected Service</h3>
                        </div>
                        <p className="text-sm text-foreground/40 font-medium pb-2">Choose the SUPKEM service or certification you wish to apply for.</p>
                        <div className="space-y-4">
                            {services.map((service: any) => (
                                <label
                                    key={service.id}
                                    className={cn(
                                        "p-6 rounded-3xl border-2 cursor-pointer transition-all flex items-center justify-between group",
                                        formData.service === service.id
                                            ? "border-primary bg-primary/5 shadow-lg shadow-primary/5"
                                            : "border-border hover:border-primary/20 bg-white"
                                    )}
                                >
                                    <input
                                        type="radio"
                                        name="service"
                                        value={service.id}
                                        className="hidden"
                                        onChange={() => setFormData({ ...formData, service: service.id })}
                                    />
                                    <div>
                                        <p className="font-bold text-lg group-hover:text-primary transition-colors">{service.name}</p>
                                        <p className="text-xs text-secondary font-bold uppercase tracking-widest mt-1">{service.category}</p>
                                    </div>
                                    <div className={cn(
                                        "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                        formData.service === service.id ? "border-primary bg-primary text-white" : "border-border"
                                    )}>
                                        {formData.service === service.id && <CheckCircle2 size={14} />}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="space-y-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-3 text-primary">
                        <FilePlus size={24} className="opacity-50" />
                        <h3 className="text-xl font-bold font-outfit">Additional Comments</h3>
                    </div>
                    <textarea
                        rows={5}
                        value={formData.comments}
                        onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                        className="w-full bg-white border border-border rounded-[32px] p-8 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none shadow-sm text-lg"
                        placeholder="Provide any additional details or requirements for your application..."
                    />
                </div>

                <div className="pt-10 flex items-center justify-between gap-6">
                    <Link href="/portal" className="text-foreground/40 font-bold hover:text-primary transition-colors">Cancel</Link>
                    <button
                        type="submit"
                        disabled={loading || !formData.organization || !formData.service}
                        className="px-12 py-5 bg-primary text-white rounded-[24px] font-bold text-xl hover-lift premium-gradient shadow-2xl shadow-primary/30 flex items-center gap-3 disabled:opacity-30 disabled:pointer-events-none"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>Submit Application <ArrowRight size={22} /></>}
                    </button>
                </div>
            </form>
        </div>
    );
}
