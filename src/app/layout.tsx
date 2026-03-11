import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "SUPKEM | Supreme Council of Kenya Muslims",
  description: "Official Content Management and Application System for SUPKEM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="font-inter antialiased">
        <MainLayoutWrapper>
          {children}
        </MainLayoutWrapper>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
