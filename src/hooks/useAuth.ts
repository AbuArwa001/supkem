"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

export const useAuth = () => {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            const token = Cookies.get("access_token");
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const res = await api.get("/users/users/me/");
                setUser(res.data);
            } catch (err) {
                console.error("Failed to fetch user:", err);
                Cookies.remove("access_token");
                Cookies.remove("refresh_token");
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const res = await api.post("/token/", { email, password });
            const { access, refresh } = res.data;

            Cookies.set("access_token", access, { secure: true, sameSite: "strict" });
            Cookies.set("refresh_token", refresh, { secure: true, sameSite: "strict" });

            const userRes = await api.get("/users/users/me/");
            setUser(userRes.data);

            return { success: true, user: userRes.data };
        } catch (err: any) {
            console.error("Login error:", err);
            return { success: false, error: err.response?.data?.detail || "Invalid credentials" };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        setUser(null);
        router.push("/login");
    };

    return { user, loading, login, logout, isAuthenticated: !!user };
};
