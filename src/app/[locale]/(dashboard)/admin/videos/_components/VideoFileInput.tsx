"use client";

import { Video as VideoIcon } from "lucide-react";
import { UploadProgress } from "@/components/UploadProgress";
import { formatBytes } from "@/lib/upload";
import { useTranslations } from "next-intl";

interface VideoFileInputProps {
  videoFile: File | null;
  onFileChange: (file: File | null) => void;
  isEditing: boolean;
  isSubmitting: boolean;
  uploadPercent?: number | null;
}

export function VideoFileInput({
  videoFile,
  onFileChange,
  isEditing,
  isSubmitting,
  uploadPercent = null,
}: VideoFileInputProps) {
  const t = useTranslations("Dashboard.admin.videos");

  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">
        {t("videoFile")}
      </label>
      <div className="relative group">
        <input
          type="file"
          accept="video/*"
          disabled={isSubmitting}
          required={!isEditing}
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
          className="hidden"
          id="video-upload"
        />
        <label
          htmlFor="video-upload"
          className="w-full px-6 py-4 bg-primary/[0.02] border border-dashed border-border group-hover:border-primary/50 rounded-2xl cursor-pointer flex flex-col items-center justify-center gap-3 text-foreground/40 font-bold transition-all min-h-[120px]"
        >
          <VideoIcon size={32} className="text-primary/30 group-hover:text-primary transition-colors" />
          <span className="text-center">
            {videoFile ? (
              <span className="text-primary break-all">
                {videoFile.name}
                <span className="block text-xs font-medium text-primary/60 mt-1">
                  {formatBytes(videoFile.size)}
                </span>
              </span>
            ) : isEditing ? (
              <span>{t("replaceVideo")}</span>
            ) : (
              <span>{t("browseVideo")}</span>
            )}
          </span>
        </label>
      </div>
      {uploadPercent !== null && (
        <UploadProgress
          percent={uploadPercent}
          label={uploadPercent >= 100 ? "Finalizing…" : "Uploading video…"}
          detail={
            videoFile
              ? `${formatBytes(Math.round((videoFile.size * uploadPercent) / 100))} of ${formatBytes(videoFile.size)} · keep this page open`
              : undefined
          }
        />
      )}
    </div>
  );
}
