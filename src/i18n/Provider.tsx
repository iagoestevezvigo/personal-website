"use client";
import { NextIntlClientProvider } from "next-intl";
import { Locale } from "@/types/content";
import { getMessages } from "./messages";
// Explicit client boundary avoids request-time locale discovery in static exports.
export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <NextIntlClientProvider
      locale={locale}
      messages={getMessages(locale)}
      timeZone="Europe/Madrid"
    >
      {children}
    </NextIntlClientProvider>
  );
}
