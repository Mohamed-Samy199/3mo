"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import SceneNavigation from "@/components/ui/SceneNavigation";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import { useI18n } from "@/components/i18n/LanguageProvider";

export default function PersistentSiteChrome() {
  const { t, href } = useI18n();
  return (
    <>
      <Link href={href("/")} aria-label={t("3Mo home")} className="fixed left-[clamp(22px,4.3vw,68px)] top-[clamp(14px,2.2vh,21px)] z-[130] inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#71bc70] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f3f0e7]">
        <Logo />
      </Link>
      <LanguageSwitcher />
      <SceneNavigation />
    </>
  );
}
