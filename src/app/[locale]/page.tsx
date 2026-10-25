import { Locale } from "@/types/content";
import { getMessages } from "@/i18n/messages";
import { pageMetadata, siteUrl } from "@/lib/seo";
import { getProjects, getExperiences } from "@/lib/content";
import { HomePage } from "@/components/HomePage";
import { profile } from "@/data/profile";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const m = getMessages(locale);
  return pageMetadata(locale, m.meta.title, m.meta.description);
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    url: `${siteUrl}/${locale}/`,
    jobTitle: "Product Owner & Telecommunications Engineer",
    sameAs: [profile.linkedin],
    email: profile.email,
    knowsLanguage: ["Spanish", "Galician", "English", "Portuguese", "French"],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HomePage
        locale={locale}
        projects={getProjects()}
        experiences={getExperiences()}
      />
    </>
  );
}
