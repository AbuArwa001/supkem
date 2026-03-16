"use client";

import { Shield } from "lucide-react";

export const AccessRestricted = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
    <div className="bg-rose-50 p-6 rounded-full">
      <Shield className="h-12 w-12 text-rose-500" />
    </div>
    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
      Access Restricted
    </h2>
    <p className="text-slate-500 font-semibold max-w-md text-center">
      You do not have the required administrative clearance to manage the team
      directory.
    </p>
  </div>
);
