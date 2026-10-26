"use client";

import { useState, useEffect } from "react";
import api from "@/lib/api";
import { useRouter } from "@/i18n/routing";
import { scrollToFirstError } from "@/app/[locale]/(dashboard)/portal/applications/new/_utils/formScrollUtils";
import { toast } from "sonner";
import { fetchAllPages } from "../_utils/fetchHelpers";
import { validateOrgForm } from "../_utils/validation";

export function useOrgRegistrationLogic() {
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
    api.get("/locations/regions/")
      .then((res) => setRegions(res.data.results || res.data))
      .catch((err) => console.error("Failed to fetch regions", err));
  }, []);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleRegionChange = async (e: any) => {
    const regionId = e.target.value;
    setFormData((prev) => ({ ...prev, region: regionId, county_council: "" }));
    if (errors.region || errors.county_council) {
      setErrors((prev) => {
        const { region, county_council, ...rest } = prev;
        return rest;
      });
    }
    try {
      const all = await fetchAllPages(`/locations/county-councils/?region=${regionId}`, (url) => api.get(url));
      setCouncils(all);
    } catch (err) {
      console.error("Failed to fetch councils", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateOrgForm(formData, setErrors)) return;
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
          serverErrors[key] = Array.isArray(err.response.data[key]) ? err.response.data[key][0] : String(err.response.data[key]);
        });
        setErrors(serverErrors);
        scrollToFirstError(serverErrors, { customMessage: "Server validation error returned" });
      } else {
        toast.error(err.response?.data?.detail || "Institution registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, regions, councils, errors, formData, handleChange, handleRegionChange, handleSubmit };
}
