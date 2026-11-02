"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { pagePath } from "@/lib/i18n/config";
import { useI18n } from "./LanguageProvider";

export default function LanguageSwitcher() {
  const { locale, page, t } = useI18n();
  const targetLocale = locale === "en" ? "ar" : "en";
  const [suffix, setSuffix] = useState("");
  useEffect(() => {
    const sync = () => setSuffix(`${window.location.search}${window.location.hash}`);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [page, locale]);
  return (
    <Link
      href={`${pagePath(page, targetLocale)}${suffix}`}
      hrefLang={targetLocale}
      lang={targetLocale}
      aria-label={t(targetLocale === "ar" ? "Switch to Arabic" : "Switch to English")}
      className="language-switch inline-flex h-11 min-w-[64px] shrink-0 items-center justify-center rounded-full border border-[#102511]/25 bg-[#f3f0e7]/95 px-3 text-sm font-medium text-[#102511] shadow-sm transition-colors hover:border-[#315c36] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#71bc70]"
    >
      {targetLocale === "ar" ? "العربية" : "EN"}
    </Link>
  );
}