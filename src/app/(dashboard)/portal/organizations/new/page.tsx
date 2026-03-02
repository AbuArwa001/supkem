"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Building2, MapPin, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export default function RegisterOrganization() {
    const [loading, setLoading] = useState(false);
    const [regions, setRegions] = useState([]);
    const [councils, setCouncils] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        type: "Mosque",
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
        setFormData(prev => ({ ...prev, region: regionId, county_council: "" }));
        try {
            const res = await api.get(`/locations/county-councils/?region=${regionId}`);
            setCouncils(res.data.results || res.data);
        } catch (err) {
            console.error("Failed to fetch councils", err);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/organizations/organizations/", formData);
            router.push("/portal");
        } catch (err) {
            console.error("Registration failed", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-10">
            <div className="space-y-1">
                <h1 className="text-4xl font-bold font-outfit text-primary">Register Organization</h1>
                <p className="text-foreground/60 font-medium">Join the SUPKEM network by registering your entity.</p>
            </div>

            <form onSubmit={handleSubmit} className="p-10 rounded-[40px] bg-white border border-border shadow-2xl shadow-primary/5 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-primary/60 ml-1 uppercase tracking-widest">Organization Name</label>
                        <div className="relative group">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" size={20} />
                            <input
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                                placeholder="e.g. Al-Noor Educational Center"
                            />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-primary/60 ml-1 uppercase tracking-widest">Entity Type</label>
                        <select
                            required
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 px-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
                        >
                            <option value="Mosque">Mosque</option>
                            <option value="School">School</option>
                            <option value="Hospital">Hospital</option>
                            <option value="NGO">NGO</option>
                            <option value="Community Group">Community Group</option>
                        </select>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-primary/60 ml-1 uppercase tracking-widest">Region</label>
                        <div className="relative group">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" size={20} />
                            <select
                                required
                                value={formData.region}
                                onChange={handleRegionChange}
                                className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none cursor-pointer"
                            >
                                <option value="">Select Region</option>
                                {regions.map((r: any) => <option key={r.id} value={r.id}>{r.name}</option>)}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-primary/60 ml-1 uppercase tracking-widest">County Council</label>
                        <select
                            required
                            disabled={!formData.region}
                            value={formData.county_council}
                            onChange={(e) => setFormData({ ...formData, county_council: e.target.value })}
                            className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 px-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none cursor-pointer disabled:opacity-50"
                        >
                            <option value="">Select Council</option>
                            {councils.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                </div>

                <div className="pt-8 border-t border-border/50">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-primary text-white rounded-[24px] font-bold text-xl hover-lift premium-gradient shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <>Complete Registration <ArrowRight size={22} /></>}
                    </button>
                </div>
            </form>
        </div>
    );
}
