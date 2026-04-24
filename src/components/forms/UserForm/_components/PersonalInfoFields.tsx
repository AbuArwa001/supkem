import { Input } from "@/components/ui/input";
import type { UserFormData } from "../types";

interface Props {
    formData: UserFormData;
    onChange: (field: keyof UserFormData, val: string) => void;
}

export function PersonalInfoFields({ formData, onChange }: Props) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">
                        First Name
                    </label>
                    <Input 
                        required 
                        value={formData.first_name} 
                        onChange={(e) => onChange("first_name", e.target.value)} 
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
                        onChange={(e) => onChange("middle_name", e.target.value)} 
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
                    onChange={(e) => onChange("last_name", e.target.value)} 
                    placeholder="Doe" 
                    className="rounded-xl border-slate-200" 
                />
            </div>
        </div>
    );
}
