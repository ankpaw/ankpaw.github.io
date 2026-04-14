"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/i18n";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MobileLanguageSwitcher } from "@/components/layout/LanguageSwitcher";

interface MobileMenuProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  navLinks: { href: string; label: string }[];
}

export default function MobileMenu({
  mobileOpen,
  setMobileOpen,
  navLinks,
}: MobileMenuProps) {
  const pathname = usePathname();
  const t = useTranslations();
  const { data: session, status } = useSession();
  const isAdmin =
    status === "authenticated" && (session?.user as { role?: string })?.role === "admin";
  const user = session?.user;

  return (
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
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs cursor-pointer"
              >
                {t.nav.resume}
              </Button>
            </a>
            {/* Auth — mobile */}
            {status === "authenticated" && user ? (
              <div className="mt-2 pt-2 border-t border-border">
                <div className="flex items-center gap-3 px-4 py-2">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name ?? "User"}
                      width={32}
                      height={32}
                      className="rounded-full ring-1 ring-border"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-mono text-primary">
                      {user.name?.[0]?.toUpperCase() ?? "U"}
                    </div>
                  )}
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-foreground">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground/70">
                      {user.email}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                  className="justify-start px-4 w-full font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground cursor-pointer"
                >
                  {t.nav.signOut}
                </Button>
              </div>
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
  );
}
