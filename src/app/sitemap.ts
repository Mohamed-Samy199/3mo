import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const publicPaths = ["/", "/projects", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.flatMap((path) => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}
