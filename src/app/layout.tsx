// src/app/layout.tsx
// Minimal root layout — the real layout lives at [locale]/layout.tsx
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "SUPKEM | Supreme Council of Kenya Muslims",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
