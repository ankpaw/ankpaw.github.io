"use client";

import { useMemo, useEffect, useRef } from "react";
import { prepare, layout, setLocale as setPretextLocale } from "@chenglou/pretext";
import { useLocale } from "./I18nContext";

/**
 * Custom hook that wraps @chenglou/pretext for dynamic multilingual text
 * measurement. Useful for:
 * - Preventing layout shifts when switching languages
 * - Calculating text block heights for virtualized lists
 * - Knowing how many lines text will wrap to at a given width
 *
 * @param text - The text to measure
 * @param font - CSS font shorthand (e.g., "16px Inter")  
 * @param maxWidth - Container width in pixels
 * @param lineHeight - CSS line-height in pixels
 * @returns { height, lineCount } — computed layout dimensions
 */
export function useTextLayout(
  text: string,
  font: string,
  maxWidth: number,
  lineHeight: number
) {
  const { locale } = useLocale();
  const prevLocale = useRef(locale);

  // Sync pretext's internal locale when the app locale changes
  useEffect(() => {
    if (prevLocale.current !== locale) {
      setPretextLocale(locale);
      prevLocale.current = locale;
    }
  }, [locale]);

  return useMemo(() => {
    if (!text || maxWidth <= 0 || lineHeight <= 0) {
      return { height: 0, lineCount: 0 };
    }
    const prepared = prepare(text, font);
    return layout(prepared, maxWidth, lineHeight);
  }, [text, font, maxWidth, lineHeight]);
}
