export type Locale = "en" | "ar";
export type PageKey = "home" | "projects" | "contact";
export const locales: Locale[] = ["en", "ar"];

export function pagePath(page: PageKey, locale: Locale): string {
  const path = page === "home" ? "/" : `/${page}/`;
  return locale === "ar" ? `/ar${path}` : path;
}

export function localizePath(path: string, locale: Locale): string {
  if (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(path) || path.startsWith("#")) return path;
  const [, pathname = "/", suffix = ""] = path.match(/^([^?#]*)(.*)$/) || [];
  const englishPath = pathname.replace(/^\/ar(?=\/|$)/, "") || "/";
  const normalized = englishPath.startsWith("/") ? englishPath : `/${englishPath}`;
  return `${locale === "ar" ? `/ar${normalized}` : normalized}${suffix}`;
}
