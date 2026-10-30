import type { GetStaticProps } from "next";
import HomeContent from "@/components/pages/HomeContent";
import LocalizedPageHead from "@/components/i18n/LocalizedPageHead";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";

export default function ArabicHomePage() {
  return (
    <LanguageProvider locale="ar" page="home">
      <LocalizedPageHead
        locale="ar"
        path="/ar/"
        title="3Mo — تقنية إبداعية لأفكار تتحرك"
        description="3Mo استوديو للتقنية الإبداعية يصمم الهويات والتجارب الرقمية والأنظمة التي تحوّل الأفكار إلى واقع."
      />
      <HomeContent />
    </LanguageProvider>
  );
}

export const getStaticProps: GetStaticProps = async () => ({ props: {} });
