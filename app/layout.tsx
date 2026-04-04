import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: {
    default: "Ankit Pawar — Software Developer",
    template: "%s | Ankit Pawar",
  },
  description:
    "Ankit Pawar is a software engineer who specializes in building web applications that are responsive, intuitive and can scale without hassles.",
  metadataBase: new URL("https://ankpaw.github.io"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ankpaw.github.io",
    siteName: "Ankit Pawar",
    title: "Ankit Pawar — Software Developer",
    description:
      "Ankit Pawar is a software engineer who specializes in building web applications that are responsive, intuitive and can scale without hassles.",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("dark", "font-sans", geist.variable)}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1 pt-20">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
