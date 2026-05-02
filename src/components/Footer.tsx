import { FooterBrand } from "@/components/_components/footer/FooterBrand";
import { FooterQuickLinks } from "@/components/_components/footer/FooterQuickLinks";
import { FooterServices } from "@/components/_components/footer/FooterServices";
import { FooterContact } from "@/components/_components/footer/FooterContact";
import { FooterBottom } from "@/components/_components/footer/FooterBottom";

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        <FooterBrand />
        <FooterQuickLinks />
        <FooterServices />
        <FooterContact />
      </div>
      <FooterBottom />
    </footer>
  );
};

export default Footer;
