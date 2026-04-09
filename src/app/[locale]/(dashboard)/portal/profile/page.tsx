"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  Save,
  Loader2,
  UserCircle,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import api from "@/lib/api";

export default function PortalProfileSettings() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    phone_number: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Pre-fill form when user data is available
  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        middle_name: user.middle_name || "",
        last_name: user.last_name || "",
        phone_number: user.phone_number || "",
      });
    }
  }, [user]);

  const handleUpdateProfile = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await api.patch("/users/users/me/", formData);
      setSuccess("Profile updated successfully!");
    } catch (err: any) {
      console.error("Update failed", err);
      setError(err.response?.data?.detail || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold font-outfit text-primary">
            My Profile
          </h1>
          <p className="text-foreground/60 font-medium tracking-tight">
            Manage your personal information and contact details.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Profile Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-10 rounded-[24px] bg-white border border-border shadow-sm space-y-10"
          >
            <div className="flex items-center gap-4 text-primary">
              <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0">
                <UserCircle size={28} />
              </div>
              <h3 className="text-2xl font-bold font-outfit">
                Personal Information
              </h3>
            </div>

            {success && (
              <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-sm font-bold border border-emerald-100">
                {success}
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">
                  First Name
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors"
                    size={20}
                  />
                  <input
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                    className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bold text-primary"
                    placeholder="First Name"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">
                  Middle Name
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors"
                    size={20}
                  />
                  <input
                    value={formData.middle_name}
                    onChange={(e) =>
                      setFormData({ ...formData, middle_name: e.target.value })
                    }
                    className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bold text-primary"
                    placeholder="Middle Name"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">
                  Last Name / Surname
                </label>
                <div className="relative group">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors"
                    size={20}
                  />
                  <input
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                    className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bold text-primary"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors"
                    size={20}
                  />
                  <input
                    disabled
                    value={user?.email || ""}
                    className="w-full bg-primary/[0.01] border border-border rounded-2xl py-4 pl-12 pr-4 opacity-50 cursor-not-allowed font-bold text-primary"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">
                  Phone Number
                </label>
                <div className="relative group">
                  <Phone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors"
                    size={20}
                  />
                  <input
                    value={formData.phone_number}
                    onChange={(e) =>
                      setFormData({ ...formData, phone_number: e.target.value })
                    }
                    className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bold text-primary"
                    placeholder="+254 7XX XXX XXX"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={handleUpdateProfile}
                disabled={loading}
                className="px-10 py-4 bg-primary text-white rounded-[24px] font-extrabold text-sm hover-lift premium-gradient shadow-xl shadow-primary/20 flex items-center gap-3 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Save size={18} />
                )}
                Update Profile
              </button>
            </div>
          </motion.div>
        </div>

        <div className="space-y-8">
          <div className="p-10 rounded-[20px] premium-gradient text-white shadow-2xl shadow-primary/20 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-2xl font-bold font-outfit relative z-10">
              Account Status
            </h3>
            <p className="text-sm font-medium text-white/70 relative z-10 leading-relaxed">
              You are currently signed in as a{" "}
              <span className="text-secondary font-black">
                {user?.role?.role_name || "Portal User"}
              </span>
              . Keep your contact information up to date to receive important
              updates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
