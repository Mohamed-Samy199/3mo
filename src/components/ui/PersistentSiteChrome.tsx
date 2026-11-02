"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import SceneNavigation, { DesktopNavLinks } from "@/components/ui/SceneNavigation";
import LanguageSwitcher from "@/components/i18n/LanguageSwitcher";
import { useI18n } from "@/components/i18n/LanguageProvider";

export default function PersistentSiteChrome() {
  const { t, href } = useI18n();
  const headerRef = useRef<HTMLElement | null>(null);
  const [solid, setSolid] = useState(false);

  // On the home page: once the hero (.scene-shell) has scrolled out from under the header,
  // give the header a light background so the dark nav elements stay readable.
  useEffect(() => {
    const shell = document.querySelector<HTMLElement>(".scene-shell");
    if (!shell) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const headerHeight = headerRef.current?.offsetHeight ?? 64;
      setSolid(shell.getBoundingClientRect().bottom <= headerHeight);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <header ref={headerRef} data-solid={solid} className={`site-header fixed inset-x-0 top-0 z-[130] transition-[background-color,box-shadow] duration-300 ${solid ? "bg-[#f3f0e7] shadow-[0_1px_0_rgba(16,37,17,.12)]" : "bg-transparent"}`}>
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