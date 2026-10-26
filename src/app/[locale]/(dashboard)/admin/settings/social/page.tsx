"use client";

import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useSocialSettingsLogic } from "./_components/useSocialSettingsLogic";
import { SocialSettingsHeader } from "./_components/SocialSettingsHeader";
import { TwitterApiSection } from "./_components/TwitterApiSection";
import { MetaApiSection } from "./_components/MetaApiSection";
import { YouTubeApiSection } from "./_components/YouTubeApiSection";
import { SocialChannelsSection } from "./_components/SocialChannelsSection";
import { FloatingSaveBar } from "./_components/FloatingSaveBar";
import { SocialAccessRestricted } from "./_components/SocialAccessRestricted";

export default function SocialSettingsPage() {
  const { user } = useAuth();
  const isAdmin =
    user?.is_superuser ||
    user?.is_staff ||
    user?.role?.role_name?.toLowerCase().includes("admin") ||
    user?.role_name?.toLowerCase().includes("admin");

  const logic = useSocialSettingsLogic();
  const hasUnsaved = JSON.stringify(logic.settings) !== JSON.stringify(logic.initialSettings);

  if (!isAdmin && !logic.isLoading) {
    return <SocialAccessRestricted />;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      <SocialSettingsHeader
        isSaving={logic.isSaving}
        statusMessage={logic.statusMessage}
        onSave={logic.handleSave}
        onReset={logic.handleReset}
      />

      {logic.isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-64 w-full rounded-3xl" />
          <Skeleton className="h-96 w-full rounded-3xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          <TwitterApiSection
            twitterApi={logic.settings.twitterApi}
            isToggling={logic.isTogglingTwitter}
            isSaving={logic.isSaving}
            onToggle={logic.handleToggleTwitterApi}
            onUpdate={(up) => logic.setSettings((p) => ({ ...p, twitterApi: { ...(p.twitterApi || { enabled: false, bearerToken: "", username: "SUPKEM1", maxResults: 6 }), ...up } }))}
          />

          <MetaApiSection
            metaApi={logic.settings.metaApi}
            isToggling={logic.isTogglingMeta}
            isSaving={logic.isSaving}
            isTesting={logic.isTestingMeta}
            testResult={logic.metaTestResult}
            onToggle={logic.handleToggleMetaApi}
            onUpdate={(up) => logic.setSettings((p) => ({ ...p, metaApi: { ...(p.metaApi || { enabled: false, facebookPageId: "100079747610399", facebookAccessToken: "", instagramBusinessId: "", cacheDurationMinutes: 30 }), ...up } }))}
            onRunTest={logic.runMetaTest}
          />

          <YouTubeApiSection
            youtubeApi={logic.settings.youtubeApi}
            isToggling={logic.isTogglingYt}
            isSaving={logic.isSaving}
            isTesting={logic.isTestingYt}
            testResult={logic.ytTestResult}
            onToggle={logic.handleToggleYoutubeApi}
            onUpdate={(up) => logic.setSettings((p) => ({ ...p, youtubeApi: { ...(p.youtubeApi || { enabled: true, apiKey: "", channelId: "", searchQuery: "SUPKEM Kenya", maxResults: 6 }), ...up } }))}
            onRunTest={logic.runYouTubeTest}
          />

          <SocialChannelsSection
            channels={logic.settings.channels}
            togglingChannelId={logic.togglingChannelId}
            onToggle={logic.toggleChannel}
            onUpdate={logic.updateChannel}
            onDelete={logic.deleteChannel}
            onAdd={logic.addCustomChannel}
          />
        </div>
      )}

      <FloatingSaveBar
        hasUnsavedChanges={hasUnsaved}
        isSaving={logic.isSaving}
        onReset={logic.handleReset}
        onSave={logic.handleSave}
      />
    </div>
  );
}
