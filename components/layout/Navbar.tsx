"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const isAdmin = (session?.user as { role?: string })?.role === "admin";

  return (
    <nav className="glass fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              alt="Ankit Pawar Logo"
              src="/favicon-32x32.png"
              height={32}
              width={32}
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <span className="font-bold text-lg tracking-tight text-surface-50 transition-colors group-hover:text-primary-400">
              Ankit Pawar
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "text-primary-400 bg-primary-500/10"
                    : "text-surface-400 hover:text-surface-100 hover:bg-surface-800/50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                href="/admin"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  pathname === "/admin"
                    ? "text-accent-400 bg-accent-500/10"
                    : "text-accent-400/70 hover:text-accent-400 hover:bg-surface-800/50"
                }`}
              >
                Admin
              </Link>
            )}
            <a
              href="/Ankit-Pawar.pdf"
              target="_blank"
              className="ml-2 px-4 py-2 text-sm font-medium rounded-lg border border-primary-500/30 text-primary-400 hover:bg-primary-500/10 transition-all duration-200"
            >
              Resume
            </a>
            {/* Auth */}
            {session ? (
              <button
                onClick={() => signOut()}
                className="ml-2 px-4 py-2 text-sm font-medium rounded-lg text-surface-400 hover:text-surface-100 hover:bg-surface-800/50 transition-all duration-200"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => signIn("github")}
                className="ml-2 px-4 py-2 text-sm font-medium rounded-lg text-surface-400 hover:text-surface-100 hover:bg-surface-800/50 transition-all duration-200"
              >
                Sign In
              </button>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-surface-400 hover:text-surface-100 hover:bg-surface-800/50 transition-colors"
            aria-label="Toggle navigation"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-surface-800 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    pathname === link.href
                      ? "text-primary-400 bg-primary-500/10"
                      : "text-surface-400 hover:text-surface-100 hover:bg-surface-800/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-accent-400/70 hover:text-accent-400 hover:bg-surface-800/50 transition-all"
                >
                  Admin
                </Link>
              )}
              <a
                href="/Ankit-Pawar.pdf"
                target="_blank"
                className="px-4 py-3 rounded-lg text-sm font-medium text-primary-400 border border-primary-500/30 hover:bg-primary-500/10 transition-all text-center mt-2"
              >
                Resume
              </a>
              {session ? (
                <button
                  onClick={() => signOut()}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-surface-400 hover:text-surface-100 hover:bg-surface-800/50 transition-all"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => signIn("github")}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-surface-400 hover:text-surface-100 hover:bg-surface-800/50 transition-all"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
