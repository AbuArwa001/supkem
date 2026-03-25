"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Switch } from "@/components/ui/switch";
import api from "@/lib/api";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

interface UserFormProps {
    onSuccess?: () => void;
    user?: any;
}

export function UserForm({ onSuccess, user }: UserFormProps) {
    const [roles, setRoles] = useState<any[]>([]);
    const [isLoadingRoles, setIsLoadingRoles] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        first_name: user?.first_name || "",
        middle_name: user?.middle_name || "",
        last_name: user?.last_name || "",
        email: user?.email || "",
        password: "",
        role_id: user?.role?.id || "",
        location: user?.location || "Nairobi",
        phone_number: user?.phone_number || "",
        is_active: user?.is_active ?? true,
    });

    useEffect(() => {
        const fetchRoles = async () => {
            setIsLoadingRoles(true);
            try {
                const response = await api.get("/users/roles/");
                const data = response.data;
                setRoles(Array.isArray(data) ? data : data.results || []);
            } catch (error) {
                console.error("Failed to fetch roles", error);
            } finally {
                setIsLoadingRoles(false);
            }
        };
        fetchRoles();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const payload = { ...formData };
            // If editing and no password provided, remove it from payload
            if (user && !payload.password) {
                delete (payload as any).password;
            }

            if (user) {
                await api.put(`/users/users/${user.id}/`, payload);
                toast.success("User updated successfully");
            } else {
                await api.post("/users/users/", payload);
                toast.success("User created successfully");
            }
            onSuccess?.();
        } catch (error: any) {
            const errorData = error.response?.data;
            let errorMessage = "Failed to save user";
            if (errorData) {
                errorMessage = Object.entries(errorData)
                    .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(", ") : msgs}`)
                    .join(" | ");
            }
            toast.error(errorMessage);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                        First Name
                    </label>
                    <Input
                        required
                        value={formData.first_name}
                        onChange={(e) => setFormData(p => ({ ...p, first_name: e.target.value }))}
                        placeholder="Jane"
                        className="rounded-xl border-slate-200"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                        Middle Name
                    </label>
                    <Input
                        value={formData.middle_name}
                        onChange={(e) => setFormData(p => ({ ...p, middle_name: e.target.value }))}
                        placeholder="Optional"
                        className="rounded-xl border-slate-200"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                    Last Name / Surname
                </label>
                <Input
                    required
                    value={formData.last_name}
                    onChange={(e) => setFormData(p => ({ ...p, last_name: e.target.value }))}
                    placeholder="Doe"
                    className="rounded-xl border-slate-200"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                    Email Address
                </label>
                <Input
                    required
                    type="email"
                    disabled={!!user}
                    value={formData.email}
                    onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                    placeholder="name@supkem.org"
                    className="rounded-xl border-slate-200 disabled:bg-slate-50 disabled:text-slate-400"
                />
            </div>

            <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                    Phone Number
                </label>
                <Input
                    required
                    value={formData.phone_number}
                    onChange={(e) => setFormData(p => ({ ...p, phone_number: e.target.value }))}
                    placeholder="+254 7XX XXX XXX"
                    className="rounded-xl border-slate-200"
                />
            </div>

            {!user && (
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                        Initial Password
                    </label>
                    <PasswordInput
                        required
                        value={formData.password}
                        onChange={(e) => setFormData(p => ({ ...p, password: e.target.value }))}
                        placeholder="••••••••"
                        className="rounded-xl border-slate-200"
                    />
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                        System Role
                    </label>
                    <select
                        required
                        value={formData.role_id}
                        onChange={(e) => setFormData(p => ({ ...p, role_id: e.target.value }))}
                        className="w-full flex h-10 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="" disabled>Select role</option>
                        {roles.map((role: any) => (
                            <option key={role.id} value={role.id}>
                                {role.role_name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                        Operational Location
                    </label>
                    <Input
                        required
                        value={formData.location}
                        onChange={(e) => setFormData(p => ({ ...p, location: e.target.value }))}
                        placeholder="Headquarters"
                        className="rounded-xl border-slate-200"
                    />
                </div>
            </div>

            <div className="flex flex-row items-center justify-between rounded-xl border border-slate-100 p-4 bg-slate-50/30">
                <div className="space-y-0.5">
                    <p className="text-base font-bold text-slate-900">Active Status</p>
                    <p className="text-xs text-slate-500 font-medium">Allow this user to sign in to the platform.</p>
                </div>
                <Switch
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData(p => ({ ...p, is_active: checked }))}
                />
            </div>

            <Button
                type="submit"
                disabled={isSaving}
                className="w-full rounded-xl font-black shadow-lg shadow-primary/25 h-14 bg-primary text-white hover:bg-primary/90"
            >
                {isSaving ? (
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                    <Save className="mr-2 h-5 w-5" />
                )}
                {user ? "UPDATE ACCOUNT" : "CREATE ACCOUNT"}
            </Button>
        </form>
    );
}
