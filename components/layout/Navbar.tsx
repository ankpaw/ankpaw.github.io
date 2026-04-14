"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/i18n";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import DesktopNav from "@/components/layout/DesktopNav";
import UserMenu from "@/components/layout/UserMenu";
import MobileMenu from "@/components/layout/MobileMenu";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const t = useTranslations();

  const navLinks = [
    { href: "/about", label: t.nav.about },
    { href: "/experience", label: t.nav.experience },
    { href: "/blog", label: t.nav.blog },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "glass shadow-lg shadow-black/5 border-b border-white/[0.06]"
          : "bg-transparent"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              alt="Ankit Pawar Logo"
              src="/favicon-32x32.png"
              height={32}
              width={32}
              className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
            />
            <span className="font-serif italic text-xl tracking-tight text-foreground transition-colors group-hover:text-primary">
              Ankit Pawar
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <DesktopNav navLinks={navLinks} />
            <a
              href="/Ankit-Pawar.pdf"
              target="_blank"
              className="ml-2"
            >
              <Button variant="outline" size="sm" className="text-xs cursor-pointer">
                {t.nav.resume}
              </Button>
            </a>
            {/* Auth — Avatar or Sign In */}
            <UserMenu />
            <LanguageSwitcher />
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            aria-label="Toggle navigation"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          navLinks={navLinks}
        />
      </div>
    </motion.nav>
  );
}
