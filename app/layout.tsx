import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CertiFlow - Security+ SY0-701",
  description: "Application de préparation aux certifications IT, première concentration sur CompTIA Security+ SY0-701."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
