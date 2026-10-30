import type { Locale } from "./config";
import { arPageMessages } from "./messages-pages";
import { arSceneMessages } from "./messages-scenes";
import { arSectionMessages } from "./messages-sections";

const arCommonMessages: Record<string, string> = {
  "Skip to content": "انتقل إلى المحتوى",
  "Skip to projects": "انتقل إلى المشاريع",
  "3Mo home": "الرئيسية — 3Mo",
  "3Mo logo": "شعار 3Mo",
  "3Mo — Creative technology, branding and digital experiences": "3Mo — حلول إبداعية وهوية بصرية وتجارب رقمية",
  "Open navigation menu": "افتح قائمة التنقل",
  "Close navigation menu": "أغلق قائمة التنقل",
  "About us": "من نحن",
  "The 3Mo Method": "منهج 3Mo",
  "Services": "خدماتنا",
  "Selected work": "أعمالنا",
  "Contact": "تواصل معنا",
  "3Mo / Navigation": "3Mo / التنقل",
  "Studio index": "دليل الاستوديو",
  "Find your way": "اكتشف 3Mo",
  "One clear path forward.": "طريق واضح نحو فكرتك.",
  "Page sections": "أقسام الموقع",
  "Explore all projects": "استكشف كل المشاريع",
  "Three minds. One direction.": "ثلاثة عقول. اتجاه واحد.",
  "3MO / SIGNAL SHIFT": "3MO / انتقال الإشارة",
  "Switch to Arabic": "التبديل إلى العربية",
  "Switch to English": "التبديل إلى الإنجليزية",
  "Please check this field.": "يرجى التحقق من القيمة المدخلة في هذا الحقل.",
};

export const arabicMessages: Record<string, string> = {
  ...arCommonMessages,
  ...arSectionMessages,
  ...arSceneMessages,
  ...arPageMessages,
};

export function translate(text: string, locale: Locale): string {
  return locale === "ar" ? arabicMessages[text] ?? text : text;
}
