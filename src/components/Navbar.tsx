"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, User, LayoutDashboard, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        setIsLoggedIn(!!Cookies.get("access_token"));
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "News", href: "/news" },
    ];

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                scrolled ? "glass shadow-md py-3" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="flex items-center gap-3 group">
                    <Image src="/logo.svg" alt="SUPKEM Logo" width={32} height={32} className="group-hover:rotate-12 transition-transform" />
                    <span className="text-xl font-bold tracking-tight text-primary">
                        SUPKEM <span className="text-secondary">CMS</span>
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium hover:text-primary transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    {isLoggedIn ? (
                        <Link
                            href="/admin"
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-medium hover-lift"
                        >
                            <LayoutDashboard size={16} />
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href="/login" className="text-sm font-medium hover:text-primary">
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="px-6 py-2 bg-primary text-white rounded-full text-sm font-medium hover-lift premium-gradient"
                            >
                                Apply Now
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 glass shadow-xl p-6 md:hidden flex flex-col gap-4 border-t border-border"
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-lg font-medium py-2 border-b border-border/50"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-3 pt-4">
                            <Link
                                href="/login"
                                className="text-center py-3 border border-primary rounded-xl font-medium"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="text-center py-3 bg-primary text-white rounded-xl font-medium"
                            >
                                Apply Now
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
