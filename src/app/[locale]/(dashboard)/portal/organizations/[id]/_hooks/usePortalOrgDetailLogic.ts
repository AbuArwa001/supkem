"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import api from "@/lib/api";
import { OrganizationDetail, Personnel, User } from "@/app/[locale]/(dashboard)/admin/organizations/[id]/_components/types";
import { removePersonnelApi, suspendPersonnelApi } from "../_utils/personnelActions";

export function usePortalOrgDetailLogic(id: string) {
  const [org, setOrg] = useState<OrganizationDetail | null>(null);
  const [personnel, setPersonnel] = useState<Personnel[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
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
          api.get("/users/users/"),
        ]);
        if (isMounted) {
          setOrg(orgRes.data);
          const list: Personnel[] = personnelRes.data;
          setPersonnel(list);
          setDefaultUsers(usersRes.data.results || usersRes.data);
          const myId = profileRes.data.id;
          setCurrentUserId(myId);
          setIsAdmin(list.find((p) => p.user?.id === myId)?.status === "Admin");
        }
      } catch (err) {
        console.error("Failed to fetch portal organization data", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchInitialData();
    return () => { isMounted = false; };
  }, [id]);

  const handleSearchUsers = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) { setSearchResults([]); return; }
    setIsSearching(true);
    try {
      const res = await api.get(`/users/users/?search=${encodeURIComponent(searchQuery)}`);
      setSearchResults(res.data.results || res.data);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAddPersonnel = async (userId: string, onSuccess: () => void) => {
    setActionLoading(userId);
    try {
      await api.post(`/organizations/organizations/${id}/assign_personnel/`, { user_id: userId, status: "Member" });
      const res = await api.get(`/organizations/organizations/${id}/personnel/`);
      setPersonnel(res.data);
      onSuccess();
      setSearchQuery("");
      setSearchResults([]);
      toast.success("Personnel added successfully!");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to add personnel.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemovePersonnel = async (userId: string) => {
    setActionLoading(userId);
    await removePersonnelApi(id, userId, setPersonnel);
    setActionLoading(null);
  };

  const handleSuspendPersonnel = async (userId: string) => {
    setActionLoading(userId);
    await suspendPersonnelApi(id, userId, setPersonnel);
    setActionLoading(null);
  };

  return {
    org, setOrg, personnel, currentUserId, isAdmin, loading, searchQuery, setSearchQuery,
    searchResults, defaultUsers, isSearching, actionLoading, handleSearchUsers,
    handleAddPersonnel, handleRemovePersonnel, handleSuspendPersonnel,
  };
}
