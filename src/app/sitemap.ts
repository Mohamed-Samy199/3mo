import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import { localizePath } from "@/lib/i18n/config";

export const dynamic = "force-static";

const publicPaths = [
  "/",
  "/projects/",
  "/contact/",
  "/ar/",
  "/ar/projects/",
  "/ar/contact/",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.flatMap((path) => {
    const url = absoluteUrl(path);
    if (!url) return [];

    const englishPath = localizePath(path, "en");
    const english = absoluteUrl(englishPath);
    const arabic = absoluteUrl(localizePath(englishPath, "ar"));

    return [
      {
        url,
        ...(english && arabic
          ? { alternates: { languages: { en: english, ar: arabic, "x-default": english } } }
          : {}),
      },
    ];
  });
}
