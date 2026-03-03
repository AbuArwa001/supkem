"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRole?: string | string[];
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
    const { user, loading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                router.push("/login");
            } else if (requiredRole) {
                const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
                if (!roles.includes(user?.role?.role_name)) {
                    // If user is authenticated but doesn't have the required role,
                    // redirect to their default home page
                    if (user?.role?.role_name === "Normal User") {
                        router.push("/portal");
                    } else {
                        router.push("/admin");
                    }
                }
            }
        }, [loading, isAuthenticated, router, requiredRole, user]);

    if (loading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center gap-4 bg-white">
                <Loader2 className="animate-spin text-primary" size={48} />
                <p className="font-bold text-primary animate-pulse">Authenticating...</p>
            </div>
        );
    }

    if (!isAuthenticated) return null;

    if (requiredRole) {
        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
        if (!roles.includes(user?.role?.role_name)) return null;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
