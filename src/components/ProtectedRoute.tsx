"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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
        }
    }, [loading, isAuthenticated, router, requiredRole, user]);

    if (loading) {
        return (
            <AnimatePresence>
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
                    >
                        <div className="relative flex flex-col items-center">
                            {/* Animated Background Glow */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.6, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 bg-primary/10 rounded-full blur-3xl -m-20"
                            />

                            {/* Logo with Integrated Spinner Animation */}
                            <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                                {/* Rotating Ring Container */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    className="absolute inset-0"
                                >
                                    {/* Spinner Track */}
                                    <svg className="w-full h-full transform -rotate-90">
                                        <circle
                                            cx="96"
                                            cy="96"
                                            r="88"
                                            fill="transparent"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            className="text-primary/10"
                                        />
                                        {/* Animated Dash */}
                                        <motion.circle
                                            cx="96"
                                            cy="96"
                                            r="88"
                                            fill="transparent"
                                            stroke="currentColor"
                                            strokeWidth="3"
                                            strokeDasharray="100 500"
                                            strokeLinecap="round"
                                            className="text-primary"
                                            animate={{
                                                strokeDasharray: ["20 500", "150 500", "20 500"],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                            }}
                                        />
                                    </svg>
                                </motion.div>

                                {/* Logo with Floating Animation */}
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                        y: [0, -5, 0]
                                    }}
                                    transition={{
                                        scale: { type: "spring", stiffness: 260, damping: 20 },
                                        y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    className="relative w-32 h-32"
                                >
                                    <Image
                                        src="/logo.svg"
                                        alt="SUPKEM Logo"
                                        fill
                                        className="object-contain drop-shadow-2xl"
                                        priority
                                    />
                                </motion.div>
                            </div>

                            {/* Status Text */}
                            <div className="flex flex-col items-center">
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-primary font-bold font-outfit uppercase tracking-[0.4em] text-xs"
                                >
                                    Loading...
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
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
