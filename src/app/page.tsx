import HomeContent from "@/components/pages/HomeContent";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";

export default function HomePage() {
  return <LanguageProvider locale="en" page="home"><HomeContent /></LanguageProvider>;
}
