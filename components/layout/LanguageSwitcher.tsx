"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, LOCALES, LOCALE_CODES, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 cursor-pointer"
        aria-label="Change language"
        id="language-switcher"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 21a9 9 0 100-18 9 9 0 000 18zM3.6 9h16.8M3.6 15h16.8M12 3a14.25 14.25 0 014 9 14.25 14.25 0 01-4 9 14.25 14.25 0 01-4-9 14.25 14.25 0 014-9z"
          />
        </svg>
        <span className="text-xs">{LOCALES[locale].flag}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 w-44 rounded-xl border border-border bg-card/95 backdrop-blur-xl shadow-lg shadow-black/20 overflow-hidden z-50"
          >
            {LOCALE_CODES.map((code) => (
              <button
                key={code}
                onClick={() => {
                  setLocale(code as Locale);
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-150 cursor-pointer",
                  locale === code
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <span className="text-base">{LOCALES[code as Locale].flag}</span>
                <span>{LOCALES[code as Locale].nativeName}</span>
                {locale === code && (
                  <svg
                    className="w-3.5 h-3.5 ml-auto text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Mobile version — simple list, no dropdown overlay */
export function MobileLanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex flex-wrap gap-1.5 px-4 py-2">
      {LOCALE_CODES.map((code) => (
        <button
          key={code}
          onClick={() => setLocale(code as Locale)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer",
            locale === code
              ? "bg-primary/10 text-primary border border-primary/20"
              : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
          )}
        >
          <span>{LOCALES[code as Locale].flag}</span>
          <span>{LOCALES[code as Locale].nativeName}</span>
        </button>
      ))}
    </div>
  );
}
