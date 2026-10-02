import { useTranslations } from "next-intl";

/**
 * Hook that translates a service name from the API (always English)
 * using the serviceNames translation namespace.
 * Falls back to the raw name if no translation is found.
 *
 * Usage:
 *   const translateService = useServiceName();
 *   translateService("Advocacy & Legal Support") // → "المناصرة والدعم القانوني" (in AR)
 */
export function useServiceName() {
  const t = useTranslations("Dashboard.admin.serviceNames");

  return (name: string | null | undefined): string => {
    if (!name) return "";
    try {
      const translated = t(name as any);
      // next-intl returns the key when missing; check if it's actually a translation
      return translated !== name ? translated : name;
    } catch {
      return name;
    }
  };
}
