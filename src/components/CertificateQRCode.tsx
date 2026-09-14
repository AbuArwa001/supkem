"use client";

import React, { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

interface CertificateQRCodeProps {
  hash?: string;
  serialNumber?: string;
  size?: number;
  showLabel?: boolean;
  className?: string;
  fgColor?: string;
}

export function CertificateQRCode({
  hash,
  serialNumber,
  size = 72,
  showLabel = false,
  className = "",
  fgColor = "#0f172a",
}: CertificateQRCodeProps) {
  const [origin, setOrigin] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setOrigin(window.location.origin);
    }
  }, []);

  const identifier = hash || serialNumber || "";
  const baseUrl = origin || process.env.NEXT_PUBLIC_SITE_URL || "https://supkem.org";
  const verificationUrl = `${baseUrl}/en/verify/${encodeURIComponent(identifier)}`;

  if (!identifier) {
    return (
      <div 
        className={`bg-slate-100 border border-dashed border-slate-300 rounded flex flex-col items-center justify-center p-2 text-center ${className}`}
        style={{ width: size, height: size }}
      >
        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">
          QR Secure
        </span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center group ${className}`}>
      <div className="bg-white p-1.5 rounded-lg border border-slate-200/80 shadow-xs">
        <QRCodeSVG
          value={verificationUrl}
          size={size}
          level="M"
          fgColor={fgColor}
          bgColor="#ffffff"
          includeMargin={false}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-center">
          <p className="text-[7px] font-black uppercase tracking-widest text-slate-500">
            Scan to Verify
          </p>
        </div>
      )}
    </div>
  );
}

export default CertificateQRCode;
