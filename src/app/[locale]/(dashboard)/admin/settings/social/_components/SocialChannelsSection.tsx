import React, { useState } from "react";
import { Globe, Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SocialChannelConfig } from "@/lib/socialSettings";
import { SocialChannelItem } from "./SocialChannelItem";
import { AddCustomChannelModal } from "./AddCustomChannelModal";
import { useTranslations } from "next-intl";

interface SocialChannelsSectionProps {
  channels: SocialChannelConfig[];
  togglingChannelId: string | null;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<SocialChannelConfig>) => void;
  onDelete: (id: string) => void;
  onAdd: (name: string, handle: string, url: string) => void;
}

export function SocialChannelsSection({
  channels,
  togglingChannelId,
  onToggle,
  onUpdate,
  onDelete,
  onAdd,
}: SocialChannelsSectionProps) {
  const t = useTranslations("Dashboard.admin.settings.social");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Card className="rounded-3xl border border-slate-200/90 shadow-xs bg-white overflow-hidden">
      <CardHeader className="bg-linear-to-r from-blue-50/50 to-transparent pb-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              <CardTitle className="text-xl font-bold font-outfit text-slate-900">
                {t("channels.title")}
              </CardTitle>
            </div>
            <CardDescription className="text-sm text-slate-500">
              {t("channels.desc")}
            </CardDescription>
          </div>

          <Button
            type="button"
            size="sm"
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-1.5 text-xs font-bold rounded-xl shadow-xs"
          >
            <Plus size={15} /> {t("channels.addBtn")}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6 sm:p-8 space-y-4">
        {channels.map((channel) => (
          <SocialChannelItem
            key={channel.id}
            channel={channel}
            isToggling={togglingChannelId === channel.id}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}

        <AddCustomChannelModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={onAdd}
        />
      </CardContent>
    </Card>
  );
}
