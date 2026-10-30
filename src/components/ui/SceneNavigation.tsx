"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { useDialogFocus } from "@/hooks/useDialogFocus";
import { useI18n } from "@/components/i18n/LanguageProvider";

const navigationItems = [
  { number: "01", label: "About us", href: "/#about" },
  { number: "02", label: "The 3Mo Method", href: "/#method" },
  { number: "03", label: "Services", href: "/#services" },
  { number: "04", label: "Selected work", href: "/#our-work" },
  { number: "05", label: "Contact", href: "/#contact" },
];

export default function SceneNavigation() {
  const { t, href } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLElement | null>(null);
  const closeMenu = useCallback(() => setIsOpen(false), []);
  useDialogFocus(isOpen, panelRef, closeMenu);
  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)} className="fixed right-[clamp(20px,4.3vw,68px)] top-[clamp(16px,3.5vh,32px)] z-[120] flex h-12 w-12 items-center justify-center rounded-full border border-[#f3f0e7]/35 bg-[#102511] text-[#f3f0e7] shadow-[0_8px_24px_rgba(16,37,17,.24)] transition duration-300 hover:bg-[#71bc70] hover:text-[#102511]" aria-label={t("Open navigation menu")} aria-expanded={isOpen} aria-controls="scene-navigation-panel">
        <span className="flex w-[18px] flex-col gap-[5px]" aria-hidden="true"><i className="h-px w-full bg-current" /><i className="ml-auto h-px w-[70%] bg-current" /></span>
      </button>
      <div className={`fixed inset-0 z-[140] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!isOpen} inert={!isOpen}>
        <button type="button" tabIndex={-1} onClick={closeMenu} aria-label={t("Close navigation menu")} className={`absolute inset-0 h-full w-full bg-[#102511]/45 backdrop-blur-[2px] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`} />
        <aside ref={panelRef} id="scene-navigation-panel" role="dialog" aria-modal={isOpen ? true : undefined} aria-labelledby="navigation-title" tabIndex={-1} className={`absolute inset-y-0 right-0 flex w-[min(460px,92vw)] flex-col overflow-y-auto overscroll-contain bg-[#f3f0e7] px-6 pb-8 pt-24 text-[#102511] shadow-[-24px_0_80px_rgba(0,0,0,.2)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] sm:px-10 sm:pt-28 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
          <button type="button" onClick={closeMenu} aria-label={t("Close navigation menu")} className="absolute right-6 top-5 grid h-12 w-12 place-items-center rounded-full bg-[#102511] text-[#f3f0e7] sm:right-10"><X size={20} /></button>
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#102511]/15 pb-5 text-xs uppercase tracking-[.08em] text-[#102511]/70"><span>{t("3Mo / Navigation")}</span><span>{t("Studio index")}</span></div>
          <p className="mt-8 text-xs uppercase tracking-[.08em] text-[#58844d]">{t("Find your way")}</p>
          <h2 id="navigation-title" className="mt-3 max-w-[340px] text-[clamp(30px,7vw,48px)] font-semibold leading-tight">{t("One clear path forward.")}</h2>
          <nav className="mt-8" aria-label={t("Page sections")}>
            {navigationItems.map((item) => (
              <Link key={item.number} href={href(item.href)} onClick={closeMenu} className="group flex min-h-12 items-center justify-between gap-3 border-t border-[#102511]/15 py-4 transition-colors hover:text-[#58844d]">
                <span className="flex min-w-0 items-baseline gap-3"><span dir="ltr" className="text-xs text-[#58844d]">{item.number}</span><span className="text-xl font-medium sm:text-2xl">{t(item.label)}</span></span><ArrowUpRight size={17} className="shrink-0" />
              </Link>
            ))}
          </nav>
          <Link href={href("/projects/")} onClick={closeMenu} className="mt-6 flex min-h-12 items-center justify-between gap-3 rounded-sm bg-[#102511] px-5 py-4 text-xs font-medium uppercase tracking-[.08em] text-[#f3f0e7] transition-colors hover:bg-[#71bc70] hover:text-[#102511]">{t("Explore all projects")}<ArrowUpRight size={16} /></Link>
          <div className="mt-8 border-t border-[#102511]/15 pt-6"><p className="text-xs uppercase tracking-[.06em] text-[#102511]/70">{t("Three minds. One direction.")}</p></div>
        </aside>
      </div>
    </>
  );
}
