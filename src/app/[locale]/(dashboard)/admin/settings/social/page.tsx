"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  Save,
  RefreshCw,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  HelpCircle,
  Radio,
  Globe,
  Sliders,
  ShieldAlert,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";
import { useAuth } from "@/hooks/useAuth";
import {
  SocialMediaSettings,
  SocialChannelConfig,
  getDefaultSocialSettings,
} from "@/lib/socialSettings";
import Cookies from "js-cookie";

export default function SocialSettingsPage() {
  const { user } = useAuth();
  const isAdmin =
    user?.is_superuser ||
    user?.is_staff ||
    user?.role?.role_name?.toLowerCase().includes("admin") ||
    user?.role_name?.toLowerCase().includes("admin");

  const [settings, setSettings] = useState<SocialMediaSettings>(getDefaultSocialSettings());
  const [initialSettings, setInitialSettings] = useState<SocialMediaSettings>(getDefaultSocialSettings());
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [togglingChannelId, setTogglingChannelId] = useState<string | null>(null);
  const [isTogglingYt, setIsTogglingYt] = useState(false);
  const [isTogglingMeta, setIsTogglingMeta] = useState(false);
  // Twitter API state
  const [showTwitterToken, setShowTwitterToken] = useState(false);
  const [isTogglingTwitter, setIsTogglingTwitter] = useState(false);

  // Meta Direct API state
  const [showMetaToken, setShowMetaToken] = useState(false);
  const [showMetaGuide, setShowMetaGuide] = useState(false);
  const [isTestingMeta, setIsTestingMeta] = useState(false);
  const [metaTestResult, setMetaTestResult] = useState<{
    success: boolean;
    message: string;
    page?: any;
    instagram?: any;
  } | null>(null);

  // New channel form state
  const [isAddingChannel, setIsAddingChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelHandle, setNewChannelHandle] = useState("");
  const [newChannelUrl, setNewChannelUrl] = useState("");

  const handleTestMeta = async () => {
    setIsTestingMeta(true);
    setMetaTestResult(null);
    try {
      const res = await fetch("/api/meta-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          facebookPageId: settings.metaApi?.facebookPageId || "",
          facebookAccessToken: settings.metaApi?.facebookAccessToken || "",
          instagramBusinessId: settings.metaApi?.instagramBusinessId || "",
        }),
      });
      const data = await res.json();
      setMetaTestResult(data);
    } catch (err: any) {
      setMetaTestResult({
        success: false,
        message: "Failed to run Meta diagnostic test: " + (err?.message || "Network error"),
      });
    } finally {
      setIsTestingMeta(false);
    }
  };
  // YouTube Data API state
  const [showYtApiKey, setShowYtApiKey] = useState(false);
  const [isTestingYt, setIsTestingYt] = useState(false);
  const [ytTestResult, setYtTestResult] = useState<{
    success: boolean;
    message: string;
    channel?: any;
  } | null>(null);

  const handleTestYouTube = async () => {
    setIsTestingYt(true);
    setYtTestResult(null);
    try {
      const res = await fetch("/api/youtube-test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          apiKey: settings.youtubeApi?.apiKey || "",
          channelId: settings.youtubeApi?.channelId || "",
        }),
      });
      const data = await res.json();
      setYtTestResult(data);
    } catch (err: any) {
      setYtTestResult({
        success: false,
        message: "Failed to run YouTube diagnostic test: " + (err?.message || "Network error"),
      });
    } finally {
      setIsTestingYt(false);
    }
  };

  // Load existing settings on mount
  useEffect(() => {
    async function loadSettings() {
      setIsLoading(true);
      try {
        const res = await fetch("/api/social-settings");
        if (res.ok) {
          const data = await res.json();
          if (data?.settings) {
            setSettings(data.settings);
            setInitialSettings(data.settings);
          }
        }
      } catch (err) {
        console.error("Failed to load social settings:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadSettings();
  }, []);

  const hasUnsavedChanges = JSON.stringify(settings) !== JSON.stringify(initialSettings);

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMessage(null);

    const token = Cookies.get("access_token");
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
      const res = await fetch("/api/social-settings", {
        method: "POST",
        headers,
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        setInitialSettings(data.settings);
        setStatusMessage({
          type: "success",
          text: "Social media and aggregator configurations saved successfully! Changes are live immediately.",
        });
      } else {
        const errData = await res.json();
        throw new Error(errData?.error || "Failed to save settings");
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "An error occurred while saving. Please try again.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (confirm("Reset social settings back to defaults?")) {
      const defaults = getDefaultSocialSettings();
      setSettings(defaults);
    }
  };

  // Central settings persistence helper with instant feedback
  const persistSettings = async (
    updated: SocialMediaSettings,
    successMessage?: string
  ): Promise<boolean> => {
    const token = Cookies.get("access_token");
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
      const res = await fetch("/api/social-settings", {
        method: "POST",
        headers,
        body: JSON.stringify(updated),
      });

      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        setInitialSettings(data.settings);
        if (successMessage) {
          setStatusMessage({
            type: "success",
            text: successMessage,
          });
        }
        return true;
      } else {
        const errData = await res.json().catch(() => null);
        throw new Error(errData?.error || "Failed to persist social settings");
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err?.message || "Failed to update settings. Please try again.",
      });
      return false;
    }
  };

  // Instant 1-click toggle for Twitter API
  const handleToggleTwitterApi = async (enabled: boolean) => {
    setIsTogglingTwitter(true);
    const updated = {
      ...settings,
      twitterApi: {
        ...(settings.twitterApi || {
          enabled: false,
          bearerToken: "",
          username: "SUPKEM1",
          maxResults: 6,
        }),
        enabled,
      },
    };
    setSettings(updated);
    try {
      await persistSettings(
        updated,
        enabled
          ? "✅ Twitter (X) API Ingestion is now ACTIVE!"
          : "⏸️ Twitter (X) API Ingestion is now DISABLED."
      );
    } finally {
      setIsTogglingTwitter(false);
    }
  };

  // Instant 1-click toggle for YouTube Video Stream
  const handleToggleYoutubeApi = async (enabled: boolean) => {
    setIsTogglingYt(true);
    const updated = {
      ...settings,
      youtubeApi: {
        ...(settings.youtubeApi || {
          apiKey: "",
          channelId: "",
          searchQuery: "SUPKEM Kenya",
          maxResults: 6,
        }),
        enabled,
      },
    };
    setSettings(updated);
    try {
      await persistSettings(
        updated,
        enabled
          ? "✅ YouTube Video Stream is now ACTIVE and streaming official videos to the social wall!"
          : "⏸️ YouTube Video Stream is now DISABLED. Official video streaming is paused."
      );
    } finally {
      setIsTogglingYt(false);
    }
  };

  // Instant 1-click toggle for Direct Meta API
  const handleToggleMetaApi = async (enabled: boolean) => {
    setIsTogglingMeta(true);
    const updated = {
      ...settings,
      metaApi: {
        ...(settings.metaApi || {
          facebookPageId: "100079747610399",
          facebookAccessToken: "",
          instagramBusinessId: "",
          cacheDurationMinutes: 30,
        }),
        enabled,
      },
    };
    setSettings(updated);
    try {
      await persistSettings(
        updated,
        enabled
          ? "✅ Direct Meta API is now ACTIVE for Facebook & Instagram!"
          : "⏸️ Direct Meta API is now DISABLED."
      );
    } finally {
      setIsTogglingMeta(false);
    }
  };

  // Channel manipulation with instant auto-save
  const toggleChannel = async (id: string) => {
    const target = settings.channels.find((ch) => ch.id === id);
    if (!target) return;
    const nextEnabled = !target.enabled;

    setTogglingChannelId(id);
    const updatedChannels = settings.channels.map((ch) =>
      ch.id === id ? { ...ch, enabled: nextEnabled } : ch
    );
    const updated = { ...settings, channels: updatedChannels };
    setSettings(updated);

    try {
      const ok = await persistSettings(
        updated,
        nextEnabled
          ? `✅ ${target.name} channel enabled! Now active across the website, footer, and social wall.`
          : `⏸️ ${target.name} channel disabled! Hidden from the website, footer, and social wall.`
      );
      if (!ok) {
        // Rollback on failure
        setSettings((prev) => ({
          ...prev,
          channels: prev.channels.map((ch) =>
            ch.id === id ? { ...ch, enabled: target.enabled } : ch
          ),
        }));
      }
    } finally {
      setTogglingChannelId(null);
    }
  };

  const updateChannel = (id: string, updates: Partial<SocialChannelConfig>) => {
    setSettings((prev) => ({
      ...prev,
      channels: prev.channels.map((ch) =>
        ch.id === id ? { ...ch, ...updates } : ch
      ),
    }));
  };

  const deleteChannel = async (id: string) => {
    const target = settings.channels.find((ch) => ch.id === id);
    if (!confirm(`Are you sure you want to remove "${target?.name || id}"?`)) return;

    const updatedChannels = settings.channels.filter((ch) => ch.id !== id);
    const updated = { ...settings, channels: updatedChannels };
    setSettings(updated);
    await persistSettings(updated, `🗑️ ${target?.name || id} channel has been removed.`);
  };

  const addCustomChannel = async () => {
    if (!newChannelName.trim() || !newChannelUrl.trim()) return;

    const id = newChannelName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    const newChan: SocialChannelConfig = {
      id: id || `custom-${Date.now()}`,
      name: newChannelName.trim(),
      handle: newChannelHandle.trim() || newChannelName.trim(),
      url: newChannelUrl.trim(),
      enabled: true,
      color: "#059669",
      bgClass: "bg-emerald-600 text-white",
      badgeClass: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
    };

    const updated = {
      ...settings,
      channels: [...settings.channels, newChan],
    };
    setSettings(updated);
    setNewChannelName("");
    setNewChannelHandle("");
    setNewChannelUrl("");
    setIsAddingChannel(false);

    await persistSettings(
      updated,
      `✅ New channel "${newChan.name}" added and activated successfully!`
    );
  };



  if (!isAdmin && !isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
        <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto border border-rose-200">
          <ShieldAlert size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Super Admin Access Required</h2>
        <p className="text-slate-500 max-w-md mx-auto">
          You need Super Admin or Staff privileges to configure social media feeds and third-party aggregator integrations.
        </p>
        <Link href="/admin/settings">
          <Button variant="outline" className="mt-4 gap-2">
            <ArrowLeft size={16} /> Back to Settings
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/settings"
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
            >
              <ArrowLeft size={20} />
            </Link>
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200/50">
              <Share2 size={22} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-outfit text-slate-900 tracking-tight">
              Social Media & Aggregator
            </h1>
          </div>
          <p className="text-sm text-slate-500 pl-11">
            Configure live Tagembed wall, toggle handles, and update official social media links without editing code.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 pl-11 sm:pl-0">
          {hasUnsavedChanges && (
            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-300 animate-pulse text-xs">
              Unsaved Changes
            </Badge>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={isSaving || isLoading}
            className="text-slate-600 hover:text-slate-900 text-xs"
          >
            Reset
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || isLoading || !hasUnsavedChanges}
            className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 shadow-md shadow-emerald-600/20 text-xs font-bold"
          >
            {isSaving ? (
              <>
                <RefreshCw size={14} className="animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save size={14} /> Save Changes
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Status Alert Notification */}
      <AnimatePresence>
        {statusMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-2xl flex items-center gap-3 border shadow-sm ${
              statusMessage.type === "success"
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-rose-50 border-rose-200 text-rose-800"
            }`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            )}
            <span className="text-sm font-medium">{statusMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading ? (
        <div className="space-y-6">
          <Skeleton className="h-64 w-full rounded-3xl" />
          <Skeleton className="h-96 w-full rounded-3xl" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8">
          {/* ═══════════════════════════════════════════════════════════════════════ */}
          {/* CARD 1: DIRECT TWITTER (X) API                                        */}
          {/* ═══════════════════════════════════════════════════════════════════════ */}
          <Card className="rounded-3xl border border-slate-200/90 shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-slate-100/70 to-transparent pb-6 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[12px] font-bold shadow-sm ring-2 ring-white">
                      𝕏
                    </div>
                    <CardTitle className="text-xl font-bold font-outfit text-slate-900">
                      Direct Twitter (X) API
                    </CardTitle>
                    <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200 text-[10px] py-0 font-semibold">
                      v2 API
                    </Badge>
                  </div>
                  <CardDescription className="text-sm text-slate-500">
                    Fetch official posts directly from SUPKEM's verified Twitter/X account via the official X API v2.
                  </CardDescription>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        Direct Ingestion
                        {isTogglingTwitter && (
                          <RefreshCw size={11} className="animate-spin text-slate-600" />
                        )}
                      </span>
                      <span
                        className={`text-[10px] font-semibold flex items-center gap-1 ${
                          settings.twitterApi?.enabled ? "text-emerald-600" : "text-slate-400"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            settings.twitterApi?.enabled
                              ? "bg-emerald-500 animate-pulse"
                              : "bg-slate-300"
                          }`}
                        />
                        {settings.twitterApi?.enabled ? "ACTIVE (Streaming Live)" : "INACTIVE"}
                      </span>
                    </div>
                    <Switch
                      checked={settings.twitterApi?.enabled ?? false}
                      onCheckedChange={handleToggleTwitterApi}
                      disabled={isTogglingTwitter || isSaving}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Username */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    X (Twitter) Username
                  </label>
                  <Input
                    placeholder="e.g. SUPKEM1"
                    value={settings.twitterApi?.username || ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        twitterApi: {
                          ...(prev.twitterApi || {
                            enabled: false,
                            bearerToken: "",
                            username: "SUPKEM1",
                            maxResults: 6,
                          }),
                          username: e.target.value.replace(/^@/, "").trim(),
                        },
                      }))
                    }
                    className="h-11 rounded-xl text-sm font-mono"
                  />
                  <p className="text-xs text-slate-400">
                    Without the @ symbol. Default is <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">SUPKEM1</code>.
                  </p>
                </div>

                {/* API Bearer Token */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      X API v2 Bearer Token
                    </label>
                  </div>
                  <div className="relative">
                    <Input
                      type={showTwitterToken ? "text" : "password"}
                      placeholder="AAAAAAAAAAAAAAAAAAAAA..."
                      value={settings.twitterApi?.bearerToken || ""}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          twitterApi: {
                            ...(prev.twitterApi || {
                              enabled: false,
                              username: "SUPKEM1",
                              maxResults: 6,
                            }),
                            bearerToken: e.target.value.trim(),
                          },
                        }))
                      }
                      className="h-11 rounded-xl text-sm font-mono pr-20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowTwitterToken(!showTwitterToken)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 p-1 font-medium"
                    >
                      {showTwitterToken ? "Hide" : "Show"}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">
                    Generated from your X Developer Portal project.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ═══════════════════════════════════════════════════════════════════════ */}
          {/* CARD 2: DIRECT META GRAPH API (FACEBOOK & INSTAGRAM)                   */}
          {/* ═══════════════════════════════════════════════════════════════════════ */}
          <Card className="rounded-3xl border border-slate-200/90 shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50/70 via-pink-50/40 to-transparent pb-6 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5 items-center">
                      <div className="w-6 h-6 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[10px] font-bold shadow-sm ring-2 ring-white">
                        f
                      </div>
                      <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center text-[10px] font-bold shadow-sm ring-2 ring-white">
                        IG
                      </div>
                    </div>
                    <CardTitle className="text-xl font-bold font-outfit text-slate-900">
                      Direct Meta API (Facebook & Instagram)
                    </CardTitle>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] py-0 font-semibold">
                      No Aggregator Needed
                    </Badge>
                  </div>
                  <CardDescription className="text-sm text-slate-500">
                    Fetch official posts and high-res media directly from SUPKEM's verified Facebook Page and Instagram Business account via official Meta Graph API.
                  </CardDescription>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        Direct Ingestion
                        {isTogglingMeta && (
                          <RefreshCw size={11} className="animate-spin text-blue-600" />
                        )}
                      </span>
                      <span
                        className={`text-[10px] font-semibold flex items-center gap-1 ${
                          settings.metaApi?.enabled ? "text-blue-600" : "text-slate-400"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            settings.metaApi?.enabled
                              ? "bg-blue-500 animate-pulse"
                              : "bg-slate-300"
                          }`}
                        />
                        {settings.metaApi?.enabled ? "ACTIVE (Streaming Live)" : "INACTIVE"}
                      </span>
                    </div>
                    <Switch
                      checked={settings.metaApi?.enabled ?? false}
                      onCheckedChange={handleToggleMetaApi}
                      disabled={isTogglingMeta || isSaving}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Facebook Page ID */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Facebook Page ID
                  </label>
                  <Input
                    placeholder="e.g. 100079747610399"
                    value={settings.metaApi?.facebookPageId || ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        metaApi: {
                          ...(prev.metaApi || {
                            enabled: false,
                            facebookAccessToken: "",
                            instagramBusinessId: "",
                            cacheDurationMinutes: 30,
                          }),
                          facebookPageId: e.target.value.trim(),
                        },
                      }))
                    }
                    className="h-11 rounded-xl text-sm font-mono"
                  />
                  <p className="text-xs text-slate-400">
                    Default: <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">100079747610399</code> (Supreme Council of Kenya Muslims).
                  </p>
                </div>

                {/* Instagram Business Account ID */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Instagram Business Account ID (Optional)
                  </label>
                  <Input
                    placeholder="e.g. 17841405309211844 (or leave blank if linked)"
                    value={settings.metaApi?.instagramBusinessId || ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        metaApi: {
                          ...(prev.metaApi || {
                            enabled: false,
                            facebookPageId: "100079747610399",
                            facebookAccessToken: "",
                            cacheDurationMinutes: 30,
                          }),
                          instagramBusinessId: e.target.value.trim(),
                        },
                      }))
                    }
                    className="h-11 rounded-xl text-sm font-mono"
                  />
                  <p className="text-xs text-slate-400">
                    If connected to your Facebook Page, this can also be auto-detected by Meta!
                  </p>
                </div>

                {/* Meta Page Access Token */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Meta Graph Page Access Token
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowMetaGuide(!showMetaGuide)}
                      className="text-xs text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1"
                    >
                      <HelpCircle size={13} /> How to get this permanent token in 3 steps
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      type={showMetaToken ? "text" : "password"}
                      placeholder="EAAG... (Meta Long-Lived Page Access Token)"
                      value={settings.metaApi?.facebookAccessToken || ""}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          metaApi: {
                            ...(prev.metaApi || {
                              enabled: false,
                              facebookPageId: "100079747610399",
                              instagramBusinessId: "",
                              cacheDurationMinutes: 30,
                            }),
                            facebookAccessToken: e.target.value.trim(),
                          },
                        }))
                      }
                      className="h-11 rounded-xl text-sm font-mono pr-20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowMetaToken(!showMetaToken)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 p-1 font-medium"
                    >
                      {showMetaToken ? "Hide" : "Show"}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">
                    This token allows your server to read public posts, photos, and engagement metrics safely without user authentication.
                  </p>
                </div>
              </div>

              {/* Meta Step-by-Step Guide Accordion */}
              {showMetaGuide && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-xs text-slate-700 space-y-3"
                >
                  <div className="font-bold text-sm text-blue-950 flex items-center gap-2">
                    <HelpCircle size={16} className="text-blue-600" />
                    How to generate a Permanent Meta Page Access Token (100% Free):
                  </div>
                  <ol className="list-decimal pl-5 space-y-2 leading-relaxed text-slate-700">
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
                    <li>
                      Click <strong>Generate Access Token</strong> and grant permissions as Page Admin.
                    </li>
                    <li>
                      <em>(To make it never expire)</em>: Click the small circular <strong>(i)</strong> info icon next to the Access Token &gt; click <strong>Open in Access Token Tool</strong> &gt; click <strong>Extend Access Token</strong>. Paste the resulting permanent token above!
                    </li>
                  </ol>
                </motion.div>
              )}

              {/* Diagnostic Test Tool */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Connection Diagnostics</h4>
                  <p className="text-xs text-slate-400">
                    Verify that your Meta token is valid and can communicate with Facebook &amp; Instagram.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleTestMeta}
                  disabled={isTestingMeta || !settings.metaApi?.facebookAccessToken}
                  className="bg-white hover:bg-slate-50 border-slate-200 text-slate-700 text-xs font-bold gap-2"
                >
                  <RefreshCw size={13} className={isTestingMeta ? "animate-spin text-blue-600" : "text-slate-500"} />
                  {isTestingMeta ? "Verifying with Meta..." : "Test Meta Connection"}
                </Button>
              </div>

              {/* Test Result Feedback */}
              {metaTestResult && (
                <div
                  className={`p-4 rounded-2xl text-xs space-y-1.5 border ${
                    metaTestResult.success
                      ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                      : "bg-rose-50 border-rose-200 text-rose-900"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {metaTestResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                    )}
                    <span>{metaTestResult.message}</span>
                  </div>

                  {metaTestResult.page && (
                    <div className="pt-2 border-t border-emerald-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                      <div>
                        <strong>Connected Facebook Page:</strong> {metaTestResult.page.name}
                      </div>
                      {metaTestResult.page.username && (
                        <div>
                          <strong>Username:</strong> @{metaTestResult.page.username}
                        </div>
                      )}
                      {metaTestResult.instagram && (
                        <div className="sm:col-span-2 text-pink-700 font-semibold">
                          Connected Instagram: @{metaTestResult.instagram.username} (ID: {metaTestResult.instagram.id})
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* ═══════════════════════════════════════════════════════════════════════ */}
          {/* CARD 3: YOUTUBE DATA API (OFFICIAL VIDEO BROADCASTS)                    */}
          {/* ═══════════════════════════════════════════════════════════════════════ */}
          <Card className="rounded-3xl border border-slate-200/90 shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-50/70 to-transparent pb-6 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-[11px] font-black shadow-sm">
                      ▶
                    </div>
                    <CardTitle className="text-xl font-bold font-outfit text-slate-900">
                      YouTube Data API (Official Videos)
                    </CardTitle>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-[10px] py-0 font-semibold">
                      Google Data API v3
                    </Badge>
                  </div>
                  <CardDescription className="text-sm text-slate-500">
                    Stream official video briefings and announcements from SUPKEM directly on the social wall with interactive playback.
                  </CardDescription>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-red-600 hover:bg-red-700 text-white gap-1.5 text-xs font-bold rounded-xl shadow-sm hidden sm:inline-flex"
                  >
                    <Save size={13} /> Save YouTube Settings
                  </Button>

                  <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        Video Stream
                        {isTogglingYt && (
                          <RefreshCw size={11} className="animate-spin text-red-600" />
                        )}
                      </span>
                      <span
                        className={`text-[10px] font-semibold flex items-center gap-1 ${
                          settings.youtubeApi?.enabled ? "text-red-600" : "text-slate-400"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            settings.youtubeApi?.enabled
                              ? "bg-red-500 animate-pulse"
                              : "bg-slate-300"
                          }`}
                        />
                        {settings.youtubeApi?.enabled ? "ACTIVE (Streaming Live)" : "INACTIVE"}
                      </span>
                    </div>
                    <Switch
                      checked={settings.youtubeApi?.enabled ?? true}
                      onCheckedChange={handleToggleYoutubeApi}
                      disabled={isTogglingYt || isSaving}
                    />
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* YouTube API Key */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Google Cloud YouTube Data API Key
                    </label>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 size={13} /> 10,000 free requests/day
                    </span>
                  </div>
                  <div className="relative">
                    <Input
                      type={showYtApiKey ? "text" : "password"}
                      placeholder="Enter YouTube Data API key (or configure YOUTUBE_API_KEY in .env)"
                      value={settings.youtubeApi?.apiKey || ""}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          youtubeApi: {
                            ...(prev.youtubeApi || {
                              enabled: true,
                              channelId: "",
                              searchQuery: "SUPKEM Kenya",
                              maxResults: 6,
                            }),
                            apiKey: e.target.value.trim(),
                          },
                        }))
                      }
                      className="h-11 rounded-xl text-sm font-mono pr-20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowYtApiKey(!showYtApiKey)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 p-1 font-medium"
                    >
                      {showYtApiKey ? "Hide" : "Show"}
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">
                    Generated from your Google Cloud Console project with YouTube Data API v3 enabled. Can also be set securely in <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">.env.local</code>.
                  </p>
                </div>

                {/* Channel ID */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Official YouTube Channel ID
                  </label>
                  <Input
                    placeholder="e.g. UCNbBcq2UNZahLtzrnyabhow"
                    value={settings.youtubeApi?.channelId || ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        youtubeApi: {
                          ...(prev.youtubeApi || {
                            enabled: true,
                            apiKey: "",
                            searchQuery: "SUPKEM Kenya",
                            maxResults: 6,
                          }),
                          channelId: e.target.value.trim(),
                        },
                      }))
                    }
                    className="h-11 rounded-xl text-sm font-mono"
                  />
                  <p className="text-xs text-slate-400">
                    Your official YouTube Channel ID (or configure via <code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">YOUTUBE_CHANNEL_ID</code> in environment).
                  </p>
                </div>

                {/* Search Query Fallback */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Search Query Fallback
                  </label>
                  <Input
                    placeholder="e.g. SUPKEM Kenya"
                    value={settings.youtubeApi?.searchQuery || ""}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        youtubeApi: {
                          ...(prev.youtubeApi || {
                            enabled: true,
                            apiKey: "",
                            channelId: "",
                            maxResults: 6,
                          }),
                          searchQuery: e.target.value,
                        },
                      }))
                    }
                    className="h-11 rounded-xl text-sm"
                  />
                  <p className="text-xs text-slate-400">
                    Used to fetch national press briefings when channel uploads are quiet.
                  </p>
                </div>
              </div>

              {/* Diagnostic Test Tool */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Connection Diagnostics</h4>
                  <p className="text-xs text-slate-400">
                    Verify that your Google API key connects to YouTube and checks channel status.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleTestYouTube}
                  disabled={isTestingYt || !settings.youtubeApi?.apiKey}
                  className="bg-white hover:bg-slate-50 border-slate-200 text-slate-700 text-xs font-bold gap-2"
                >
                  <RefreshCw size={13} className={isTestingYt ? "animate-spin text-red-600" : "text-slate-500"} />
                  {isTestingYt ? "Verifying with YouTube..." : "Test YouTube Connection"}
                </Button>
              </div>

              {/* Test Result Feedback */}
              {ytTestResult && (
                <div
                  className={`p-4 rounded-2xl text-xs space-y-1.5 border ${
                    ytTestResult.success
                      ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                      : "bg-rose-50 border-rose-200 text-rose-900"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {ytTestResult.success ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                    )}
                    <span>{ytTestResult.message}</span>
                  </div>

                  {ytTestResult.channel && (
                    <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-slate-700">
                      <div>
                        <strong>Connected Channel:</strong> {ytTestResult.channel.title} (ID: {ytTestResult.channel.id})
                      </div>
                      {ytTestResult.channel.videoCount !== undefined && (
                        <div className="text-slate-600 font-semibold">
                          {ytTestResult.channel.videoCount} Videos Indexed
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-slate-200/90 shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-blue-50/50 to-transparent pb-6 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-xl font-bold font-outfit text-slate-900">
                      Official Social Media Channels
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm text-slate-500">
                    Add, edit, disable, or redirect official social handles shown across the website, footer, and community feed.
                  </CardDescription>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1.5 text-xs font-bold rounded-xl shadow-sm hidden sm:inline-flex"
                  >
                    <Save size={13} /> Save Channels
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => setIsAddingChannel(!isAddingChannel)}
                    className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 text-xs font-bold rounded-xl shadow-sm"
                  >
                    <Plus size={15} /> Add Custom Channel
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 space-y-6">
              {/* Add Custom Channel Drawer */}
              {isAddingChannel && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4"
                >
                  <h4 className="text-sm font-bold text-slate-800">Add New Social Channel</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Input
                      placeholder="Network Name (e.g. LinkedIn, WhatsApp)"
                      value={newChannelName}
                      onChange={(e) => setNewChannelName(e.target.value)}
                      className="text-xs"
                    />
                    <Input
                      placeholder="Handle / Label (e.g. @SUPKEM_Ke)"
                      value={newChannelHandle}
                      onChange={(e) => setNewChannelHandle(e.target.value)}
                      className="text-xs"
                    />
                    <Input
                      placeholder="Profile / Group URL"
                      value={newChannelUrl}
                      onChange={(e) => setNewChannelUrl(e.target.value)}
                      className="text-xs"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setIsAddingChannel(false)}
                      className="text-xs"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      onClick={addCustomChannel}
                      className="bg-blue-600 text-white text-xs"
                    >
                      Add Channel
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Channels List */}
              <div className="space-y-4">
                {settings.channels.map((channel) => (
                  <div
                    key={channel.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      channel.enabled
                        ? "bg-white border-slate-200 shadow-sm"
                        : "bg-slate-50/70 border-slate-200/60 opacity-60"
                    }`}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      {/* Left: Platform & Status */}
                      <div className="flex items-center gap-3 min-w-[200px]">
                        <Switch
                          checked={channel.enabled}
                          onCheckedChange={() => toggleChannel(channel.id)}
                          disabled={togglingChannelId === channel.id || isSaving}
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-800">
                              {channel.name}
                            </span>
                            {togglingChannelId === channel.id ? (
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 text-[10px] py-0 flex items-center gap-1">
                                <RefreshCw size={10} className="animate-spin" /> Saving...
                              </Badge>
                            ) : channel.enabled ? (
                              <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-[10px] py-0">
                                Active
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-slate-100 text-slate-500 border-slate-200 text-[10px] py-0">
                                Disabled
                              </Badge>
                            )}
                          </div>
                          <span className="text-xs text-slate-400 font-mono">
                            id: {channel.id}
                          </span>
                        </div>
                      </div>

                      {/* Middle: Inputs for Handle and URL */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                            Handle / Display Text
                          </label>
                          <Input
                            value={channel.handle}
                            onChange={(e) =>
                              updateChannel(channel.id, { handle: e.target.value })
                            }
                            className="h-9 text-xs rounded-lg"
                            placeholder="@handle"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                            Direct Profile / Page URL
                          </label>
                          <div className="flex items-center gap-1.5">
                            <Input
                              value={channel.url}
                              onChange={(e) =>
                                updateChannel(channel.id, { url: e.target.value })
                              }
                              className="h-9 text-xs rounded-lg flex-1"
                              placeholder="https://..."
                            />
                            {channel.url && (
                              <a
                                href={channel.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-all"
                                title="Open Link"
                              >
                                <ExternalLink size={14} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Right: Delete button for custom channels */}
                      {!["x", "facebook", "instagram", "tiktok", "youtube"].includes(channel.id) && (
                        <button
                          type="button"
                          onClick={() => deleteChannel(channel.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all self-end lg:self-center"
                          title="Delete Custom Channel"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Floating Sticky Save Bar (appears whenever there are unsaved text or settings changes) */}
      <AnimatePresence>
        {hasUnsavedChanges && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed bottom-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
          >
            <div className="bg-slate-900/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-4 pointer-events-auto max-w-xl w-full justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-semibold text-slate-200">
                  You have unsaved changes in settings
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleReset}
                  disabled={isSaving}
                  className="text-xs text-slate-300 hover:text-white hover:bg-slate-800 h-8"
                >
                  Discard
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold gap-1.5 shadow-lg shadow-emerald-600/30 h-8"
                >
                  {isSaving ? (
                    <RefreshCw size={13} className="animate-spin" />
                  ) : (
                    <Save size={13} />
                  )}
                  Save Changes
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
