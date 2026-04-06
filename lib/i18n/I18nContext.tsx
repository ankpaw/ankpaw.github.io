"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  type Locale,
  DEFAULT_LOCALE,
  getStoredLocale,
  setStoredLocale,
} from "./locales";
import { getTranslations, type Translations } from "./translations";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: getTranslations(DEFAULT_LOCALE),
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage after mount to avoid SSR mismatch
  useEffect(() => {
    setLocaleState(getStoredLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    setStoredLocale(newLocale);
    // Update <html lang> attribute
    document.documentElement.lang = newLocale;
  }, []);

  const t = getTranslations(locale);

  // During SSR / first render, use default locale to avoid hydration mismatch
  if (!mounted) {
    return (
      <I18nContext.Provider
        value={{
          locale: DEFAULT_LOCALE,
          setLocale,
          t: getTranslations(DEFAULT_LOCALE),
        }}
      >
        {children}
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useLocale() {
  const { locale, setLocale } = useContext(I18nContext);
  return { locale, setLocale };
}

export function useTranslations(): Translations {
  return useContext(I18nContext).t;
}
