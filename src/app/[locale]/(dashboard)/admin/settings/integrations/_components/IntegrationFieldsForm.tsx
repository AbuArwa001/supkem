import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { IntegrationDef, IntegrationParam, isSecret } from "./integrationTypes";
import { SecretInput } from "./SecretInput";
import { TestButton } from "./TestButton";

interface IntegrationFieldsFormProps {
  integration: IntegrationDef;
  params: Record<string, IntegrationParam>;
  edits: Record<string, string>;
  saving: boolean;
  configuredCount: number;
  handleEdit: (key: string, val: string) => void;
  handleSave: () => void;
}

export function IntegrationFieldsForm({
  integration, params, edits, saving, configuredCount, handleEdit, handleSave,
}: IntegrationFieldsFormProps) {
  const t = useTranslations("Dashboard.admin.settings.integrations");

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {integration.paramKeys.map((key) => {
          const param = params[key];
          return (
            <div key={key} className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                {param?.name ?? key} {param?.is_configured && <span className="text-emerald-500">✓</span>}
              </label>
              {isSecret(key) ? (
                <SecretInput value={edits[key] ?? ""} onChange={(v) => handleEdit(key, v)} placeholder={param?.is_configured ? "Leave blank to keep existing" : "Enter value…"} />
              ) : (
                <Input value={edits[key] ?? ""} onChange={(e) => handleEdit(key, e.target.value)} className="bg-slate-50 border-slate-200 focus:border-violet-400 font-mono text-sm" />
              )}
              {param?.description && <p className="text-[11px] text-slate-400 leading-relaxed">{param.description}</p>}
            </div>
          );
        })}
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-100">
        <TestButton serviceId={integration.id} disabled={configuredCount === 0} />
        <div className="flex items-center gap-3">
          <a href={integration.docsUrl} target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2">{t("viewDocs")}</a>
          <Button onClick={handleSave} disabled={saving} className="gap-2 font-bold text-white shadow-lg" style={{ background: `linear-gradient(135deg, ${integration.accent}, ${integration.accentDark})` }}>
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {t("saveIntegration", { label: integration.label })}
          </Button>
        </div>
      </div>
    </>
  );
}
