import React from "react";
import { Trash2, ExternalLink, RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { SocialChannelConfig } from "@/lib/socialSettings";

interface SocialChannelItemProps {
  channel: SocialChannelConfig;
  isToggling: boolean;
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<SocialChannelConfig>) => void;
  onDelete: (id: string) => void;
}

export function SocialChannelItem({
  channel, isToggling, onToggle, onUpdate, onDelete,
}: SocialChannelItemProps) {
  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shadow-xs ${channel.bgClass}`}>
            {channel.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">{channel.name}</h4>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${channel.badgeClass}`}>
              {channel.enabled ? "Active" : "Disabled"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isToggling && <RefreshCw size={12} className="animate-spin text-primary" />}
          <Switch checked={channel.enabled} onCheckedChange={() => onToggle(channel.id)} disabled={isToggling} />
          <button
            type="button"
            onClick={() => onDelete(channel.id)}
            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg transition-colors ml-1"
            title="Delete channel"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
        <div>
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
            Display Handle
          </label>
          <Input
            value={channel.handle}
            onChange={(e) => onUpdate(channel.id, { handle: e.target.value })}
            placeholder="@handle"
            className="h-9 text-xs bg-white rounded-xl"
          />
        </div>
        <div>
          <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1 flex items-center justify-between">
            <span>Profile URL</span>
            {channel.url && (
              <a href={channel.url} target="_blank" rel="noreferrer" className="text-primary hover:underline flex items-center gap-1 font-semibold normal-case">
                Visit <ExternalLink size={10} />
              </a>
            )}
          </label>
          <Input
            value={channel.url}
            onChange={(e) => onUpdate(channel.id, { url: e.target.value })}
            placeholder="https://..."
            className="h-9 text-xs bg-white rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
