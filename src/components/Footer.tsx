import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

const Footer = () => {
    const t = useTranslations("Footer");

    return (
        <footer className="bg-primary text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <Image src="/logo.svg" alt="SUPKEM Logo" width={32} height={32} />
                        <span className="text-2xl font-bold tracking-tight">SUPKEM</span>
                    </div>
                    <p className="text-white/70 text-sm leading-relaxed">
                        {t("description")}
                    </p>
                    <div className="flex gap-4">
                        <Facebook className="w-5 h-5 cursor-pointer hover:text-secondary transition-colors" />
                        <Twitter className="w-5 h-5 cursor-pointer hover:text-secondary transition-colors" />
                        <Instagram className="w-5 h-5 cursor-pointer hover:text-secondary transition-colors" />
                    </div>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-lg">{t("quickLinks")}</h4>
                    <ul className="space-y-4 text-white/70 text-sm">
                        <li><Link href="/about" className="hover:text-white transition-colors">{t("aboutUs")}</Link></li>
                        <li><Link href="/services" className="hover:text-white transition-colors">{t("ourServices")}</Link></li>
                        <li><Link href="/#strategic-focus" className="hover:text-white transition-colors">{t("strategicFocus")}</Link></li>
                        <li><Link href="/news" className="hover:text-white transition-colors">{t("latestNews")}</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 text-lg">{t("servicesTitle")}</h4>
                    <ul className="space-y-4 text-white/70 text-sm">
                        <li><Link href="/services/halal-certification" className="hover:text-white transition-colors">{t("halalCert")}</Link></li>
                        <li><Link href="/services/organization-registration" className="hover:text-white transition-colors">{t("orgReg")}</Link></li>
                        <li><Link href="/services/educational-programs" className="hover:text-white transition-colors">{t("eduPrograms")}</Link></li>
                        <li><Link href="/services/social-welfare" className="hover:text-white transition-colors">{t("socialWelfare")}</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h4 className="font-bold mb-6 text-lg">{t("contactUs")}</h4>
                    <div className="flex items-start gap-3 text-sm text-white/70">
                        <MapPin size={18} className="text-secondary shrink-0" />
                        <span>{t("address")}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/70">
                        <Phone size={18} className="text-secondary shrink-0" />
                        <Link href="tel:+254202243109">{t("phoneNumber")}</Link>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-white/70">
                        <Mail size={18} className="text-secondary shrink-0" />
                        <Link href="mailto:info@supkem.org">info@supkem.org</Link>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
                <p>© {new Date().getFullYear()} SUPKEM. {t("rightsReserved")}</p>
                <div className="flex gap-6 uppercase tracking-widest">
                    <Link href="/privacy" className="hover:text-white">{t("privacyPolicy")}</Link>
                    <Link href="/terms" className="hover:text-white">{t("termsOfService")}</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
