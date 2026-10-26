import { useState, useEffect } from "react";
import { toast } from "sonner";
import { OrganizationDetail } from "../types";
import { fetchRegions, fetchCountyCouncils, updateOrganization } from "../services";

export function useEditOrganizationForm(
    org: OrganizationDetail,
    isOpen: boolean,
    onSuccess: (updatedOrg: OrganizationDetail) => void,
    onClose: () => void
) {
    const [loading, setLoading] = useState(false);
    const [regions, setRegions] = useState<any[]>([]);
    const [councils, setCouncils] = useState<any[]>([]);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const [formData, setFormData] = useState({
        type: org.type || "Mosque", reg_number: org.reg_number || "", pin_number: org.pin_number || "",
        region: org.region_id || "", county_council: org.county_council || "", gps_location: org.gps_location || "",
        phone_number: org.phone_number || "", email: org.email || "", website: org.website || ""
    });

    useEffect(() => {
        if (!isOpen) return;
        let isMounted = true;
        (async () => {
            try {
                const regList = await fetchRegions();
                if (isMounted) setRegions(regList);
                if (org.region_id || org.county_council) {
                    const cList = await fetchCountyCouncils(org.region_id || undefined);
                    if (isMounted) setCouncils(cList);
                }
            } catch (err) { console.error("Failed to load regions/councils", err); }
        })();
        return () => { isMounted = false; };
    }, [isOpen, org.region_id, org.county_council]);

    const handleRegionChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const regionId = e.target.value;
        setFormData((prev) => ({ ...prev, region: regionId, county_council: "" }));
        setErrors((prev) => { const n = { ...prev }; delete n.region; return n; });
        if (regionId) {
            try { setCouncils(await fetchCountyCouncils(regionId)); } catch { setCouncils([]); }
        } else setCouncils([]);
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) setErrors((prev) => { const n = { ...prev }; delete n[field]; return n; });
    };

    const validate = (): boolean => {
        const nErr: Record<string, string> = {};
        if (!formData.reg_number.trim()) nErr.reg_number = "Registration number is required.";
        if (!formData.pin_number.trim()) nErr.pin_number = "KRA PIN is required.";
        if (!formData.county_council) nErr.county_council = "County Council is required.";
        setErrors(nErr);
        return Object.keys(nErr).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        try {
            const payload = {
                type: formData.type, reg_number: formData.reg_number.trim(), pin_number: formData.pin_number.trim(),
                county_council: formData.county_council, gps_location: formData.gps_location.trim(),
                phone_number: formData.phone_number.trim(), email: formData.email.trim(), website: formData.website.trim()
            };
            const updated = await updateOrganization(org.id, payload);
            toast.success("Organization details updated successfully!");
            onSuccess(updated);
            onClose();
        } catch (err: any) {
            if (err.response?.data && typeof err.response.data === "object") {
                const sErr: Record<string, string> = {};
                Object.keys(err.response.data).forEach((k) => { sErr[k] = Array.isArray(err.response.data[k]) ? err.response.data[k][0] : String(err.response.data[k]); });
                setErrors(sErr);
                toast.error("Please resolve the errors highlighted in the form.");
            } else {
                toast.error(err.response?.data?.detail || "Failed to update organization details.");
            }
        } finally { setLoading(false); }
    };

    return { loading, regions, councils, errors, formData, handleRegionChange, handleChange, handleSubmit };
}
