"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Search,
  Download,
  Printer,
  ExternalLink,
  Calendar,
  ChevronRight,
  MoreVertical,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import Link from "next/link";

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [eligibleApplications, setEligibleApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingApplications, setIsLoadingApplications] = useState(false);
  const [isIssuing, setIsIssuing] = useState(false);
  const [selectedAppId, setSelectedAppId] = useState("");
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const fetchCerts = async () => {
    try {
      const res = await api.get("/applications/certifications/");
      setCertificates(res.data.results || res.data);
    } catch (err) {
      console.error("Failed to fetch certificates", err);
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  const fetchEligibleApplications = async () => {
    setIsLoadingApplications(true);
    try {
      const res = await api.get("/applications/approved_no_cert/");
      setEligibleApplications(res.data);
    } catch (err) {
      console.error("Failed to fetch eligible applications", err);
    } finally {
      setIsLoadingApplications(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      fetchEligibleApplications();
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
      await api.post("/applications/certifications/", {
        application: selectedAppId
      });
      setMessage({ type: 'success', text: "Certificate issued successfully!" });
      fetchCerts();
      setTimeout(() => setIsModalOpen(false), 2000);
    } catch (err: any) {
      console.error("Failed to issue certificate", err);
      setMessage({ type: 'error', text: err.response?.data?.detail || "Failed to issue certificate. Please try again." });
    } finally {
      setIsIssuing(false);
    }
  };

  const filteredCerts = certificates.filter((cert: any) =>
    cert.organization_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">
            Certification Registry
          </h1>
          <p className="text-foreground/60 font-medium">
            Tracking all {certificates.length} active and archived digital
            certificates.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" />
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by organization..."
              className="pl-12 pr-4 py-3 bg-white border border-border focus:border-primary/20 rounded-2xl text-sm transition-all outline-none w-64 shadow-sm"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover-lift premium-gradient shadow-lg flex items-center gap-2"
          >
            <Award size={18} /> Issue New
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCerts.map((cert: any, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className="p-8 rounded-[40px] bg-white border-2 border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
          >
            {/* Premium Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.03] -translate-y-12 translate-x-12 rounded-full group-hover:bg-primary/5 transition-colors" />

            <div className="flex items-center justify-between mb-8">
              <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center border border-secondary/20 group-hover:bg-secondary group-hover:text-white transition-all">
                <Award size={28} />
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2.5 bg-primary/[0.02] border border-border rounded-xl text-foreground/40 hover:text-primary hover:border-primary/20 transition-all">
                  <Download size={16} />
                </button>
                <button className="p-2.5 bg-primary/[0.02] border border-border rounded-xl text-foreground/40 hover:text-primary hover:border-primary/20 transition-all">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-1">
                  Active Certificate
                </p>
                <h4 className="text-xl font-bold font-outfit text-primary group-hover:underline cursor-pointer tracking-tight leading-tight">
                  Membership Accreditation 2026
                </h4>
                <p className="text-xs font-bold text-foreground/40 mt-1 uppercase tracking-widest">
                  {cert.organization_name}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest">Issued Date</p>
                  <p className="text-xs font-bold text-primary flex items-center gap-1"><Calendar size={12} /> {new Date(cert.issued_at).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest">Serial Number</p>
                  <p className="text-xs font-bold text-secondary flex items-center gap-1 font-mono tracking-tighter">
                    <Award size={12} /> {cert.serial_number}
                  </p>
                </div>
              </div>

              <Link
                href={`/admin/certificates/${cert.id}`}
                className="w-full py-4 bg-primary/[0.03] text-primary rounded-2xl font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
              >
                View Registry Details <ChevronRight size={16} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Issue Certificate Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl border border-border"
            >
              <div className="p-8 border-b border-border flex items-center justify-between bg-primary/5">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-outfit text-primary tracking-tight">Issue New Certificate</h3>
                    <p className="text-xs font-medium text-foreground/40">Select an approved application</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-white rounded-xl transition-colors"
                >
                  <X size={20} className="text-foreground/40" />
                </button>
              </div>

              <form onSubmit={handleIssueCertificate} className="p-8 space-y-6">
                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "p-4 rounded-2xl flex items-center gap-3 font-medium text-sm",
                      message.type === 'success' ? "bg-green-50 text-green-600 border border-green-100" : "bg-red-50 text-red-600 border border-red-100"
                    )}
                  >
                    {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                    {message.text}
                  </motion.div>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">Application Reference</label>
                  <div className="relative">
                    <select
                      required
                      value={selectedAppId}
                      onChange={(e) => setSelectedAppId(e.target.value)}
                      className="w-full p-4 bg-white border border-border rounded-[20px] text-sm appearance-none outline-none focus:border-primary/20 transition-all shadow-sm disabled:opacity-50"
                      disabled={isLoadingApplications || isIssuing || message?.type === 'success'}
                    >
                      <option value="">{isLoadingApplications ? "Loading approved applications..." : "Select approved application..."}</option>
                      {eligibleApplications.map((app: any) => (
                        <option key={app.id} value={app.id}>
                          {app.organization_name} - {app.service_name} ({app.id.slice(0, 8)})
                        </option>
                      ))}
                    </select>
                    {!isLoadingApplications && eligibleApplications.length === 0 && (
                      <p className="text-[10px] text-red-500 mt-2 ml-1">No approved applications pending certification.</p>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button
                    type="submit"
                    disabled={!selectedAppId || isIssuing || message?.type === 'success'}
                    className="w-full py-4 bg-primary text-white rounded-[20px] font-bold text-sm hover-lift premium-gradient shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:transform-none"
                  >
                    {isIssuing ? (
                      <>
                        <Loader2 size={18} className="animate-spin" /> Issuing Digital Certificate...
                      </>
                    ) : (
                      <>
                        <Award size={18} /> Generate Certificate
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full py-4 text-foreground/40 font-bold text-sm hover:text-primary transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
