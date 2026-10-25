import { Metadata } from "next";
import { Locale } from "@/types/content";
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://iago-estevez-portfolio.rea-de-traba-3698.chatgpt.site";
export function pageMetadata(
  locale: Locale,
  title: string,
  description: string,
  path = "",
): Metadata {
  const url = `${siteUrl}/${locale}/${path}`;
  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en/${path}`,
        es: `${siteUrl}/es/${path}`,
        "x-default": `${siteUrl}/en/${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Iago Estévez",
      locale: locale === "en" ? "en_US" : "es_ES",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.png"],
    },
  };
}
