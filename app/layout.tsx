import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

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
    <html lang="en" className={`dark ${inter.variable} ${jetbrainsMono.variable} ${playfair.variable}`} suppressHydrationWarning>
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
