import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "@/app/globals.css";
import MainLayoutWrapper from "@/components/MainLayoutWrapper";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";

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

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    // Next 15 specific setup, the notFound() call would be here.
    // For now we'll just allow it to continue or fail gracefully
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${inter.variable} ${outfit.variable}`}
    >
      <body className="font-inter antialiased" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <MainLayoutWrapper>{children}</MainLayoutWrapper>
        </NextIntlClientProvider>
        <Toaster position="top-right" richColors />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
