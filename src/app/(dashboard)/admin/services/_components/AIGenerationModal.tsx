"use client";

import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";

interface AIGenerationModalProps {
    prompt: string;
    isGenerating: boolean;
    setPrompt: (val: string) => void;
    onGenerate: () => void;
    onClose: () => void;
}

export function AIGenerationModal({
    prompt,
    isGenerating,
    setPrompt,
    onGenerate,
    onClose
}: AIGenerationModalProps) {
    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-secondary/20 backdrop-blur-md"
            />
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative w-full max-w-lg bg-white rounded-[20px] shadow-2xl overflow-hidden p-10 space-y-8"
            >
                <div className="space-y-2 text-center">
                    <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-3xl flex items-center justify-center mx-auto mb-4">
                        <Sparkles size={32} />
                    </div>
                    <h3 className="text-2xl font-bold font-outfit text-primary">AI Content Assistant</h3>
                    <p className="text-foreground/60">Tell me what this service is about, and I'll write a professional description for you.</p>
                </div>

                <div className="space-y-4">
                    <label className="text-sm font-bold text-primary uppercase tracking-widest px-1">Describe the service briefly...</label>
                    <textarea
                        required
                        rows={4}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="e.g. A halal certification for restaurants including site inspection and audit..."
                        className="w-full px-6 py-4 bg-secondary/[0.02] border border-border focus:border-secondary/20 rounded-2xl outline-none font-medium text-primary transition-all resize-none"
                    />
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 px-6 py-4 bg-foreground/5 text-primary rounded-2xl font-bold hover:bg-foreground/10 transition-all font-outfit"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onGenerate}
                        disabled={!prompt || isGenerating}
                        className="flex-[2] px-6 py-4 bg-secondary text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-secondary/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 font-outfit"
                    >
                        {isGenerating ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles size={20} /> Generate Now
                            </>
                        )}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
