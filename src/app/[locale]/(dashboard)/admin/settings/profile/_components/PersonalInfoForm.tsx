import React from "react";
import { User, Mail, Phone, Save, Loader2, UserCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface PersonalInfoFormProps {
  formData: {
    first_name: string;
    middle_name: string;
    last_name: string;
    phone_number: string;
  };
  setFormData: (data: any) => void;
  email?: string;
  loading: boolean;
  success: string;
  error: string;
  onSave: () => void;
}

export function PersonalInfoForm({
  formData,
  setFormData,
  email,
  loading,
  success,
  error,
  onSave,
}: PersonalInfoFormProps) {
  const t = useTranslations("Dashboard.admin.settings.profile");

  return (
    <div className="p-10 rounded-[24px] bg-white border border-border shadow-sm space-y-10">
      <div className="flex items-center gap-4 text-primary">
        <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0">
          <UserCircle size={28} />
        </div>
        <h3 className="text-2xl font-bold font-outfit">{t("personalInfo")}</h3>
      </div>

      {success && <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-sm font-bold border border-emerald-100">{success}</div>}
      {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">{t("firstName")}</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
            <input value={formData.first_name} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bold text-primary" />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">{t("middleName")}</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
            <input value={formData.middle_name} onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })} className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bold text-primary" />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">{t("lastName")}</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
            <input value={formData.last_name} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bold text-primary" />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">{t("emailReadOnly")}</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
            <input disabled defaultValue={email} className="w-full bg-primary/[0.01] border border-border rounded-2xl py-4 pl-12 pr-4 opacity-50 cursor-not-allowed font-bold text-primary" />
          </div>
        </div>

        <div className="space-y-3 md:col-span-2">
          <label className="text-xs font-black text-foreground/30 uppercase tracking-[0.2em] ml-1">{t("phoneNumber")}</label>
          <div className="relative group">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
            <input value={formData.phone_number} onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })} className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-bold text-primary" placeholder="+254 7XX XXX XXX" />
          </div>
        </div>
      </div>

      <div className="pt-6">
        <button onClick={onSave} disabled={loading} className="px-10 py-4 bg-primary text-white rounded-[24px] font-extrabold text-sm hover-lift premium-gradient shadow-xl shadow-primary/20 flex items-center gap-3 disabled:opacity-50">
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          {t("saveProfile")}
        </button>
      </div>
    </div>
  );
}
