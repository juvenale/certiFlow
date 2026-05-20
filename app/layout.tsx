import type { Metadata, Viewport } from "next";
import "./globals.css";
import { PWARegister } from "./pwa-register";

export const metadata: Metadata = {
  title: "CertiFlow - Security+ SY0-701",
  description: "Application de préparation aux certifications IT, première concentration sur CompTIA Security+ SY0-701.",
  applicationName: "CertiFlow",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "CertiFlow",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#176b87",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <PWARegister />
        {children}
      </body>
    </html>
  );
}
