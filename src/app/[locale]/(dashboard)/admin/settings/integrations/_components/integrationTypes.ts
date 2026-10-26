import { Zap, CreditCard, Mail, Bot } from "lucide-react";

export interface IntegrationParam {
  id: string;
  key: string;
  name: string;
  description: string;
  value: string;
  data_type: string;
  category: string;
  is_configured: boolean;
  updated_at: string;
}

export interface IntegrationDef {
  id: string;
  label: string;
  tagline: string;
  icon: any;
  accent: string;
  accentLight: string;
  accentDark: string;
  docsUrl: string;
  paramKeys: string[];
}

export const INTEGRATIONS: IntegrationDef[] = [
  {
    id: "knock",
    label: "Knock",
    tagline: "In-app notifications & bell alerts",
    icon: Zap,
    accent: "#6d28d9",
    accentLight: "#ede9fe",
    accentDark: "#4c1d95",
    docsUrl: "https://docs.knock.app/",
    paramKeys: ["KNOCK_SECRET_API_KEY", "KNOCK_PUBLIC_API_KEY", "KNOCK_FEED_CHANNEL_ID"],
  },
  {
    id: "mpesa",
    label: "M-Pesa",
    tagline: "Safaricom STK Push mobile payments",
    icon: CreditCard,
    accent: "#059669",
    accentLight: "#d1fae5",
    accentDark: "#064e3b",
    docsUrl: "https://developer.safaricom.co.ke/",
    paramKeys: [
      "MPESA_CONSUMER_KEY",
      "MPESA_CONSUMER_SECRET",
      "MPESA_SHORTCODE",
      "MPESA_PASSKEY",
      "MPESA_ENVIRONMENT",
      "MPESA_CALLBACK_URL",
    ],
  },
  {
    id: "resend",
    label: "Resend",
    tagline: "Transactional email delivery",
    icon: Mail,
    accent: "#0f172a",
    accentLight: "#f1f5f9",
    accentDark: "#020617",
    docsUrl: "https://resend.com/docs",
    paramKeys: ["RESEND_API_KEY"],
  },
  {
    id: "openai",
    label: "OpenAI",
    tagline: "AI-powered Arabic auto-translation",
    icon: Bot,
    accent: "#0d9488",
    accentLight: "#ccfbf1",
    accentDark: "#134e4a",
    docsUrl: "https://platform.openai.com/docs",
    paramKeys: ["OPENAI_API_KEY"],
  },
];

export const MASKED = "••••••••";
const SECRET_PATTERNS = ["KEY", "SECRET", "TOKEN", "PASSKEY", "PASSWORD"];
export const isSecret = (key: string) => SECRET_PATTERNS.some((p) => key.toUpperCase().includes(p));

export function groupByKey(params: IntegrationParam[]): Record<string, IntegrationParam> {
  return Object.fromEntries(params.map((p) => [p.key, p]));
}
