import React from "react";
import { Plug, Smartphone, Mail, Activity, Bot } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

const integrationStatuses = [
  { name: "Safaricom M-Pesa Daraja", service: "Payment Gateway", icon: Smartphone, status: "Configured", accent: "text-emerald-600 bg-emerald-50 border-emerald-200" },
  { name: "Resend Email Delivery", service: "SMTP & Invoices", icon: Mail, status: "Operational", accent: "text-blue-600 bg-blue-50 border-blue-200" },
  { name: "Knock Notifications", service: "In-App & Push Engine", icon: Activity, status: "Operational", accent: "text-purple-600 bg-purple-50 border-purple-200" },
  { name: "OpenAI Platform", service: "Bilingual Translation", icon: Bot, status: "Ready", accent: "text-amber-600 bg-amber-50 border-amber-200" },
];

export function ITIntegrationsStatusCard() {
  const t = useTranslations("Dashboard.admin.it");

  return (
    <div className="lg:col-span-5 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-outfit text-slate-900 tracking-tight flex items-center gap-2">
          <Plug className="text-primary h-5 w-5" />
          {t("apiIntegrations")}
        </h2>
        <Link href="/admin/settings/integrations" className="text-xs text-primary font-bold hover:underline">
          Configure
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
        {integrationStatuses.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 shadow-2xs">
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{item.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{item.service}</p>
                </div>
              </div>
              <Badge className={`${item.accent} font-black text-[10px] uppercase tracking-wider`}>
                {item.status}
              </Badge>
            </div>
          );
        })}

        <div className="pt-2 text-center">
          <Link href="/admin/settings/integrations" className="block w-full">
            <Button variant="outline" className="w-full h-10 rounded-xl text-xs font-bold text-slate-700 border-slate-200">
              Manage API Credentials & Secrets
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
