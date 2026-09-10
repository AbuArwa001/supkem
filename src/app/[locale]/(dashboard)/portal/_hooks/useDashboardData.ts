import { useState, useEffect, useMemo } from "react";
import api from "@/lib/api";

export function useDashboardData() {
  const [applications, setApplications] = useState<any[]>([]);
  const [certsDocs, setCertsDocs] = useState<any[]>([]);
  const [lettersDocs, setLettersDocs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsRes, certsRes, lettersRes] = await Promise.all([
          api.get("/applications/applications/"),
          api.get("/applications/certifications/"),
          api.get("/applications/letters/"),
        ]);

        const normalize = (res: any) =>
          Array.isArray(res?.data) ? res.data : (res?.data?.results || []);

        setApplications(normalize(appsRes));
        setCertsDocs(normalize(certsRes));
        setLettersDocs(normalize(lettersRes));
      } catch (error) {
        console.error("Error fetching dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const activeApps = useMemo(() => {
    return (applications || []).filter(
      (app) => app && !["Approved", "Rejected"].includes(app.status)
    );
  }, [applications]);

  return { lettersDocs, certsDocs, activeApps, loading };
}
