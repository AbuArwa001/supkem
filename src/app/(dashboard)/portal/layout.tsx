"use client";

import PortalSidebar from "@/components/PortalSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function PortalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <div className="flex min-h-screen bg-primary/[0.02]">
                <PortalSidebar />
                <main className="flex-1 p-10 overflow-x-hidden">
                    <div className="max-w-7xl mx-auto uppercase tracking-widest text-[10px] font-black text-foreground/20 mb-2">
                        SUPKEM Digital User Portal
                    </div>
                    {children}
                </main>
            </div>
        </ProtectedRoute>
    );
}
