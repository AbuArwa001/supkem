"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users as UsersIcon,
  Plus,
  Search,
  RefreshCw,
  MoreVertical,
  Edit2,
  Trash2,
  Mail,
  MapPin,
  Shield,
  X,
  Save,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";
import api from "@/lib/api";
import { cn } from "@/lib/utils";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch Users
  const {
    data: userData,
    error,
    isLoading,
    mutate,
  } = useSWR(`/users/users/?search=${searchQuery}`, fetcher);
  // Fetch Roles for the forms
  const { data: rolesData } = useSWR("/users/roles/", fetcher);

  // Some DRF setups return an array directly, others return { results: [] }
  const users = Array.isArray(userData) ? userData : userData?.results || [];
  const roles = Array.isArray(rolesData) ? rolesData : rolesData?.results || [];

  const handleDelete = async (user: any) => {
    if (
      confirm(`Are you sure you want to permanently remove ${user.full_name}?`)
    ) {
      try {
        await api.delete(`/users/users/${user.id}/`);
        mutate(); // Refresh the list
      } catch (err) {
        console.error("Failed to delete user", err);
        alert("Failed to delete user. They might have dependent records.");
      }
    }
  };

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto">
      {/* Header section with title and actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-primary font-outfit leading-tight">
            Team Management
          </h2>
          <p className="text-slate-500 font-medium mt-2 text-sm max-w-md">
            Administrate system access, roles, and operational staff privileges.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => mutate()}
            disabled={isLoading}
            className="p-4 bg-white border border-border/50 rounded-2xl text-slate-600 hover:text-primary hover:border-primary/20 hover:shadow-sm transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
          </button>

          <button
            onClick={() => {
              setSelectedUser(null);
              setIsAddModalOpen(true);
            }}
            className="px-6 py-4 bg-primary text-white rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all active:scale-95 flex items-center gap-3 font-bold border border-primary/20"
          >
            <Plus size={20} />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Error State */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600">
          <AlertCircle size={20} />
          <span className="font-semibold text-sm">
            Failed to load users. Ensure you have the correct admin permissions.
          </span>
        </div>
      )}

      {/* Content Area */}
      <div className="bg-white border border-border/50 shadow-sm rounded-[32px] overflow-hidden">
        {/* Search Bar */}
        <div className="p-6 border-b border-border/50 bg-slate-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search team members by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-border/50 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all text-sm font-medium"
            />
          </div>
        </div>

        {/* Users Table / List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  Member Details
                </th>
                <th className="p-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  System Role
                </th>
                <th className="p-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  Location
                </th>
                <th className="p-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  Status
                </th>
                <th className="p-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-12 text-center text-primary/40 animate-pulse font-medium"
                  >
                    Loading user directory...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                        <UsersIcon size={32} />
                      </div>
                      <p className="text-slate-400 font-bold text-sm">
                        No team members found.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user: any) => (
                  <tr
                    key={user.id}
                    className="border-t border-border/30 hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                          <UsersIcon size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 tracking-tight leading-tight">
                            {user.full_name}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                            <Mail size={12} />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-secondary/10 text-secondary border border-secondary/20 text-[10px] font-black uppercase tracking-widest">
                        <Shield size={12} />
                        {user.role_name || user.role?.role_name || "User"}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                        <MapPin size={16} className="text-slate-400" />
                        {user.location || "N/A"}
                      </div>
                    </td>
                    <td className="p-6">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-1.5",
                          user.is_active
                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : "bg-slate-100 text-slate-500 border border-slate-200",
                        )}
                      >
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            user.is_active ? "bg-emerald-500" : "bg-slate-400",
                          )}
                        />
                        {user.is_active ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            setSelectedUser(user);
                            setIsEditModalOpen(true);
                          }}
                          className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals for Create/Edit */}
      <UserModal
        isOpen={isAddModalOpen || isEditModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        roles={roles}
        onSuccess={() => {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
          mutate();
        }}
      />
    </div>
  );
}

// User Form Modal Component extracted for cleanliness
function UserModal({
  isOpen,
  onClose,
  user,
  roles,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
  roles: any[];
  onSuccess: () => void;
}) {
  const [formData, setFormData] = useState({
    full_name: user?.full_name || "",
    email: user?.email || "",
    password: "",
    role_id:
      user?.role_id || user?.role?.id || (roles.length > 0 ? roles[0].id : ""),
    location: user?.location || "Nairobi",
    is_active: user ? user.is_active : true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // Sync form data when modal opens or user changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        full_name: user?.full_name || "",
        email: user?.email || "",
        password: "",
        role_id:
          user?.role_id ||
          user?.role?.id ||
          (roles && roles.length > 0 ? roles[0].id : ""),
        location: user?.location || "Nairobi",
        is_active: user ? user.is_active : true,
      });
      setError("");
    }
  }, [isOpen, user, roles]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      const payload = { ...formData };
      if (user && !payload.password) {
        delete (payload as any).password; // Don't send empty string if keeping existing
      }

      if (user) {
        await api.put(`/users/users/${user.id}/`, payload);
      } else {
        await api.post(`/users/users/`, payload);
      }
      onSuccess();
    } catch (err: any) {
      console.error("Save failed", err);
      const errorData = err.response?.data;
      if (errorData && typeof errorData === "object") {
        const messages = Object.values(errorData).flat().join(" ");
        setError(messages);
      } else {
        setError("An error occurred while saving the user.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-white rounded-[32px] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-8 pb-6 border-b border-border/50 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-black font-outfit text-primary tracking-tight">
              {user ? "Edit Account" : "New Account"}
            </h3>
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-1">
              {user ? "Modify existing user" : "Register team member"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-600 flex items-center justify-center transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[70vh] p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl flex gap-3 text-red-600 text-sm font-medium">
              <ShieldAlert size={18} className="shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
          )}

          <form id="user-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                Full Name
              </label>
              <input
                required
                value={formData.full_name}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, full_name: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm font-medium transition-all"
                placeholder="e.g. Jane Doe"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                Email Address
              </label>
              <input
                required
                type="email"
                disabled={!!user}
                value={formData.email}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, email: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm font-medium transition-all disabled:bg-slate-50 disabled:text-slate-400"
                placeholder="name@supkem.org"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                {user ? "Change Password (Optional)" : "Initial Password"}
              </label>
              <input
                type="password"
                required={!user}
                minLength={6}
                value={formData.password}
                onChange={(e) =>
                  setFormData((p) => ({ ...p, password: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-xl border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm font-medium transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                  System Role
                </label>
                <select
                  required
                  value={formData.role_id}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, role_id: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm font-medium transition-all bg-white"
                >
                  <option value="" disabled>
                    Select a role
                  </option>
                  {roles.map((r: any) => (
                    <option key={r.id} value={r.id}>
                      {r.role_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                  Location
                </label>
                <input
                  required
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, location: e.target.value }))
                  }
                  className="w-full px-4 py-3 rounded-xl border border-border/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-sm font-medium transition-all"
                  placeholder="e.g. Nairobi"
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-800">
                  Active Account
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  Allow user to sign in
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, is_active: e.target.checked }))
                  }
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
              </label>
            </div>
          </form>
        </div>

        <div className="p-6 border-t border-border/50 bg-slate-50/50 mt-auto flex gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 font-bold text-slate-600 bg-white border border-border/80 rounded-2xl hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            form="user-form"
            type="submit"
            disabled={isSaving}
            className="flex-1 py-4 font-bold text-white bg-primary rounded-2xl hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaving ? (
              <RefreshCw size={18} className="animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {user ? "Save Changes" : "Create User"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
