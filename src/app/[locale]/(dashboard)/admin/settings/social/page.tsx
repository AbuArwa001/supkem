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
  WidgetProvider,
} from "@/lib/socialSettings";

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
  const [showPreview, setShowPreview] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  // New channel form state
  const [isAddingChannel, setIsAddingChannel] = useState(false);
  const [newChannelName, setNewChannelName] = useState("");
  const [newChannelHandle, setNewChannelHandle] = useState("");
  const [newChannelUrl, setNewChannelUrl] = useState("");

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

    try {
      const res = await fetch("/api/social-settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        const data = await res.json();
        setSettings(data.settings);
        setInitialSettings(data.settings);
        setStatusMessage({
          type: "success",
          text: "Social media and Tagembed configurations saved successfully! Changes are live immediately.",
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

  // Channel manipulation
  const toggleChannel = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      channels: prev.channels.map((ch) =>
        ch.id === id ? { ...ch, enabled: !ch.enabled } : ch
      ),
    }));
  };

  const updateChannel = (id: string, updates: Partial<SocialChannelConfig>) => {
    setSettings((prev) => ({
      ...prev,
      channels: prev.channels.map((ch) =>
        ch.id === id ? { ...ch, ...updates } : ch
      ),
    }));
  };

  const deleteChannel = (id: string) => {
    setSettings((prev) => ({
      ...prev,
      channels: prev.channels.filter((ch) => ch.id !== id),
    }));
  };

  const addCustomChannel = () => {
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

    setSettings((prev) => ({
      ...prev,
      channels: [...prev.channels, newChan],
    }));

    setNewChannelName("");
    setNewChannelHandle("");
    setNewChannelUrl("");
    setIsAddingChannel(false);
  };

  // Computed preview source
  const previewSrc = settings.widgetUrl
    ? settings.widgetUrl
    : settings.widgetId
    ? `https://widget.tagembed.com/${settings.widgetId}`
    : "";

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
          {/* CARD 1: TAGEMBED & SOCIAL WALL ENGINE                                   */}
          {/* ═══════════════════════════════════════════════════════════════════════ */}
          <Card className="rounded-3xl border border-slate-200/90 shadow-sm bg-white overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-emerald-50/50 to-transparent pb-6 border-b border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Radio className="w-5 h-5 text-emerald-600" />
                    <CardTitle className="text-xl font-bold font-outfit text-slate-900">
                      Live Social Wall Integration
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm text-slate-500">
                    Control the live external social media aggregator on the Home and News pages.
                  </CardDescription>
                </div>

                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm">
                  <span className="text-xs font-bold text-slate-700">Live Wall Active</span>
                  <Switch
                    checked={settings.isEnabled}
                    onCheckedChange={(val) =>
                      setSettings((prev) => ({ ...prev, isEnabled: val }))
                    }
                  />
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Provider Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Aggregator Engine Provider
                  </label>
                  <select
                    value={settings.provider}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        provider: e.target.value as WidgetProvider,
                      }))
                    }
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="tagembed">Tagembed (Recommended)</option>
                    <option value="wallsio">Walls.io</option>
                    <option value="taggbox">Taggbox</option>
                    <option value="curator">Curator.io</option>
                    <option value="iframe">Custom Iframe Embed</option>
                    <option value="native">Native Blended Feed Only (No Widget)</option>
                  </select>
                  <p className="text-xs text-slate-400">
                    Select your active aggregator provider or choose Native to only display SUPKEM news blends.
                  </p>
                </div>

                {/* Default Public View Mode */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Default User View Mode
                  </label>
                  <select
                    value={settings.defaultView}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        defaultView: e.target.value as "widget" | "grid",
                      }))
                    }
                    className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="widget">Live Aggregator Widget</option>
                    <option value="grid">Dynamic Curated Grid</option>
                  </select>
                  <p className="text-xs text-slate-400">
                    Visitors can always toggle between modes using the buttons on the wall header.
                  </p>
                </div>

                {/* Widget ID Input */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      Tagembed Widget ID
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowGuide(!showGuide)}
                      className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold inline-flex items-center gap-1"
                    >
                      <HelpCircle size={13} /> Where do I find this?
                    </button>
                  </div>
                  <Input
                    placeholder="e.g. 2144784 or 9748413f-9892-4546-8390-722f65d9851a"
                    value={settings.widgetId}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        widgetId: e.target.value.trim(),
                      }))
                    }
                    className="h-11 rounded-xl text-sm font-mono"
                  />
                  <p className="text-xs text-slate-400">
                    Copy the ID from your Tagembed embed snippet (<code className="bg-slate-100 px-1 py-0.5 rounded text-slate-700">data-widget-id</code>).
                  </p>
                </div>

                {/* Direct Embed URL (Optional override) */}
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Custom Embed URL (Optional Override)
                  </label>
                  <Input
                    placeholder="e.g. https://widget.tagembed.com/2144784"
                    value={settings.widgetUrl}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        widgetUrl: e.target.value.trim(),
                      }))
                    }
                    className="h-11 rounded-xl text-sm font-mono"
                  />
                  <p className="text-xs text-slate-400">
                    Optional direct URL to override standard widget URL formatting.
                  </p>
                </div>
              </div>

              {/* Tagembed Quick Guide Accordion */}
              {showGuide && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-xs text-slate-700 space-y-3"
                >
                  <div className="font-bold text-sm text-emerald-900 flex items-center gap-2">
                    <HelpCircle size={16} className="text-emerald-600" />
                    How to Get Your Tagembed Widget ID:
                  </div>
                  <ol className="list-decimal pl-5 space-y-1.5 leading-relaxed text-slate-600">
                    <li>Log in to your <strong>Tagembed Dashboard</strong>.</li>
                    <li>Click <strong>Content Gallery</strong> → <strong>Add feed</strong> to connect your official Twitter/X, Facebook, or Instagram.</li>
                    <li>Click the blue <strong>Publish</strong> or <strong>Customize & Publish</strong> button.</li>
                    <li>Click <strong>Embed Widget</strong> → choose <strong>Other</strong> or <strong>HTML</strong>.</li>
                    <li>
                      Look at the code snippet: <code className="bg-white px-1.5 py-0.5 rounded border border-emerald-200 text-emerald-800">data-widget-id=&quot;XXXXXX&quot;</code>.
                    </li>
                    <li>Copy that value into the <strong>Tagembed Widget ID</strong> field above and click <strong>Save Changes</strong>!</li>
                  </ol>
                </motion.div>
              )}

              {/* Live Preview Toggle & Box */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-800 flex items-center gap-2">
                    <Eye size={16} className="text-slate-500" /> Live Widget Preview
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                    className="text-xs font-semibold text-slate-600 gap-1.5"
                  >
                    {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
                    {showPreview ? "Hide Preview" : "Show Preview"}
                  </Button>
                </div>

                {showPreview && (
                  <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-50 p-2">
                    {previewSrc ? (
                      <iframe
                        src={previewSrc}
                        className="w-full h-[500px] rounded-xl border-0 bg-white"
                        title="Live Tagembed Preview"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="py-16 text-center text-slate-400 space-y-2">
                        <AlertCircle className="w-8 h-8 mx-auto text-slate-300" />
                        <p className="text-sm font-medium">No Widget ID or URL configured yet.</p>
                        <p className="text-xs">Enter your Tagembed Widget ID above to preview it here.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* ═══════════════════════════════════════════════════════════════════════ */}
          {/* CARD 2: OFFICIAL SOCIAL CHANNELS & HANDLES                              */}
          {/* ═══════════════════════════════════════════════════════════════════════ */}
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

                <Button
                  type="button"
                  size="sm"
                  onClick={() => setIsAddingChannel(!isAddingChannel)}
                  className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 text-xs font-bold rounded-xl shadow-sm"
                >
                  <Plus size={15} /> Add Custom Channel
                </Button>
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
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-800">
                              {channel.name}
                            </span>
                            {channel.enabled ? (
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
    </div>
  );
}
