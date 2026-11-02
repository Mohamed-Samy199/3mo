"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import SceneNavigation, { DesktopNavLinks } from "@/components/ui/SceneNavigation";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import { useI18n } from "@/components/i18n/LanguageProvider";

export default function PersistentSiteChrome() {
  const { t, href } = useI18n();
  return (
    <header className="site-header fixed inset-x-0 top-0 z-[130]">
      <div className="relative mx-auto flex h-[64px] w-full items-center gap-4 px-[clamp(20px,4.3vw,68px)] lg:h-[76px] lg:gap-8">
        <Link href={href("/")} aria-label={t("3Mo home")} className="inline-flex shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71bc70] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f0e7]">
          <Logo />
        </Link>
        <div className="ms-auto flex items-center gap-6 xl:gap-8">
          <DesktopNavLinks />
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <SceneNavigation />
          </div>
        </div>
      </div>
    </header>
  );
}