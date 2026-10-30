import Head from "next/head";
import { absoluteUrl, getPublicSiteUrl } from "@/lib/seo";
import { localizePath, type Locale } from "@/lib/i18n/config";

type LocalizedPageHeadProps = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  imageAlt?: string;
};

export default function LocalizedPageHead({
  locale,
  title,
  description,
  path,
  imageAlt,
}: LocalizedPageHeadProps) {
  const canonicalPath = localizePath(path, locale);
  const canonical = absoluteUrl(canonicalPath);
  const origin = getPublicSiteUrl();
  const image = absoluteUrl("/projects/logo.webp");
  const english = origin ? absoluteUrl(localizePath(path, "en")) : undefined;
  const arabic = origin ? absoluteUrl(localizePath(path, "ar")) : undefined;
  const ogLocale = locale === "ar" ? "ar_AR" : "en_US";
  const alternateLocale = locale === "ar" ? "en_US" : "ar_AR";
  const socialAlt = imageAlt ?? (locale === "ar" ? "شعار استوديو 3Mo للتقنية الإبداعية" : "3Mo creative technology studio mark");

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/icon.png" type="image/png" key="favicon" />
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />
      {canonical && <link rel="canonical" href={canonical} />}
      {english && <link rel="alternate" hrefLang="en" href={english} />}
      {arabic && <link rel="alternate" hrefLang="ar" href={arabic} />}
      {english && <link rel="alternate" hrefLang="x-default" href={english} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="3Mo" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content={ogLocale} />
      <meta property="og:locale:alternate" content={alternateLocale} />
      {canonical && <meta property="og:url" content={canonical} />}
      {image && <meta property="og:image" content={image} />}
      {image && <meta property="og:image:alt" content={socialAlt} />}
      {image && <meta property="og:image:width" content="900" />}
      {image && <meta property="og:image:height" content="600" />}
      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      {image && <meta name="twitter:image:alt" content={socialAlt} />}
    </Head>
  );
}
