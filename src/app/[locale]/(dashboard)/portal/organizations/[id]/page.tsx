"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { AnimatePresence, motion } from "framer-motion";
import {
    Loader2,
    AlertTriangle,
    ShieldCheck,
    Clock,
    Ban,
    ArrowRight,
    Sparkles,
    CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { Link } from "@/i18n/routing";

import api from "@/lib/api";
import { OrganizationHeader } from "@/app/[locale]/(dashboard)/admin/organizations/[id]/_components/OrganizationHeader";
import { OrganizationCoreInfo } from "@/app/[locale]/(dashboard)/admin/organizations/[id]/_components/OrganizationCoreInfo";
import { OrganizationRecords } from "@/app/[locale]/(dashboard)/admin/organizations/[id]/_components/OrganizationRecords";
import { OrganizationPersonnel } from "@/app/[locale]/(dashboard)/admin/organizations/[id]/_components/OrganizationPersonnel";
import { AddPersonnelModal } from "@/app/[locale]/(dashboard)/admin/organizations/[id]/_components/AddPersonnelModal";
import { EditOrganizationModal } from "@/app/[locale]/(dashboard)/admin/organizations/[id]/_components/EditOrganizationModal";
import { OrganizationDetail, Personnel, User } from "@/app/[locale]/(dashboard)/admin/organizations/[id]/_components/types";

export default function PortalOrganizationDetail() {
    const { id } = useParams();
    const router = useRouter();

    const [org, setOrg] = useState<OrganizationDetail | null>(null);
    const [personnel, setPersonnel] = useState<Personnel[]>([]);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isPersonnelModalOpen, setIsPersonnelModalOpen] = useState(false);

    // Search Personnel state
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [defaultUsers, setDefaultUsers] = useState<User[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [actionLoading, setActionLoading] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const [orgRes, personnelRes, profileRes, usersRes] = await Promise.all([
                    api.get(`/organizations/organizations/${id}/`),
                    api.get(`/organizations/organizations/${id}/personnel/`),
                    api.get("/users/users/me/"),
                    api.get("/users/users/")
                ]);

                if (isMounted) {
                    setOrg(orgRes.data);
                    const personnelList: Personnel[] = personnelRes.data;
                    setPersonnel(personnelList);
                    setDefaultUsers(usersRes.data.results || usersRes.data);

                    const myId = profileRes.data.id;
                    setCurrentUserId(myId);

                    const userRecord = personnelList.find((p) => p.user?.id === myId);
                    setIsAdmin(userRecord?.status === "Admin");
                }
            } catch (err) {
                console.error("Failed to fetch portal organization data", err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchInitialData();
        return () => {
            isMounted = false;
        };
    }, [id]);

    const handleSearchUsers = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const res = await api.get(`/users/users/?search=${encodeURIComponent(searchQuery)}`);
            setSearchResults(res.data.results || res.data);
        } catch (err) {
            console.error("Failed to search users", err);
        } finally {
            setIsSearching(false);
        }
    };

    const handleAddPersonnel = async (userId: string) => {
        setActionLoading(userId);
        try {
            await api.post(`/organizations/organizations/${id}/assign_personnel/`, {
                user_id: userId,
                status: "Member"
            });
            const res = await api.get(`/organizations/organizations/${id}/personnel/`);
            setPersonnel(res.data);
            setIsPersonnelModalOpen(false);
            setSearchQuery("");
            setSearchResults([]);
            toast.success("Personnel added successfully!");
        } catch (err: any) {
            console.error("Failed to add personnel", err);
            const msg = err.response?.data?.error || "Failed to add personnel.";
            toast.error(msg);
        } finally {
            setActionLoading(null);
        }
    };

    const handleRemovePersonnel = async (userId: string) => {
        if (!window.confirm("Are you sure you want to remove this member from your organization?")) return;

        setActionLoading(userId);
        try {
            await api.post(`/organizations/organizations/${id}/remove_personnel/`, {
                user_id: userId
            });
            setPersonnel(prev => prev.filter(p => p.user.id !== userId));
            toast.success("Member removed from organization.");
        } catch (err: any) {
            console.error("Failed to remove personnel", err);
            const msg = err.response?.data?.error || "Failed to remove member.";
            toast.error(msg);
        } finally {
            setActionLoading(null);
        }
    };

    const handleSuspendPersonnel = async (userId: string) => {
        setActionLoading(userId);
        try {
            await api.post(`/organizations/organizations/${id}/suspend_personnel/`, {
                user_id: userId
            });
            const res = await api.get(`/organizations/organizations/${id}/personnel/`);
            setPersonnel(res.data);
            toast.success("Member status set to Suspended.");
        } catch (err: any) {
            console.error("Failed to suspend personnel", err);
            const msg = err.response?.data?.error || "Failed to suspend member.";
            toast.error(msg);
        } finally {
            setActionLoading(null);
        }
    };

    const handleOrganizationUpdated = (updatedOrg: OrganizationDetail) => {
        setOrg(prev => (prev ? { ...prev, ...updatedOrg } : updatedOrg));
    };

    if (loading) {
        return (
            <div className="h-96 flex items-center justify-center flex-col gap-4">
                <Loader2 className="animate-spin text-primary" size={40} />
                <p className="text-primary/60 font-medium font-outfit">Loading Institution Profile...</p>
            </div>
        );
    }

    if (!org) {
        return (
            <div className="h-96 flex flex-col items-center justify-center gap-4 text-center">
                <AlertTriangle size={48} className="text-red-500/80" />
                <h2 className="text-2xl font-bold text-slate-800 font-outfit">Institution Not Found</h2>
                <p className="text-slate-500">The requested institution could not be located in your registered profile.</p>
                <button
                    onClick={() => router.push("/portal/organizations")}
                    className="mt-4 px-6 py-2.5 bg-primary text-white font-bold rounded-xl shadow-md hover:bg-primary/90 transition-all cursor-pointer"
                >
                    Return to Institutions
                </button>
            </div>
        );
    }

    const isAccredited = org.accreditation_status === "Accredited";
    const isPending = org.accreditation_status === "Pending";

    return (
        <div className="space-y-10 pb-20 max-w-7xl mx-auto">
            {/* Header */}
            <OrganizationHeader
                name={org.name}
                id={org.id}
                status={org.accreditation_status}
                contextTitle="SUPKEM APPLICANT PORTAL • INSTITUTION REGISTRY"
                canEdit={isAdmin}
                onEdit={() => setIsEditModalOpen(true)}
                onBack={() => router.push("/portal/organizations")}
            />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Left Column: Core Info & Records */}
                <div className="xl:col-span-2 space-y-8">
                    <OrganizationCoreInfo
                        org={org}
                        canEdit={isAdmin}
                        onEdit={() => setIsEditModalOpen(true)}
                    />

                    <OrganizationRecords
                        appsCount={org.apps_count ?? 0}
                        certsCount={org.certs_count ?? 0}
                        applicationsHref="/portal/applications"
                        certificatesHref="/portal/certificates"
                    />
                </div>

                {/* Right Column: Personnel & Compliance Standing */}
                <div className="space-y-6">
                    <OrganizationPersonnel
                        personnel={personnel}
                        canManage={isAdmin}
                        currentUserId={currentUserId ?? undefined}
                        actionLoading={actionLoading}
                        onSuspendPersonnel={handleSuspendPersonnel}
                        onRemovePersonnel={handleRemovePersonnel}
                        onOpenModal={() => setIsPersonnelModalOpen(true)}
                    />

                    {/* Applicant Compliance & Standing Card */}
                    <div className="p-8 rounded-[24px] bg-gradient-to-br from-slate-900 via-primary to-slate-950 text-white shadow-2xl shadow-primary/20 space-y-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-44 h-44 bg-secondary/15 rounded-full blur-3xl" />

                        <div className="flex items-center gap-3 relative z-10">
                            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                                {isAccredited ? (
                                    <ShieldCheck size={20} className="text-secondary" />
                                ) : isPending ? (
                                    <Clock size={20} className="text-amber-400" />
                                ) : (
                                    <Ban size={20} className="text-rose-400" />
                                )}
                            </div>
                            <div>
                                <h4 className="font-bold text-lg font-outfit">
                                    Accreditation Standing
                                </h4>
                                <p className="text-[10px] uppercase font-black tracking-widest text-white/60">
                                    Status: {org.accreditation_status}
                                </p>
                            </div>
                        </div>

                        <p className="text-xs sm:text-sm text-white/80 font-medium leading-relaxed relative z-10">
                            {isAccredited ? (
                                "Your institution is fully accredited with SUPKEM. You are authorized to submit certification applications, education credentials, and official letter requests."
                            ) : isPending ? (
                                "Your institution's statutory credentials (KRA PIN, Reg No) are currently being reviewed by SUPKEM compliance officers."
                            ) : (
                                "Access for this organization is currently suspended. Please contact the SUPKEM Secretariat for assistance and compliance requirements."
                            )}
                        </p>

                        <div className="pt-2 relative z-10">
                            {isAccredited ? (
                                <Link
                                    href="/portal/applications/new"
                                    className="w-full py-4 bg-white hover:bg-secondary text-primary hover:text-white rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                                >
                                    <Sparkles size={16} />
                                    Submit New Application
                                    <ArrowRight size={16} />
                                </Link>
                            ) : (
                                <Link
                                    href="/portal/applications"
                                    className="w-full py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/20 transition-all cursor-pointer"
                                >
                                    View Applications
                                    <ArrowRight size={16} />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {isPersonnelModalOpen && (
                    <AddPersonnelModal
                        orgName={org.name}
                        personnel={personnel}
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        searchResults={searchResults}
                        defaultUsers={defaultUsers}
                        isSearching={isSearching}
                        actionLoading={actionLoading}
                        onSearchUsers={handleSearchUsers}
                        onAddPersonnel={handleAddPersonnel}
                        onClose={() => setIsPersonnelModalOpen(false)}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isEditModalOpen && (
                    <EditOrganizationModal
                        org={org}
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        onSuccess={handleOrganizationUpdated}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
