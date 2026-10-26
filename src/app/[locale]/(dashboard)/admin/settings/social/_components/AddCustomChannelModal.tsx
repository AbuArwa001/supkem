import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface AddCustomChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, handle: string, url: string) => void;
}

export function AddCustomChannelModal({ isOpen, onClose, onAdd }: AddCustomChannelModalProps) {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [url, setUrl] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;
    onAdd(name, handle, url);
    setName("");
    setHandle("");
    setUrl("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black font-outfit text-slate-900">Add Social Channel</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
              Platform Name
            </label>
            <Input required value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. WhatsApp, Telegram" className="h-10 text-xs rounded-xl" />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
              Display Handle / Title
            </label>
            <Input value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="e.g. @supkem_official" className="h-10 text-xs rounded-xl" />
          </div>

          <div>
            <label className="text-[10px] font-black uppercase tracking-wider text-slate-400 block mb-1">
              Profile URL
            </label>
            <Input required value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://..." className="h-10 text-xs rounded-xl" />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3">
            <Button type="button" variant="outline" onClick={onClose} className="rounded-xl text-xs font-bold">
              Cancel
            </Button>
            <Button type="submit" className="rounded-xl bg-primary text-white text-xs font-bold gap-1.5 shadow-md">
              <Plus size={14} /> Add Channel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
