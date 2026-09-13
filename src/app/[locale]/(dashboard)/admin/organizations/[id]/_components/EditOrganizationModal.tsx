"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Building2,
    X,
    Lock,
    MapPin,
    Phone,
    Mail,
    Globe,
    FileText,
    Compass,
    Loader2,
    Save,
    AlertCircle,
    Info
} from "lucide-react";
import { toast } from "sonner";

import { OrganizationDetail } from "./types";
import { fetchRegions, fetchCountyCouncils, updateOrganization } from "./services";

interface EditOrganizationModalProps {
    org: OrganizationDetail;
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (updatedOrg: OrganizationDetail) => void;
}

export function EditOrganizationModal({
    org,
    isOpen,
    onClose,
    onSuccess
}: EditOrganizationModalProps) {
    const [loading, setLoading] = useState(false);
    const [regions, setRegions] = useState<any[]>([]);
    const [councils, setCouncils] = useState<any[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        type: org.type || "Mosque",
        reg_number: org.reg_number || "",
        pin_number: org.pin_number || "",
        region: org.region_id || "",
        county_council: org.county_council || "",
        gps_location: org.gps_location || "",
        phone_number: org.phone_number || "",
        email: org.email || "",
        website: org.website || ""
    });

    useEffect(() => {
        if (!isOpen) return;

        let isMounted = true;
        const initLocations = async () => {
            try {
                const regList = await fetchRegions();
                if (isMounted) setRegions(regList);

                if (org.region_id) {
                    const cList = await fetchCountyCouncils(org.region_id);
                    if (isMounted) setCouncils(cList);
                } else if (org.county_council) {
                    const cList = await fetchCountyCouncils();
                    if (isMounted) setCouncils(cList);
                }
            } catch (err) {
                console.error("Failed to load regions/councils", err);
            }
        };

        initLocations();
        return () => {
            isMounted = false;
        };
    }, [isOpen, org.region_id, org.county_council]);

    const handleRegionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const regionId = e.target.value;
        setFormData(prev => ({ ...prev, region: regionId, county_council: "" }));
        if (errors.region) {
            setErrors(prev => {
                const next = { ...prev };
                delete next.region;
                return next;
            });
        }

        if (regionId) {
            try {
                const cList = await fetchCountyCouncils(regionId);
                setCouncils(cList);
            } catch (err) {
                console.error("Failed to fetch county councils", err);
            }
        } else {
            setCouncils([]);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[field];
                return next;
            });
        }
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.reg_number.trim()) {
            newErrors.reg_number = "Registration number is required.";
        }
        if (!formData.pin_number.trim()) {
            newErrors.pin_number = "KRA PIN is required.";
        }
        if (!formData.county_council) {
            newErrors.county_council = "County Council is required.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const payload: any = {
                type: formData.type,
                reg_number: formData.reg_number.trim(),
                pin_number: formData.pin_number.trim(),
                county_council: formData.county_council,
                gps_location: formData.gps_location.trim(),
                phone_number: formData.phone_number.trim(),
                email: formData.email.trim(),
                website: formData.website.trim()
            };

            const updated = await updateOrganization(org.id, payload);
            toast.success("Organization details updated successfully!");
            onSuccess(updated);
            onClose();
        } catch (err: any) {
            console.error("Failed to update organization", err);
            if (err.response?.data && typeof err.response.data === "object") {
                const serverErrors: Record<string, string> = {};
                Object.keys(err.response.data).forEach(key => {
                    serverErrors[key] = Array.isArray(err.response.data[key])
                        ? err.response.data[key][0]
                        : String(err.response.data[key]);
                });
                setErrors(serverErrors);
                toast.error("Please resolve the errors highlighted in the form.");
            } else {
                const msg = err.response?.data?.detail || "Failed to update organization details.";
                toast.error(msg);
            }
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: 15 }}
                className="bg-white w-full max-w-2xl rounded-[24px] overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]"
            >
                {/* Modal Header */}
                <div className="p-6 sm:p-8 border-b border-border flex items-center justify-between bg-slate-50/70 shrink-0">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center border border-primary/15 shadow-sm">
                            <Building2 size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black font-outfit text-slate-900 tracking-tight">
                                Edit Organization Details
                            </h3>
                            <p className="text-xs font-medium text-slate-500 mt-0.5">
                                Update official statutory and contact information for this entity
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        disabled={loading}
                        className="p-2.5 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm rounded-xl transition-all text-slate-400 hover:text-slate-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Body Form */}
                <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
                    <div className="p-6 sm:p-8 overflow-y-auto space-y-6 custom-scrollbar flex-1">
                        {/* READ-ONLY LOCKED NAME FIELD */}
                        <div className="p-4 rounded-2xl bg-amber-500/[0.06] border border-amber-500/20 space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                                    <Lock size={13} className="text-amber-600" />
                                    Organization Name
                                </label>
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 text-[10px] font-black uppercase tracking-wider">
                                    Locked Field
                                </span>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    disabled
                                    value={org.name}
                                    className="w-full bg-slate-100/80 border border-slate-200 rounded-xl py-3 px-4 font-bold text-slate-700 text-sm cursor-not-allowed opacity-85 select-none"
                                />
                            </div>
                            <p className="text-[11px] text-amber-800/80 font-medium flex items-center gap-1.5 pt-0.5">
                                <Info size={13} className="shrink-0 text-amber-600" />
                                The registered legal name of the entity cannot be changed here. Formal name changes require SUPKEM Secretariat approval.
                            </p>
                        </div>

                        {/* CLASSIFICATION */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-black uppercase tracking-wider text-slate-600">
                                Institutional Classification
                            </label>
                            <select
                                value={formData.type}
                                onChange={(e) => handleChange("type", e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 font-semibold text-slate-800 text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all cursor-pointer"
                            >
                                <option value="Mosque">Mosque</option>
                                <option value="School/College">School / College</option>
                                <option value="Hospital/Clinic">Hospital / Clinic</option>
                                <option value="NGO/CBO">NGO / CBO</option>
                                <option value="Community Group">Community Group</option>
                                <option value="Other">Other Community Service</option>
                            </select>
                        </div>

                        {/* STATUTORY REGISTRATION & PIN */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                                    <FileText size={13} className="text-slate-400" />
                                    Registration No. <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.reg_number}
                                    onChange={(e) => handleChange("reg_number", e.target.value)}
                                    placeholder="e.g. REG/12345/2020"
                                    className={`w-full bg-slate-50 border rounded-xl py-3.5 px-4 font-semibold text-slate-800 text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all ${
                                        errors.reg_number ? "border-rose-400 bg-rose-50/20" : "border-slate-200"
                                    }`}
                                />
                                {errors.reg_number && (
                                    <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                                        <AlertCircle size={12} /> {errors.reg_number}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                                    <FileText size={13} className="text-slate-400" />
                                    KRA PIN No. <span className="text-rose-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.pin_number}
                                    onChange={(e) => handleChange("pin_number", e.target.value.toUpperCase())}
                                    placeholder="e.g. P051234567Z"
                                    className={`w-full bg-slate-50 border rounded-xl py-3.5 px-4 font-mono font-semibold text-slate-800 text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all ${
                                        errors.pin_number ? "border-rose-400 bg-rose-50/20" : "border-slate-200"
                                    }`}
                                />
                                {errors.pin_number && (
                                    <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                                        <AlertCircle size={12} /> {errors.pin_number}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* JURISDICTION / LOCATION */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                                    <Compass size={13} className="text-slate-400" />
                                    Region
                                </label>
                                <select
                                    value={formData.region}
                                    onChange={handleRegionChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 font-semibold text-slate-800 text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all cursor-pointer"
                                >
                                    <option value="">Select Region</option>
                                    {regions.map((r: any) => (
                                        <option key={r.id} value={r.id}>
                                            {r.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                                    <MapPin size={13} className="text-slate-400" />
                                    County Council <span className="text-rose-500">*</span>
                                </label>
                                <select
                                    value={formData.county_council}
                                    onChange={(e) => handleChange("county_council", e.target.value)}
                                    className={`w-full bg-slate-50 border rounded-xl py-3.5 px-4 font-semibold text-slate-800 text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all cursor-pointer ${
                                        errors.county_council ? "border-rose-400 bg-rose-50/20" : "border-slate-200"
                                    }`}
                                >
                                    <option value="">
                                        {councils.length > 0 ? "Select County Council" : "Select Region First"}
                                    </option>
                                    {councils.map((c: any) => (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.county_council && (
                                    <p className="text-xs text-rose-500 font-semibold flex items-center gap-1">
                                        <AlertCircle size={12} /> {errors.county_council}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* DIGITAL PRESENCE & CONTACT */}
                        <div className="space-y-4 pt-2 border-t border-slate-100">
                            <h4 className="text-xs font-black uppercase tracking-wider text-primary flex items-center gap-2">
                                <Phone size={14} className="text-secondary" />
                                Contact & Digital Presence
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                                        <Phone size={13} className="text-slate-400" />
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone_number}
                                        onChange={(e) => handleChange("phone_number", e.target.value)}
                                        placeholder="+254 700 000 000"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 font-semibold text-slate-800 text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                                        <Mail size={13} className="text-slate-400" />
                                        Official Email
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => handleChange("email", e.target.value)}
                                        placeholder="info@institution.org"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 font-semibold text-slate-800 text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                                        <Globe size={13} className="text-slate-400" />
                                        Website
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.website}
                                        onChange={(e) => handleChange("website", e.target.value)}
                                        placeholder="https://www.institution.org"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 font-semibold text-slate-800 text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1">
                                        <MapPin size={13} className="text-slate-400" />
                                        GPS Coordinates
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.gps_location}
                                        onChange={(e) => handleChange("gps_location", e.target.value)}
                                        placeholder="-1.286389, 36.817223"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 font-mono font-semibold text-slate-800 text-sm focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Modal Footer */}
                    <div className="p-6 border-t border-border flex items-center justify-end gap-3 bg-slate-50/70 shrink-0">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-5 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save size={16} />
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
