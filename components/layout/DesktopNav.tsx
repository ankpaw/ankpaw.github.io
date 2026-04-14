"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/lib/i18n";
import { useSession } from "next-auth/react";

interface DesktopNavProps {
  navLinks: { href: string; label: string }[];
}

export default function DesktopNav({ navLinks }: DesktopNavProps) {
  const pathname = usePathname();
  const t = useTranslations();
  const { data: session, status } = useSession();
  const isAdmin =
    status === "authenticated" && (session?.user as { role?: string })?.role === "admin";

  return (
    <>
      {navLinks.map((link) => {
        const isActive =
          pathname === link.href || pathname.startsWith(link.href + "/");
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
    </>
  );
}
