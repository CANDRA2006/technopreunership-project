import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp";

export const metadata: Metadata = {
  title: {
    default: "Bengkel Harun - Bengkel Mobil Profesional Pekalongan",
    template: "%s | Bengkel Harun",
  },
  description: "Bengkel Harun melayani servis berkala, tune up, ganti oli, perbaikan mesin, dan modifikasi mobil dengan teknisi berpengalaman di Pekalongan, Jawa Tengah.",
  keywords: ["bengkel mobil", "servis mobil", "pekalongan", "tune up", "ganti oli", "modifikasi mobil", "bengkel harun"],
  authors: [{ name: "Bengkel Harun" }],
  creator: "Bengkel Harun",
  openGraph: {
    title: "Bengkel Harun - Bengkel Mobil Profesional Pekalongan",
    description: "Solusi perawatan dan perbaikan mobil terpercaya di Pekalongan",
    url: "https://bengkelharun.web.app",
    siteName: "Bengkel Harun",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "Bengkel Harun",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bengkel Harun",
    description: "Bengkel Mobil Profesional dan Terpercaya di Pekalongan",
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <FloatingWhatsApp />
        </Providers>
      </body>
    </html>
  );
}
