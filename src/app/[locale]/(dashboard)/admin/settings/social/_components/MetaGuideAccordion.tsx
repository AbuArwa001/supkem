import React from "react";
import { motion } from "framer-motion";
import { HelpCircle, ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

interface MetaGuideAccordionProps {
  isOpen: boolean;
}

export function MetaGuideAccordion({ isOpen }: MetaGuideAccordionProps) {
  const t = useTranslations("Dashboard.admin.settings.social");

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-xs text-slate-700 space-y-3"
    >
      <div className="font-bold text-sm text-blue-950 flex items-center gap-2">
        <HelpCircle size={16} className="text-blue-600" />
        {t("meta.guideTitle")}
      </div>
      <ol className="list-decimal pl-5 rtl:pl-0 rtl:pr-5 space-y-2 leading-relaxed text-slate-700">
        <li>
          Visit <strong>Meta for Developers</strong> at{" "}
          <a
            href="https://developers.facebook.com/tools/explorer/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 font-bold underline inline-flex items-center gap-0.5"
          >
            developers.facebook.com/tools/explorer <ExternalLink size={11} />
          </a>
        </li>
        <li>
          In the top right, under <strong>Meta App</strong>, choose your app (or click <em>Create App</em> &gt; <em>Other</em> &gt; <em>Business</em>).
        </li>
        <li>
          Under <strong>User or Page</strong>, choose <strong>Get Page Access Token</strong> and select <strong>Supreme Council of Kenya Muslims</strong>.
        </li>
        <li>
          Under <strong>Permissions</strong>, ensure these 3 scopes are added:
          <div className="flex flex-wrap gap-1.5 my-1.5">
            <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 text-blue-800 font-bold">pages_read_engagement</code>
            <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 text-blue-800 font-bold">pages_read_user_content</code>
            <code className="bg-white px-1.5 py-0.5 rounded border border-blue-200 text-blue-800 font-bold">instagram_basic</code>
          </div>
        </li>
        <li>Click <strong>Generate Access Token</strong> and grant permissions as Page Admin.</li>
        <li>
          <em>(To make it permanent)</em>: Click info <strong>(i)</strong> next to token &gt; <strong>Open in Access Token Tool</strong> &gt; <strong>Extend Access Token</strong>.
        </li>
      </ol>
    </motion.div>
  );
}
