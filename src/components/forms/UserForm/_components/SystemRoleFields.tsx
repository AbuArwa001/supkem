import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import type { UserFormData, Role } from "../types";

interface Props {
    formData: UserFormData;
    onChange: (field: keyof UserFormData, val: string | boolean) => void;
    roles: Role[];
}

export function SystemRoleFields({ formData, onChange, roles }: Props) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                        System Role
                    </label>
                    <select 
                        required 
                        value={formData.role_id} 
                        onChange={(e) => onChange("role_id", e.target.value)} 
                        className="w-full flex h-10 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="" disabled>Select role</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>{role.role_name}</option>
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
                        onChange={(e) => onChange("location", e.target.value)} 
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
                    onCheckedChange={(c) => onChange("is_active", c)} 
                />
            </div>
        </div>
    );
}
