export type Locale = "en" | "hi" | "fr" | "es";

export const DEFAULT_LOCALE: Locale = "en";

export const LOCALES: Record<
  Locale,
  { label: string; nativeName: string; flag: string }
> = {
  en: { label: "English", nativeName: "English", flag: "🇺🇸" },
  hi: { label: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  fr: { label: "French", nativeName: "Français", flag: "🇫🇷" },
  es: { label: "Spanish", nativeName: "Español", flag: "🇪🇸" },
};

export const LOCALE_CODES = Object.keys(LOCALES) as Locale[];

const STORAGE_KEY = "preferred-locale";

export function getStoredLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored && stored in LOCALES) return stored as Locale;
  return DEFAULT_LOCALE;
}

export function setStoredLocale(locale: Locale): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, locale);
}
