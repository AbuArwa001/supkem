"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

const editorWrapperClass =
  "border border-border overflow-hidden focus-within:border-primary/20 transition-all " +
  "[&_.w-md-editor-toolbar]:overflow-x-auto [&_.w-md-editor-toolbar]:whitespace-nowrap " +
  "[&_.w-md-editor-toolbar>ul]:flex-nowrap [&_.w-md-editor-toolbar_li>button]:min-w-9 [&_.w-md-editor-toolbar_li>button]:h-9 " +
  "[&_.w-md-editor-text-input]:!text-base [&_.w-md-editor-text-pre>code]:!text-base [&_.w-md-editor-text]:!text-base";

interface NewsContentEditorsProps {
  content: string;
  contentAr: string;
  onChangeContent: (val: string) => void;
  onChangeContentAr: (val: string) => void;
}

export function NewsContentEditors({
  content,
  contentAr,
  onChangeContent,
  onChangeContentAr,
}: NewsContentEditorsProps) {
  const t = useTranslations("Dashboard.admin.news");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <>
      <div className="space-y-2">
        <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
          {t("contentLabel")}
        </label>
        <div data-color-mode="light" className={`${editorWrapperClass} rounded-2xl`}>
          <MDEditor
            value={content}
            onChange={(val) => onChangeContent(val || "")}
            preview="edit"
            height={isMobile ? 280 : 300}
            className="!border-none"
            textareaProps={{ placeholder: t("contentPlaceholder") }}
          />
        </div>
      </div>

      <div className="space-y-4 border border-dashed border-primary/20 rounded-2xl p-5 bg-primary/[0.01]">
        <p className="text-sm font-black text-primary uppercase tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          {t("arabicTranslation")}
        </p>

        <div className="space-y-2">
          <label className="text-sm font-bold text-primary/70 uppercase tracking-widest px-1">
            {t("contentAr")}
          </label>
          <div data-color-mode="light" className={`${editorWrapperClass} rounded-2xl`}>
            <MDEditor
              value={contentAr}
              onChange={(val) => onChangeContentAr(val || "")}
              preview="edit"
              height={isMobile ? 220 : 200}
              className="!border-none"
              textareaProps={{ placeholder: t("contentArPlaceholder"), dir: "rtl" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
