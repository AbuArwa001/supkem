import { useState, useEffect } from "react";
import { certificateService } from "@/app/(dashboard)/admin/certificates/_services/certificateService";
import { Certificate, EligibleApplication } from "@/app/(dashboard)/admin/certificates/_types";

export function useCertificatesLogic() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [eligibleApplications, setEligibleApplications] = useState<EligibleApplication[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingApplications, setIsLoadingApplications] = useState(false);
  const [isIssuing, setIsIssuing] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState("");
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const loadCertificates = async () => {
    const data = await certificateService.fetchCertificates();
    setCertificates(data);
  };

  useEffect(() => {
    loadCertificates();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      const fetchEligible = async () => {
        setIsLoadingApplications(true);
        const data = await certificateService.fetchEligibleApplications();
        setEligibleApplications(data);
        setIsLoadingApplications(false);
      };
      
      fetchEligible();
      setMessage(null);
      setSelectedAppId("");
    }
  }, [isModalOpen]);

  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAppId) return;

    setIsIssuing(true);
    setMessage(null);
    try {
      await certificateService.issueCertificate(selectedAppId);
      setMessage({ type: 'success', text: "Certificate issued successfully!" });
      loadCertificates();
      setTimeout(() => setIsModalOpen(false), 2000);
    } catch (err: any) {
      console.error("Failed to issue certificate", err);
      setMessage({ type: 'error', text: err.response?.data?.detail || "Failed to issue certificate. Please try again." });
    } finally {
      setIsIssuing(false);
    }
  };

  const filteredCerts = certificates.filter((cert) =>
    cert.organization_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const groupedCerts = filteredCerts.reduce((acc: Record<string, Certificate[]>, cert) => {
    const serviceName = cert.application_detail?.service_name || cert.service_name || "Other Certifications";
    if (!acc[serviceName]) {
      acc[serviceName] = [];
    }
    acc[serviceName].push(cert);
    return acc;
  }, {} as Record<string, Certificate[]>);

  return {
    certificates,
    groupedCerts,
    searchTerm,
    setSearchTerm,
    isModalOpen,
    setIsModalOpen,
    eligibleApplications,
    isLoadingApplications,
    isIssuing,
    selectedAppId,
    setSelectedAppId,
    message,
    handleIssueCertificate
  };
}
