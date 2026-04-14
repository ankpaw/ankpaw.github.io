"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/lib/i18n";

export default function UserMenu() {
  const { data: session, status } = useSession();
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const user = session?.user;
  const isAdmin =
    status === "authenticated" && (session?.user as { role?: string })?.role === "admin";

  // Close avatar dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (status === "authenticated" && user) {
    return (
      <div className="relative ml-1" ref={avatarRef}>
        <button
          onClick={() => setAvatarOpen(!avatarOpen)}
          className="flex items-center gap-2 rounded-sm p-1 pr-3 hover:bg-muted/50 transition-colors group"
          aria-label="User menu"
        >
          {user.image ? (
            <Image
              src={user.image}
              alt={user.name ?? "User avatar"}
              width={28}
              height={28}
              className="rounded-full ring-1 ring-border group-hover:ring-primary/50 transition-all"
            />
          ) : (
            <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-xs font-mono text-primary">
              {user.name?.[0]?.toUpperCase() ?? "U"}
            </div>
          )}
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground group-hover:text-foreground transition-colors">
            {user.name?.split(" ")[0]}
          </span>
        </button>

        <AnimatePresence>
          {avatarOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="absolute right-0 top-full mt-2 w-52 glass border border-white/[0.08] rounded-sm shadow-xl shadow-black/20 overflow-hidden z-50"
            >
              {/* User info header */}
              <div className="px-4 py-3 border-b border-white/[0.06]">
                <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-foreground">
                  {user.name}
                </p>
                <p className="text-[11px] text-muted-foreground/70 mt-0.5 truncate">
                  {user.email}
                </p>
              </div>
              {/* Actions */}
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setAvatarOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-emerald-400/80 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                >
                  {t.nav.admin}
                </Link>
              )}
              <button
                onClick={() => {
                  setAvatarOpen(false);
                  signOut();
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                {t.nav.signOut}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => signIn("github")}
        className="ml-1 text-xs text-muted-foreground cursor-pointer"
      >
        {t.nav.signIn}
      </Button>
    );
  }

  return null;
}
