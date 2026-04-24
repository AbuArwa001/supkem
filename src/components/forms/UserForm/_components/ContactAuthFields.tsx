import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import type { UserFormData } from "../types";

interface Props {
    formData: UserFormData;
    onChange: (field: keyof UserFormData, val: string) => void;
    isEditing: boolean;
}

export function ContactAuthFields({ formData, onChange, isEditing }: Props) {
    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                    Email Address
                </label>
                <Input 
                    required 
                    type="email" 
                    disabled={isEditing} 
                    value={formData.email} 
                    onChange={(e) => onChange("email", e.target.value)} 
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
                    onChange={(e) => onChange("phone_number", e.target.value)} 
                    placeholder="+254 7XX XXX XXX" 
                    className="rounded-xl border-slate-200" 
                />
            </div>
            {!isEditing && (
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                        Initial Password
                    </label>
                    <PasswordInput 
                        required 
                        value={formData.password} 
                        onChange={(e) => onChange("password", e.target.value)} 
                        placeholder="••••••••" 
                        className="rounded-xl border-slate-200" 
                    />
                </div>
            )}
        </div>
    );
}
