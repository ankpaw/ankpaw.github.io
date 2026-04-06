"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/i18n";
import LanguageSwitcher, {
  MobileLanguageSwitcher,
} from "@/components/layout/LanguageSwitcher";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isAdmin = status === "authenticated" && (session?.user as { role?: string })?.role === "admin";
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
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 rounded-sm font-mono text-[11px] uppercase tracking-[0.1em] transition-all duration-200",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-x-1 -bottom-px h-0.5 rounded-full bg-primary"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </Link>
              );
            })}
            {isAdmin && (
              <Link
                href="/admin"
                className={cn(
                  "px-3 py-1.5 rounded-sm font-mono text-[11px] uppercase tracking-[0.1em] transition-all duration-200",
                  pathname === "/admin"
                    ? "text-emerald-400 bg-emerald-500/10"
                    : "text-emerald-400/70 hover:text-emerald-400"
                )}
              >
                {t.nav.admin}
              </Link>
            )}
            <a
              href="/Ankit-Pawar.pdf"
              target="_blank"
              className="ml-2"
            >
              <Button variant="outline" size="sm" className="text-xs cursor-pointer">
                {t.nav.resume}
              </Button>
            </a>
            {status === "authenticated" ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signOut()}
                className="ml-1 text-xs text-muted-foreground cursor-pointer"
              >
                {t.nav.signOut}
              </Button>
            ) : status === "unauthenticated" ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => signIn("github")}
                className="ml-1 text-xs text-muted-foreground cursor-pointer"
              >
                {t.nav.signIn}
              </Button>
            ) : null}
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
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="mt-4 pt-4 border-t border-border flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "px-4 py-3 rounded-sm font-mono text-[11px] uppercase tracking-[0.1em] transition-all",
                      pathname === link.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-3 rounded-sm font-mono text-[11px] uppercase tracking-[0.1em] text-emerald-400/70 hover:text-emerald-400 transition-all"
                  >
                    {t.nav.admin}
                  </Link>
                )}
                <a
                  href="/Ankit-Pawar.pdf"
                  target="_blank"
                  className="px-4 py-3 rounded-lg text-sm font-medium text-center mt-1"
                >
                  <Button variant="outline" size="sm" className="w-full text-xs cursor-pointer">
                    {t.nav.resume}
                  </Button>
                </a>
                {status === "authenticated" ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signOut()}
                    className="justify-start px-4 text-sm text-muted-foreground cursor-pointer"
                  >
                    {t.nav.signOut}
                  </Button>
                ) : status === "unauthenticated" ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => signIn("github")}
                    className="justify-start px-4 text-sm text-muted-foreground cursor-pointer"
                  >
                    {t.nav.signIn}
                  </Button>
                ) : null}
                {/* Language switcher for mobile */}
                <div className="mt-2 pt-2 border-t border-border">
                  <MobileLanguageSwitcher />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
