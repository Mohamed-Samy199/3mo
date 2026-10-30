import type { GetStaticProps } from "next";
import ContactSection from "@/components/sections/ContactSection";
import LocalizedPageHead from "@/components/i18n/LocalizedPageHead";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import PersistentSiteChrome from "@/components/ui/PersistentSiteChrome";

export default function ArabicContactPage() {
  return (
    <LanguageProvider locale="ar" page="contact">
      <LocalizedPageHead
        locale="ar"
        path="/ar/contact/"
        title="ابدأ مشروعاً مع استوديو 3Mo"
        description="أخبر 3Mo عن علامتك أو حملتك أو تجربة الويب أو نظامك الرقمي القادم وابدأ محادثة مركزة."
      />
      <a
        href="#main-content"
        className="sr-only z-[200] focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:bg-[#102511] focus:px-4 focus:py-3 focus:font-sans focus:text-sm focus:text-[#f3f0e7] focus:outline-none"
      >
        انتقل إلى المحتوى
      </a>
      <PersistentSiteChrome />
      <main id="main-content" className="min-h-screen bg-[#f3f0e7] pt-24 text-[#102511] sm:pt-28">
        <h1 className="sr-only">ابدأ مشروعاً مع 3Mo</h1>
        <p className="sr-only">
          أخبرنا عن علامتك أو حملتك أو تجربة الويب أو نظامك الرقمي القادم.
        </p>
        <ContactSection />
      </main>
    </LanguageProvider>
  );
}

export const getStaticProps: GetStaticProps = async () => ({ props: {} });
