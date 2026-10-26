import React from "react";
import { Eraser, PenTool, Image as ImageIcon } from "lucide-react";
import SignatureCanvas from "react-signature-canvas";
import { cn } from "@/lib/utils";

interface StudioSignaturePadProps {
  sigType: "draw" | "upload";
  setSigType: (type: "draw" | "upload") => void;
  sigCanvas: React.RefObject<any>;
  uploadedSig: string | null;
  clearSignature: () => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function StudioSignaturePad({
  sigType,
  setSigType,
  sigCanvas,
  uploadedSig,
  clearSignature,
  handleFileUpload,
}: StudioSignaturePadProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">
          Digital Signature
        </label>
        <button
          type="button"
          onClick={clearSignature}
          className="text-xs font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 bg-rose-50 px-2 py-1 rounded-md"
        >
          <Eraser size={12} /> Clear
        </button>
      </div>

      <div className="flex bg-slate-100 p-1 rounded-xl mb-2">
        <button
          type="button"
          onClick={() => setSigType("draw")}
          className={cn(
            "flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all",
            sigType === "draw" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          <PenTool size={13} /> Draw
        </button>
        <button
          type="button"
          onClick={() => setSigType("upload")}
          className={cn(
            "flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-all",
            sigType === "upload" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
          )}
        >
          <ImageIcon size={13} /> Upload
        </button>
      </div>

      <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden relative group">
        {sigType === "draw" ? (
          <div className="h-[130px] w-full">
            <SignatureCanvas
              ref={sigCanvas}
              penColor="#1e293b"
              canvasProps={{ className: "w-full h-full cursor-crosshair" }}
            />
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-25">
              <span className="font-serif italic text-3xl text-slate-300">Sign Here</span>
            </div>
          </div>
        ) : (
          <div className="h-[130px] w-full flex flex-col items-center justify-center p-3 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
            {uploadedSig ? (
              <img src={uploadedSig} alt="Signature" className="h-full object-contain mix-blend-multiply" />
            ) : (
              <>
                <ImageIcon size={28} className="text-slate-400 mb-1.5" />
                <p className="text-xs font-bold text-slate-500">Click to upload signature</p>
                <p className="text-[10px] text-slate-400">PNG or JPG, transparent preferred</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
