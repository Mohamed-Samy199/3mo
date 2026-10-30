"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { localizePath, type Locale, type PageKey } from "@/lib/i18n/config";
import { translate } from "@/lib/i18n/messages";

type I18nContextValue = {
  locale: Locale;
  page: PageKey;
  isRTL: boolean;
  t: (text: string) => string;
  href: (path: string) => string;
};

const LanguageContext = createContext<I18nContextValue>({
  locale: "en", page: "home", isRTL: false,
  t: (text) => text,
  href: (path) => path,
});

export function LanguageProvider({ locale, page, children }: {
  locale: Locale;
  page: PageKey;
  children: ReactNode;
}) {
  const value = useMemo(() => ({
    locale, page, isRTL: locale === "ar",
    t: (text: string) => translate(text, locale),
    href: (path: string) => localizePath(path, locale),
  }), [locale, page]);
  return (
    <LanguageContext.Provider value={value}>
      <div className="site-locale" lang={locale} dir={value.isRTL ? "rtl" : "ltr"} data-locale={locale}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  return useContext(LanguageContext);
}
