import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/content";
import { siteUrl } from "@/lib/seo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["en", "es"].flatMap((locale) => [
    {
      url: `${siteUrl}/${locale}/`,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    ...getProjects().map((p) => ({
      url: `${siteUrl}/${locale}/projects/${p.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ]);
}
