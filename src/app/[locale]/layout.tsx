import { I18nProvider } from "@/i18n/Provider";
import { notFound } from "next/navigation";
import { locales, Locale } from "@/types/content";
import { SiteShell } from "@/components/layout/SiteShell";
import "../fonts";
import "../globals.css";
import "@/components/projects/projects.css";
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="/icon.svg" />
      </head>
      <body>
        <I18nProvider locale={locale as Locale}>
          <SiteShell locale={locale as Locale}>{children}</SiteShell>
        </I18nProvider>
      </body>
    </html>
  );
}
