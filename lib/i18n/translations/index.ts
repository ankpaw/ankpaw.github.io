import type { Locale } from "../locales";
import type { Translations } from "./en";
import en from "./en";
import hi from "./hi";
import fr from "./fr";
import es from "./es";

const translations: Record<Locale, Translations> = { en, hi, fr, es };

export function getTranslations(locale: Locale): Translations {
  return translations[locale];
}

export type { Translations };
