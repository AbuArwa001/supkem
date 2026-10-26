"use client";

import React from "react";
import { FigmaComponentLibrary } from "./_components/FigmaComponentLibrary";
import { FigmaAdminDashboardMockup } from "./_components/FigmaAdminDashboardMockup";
import { FigmaDataTableMockup } from "./_components/FigmaDataTableMockup";
import { FigmaLandingAndAuthMockup } from "./_components/FigmaLandingAndAuthMockup";
import { FigmaPortalAndMediaMockup } from "./_components/FigmaPortalAndMediaMockup";

export default function FigmaExportPage() {
    return (
        <div className="bg-slate-100 min-h-screen p-16 space-y-32 font-sans text-slate-900">
            <div className="mb-10 max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">SUPKEM Figma Export Interface</h1>
                <p className="text-slate-500 text-lg">Use your HTML-to-Figma plugin on this page to ingest the fully semantic UI layouts.</p>
            </div>
            <FigmaComponentLibrary />
            <FigmaAdminDashboardMockup />
            <FigmaDataTableMockup />
            <FigmaLandingAndAuthMockup />
            <FigmaPortalAndMediaMockup />
        </div>
    );
}
