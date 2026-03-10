"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Users,
  FileText,
  Award,
  MapPin,
  Globe,
  Mail,
  Phone,
  LayoutDashboard,
  ExternalLink,
  Loader2,
  Calendar,
  ChevronRight,
  User,
  Plus,
  AlertTriangle,
  Search,
  CheckCircle2,
  X,
  Trash2,
  Ban
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import Link from "next/link";
import Image from "next/image";

export default function OrganizationDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [org, setOrg] = useState<any>(null);
  const [personnel, setPersonnel] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Personnel Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null); // Stores userId being acted upon

  useEffect(() => {
    fetchOrgData();
  }, [id]);

  const fetchOrgData = async () => {
    setLoading(true);
    try {
      const [orgRes, personnelRes] = await Promise.all([
        api.get(`/organizations/organizations/${id}/`),
        api.get(`/organizations/organizations/${id}/personnel/`)
      ]);
      setOrg(orgRes.data);
      setPersonnel(personnelRes.data);
    } catch (err) {
      console.error("Failed to fetch organization data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchUsers = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const res = await api.get(`/users/users/?search=${searchQuery}`);
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
      // Refresh personnel list
      const res = await api.get(`/organizations/organizations/${id}/personnel/`);
      setPersonnel(res.data);
      setIsModalOpen(false);
      setSearchQuery("");
      setSearchResults([]);
    } catch (err) {
      console.error("Failed to add personnel", err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemovePersonnel = async (userId: string) => {
    if (!window.confirm("Are you sure you want to remove this user from the organization?")) return;

    setActionLoading(userId);
    try {
      await api.post(`/organizations/organizations/${id}/remove_personnel/`, {
        user_id: userId
      });
      setPersonnel(personnel.filter(p => p.user.id !== userId));
    } catch (err) {
      console.error("Failed to remove personnel", err);
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
      // Refresh personnel list to get updated status
      const res = await api.get(`/organizations/organizations/${id}/personnel/`);
      setPersonnel(res.data);
    } catch (err) {
      console.error("Failed to suspend personnel", err);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center flex-col gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-primary/60 font-medium font-outfit">Loading Registry Profile...</p>
      </div>
    );

  if (!org) return (
    <div className="h-96 flex flex-col items-center justify-center gap-4 text-center">
      <AlertTriangle size={48} className="text-red-500/80" />
      <h2 className="text-2xl font-bold text-slate-800 font-outfit">Organization Not Found</h2>
      <p className="text-slate-500">The requested profile could not be located in the registry.</p>
      <button onClick={() => router.back()} className="mt-4 px-6 py-2 bg-primary text-white rounded-xl">Go Back</button>
    </div>
  );

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto">
      <div className="flex items-center gap-6">
        <button
          onClick={() => router.back()}
          className="p-3 bg-white border border-border rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="space-y-1">
          <h1 className="text-3xl lg:text-4xl font-black font-outfit text-primary tracking-tight">
            {org.name}
          </h1>
          <p className="text-foreground/50 font-medium uppercase tracking-widest text-xs flex items-center gap-2">
            Organization Registry Profile <span className="w-1 h-1 bg-primary/30 rounded-full" /> ID: {String(org.id).substring(0, 8).toUpperCase()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          {/* Core Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 rounded-[32px] bg-white border border-border shadow-xl shadow-slate-200/50 space-y-10 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.02] rounded-full -translate-y-1/2 translate-x-1/2" />

            <div className="flex items-center gap-6 relative z-10">
              <div className="w-20 h-20 bg-primary/5 text-primary rounded-[24px] flex items-center justify-center border border-primary/10 shadow-lg shadow-primary/5">
                <Building2 size={40} />
              </div>
              <div>
                <h3 className="text-2xl font-black font-outfit text-primary mb-2 tracking-tight">
                  Entity Details
                </h3>
                <span className="px-4 py-1.5 bg-secondary/10 text-secondary border border-secondary/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                  {org.type}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              <div className="space-y-1.5 p-5 rounded-2xl bg-primary/[0.02] border border-primary/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">
                  Reg No.
                </p>
                <p
                  className="text-base font-bold text-primary truncate"
                  title={org.reg_number}
                >
                  {org.reg_number}
                </p>
              </div>
              <div className="space-y-1.5 p-5 rounded-2xl bg-primary/[0.02] border border-primary/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">
                  PIN No.
                </p>
                <p
                  className="text-base font-bold text-primary truncate font-mono"
                  title={org.pin_number}
                >
                  {org.pin_number}
                </p>
              </div>
              <div className="space-y-1.5 p-5 rounded-2xl bg-primary/[0.02] border border-primary/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">
                  Location
                </p>
                <p className="text-base font-bold text-primary flex items-center gap-1.5 truncate">
                  <MapPin size={14} className="text-primary/50" /> {org.county_council_name}
                </p>
              </div>
              <div className="space-y-1.5 p-5 rounded-2xl bg-primary/[0.02] border border-primary/5">
                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">
                  GPS Location
                </p>
                <p className="text-base font-bold text-primary truncate font-mono">
                  {org.gps_location || "N/A"}
                </p>
              </div>
            </div>

            <div className="space-y-6 pt-4 border-t border-border/50">
              <h4 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-secondary" /> Digital Presence
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-white hover:border-primary/20 transition-all group">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <Globe size={18} className="text-primary/60 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-sm font-bold text-slate-600 truncate">
                      {org.website ? org.website.replace('https://', '').replace('http://', '') : "Website not provided"}
                    </span>
                  </div>
                  {org.website && (
                    <a href={org.website.startsWith('http') ? org.website : `https://${org.website}`} target="_blank" rel="noreferrer" className="p-2 text-primary/40 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl border border-border bg-white hover:border-primary/20 transition-all group">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <Mail size={18} className="text-primary/60 group-hover:text-primary transition-colors" />
                    </div>
                    <span className="text-sm font-bold text-slate-600 truncate">
                      {org.email || "Email not provided"}
                    </span>
                  </div>
                  {org.email && (
                    <a href={`mailto:${org.email}`} className="p-2 text-primary/40 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors">
                      <ExternalLink size={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Records Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-[24px] bg-white border border-border shadow-sm flex flex-col justify-between group h-40 relative overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
              <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center relative z-10 mb-2">
                <FileText size={24} />
              </div>
              <div className="flex items-end justify-between relative z-10">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Records</p>
                  <span className="text-2xl font-black font-outfit text-slate-800">Pending Apps</span>
                </div>
                <ChevronRight size={20} className="text-amber-500/50 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-8 rounded-[24px] bg-white border border-border shadow-sm flex flex-col justify-between group h-40 relative overflow-hidden"
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out" />
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center relative z-10 mb-2">
                <Award size={24} />
              </div>
              <div className="flex items-end justify-between relative z-10">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Records</p>
                  <span className="text-2xl font-black font-outfit text-slate-800">Active Certs</span>
                </div>
                <ChevronRight size={20} className="text-green-500/50 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-8 rounded-[32px] bg-white border border-border shadow-xl shadow-slate-200/50 space-y-8 overflow-hidden relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                  <Users size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-primary font-outfit">Assigned Personnel</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{personnel.length} Members</p>
                </div>
              </div>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              {personnel.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-sm font-medium">
                  No personnel assigned yet.
                </div>
              ) : (
                personnel.map((p) => (
                  <div
                    key={p.id}
                    className={cn(
                      "flex items-center justify-between p-4 rounded-2xl border transition-all",
                      p.status === 'Suspended' ? "bg-red-50/50 border-red-100" : "bg-white border-slate-100 hover:border-primary/20 hover:shadow-md"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0",
                        p.status === 'Suspended' ? "bg-red-100 text-red-600" : "bg-primary/10 text-primary"
                      )}>
                        {p.user.first_name[0]}{p.user.last_name[0]}
                      </div>
                      <div className="overflow-hidden">
                        <p className={cn(
                          "text-sm font-bold truncate pr-4",
                          p.status === 'Suspended' ? "text-red-900" : "text-slate-800"
                        )}>
                          {p.user.full_name}
                        </p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                          {p.status === 'Suspended' && <Ban size={10} className="text-red-500" />}
                          {p.status}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-slate-50 rounded-xl p-1 border border-slate-100">
                      {p.status !== 'Suspended' && (
                        <button
                          onClick={() => handleSuspendPersonnel(p.user.id)}
                          disabled={actionLoading === p.user.id}
                          title="Suspend User Access"
                          className="w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-white hover:text-amber-500 rounded-lg transition-all shadow-sm disabled:opacity-50"
                        >
                          {actionLoading === p.user.id ? <Loader2 size={14} className="animate-spin" /> : <Ban size={14} />}
                        </button>
                      )}
                      <button
                        onClick={() => handleRemovePersonnel(p.user.id)}
                        disabled={actionLoading === p.user.id}
                        title="Remove User completely"
                        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:bg-white hover:text-red-500 rounded-lg transition-all shadow-sm disabled:opacity-50"
                      >
                        {actionLoading === p.user.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 bg-primary/[0.03] text-primary border border-primary/10 rounded-2xl font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group"
            >
              Add User Access <Plus size={16} className="group-hover:rotate-90 transition-transform" />
            </button>
          </div>

          <div className="p-8 rounded-[32px] premium-gradient text-white shadow-2xl shadow-primary/20 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
            <h4 className="font-bold text-lg flex items-center gap-3 font-outfit relative z-10">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <LayoutDashboard size={18} />
              </div>
              Administrative Actions
            </h4>
            <p className="text-sm text-white/70 font-medium relative z-10">
              Issue manual certification or suspend this entity's access to the
              SUPKEM portal.
            </p>
            <div className="space-y-4 pt-4 relative z-10">
              <button className="w-full py-4 bg-white text-primary rounded-2xl font-bold text-sm hover:bg-secondary hover:text-white transition-all flex items-center justify-center gap-2 shadow-xl shadow-black/10">
                Issue Certificate <Award size={18} />
              </button>
              <button className="w-full py-4 bg-red-600/30 text-white border border-white/20 rounded-2xl font-bold text-sm hover:bg-red-600 hover:border-red-600 transition-all flex items-center justify-center gap-2 backdrop-blur-md">
                Suspend Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Personnel Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-lg rounded-[32px] overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[80vh]"
            >
              <div className="p-6 sm:p-8 border-b border-border flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center border border-primary/10 shadow-sm">
                    <User size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-outfit text-slate-800 tracking-tight">Assign Personnel</h3>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">Search and add users to {org.name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2.5 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm rounded-xl transition-all"
                >
                  <X size={20} className="text-slate-400 hover:text-slate-600" />
                </button>
              </div>

              <div className="p-6 sm:p-8 flex-col flex gap-6 overflow-hidden">
                <form onSubmit={handleSearchUsers} className="relative group shrink-0">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or email..."
                    className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-primary/30 rounded-2xl py-4 pl-12 pr-24 text-sm font-medium transition-all outline-none shadow-sm focus:ring-4 focus:ring-primary/5"
                  />
                  <button
                    type="submit"
                    disabled={isSearching || !searchQuery.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold disabled:opacity-50 hover:bg-primary transition-colors"
                  >
                    {isSearching ? <Loader2 size={14} className="animate-spin" /> : "Search"}
                  </button>
                </form>

                <div className="flex-1 overflow-y-auto min-h-[200px] custom-scrollbar pr-2 space-y-3">
                  {searchResults.length === 0 && !isSearching && searchQuery ? (
                    <div className="text-center py-10">
                      <Users size={32} className="mx-auto text-slate-300 mb-3" />
                      <p className="text-slate-500 font-medium text-sm">No users found matching "{searchQuery}"</p>
                    </div>
                  ) : searchResults.length === 0 ? (
                    <div className="text-center py-10">
                      <Search size={32} className="mx-auto text-slate-200 mb-3" />
                      <p className="text-slate-400 font-medium text-sm">Search results will appear here</p>
                    </div>
                  ) : (
                    searchResults.map((user) => {
                      const isAlreadyAssigned = personnel.some(p => p.user.id === user.id);
                      return (
                        <div key={user.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-primary/20 hover:shadow-md transition-all">
                          <div className="min-w-0 pr-4">
                            <p className="text-sm font-bold text-slate-800 truncate">{user.full_name}</p>
                            <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                          </div>
                          <button
                            onClick={() => handleAddPersonnel(user.id)}
                            disabled={isAlreadyAssigned || actionLoading === user.id}
                            className={cn(
                              "shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm border",
                              isAlreadyAssigned
                                ? "bg-slate-50 text-slate-400 border-slate-200"
                                : "bg-white text-primary border-primary/20 hover:bg-primary hover:text-white"
                            )}
                          >
                            {actionLoading === user.id ? (
                              <Loader2 size={14} className="animate-spin" />
                            ) : isAlreadyAssigned ? (
                              <>Assigned <CheckCircle2 size={14} /></>
                            ) : (
                              "Add User"
                            )}
                          </button>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
