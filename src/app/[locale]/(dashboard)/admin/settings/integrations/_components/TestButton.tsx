import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import api from "@/lib/api";

export function TestButton({
  serviceId,
  disabled,
}: {
  serviceId: string;
  disabled: boolean;
}) {
  const t = useTranslations("Dashboard.admin.settings.integrations");
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  const runTest = async () => {
    setState("loading");
    setMsg("");
    try {
      const res = await api.get(`/configurations/integrations/test/${serviceId}/`);
      if (res.data.ok) {
        setState("ok");
        setMsg(res.data.message);
      } else {
        setState("error");
        setMsg(res.data.message);
      }
    } catch {
      setState("error");
      setMsg("Connection test failed.");
    }
    setTimeout(() => setState("idle"), 6000);
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={runTest}
        disabled={disabled || state === "loading"}
        className="gap-2 text-xs border-slate-200 hover:border-slate-300"
      >
        {state === "loading" ? (
          <Loader2 size={13} className="animate-spin" />
        ) : (
          <RefreshCw size={13} />
        )}
        {state === "loading" ? t("testing") : t("testConnection")}
      </Button>
      <AnimatePresence mode="wait">
        {state !== "idle" && state !== "loading" && (
          <motion.span
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            className={`flex items-center gap-1 text-xs font-medium ${
              state === "ok" ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {state === "ok" ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
            {msg}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
