import { useState, useEffect, useMemo } from "react";
import api from "@/lib/api";

export function useDashboardData() {
  const [applications, setApplications] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsRes, certsRes] = await Promise.all([
          api.get("/applications/applications/"),
          api.get("/applications/certifications/"),
        ]);

        const normalize = (res: any) =>
          Array.isArray(res?.data) ? res.data : (res?.data?.results || []);

        setApplications(normalize(appsRes));
        setCertificates(normalize(certsRes));
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const { lettersDocs, certsDocs, activeApps } = useMemo(() => {
    const keywords = ["hajj", "umrah", "study", "abroad", "visa", "travel"];

    const letters = (certificates || []).filter((c: any) => {
      const s = c?.application_detail?.service_name?.toLowerCase() || "";
      return keywords.some((kw) => s.includes(kw));
    });

    const certs = (certificates || []).filter((c: any) => {
      const s = c?.application_detail?.service_name?.toLowerCase() || "";
      return !keywords.some((kw) => s.includes(kw));
    });

    const active = (applications || []).filter(
      (app) => app && !["Approved", "Rejected"].includes(app.status)
    );

    return { lettersDocs: letters, certsDocs: certs, activeApps: active };
  }, [applications, certificates]);

  return { lettersDocs, certsDocs, activeApps, loading };
}
