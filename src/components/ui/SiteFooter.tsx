"use client";

import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { navigationItems } from "@/components/ui/SceneNavigation";
import { useI18n } from "@/components/i18n/LanguageProvider";

const contactEmail = "hello@3mo.studio";
const linkClass = "inline-flex min-h-11 items-center text-[15px] text-[#f3f0e7]/80 transition-colors hover:text-[#a4ef91] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#71bc70]";
const headingClass = "mb-3 text-[11px] uppercase tracking-[0.18em] text-[#71bc70] sm:text-[10px]";

export default function SiteFooter() {
  const { t, href } = useI18n();
  return (
    <footer className="site-footer relative w-full bg-[#102511] px-6 pb-8 pt-14 text-[#f3f0e7] sm:px-10 lg:px-[clamp(48px,7vw,112px)] lg:pt-20">
      <div className="mx-auto max-w-[1800px]">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10">
          <div className="max-w-[360px]">
            <Link href={href("/")} aria-label={t("3Mo home")} className="inline-flex focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#71bc70]">
              <Logo />
            </Link>
            <p className="mt-6 text-[clamp(22px,2.4vw,32px)] font-medium leading-[1.15] tracking-[-0.02em]">
              {t("Three minds. One direction.")}
            </p>
            <p className="mt-4 text-[14px] leading-relaxed text-[#f3f0e7]/65">
              {t("Creative technology, branding and digital experiences.")}
            </p>
          </div>

          <nav aria-label={t("Footer navigation")}>
            <h2 className={headingClass}>{t("Explore")}</h2>
            <ul>
              {navigationItems.map((item) => (
                <li key={item.number}>
                  <Link href={href(item.href)} className={linkClass}>{t(item.label)}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={headingClass}>{t("Studio")}</h2>
            <ul>
              <li><Link href={href("/projects/")} className={linkClass}>{t("Explore all projects")}</Link></li>
              <li><Link href={href("/contact/")} className={linkClass}>{t("Contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h2 className={headingClass}>{t("Get in touch")}</h2>
            <a href={`mailto:${contactEmail}`} dir="ltr" className="group inline-flex min-h-11 items-center gap-2 text-[15px] text-[#f3f0e7] transition-colors hover:text-[#a4ef91] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#71bc70]">
              {contactEmail}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
            </a>
            <p className="mt-3 max-w-[260px] text-[13px] leading-relaxed text-[#f3f0e7]/60">
              {t("FOR COLLABORATIONS, NEW PROJECTS, OR ANY OTHER INQUIRIES.")}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse gap-4 border-t border-[#f3f0e7]/15 pt-6 text-[12px] text-[#f3f0e7]/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} 3Mo. {t("All rights reserved.")}</p>
          <a href="#main-content" className="inline-flex min-h-11 items-center gap-2 uppercase tracking-[0.14em] transition-colors hover:text-[#a4ef91] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#71bc70]">
            {t("Back to top")}<span aria-hidden="true">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}