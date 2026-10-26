import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import api from "@/lib/api";
import { IntegrationDef, IntegrationParam, isSecret, MASKED } from "./integrationTypes";
import { IntegrationFieldsForm } from "./IntegrationFieldsForm";

interface IntegrationCardProps {
  integration: IntegrationDef;
  params: Record<string, IntegrationParam>;
  onSaved: () => void;
}

export function IntegrationCard({ integration, params, onSaved }: IntegrationCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [saving, setSaving] = useState(false);

  const initialEdits = () => Object.fromEntries(
    integration.paramKeys.map((k) => [k, params[k] ? (isSecret(k) && params[k].is_configured ? MASKED : params[k].value) : ""])
  );
  const [edits, setEdits] = useState<Record<string, string>>(initialEdits);

  const configuredCount = integration.paramKeys.filter((k) => params[k]?.is_configured).length;
  const isFully = configuredCount === integration.paramKeys.length;
  const isPart = configuredCount > 0 && !isFully;

  const handleSave = async () => {
    setSaving(true);
    const failures: string[] = [];
    for (const key of integration.paramKeys) {
      const newVal = edits[key];
      if (newVal === MASKED || (!newVal && !params[key]?.is_configured)) continue;
      try {
        await api.patch(`/configurations/integrations/${key}/`, { value: newVal });
      } catch {
        failures.push(params[key]?.name ?? key);
      }
    }
    setSaving(false);
    onSaved();
    if (failures.length === 0) toast.success(`${integration.label} settings saved.`);
    else toast.error(`Failed to save: ${failures.join(", ")}`);
  };

  const Icon = integration.icon;

  return (
    <Card className="border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] rounded-[28px] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300">
      <button onClick={() => setExpanded((v) => !v)} className="w-full text-left" aria-expanded={expanded}>
        <CardHeader className="p-6 md:p-8 flex flex-row items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm" style={{ backgroundColor: integration.accentLight }}>
              <Icon size={26} style={{ color: integration.accent }} />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-xl font-black font-outfit text-slate-900 tracking-tight">{integration.label}</h3>
                {isFully ? <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] uppercase">✓ Configured</Badge> : isPart ? <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] uppercase">{configuredCount}/{integration.paramKeys.length} Set</Badge> : <Badge className="bg-slate-50 text-slate-500 border-slate-200 text-[10px] uppercase">Not Configured</Badge>}
              </div>
              <p className="text-slate-500 text-sm font-medium mt-1">{integration.tagline}</p>
            </div>
          </div>
          <div className="text-slate-400">{expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}</div>
        </CardHeader>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <CardContent className="px-6 md:px-8 pb-8 pt-0">
              <div className="h-px mb-6" style={{ backgroundColor: `${integration.accent}18` }} />
              <IntegrationFieldsForm
                integration={integration} params={params} edits={edits}
                saving={saving} configuredCount={configuredCount}
                handleEdit={(k, v) => setEdits((p) => ({ ...p, [k]: v }))}
                handleSave={handleSave}
              />
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
