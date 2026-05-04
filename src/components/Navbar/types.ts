export interface NavLink {
  name: string;
  href: string;
}

export interface NavbarLogicReturn {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  scrolled: boolean;
  isLoggedIn: boolean;
  showArabicComingSoon: boolean;
  setShowArabicComingSoon: (show: boolean) => void;
  pathname: string;
  locale: string;
  handleARClick: () => void;
  handleENClick: () => void;
  navLinks: NavLink[];
  t: (key: string) => string;
}
