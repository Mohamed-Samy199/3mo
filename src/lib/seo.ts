import type { Metadata } from "next";
import { localizePath, pagePath, type Locale } from "@/lib/i18n/config";

const siteOrigin = readSiteOrigin();

const socialImage = {
  path: "/projects/logo.webp",
  width: 900,
  height: 600,
  alt: "3Mo creative technology studio mark",
} as const;

export const seoKeywords = [
  "creative technology",
  "brand identity",
  "digital experiences",
  "digital systems",
] as const;

type PageMetadataOptions = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  imageAlt?: string;
  indexable?: boolean;
  locale?: Locale;
};

export function getPublicSiteUrl(): string | undefined {
  return siteOrigin;
}

export function absoluteUrl(path: string): string | undefined {
  if (!siteOrigin) return undefined;
  const normalizedPath = path !== "/" && !path.includes(".") ? `${path.replace(/\/$/, "")}/` : path;
  return new URL(normalizedPath.replace(/^\/+/, ""), `${siteOrigin}/`).toString();
}

export function createPageMetadata({
  title,
  description,
  path = "/",
  type = "website",
  imageAlt = socialImage.alt,
  indexable = true,
  locale = "en",
}: PageMetadataOptions): Metadata {
  const canonicalPath = localizePath(path, locale);
  const url = indexable ? absoluteUrl(canonicalPath) : undefined;
  const imageUrl = absoluteUrl(socialImage.path);
  const languages = indexable ? languageAlternates(path) : undefined;
  const alternates = indexable ? {
    ...(url ? { canonical: url } : {}),
    ...(languages ? { languages } : {}),
  } : { canonical: null, languages: {} };
  const openGraphLocale = locale === "ar" ? "ar_AR" : "en_US";

  return {
    title,
    description,
    keywords: [...seoKeywords],
    ...(siteOrigin ? { metadataBase: new URL(siteOrigin) } : {}),
    ...(Object.keys(alternates).length ? { alternates } : {}),
    openGraph: {
      type,
      title,
      description,
      siteName: "3Mo",
      locale: openGraphLocale,
      alternateLocale: [locale === "ar" ? "en_US" : "ar_AR"],
      ...(url ? { url } : {}),
      ...(imageUrl
        ? {
            images: [
              {
                url: imageUrl,
                width: socialImage.width,
                height: socialImage.height,
                alt: imageAlt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      ...(imageUrl ? { images: [imageUrl] } : {}),
    },
    robots: indexable
      ? { index: true, follow: true }
      : { index: false, follow: true },
  };
}

export function organizationStructuredData(locale: Locale = "en") {
  const logo = absoluteUrl("/logo/3mo-mark.png");
  const url = absoluteUrl("/");

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "3Mo",
    description:
      locale === "ar"
        ? "استوديو للتقنية الإبداعية يصمم العلامات والتجارب والأنظمة للأفكار المتحركة."
        : "Creative technology studio for ideas in motion.",
    ...(url ? { url } : {}),
    ...(logo ? { logo } : {}),
  };
}

export function collectionPageStructuredData(projectNames: string[], locale: Locale = "en") {
  const url = absoluteUrl(pagePath("projects", locale));

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "ar" ? "مشاريع مختارة من استوديو 3Mo" : "Selected projects from 3Mo studio",
    description:
      locale === "ar"
        ? "مجموعة متنامية من هويات 3Mo وحملاتها وتجارب الويب والمحتوى والأنظمة الرقمية."
        : "A growing collection of 3Mo identities, campaigns, web experiences, content, and digital systems.",
    inLanguage: locale === "ar" ? "ar" : "en",
    ...(url ? { url } : {}),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projectNames.length,
      itemListElement: projectNames.map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
      })),
    },
  };
}

export function jsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function languageAlternates(path: string): Record<string, string> | undefined {
  if (!siteOrigin) return undefined;
  const englishPath = localizePath(path, "en");
  const arabicPath = localizePath(englishPath, "ar");
  const english = absoluteUrl(englishPath);
  const arabic = absoluteUrl(arabicPath);
  if (!english || !arabic) return undefined;
  return { en: english, ar: arabic, "x-default": english };
}

function readSiteOrigin(): string | undefined {
  const rawValue = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!rawValue) return undefined;

  try {
    const parsed = new URL(rawValue);
    if (
      (parsed.protocol !== "https:" && parsed.protocol !== "http:") ||
      !parsed.hostname.includes(".") ||
      /^(localhost|127\.|0\.|10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[01])\.)/i.test(parsed.hostname) ||
      parsed.hostname.endsWith(".local") ||
      parsed.hostname.endsWith(".manus.computer") ||
      parsed.username ||
      parsed.password ||
      parsed.search ||
      parsed.hash ||
      (parsed.pathname !== "/" && parsed.pathname !== "")
    ) {
      return undefined;
    }

    return parsed.origin;
  } catch {
    return undefined;
  }
}
