"use client";

import { CheckCircle2 } from "lucide-react";

interface UserAvatarProps {
  name: string;
  email?: string;
  isActive?: boolean;
  isVerified?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const GRADIENTS = [
  "from-emerald-600 to-teal-800 text-emerald-50",
  "from-indigo-600 to-blue-800 text-indigo-50",
  "from-amber-600 to-orange-800 text-amber-50",
  "from-rose-600 to-pink-800 text-rose-50",
  "from-teal-600 to-cyan-800 text-teal-50",
  "from-violet-600 to-purple-800 text-violet-50",
  "from-slate-700 to-slate-900 text-slate-100",
];

export const UserAvatar = ({
  name,
  email = "",
  isActive = true,
  isVerified = false,
  size = "md",
  className = "",
}: UserAvatarProps) => {
  const getInitials = (text: string) => {
    if (!text) return "U";
    const parts = text.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return text.slice(0, 2).toUpperCase();
  };

  const getGradient = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % GRADIENTS.length;
    return GRADIENTS[index];
  };

  const initials = getInitials(name || email || "User");
  const gradientClass = getGradient(name || email || "User");

  const sizeStyles = {
    sm: "h-8 w-8 text-[11px] rounded-xl",
    md: "h-11 w-11 text-xs rounded-2xl",
    lg: "h-14 w-14 text-sm rounded-[1.25rem]",
    xl: "h-20 w-20 text-xl rounded-[2rem]",
  }[size];

  const dotSize = {
    sm: "h-2 w-2 ring-1",
    md: "h-2.5 w-2.5 ring-2",
    lg: "h-3 w-3 ring-2",
    xl: "h-4 w-4 ring-2",
  }[size];

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <div
        className={`${sizeStyles} bg-gradient-to-br ${gradientClass} font-black tracking-wider flex items-center justify-center shadow-sm select-none border border-white/20`}
      >
        {initials}
      </div>

      {/* Active / Inactive Status Indicator Dot */}
      <span
        className={`absolute bottom-0 right-0 rounded-full ring-white ${dotSize} ${
          isActive ? "bg-emerald-500" : "bg-slate-300"
        }`}
      />

      {/* Verified Email icon badge for large sizes */}
      {isVerified && (size === "lg" || size === "xl") && (
        <span className="absolute -top-1 -right-1 bg-white rounded-full text-emerald-600 shadow-sm">
          <CheckCircle2 className="h-4 w-4 fill-emerald-600 text-white" />
        </span>
      )}
    </div>
  );
};
